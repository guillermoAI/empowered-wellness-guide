import { createFileRoute, useRouter, Navigate, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import jsPDF from "jspdf";
import { generatePlan, type FormAnswers } from "@/lib/planGenerator";

export const Route = createFileRoute("/tu-plan")({ component: TuPlanPage });

const easing = [0.22, 1, 0.36, 1] as const;

function TuPlanPage() {
  const router = useRouter();
  // Answers passed via router state from /formulario. If absent (e.g. refresh), redirect.
  const answers = (router.state.location.state as any)?.answers as FormAnswers | undefined;

  if (!answers) {
    return <Navigate to="/" />;
  }

  const plan = generatePlan(answers);

  const whatsappHref = `https://wa.me/34000000000?text=${encodeURIComponent(
    `Hola, acabo de recibir mi plan personalizado y quiero el plan completo. Mi nombre es ${answers.name}.`
  )}`;

  const downloadPdf = () => buildPdf(answers, plan);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, ease: easing }}
      className="min-h-screen bg-background"
    >
      <header className="border-b border-border">
        <div className="mx-auto flex h-[72px] max-w-4xl items-center justify-between px-6">
          <Link to="/" className="font-serif text-lg">NOMBRE STUDIO</Link>
          <button
            onClick={downloadPdf}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-sm font-medium transition-all hover:border-foreground"
          >
            <Download size={16} strokeWidth={1.5} />
            Descargar PDF
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        {/* 1. Intro */}
        <Section delay={0}>
          <p className="text-sm font-medium tracking-wide text-primary">Tu plan personalizado</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{plan.personalIntro.greeting}</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{plan.personalIntro.message}</p>
        </Section>

        {/* 2. Strategy */}
        <Section delay={0.1}>
          <Eyebrow>Tu estrategia</Eyebrow>
          <p className="mt-4 text-lg leading-relaxed">{plan.strategyNote.main}</p>
          {plan.strategyNote.activityNote && (
            <p className="mt-3 text-muted-foreground">{plan.strategyNote.activityNote}</p>
          )}
        </Section>

        {/* 3. Shopping */}
        <Section delay={0.1}>
          <Eyebrow>Tu lista de la compra</Eyebrow>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {plan.shoppingList.map((s) => (
              <div key={s.category} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-serif text-lg">{s.category}</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {s.items.map((it) => (
                    <li key={it.name} className="flex items-baseline gap-2">
                      <span className="text-primary">·</span>
                      <span>{it.name}{it.note && <span className="text-muted-foreground"> — {it.note}</span>}</span>
                    </li>
                  ))}
                </ul>
                {s.note && <p className="mt-4 text-xs italic text-muted-foreground">{s.note}</p>}
              </div>
            ))}
          </div>
        </Section>

        {/* 4. Workout */}
        <Section delay={0.1}>
          <Eyebrow>Tu entrenamiento de hoy</Eyebrow>
          <div className="mt-6 rounded-xl border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-serif text-xl">{plan.workout.title}</h3>
              <span className="text-sm text-muted-foreground">{plan.workout.duration}</span>
            </div>
            <ol className="mt-6 divide-y divide-border">
              {plan.workout.exercises.map((ex, i) => (
                <li key={i} className="flex items-start gap-4 py-3.5">
                  <span className="mt-0.5 font-serif text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex-1">
                    <div className="font-medium">{ex.name}</div>
                    <div className="mt-0.5 text-sm text-muted-foreground">{ex.sets !== "—" ? `${ex.sets} series · ` : ""}{ex.reps}</div>
                    {ex.note && <div className="mt-1 text-xs italic text-muted-foreground">{ex.note}</div>}
                  </div>
                </li>
              ))}
            </ol>
            {plan.workout.notes.length > 0 && (
              <div className="mt-6 rounded-md bg-secondary/60 p-4 text-sm leading-relaxed">
                <ul className="space-y-2">
                  {plan.workout.notes.map((n, i) => <li key={i}>{n}</li>)}
                </ul>
              </div>
            )}
          </div>
        </Section>

        {/* 5. Meals */}
        <Section delay={0.1}>
          <Eyebrow>Tu día de comidas</Eyebrow>
          <div className="mt-6 space-y-3">
            {plan.meals.meals.map((m) => (
              <div key={m.name} className="rounded-xl border border-border bg-card p-6">
                <div className="text-xs font-medium uppercase tracking-wide text-primary">{m.name}</div>
                <p className="mt-2 leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
          {plan.meals.notes.length > 0 && (
            <div className="mt-6 rounded-md bg-secondary/60 p-4 text-sm leading-relaxed">
              <ul className="space-y-2">
                {plan.meals.notes.map((n, i) => <li key={i}>{n}</li>)}
              </ul>
            </div>
          )}
        </Section>

        {/* 6. Obstacle */}
        <Section delay={0.1}>
          <Eyebrow>Cómo abordar tu obstáculo</Eyebrow>
          <h3 className="mt-3 font-serif text-2xl">{plan.obstacleSection.title}</h3>
          <ul className="mt-6 space-y-3">
            {plan.obstacleSection.actions.map((a, i) => (
              <li key={i} className="flex gap-3 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* 7. CTA */}
        <Section delay={0.1}>
          <div className="rounded-2xl bg-secondary p-8 sm:p-12 text-center">
            <h3 className="font-serif text-2xl sm:text-3xl">¿Quieres el plan completo?</h3>
            <p className="mt-3 text-muted-foreground">Este es solo un día. El plan profesional ajustado a tus análisis, hormonas y vida real es el siguiente paso.</p>
            <a
              href={whatsappHref}
              target="_blank" rel="noreferrer"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground transition-all hover:scale-[1.02]"
            >
              Quiero el plan completo
              <ArrowRight size={18} strokeWidth={1.5} />
            </a>
          </div>
        </Section>

        <div className="mt-16 flex justify-center">
          <button
            onClick={downloadPdf}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium transition-all hover:border-foreground"
          >
            <Download size={16} strokeWidth={1.5} />
            Descargar este plan como PDF
          </button>
        </div>
      </main>

      <footer className="border-t border-border py-12 text-center text-sm text-muted-foreground">
        © 2026 NOMBRE STUDIO
      </footer>
    </motion.div>
  );
}

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: easing, delay }}
      className="border-t border-border py-12 first:border-t-0 first:pt-0"
    >
      {children}
    </motion.section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary">{children}</div>;
}

// ----- PDF -----

function buildPdf(answers: FormAnswers, plan: ReturnType<typeof generatePlan>) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 56;
  let y = M;

  const checkPage = (need = 60) => {
    if (y + need > H - M) {
      doc.addPage();
      y = M;
    }
  };

  const writeWrapped = (text: string, size = 11, opts: { bold?: boolean; color?: [number, number, number]; gap?: number } = {}) => {
    doc.setFont("helvetica", opts.bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(...(opts.color ?? [26, 26, 26]));
    const lines = doc.splitTextToSize(text, W - M * 2);
    for (const ln of lines) {
      checkPage(size + 4);
      doc.text(ln, M, y);
      y += size * 1.35;
    }
    y += opts.gap ?? 0;
  };

  const heading = (t: string) => {
    checkPage(36);
    y += 12;
    writeWrapped(t, 16, { bold: true, gap: 6 });
    doc.setDrawColor(220, 220, 220);
    doc.line(M, y - 6, W - M, y - 6);
    y += 6;
  };

  // Title
  writeWrapped(plan.personalIntro.greeting, 22, { bold: true, gap: 6 });
  writeWrapped(plan.personalIntro.message, 11, { color: [107, 107, 107], gap: 10 });

  heading("Tu estrategia");
  writeWrapped(plan.strategyNote.main, 11, { gap: 4 });
  if (plan.strategyNote.activityNote) writeWrapped(plan.strategyNote.activityNote, 10, { color: [107, 107, 107] });

  heading("Lista de la compra");
  for (const s of plan.shoppingList) {
    checkPage(40);
    writeWrapped(s.category, 12, { bold: true, gap: 2 });
    for (const it of s.items) {
      writeWrapped(`·  ${it.name}${it.note ? ` — ${it.note}` : ""}`, 10);
    }
    if (s.note) writeWrapped(s.note, 9, { color: [107, 107, 107], gap: 4 });
    y += 4;
  }

  heading(`Entrenamiento — ${plan.workout.title} (${plan.workout.duration})`);
  let i = 1;
  for (const ex of plan.workout.exercises) {
    writeWrapped(`${String(i).padStart(2, "0")}.  ${ex.name}`, 11, { bold: true });
    writeWrapped(`${ex.sets !== "—" ? ex.sets + " series · " : ""}${ex.reps}`, 10, { color: [107, 107, 107], gap: ex.note ? 0 : 4 });
    if (ex.note) writeWrapped(ex.note, 9, { color: [107, 107, 107], gap: 4 });
    i++;
  }
  for (const n of plan.workout.notes) writeWrapped(`· ${n}`, 10, { color: [60, 60, 60] });

  heading("Día de comidas");
  for (const m of plan.meals.meals) {
    writeWrapped(m.name, 11, { bold: true });
    writeWrapped(m.description, 10, { gap: 6 });
  }
  for (const n of plan.meals.notes) writeWrapped(`· ${n}`, 10, { color: [60, 60, 60] });

  heading(plan.obstacleSection.title);
  for (const a of plan.obstacleSection.actions) writeWrapped(`·  ${a}`, 10, { gap: 4 });

  // Footer
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text("NOMBRE STUDIO · Plan personalizado", M, H - 30);

  doc.save(`plan-${answers.name.toLowerCase().replace(/\s+/g, "-")}.pdf`);
}
