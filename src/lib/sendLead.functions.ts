import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const GOAL_LABEL: Record<string, string> = {
  "lose-1-10": "Pérdida de peso (3-10 kg)",
  "lose-10-plus": "Pérdida de peso (10+ kg)",
  "tone": "Tonificar",
  "fat-loss-muscle": "Pérdida grasa + masa muscular",
  "anti-inflammation": "Reducir inflamación abdominal",
};
const WEIGHT_LABEL: Record<string, string> = {
  "lt-60": "Menos de 60 kg",
  "60-70": "60-70 kg",
  "70-80": "70-80 kg",
  "gt-80": "Más de 80 kg",
};
const AGE_LABEL: Record<string, string> = {
  "35-50": "35-50 años",
  "50-60": "50-60 años",
  "60-plus": "60+ años",
};
const ACTIVITY_LABEL: Record<string, string> = {
  "low": "Poco activo / sedentario",
  "active": "Activo / de pie",
  "very-active": "Muy activo",
};
const TRAINING_LABEL: Record<string, string> = {
  "2-3-home": "2-3 días en casa",
  "2-3-gym": "2-3 días en gimnasio",
  "3-4-home": "3-4 días en casa",
  "3-4-gym": "3-4 días en gimnasio",
};
const OBSTACLE_LABEL: Record<string, string> = {
  "no-time": "No tiene tiempo",
  "dont-know-what": "No sabe qué comer",
  snacking: "Picoteo/ansiedad",
  consistency: "Falta de constancia",
  "no-response": "Cuerpo no responde",
  "no-start": "No sabe por dónde empezar",
};

const LeadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(6).max(30),
  goal: z.enum(["lose-1-10", "lose-10-plus", "tone", "fat-loss-muscle", "anti-inflammation"]),
  weightRange: z.enum(["lt-60", "60-70", "70-80", "gt-80"]),
  ageRange: z.enum(["35-50", "50-60", "60-plus"]),
  dailyActivity: z.enum(["low", "active", "very-active"]),
  training: z.enum(["2-3-home", "2-3-gym", "3-4-home", "3-4-gym"]),
  obstacle: z.enum(["no-time", "dont-know-what", "snacking", "consistency", "no-response", "no-start"]),
});

export const sendLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    // Store weightRange + ageRange concatenated into existing kg_range column to avoid migration.
    const meta = `${data.weightRange}|${data.ageRange}`;
    const { data: lead, error } = await supabaseAdmin
      .from("leads")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        goal: data.goal,
        kg_range: meta,
        daily_activity: data.dailyActivity,
        training: data.training,
        conditions: [],
        obstacle: data.obstacle,
      })
      .select()
      .single();

    if (error) {
      console.error("Lead insert error:", error);
      return { success: false, error: "No se pudo guardar el lead." };
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (token && chatId) {
      const message =
        `<b>🌸 Nuevo lead — ${data.name}</b>\n\n` +
        `📧 ${data.email}\n📱 ${data.phone}\n\n` +
        `<b>Calificación</b>\n` +
        `Objetivo: ${GOAL_LABEL[data.goal]}\n` +
        `Peso: ${WEIGHT_LABEL[data.weightRange]}\n` +
        `Edad: ${AGE_LABEL[data.ageRange]}\n` +
        `Día a día: ${ACTIVITY_LABEL[data.dailyActivity]}\n` +
        `Entrenamiento: ${TRAINING_LABEL[data.training]}\n` +
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
    }

    return { success: true, leadId: lead.id };
  });
