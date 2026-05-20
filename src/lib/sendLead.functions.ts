import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const GOAL_LABEL: Record<string, string> = {
  perder: "Perder peso",
  mantener: "Mantener y tonificar",
  ganar: "Ganar masa muscular",
};
const ACTIVITY_LABEL: Record<string, string> = {
  "sit-less-8": "Sentada <8h",
  "sit-more-8": "Sentada >8h",
  active: "Trabajo activo",
  "no-work": "No trabaja fuera",
};
const TRAINING_LABEL: Record<string, string> = {
  "2-3-home": "2-3 días en casa",
  "2-3-gym": "2-3 días en gimnasio",
  "4-5-home": "4-5 días en casa",
  "4-5-gym": "4-5 días en gimnasio",
};
const CONDITIONS_LABEL: Record<string, string> = {
  menopause: "Peri/menopausia",
  joints: "Articulaciones",
  metabolic: "Tiroides/diabetes/RI",
  none: "Ninguna",
};
const OBSTACLE_LABEL: Record<string, string> = {
  "no-time": "No tiene tiempo",
  "dont-know-what": "No sabe qué comer",
  snacking: "Picoteo/ansiedad",
  consistency: "Falta de constancia",
  "no-response": "Cuerpo no responde",
};

const LeadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(6).max(30),
  goal: z.enum(["perder", "mantener", "ganar"]),
  kgRange: z.enum(["1-5", "5-10", "10-15", "15+"]).optional().nullable(),
  dailyActivity: z.enum(["sit-less-8", "sit-more-8", "active", "no-work"]),
  training: z.enum(["2-3-home", "2-3-gym", "4-5-home", "4-5-gym"]),
  conditions: z.array(z.enum(["menopause", "joints", "metabolic", "none"])).min(1).max(4),
  obstacle: z.enum(["no-time", "dont-know-what", "snacking", "consistency", "no-response"]),
});

export const sendLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    // 1. Save lead (RLS bypassed via service role)
    const { data: lead, error } = await supabaseAdmin
      .from("leads")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        goal: data.goal,
        kg_range: data.kgRange ?? null,
        daily_activity: data.dailyActivity,
        training: data.training,
        conditions: data.conditions,
        obstacle: data.obstacle,
      })
      .select()
      .single();

    if (error) {
      console.error("Lead insert error:", error);
      return { success: false, error: "No se pudo guardar el lead." };
    }

    // 2. Send to Telegram (best-effort; lead already saved)
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (token && chatId) {
      const kgLine = data.kgRange ? `\nObjetivo en kg: ${data.kgRange}` : "";
      const conditionsList = data.conditions.map((c) => CONDITIONS_LABEL[c]).join(", ");
      const message =
        `<b>🟣 Nuevo lead — ${data.name}</b>\n\n` +
        `📧 ${data.email}\n📱 ${data.phone}\n\n` +
        `<b>Calificación</b>\n` +
        `Objetivo: ${GOAL_LABEL[data.goal]}${kgLine}\n` +
        `Día a día: ${ACTIVITY_LABEL[data.dailyActivity]}\n` +
        `Entrenamiento: ${TRAINING_LABEL[data.training]}\n` +
        `Condiciones: ${conditionsList}\n` +
        `Obstáculo: ${OBSTACLE_LABEL[data.obstacle]}\n\n` +
        `🕒 ${new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}`;

      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
        });
        if (tgRes.ok) {
          await supabaseAdmin.from("leads").update({ telegram_sent: true }).eq("id", lead.id);
        } else {
          console.error("Telegram send failed:", await tgRes.text());
        }
      } catch (e) {
        console.error("Telegram fetch error:", e);
      }
    } else {
      console.warn("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing");
    }

    return { success: true, leadId: lead.id };
  });
