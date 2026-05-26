import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { sendLead } from "@/lib/sendLead.functions";
import type {
  FormAnswers, Goal, WeightRange, AgeRange, Activity, Training, Obstacle,
} from "@/lib/planGenerator";

export const Route = createFileRoute("/formulario")({ component: FormularioPage });

const easing = [0.22, 1, 0.36, 1] as const;

type State = Partial<FormAnswers>;

const emailSchema = z.string().email("Introduce un email válido");
const phoneSchema = z.string().min(6, "Introduce un teléfono válido").regex(/^[+0-9\s\-()]+$/, "Solo números y +");

function FormularioPage() {
  const navigate = useNavigate();
  const submit = useServerFn(sendLead);

  const [state, setState] = useState<State>({});
  const [stepIdx, setStepIdx] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const steps: string[] = useMemo(
    () => ["name", "age", "weight", "goal", "activity", "training", "obstacle", "email", "phone"],
    [],
  );

  const total = steps.length;
  const current = steps[stepIdx];
  const progress = ((stepIdx + 1) / total) * 100;

  const isStepValid = (): boolean => {
    switch (current) {
      case "name": return !!state.name && state.name.trim().length >= 2;
      case "goal": return !!state.goal;
      case "weight": return !!state.weightRange;
      case "age": return !!state.ageRange;
      case "activity": return !!state.dailyActivity;
      case "training": return !!state.training;
      case "obstacle": return !!state.obstacle;
      case "email": return !!state.email && emailSchema.safeParse(state.email).success;
      case "phone": return !!state.phone && phoneSchema.safeParse(state.phone).success;
    }
    return false;
  };

  const next = async () => {
    if (!isStepValid()) return;
    if (stepIdx === total - 1) {
      setSubmitting(true);
      setSubmitError(null);
      try {
        const payload: FormAnswers = {
          name: state.name!,
          email: state.email!,
          phone: state.phone!,
          goal: state.goal!,
          weightRange: state.weightRange!,
          ageRange: state.ageRange!,
          dailyActivity: state.dailyActivity!,
          training: state.training!,
          obstacle: state.obstacle!,
        };
        await submit({ data: payload });
        navigate({ to: "/tu-plan", state: { answers: payload } as any });
      } catch (e) {
        console.error(e);
        setSubmitError("Algo falló al enviar. Reintenta en un momento.");
        setSubmitting(false);
      }
      return;
    }
    setDirection(1);
    setStepIdx((i) => i + 1);
  };

  const back = () => {
    if (stepIdx === 0) { navigate({ to: "/" }); return; }
    setDirection(-1);
    setStepIdx((i) => i - 1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="fixed inset-x-0 top-0 z-30 h-[2px] bg-border">
        <motion.div
          className="h-full bg-primary"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: easing }}
        />
      </div>

      <header className="flex items-center justify-between px-6 pt-8">
        <button
          onClick={back}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Atrás
        </button>
        <span className="text-xs text-muted-foreground">{stepIdx + 1} / {total}</span>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: easing }}
            >
              {renderStep(current!, state, setState)}
            </motion.div>
          </AnimatePresence>

          {submitError && (
            <p className="mt-4 text-center text-sm text-destructive">{submitError}</p>
          )}

          <div className="mt-12 flex justify-center">
            <button
              onClick={next}
              disabled={!isStepValid() || submitting}
              className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              {submitting
                ? (<span className="loader-dots text-primary-foreground"><span /><span /><span /></span>)
                : stepIdx === total - 1 ? "Recibir mi plan" : "Siguiente"}
            </button>
          </div>
        </div>
      </main>

      <footer className="px-6 pb-6 text-center text-xs text-muted-foreground">
        <Link to="/">Volver al inicio</Link>
      </footer>
    </div>
  );
}

function renderStep(
  step: string,
  s: State,
  set: (u: (p: State) => State) => void,
) {
  switch (step) {
    case "name":
      return (
        <Question label="Para empezar, ¿cómo te llamas?">
          <TextField
            value={s.name ?? ""}
            onChange={(v) => set((p) => ({ ...p, name: v }))}
            placeholder="Tu nombre"
            autoFocus
          />
        </Question>
      );
    case "goal":
      return (
        <Question label="¿Cuál es tu objetivo principal?">
          <RadioCards
            value={s.goal}
            onChange={(v) => set((p) => ({ ...p, goal: v as Goal }))}
            options={[
              { value: "lose-1-10", label: "Perder peso (3-10 kg)" },
              { value: "lose-10-plus", label: "Perder peso (más de 10 kg)" },
              { value: "tone", label: "Tonificar mi cuerpo" },
              { value: "fat-loss-muscle", label: "Perder grasa y ganar masa muscular" },
              { value: "anti-inflammation", label: "Reducir la inflamación abdominal" },
            ]}
          />
        </Question>
      );
    case "weight":
      return (
        <Question label="¿Cuánto pesas actualmente?">
          <RadioCards
            value={s.weightRange}
            onChange={(v) => set((p) => ({ ...p, weightRange: v as WeightRange }))}
            options={[
              { value: "lt-60", label: "Menos de 60 kg" },
              { value: "60-70", label: "Entre 60 y 70 kg" },
              { value: "70-80", label: "Entre 70 y 80 kg" },
              { value: "gt-80", label: "Más de 80 kg" },
            ]}
          />
        </Question>
      );
    case "age":
      return (
        <Question label="¿En qué franja de edad estás?">
          <RadioCards
            value={s.ageRange}
            onChange={(v) => set((p) => ({ ...p, ageRange: v as AgeRange }))}
            options={[
              { value: "35-50", label: "35 a 50 años" },
              { value: "50-60", label: "50 a 60 años" },
              { value: "60-plus", label: "Más de 60 años" },
            ]}
          />
        </Question>
      );
    case "activity":
      return (
        <Question label="¿Cómo es tu día a día?">
          <RadioCards
            value={s.dailyActivity}
            onChange={(v) => set((p) => ({ ...p, dailyActivity: v as Activity }))}
            options={[
              { value: "low", label: "Poco activo — sedentario" },
              { value: "active", label: "Activo — de pie" },
              { value: "very-active", label: "Muy activo" },
            ]}
          />
        </Question>
      );
    case "training":
      return (
        <Question label="¿Cuántos días puedes entrenar y dónde?">
          <RadioCards
            value={s.training}
            onChange={(v) => set((p) => ({ ...p, training: v as Training }))}
            options={[
              { value: "2-3-home", label: "2 a 3 días en casa" },
              { value: "2-3-gym", label: "2 a 3 días en gimnasio" },
              { value: "3-4-home", label: "3 a 4 días en casa" },
              { value: "3-4-gym", label: "3 a 4 días en gimnasio" },
            ]}
          />
        </Question>
      );
    case "conditions":
      return (
        <Question label="¿Tienes alguna condición a tener en cuenta?" hint="Puedes marcar varias.">
          <CheckboxCards
            value={s.conditions}
            onChange={(v) => set((p) => ({ ...p, conditions: v }))}
            options={[
              { value: "menopause", label: "Perimenopausia o menopausia" },
              { value: "joints", label: "Problemas de rodillas, espalda o articulaciones" },
              { value: "metabolic", label: "Tiroides, diabetes o resistencia a la insulina" },
              { value: "none", label: "Ninguna de las anteriores" },
            ]}
          />
        </Question>
      );
    case "obstacle":
      return (
        <Question label="¿Cuál ha sido tu mayor obstáculo?">
          <RadioCards
            value={s.obstacle}
            onChange={(v) => set((p) => ({ ...p, obstacle: v as Obstacle }))}
            options={[
              { value: "no-time", label: "No tengo tiempo para cocinar ni entrenar" },
              { value: "dont-know-what", label: "No sé qué comer ni en qué cantidades" },
              { value: "snacking", label: "Pico entre horas o como por ansiedad" },
              { value: "consistency", label: "Empiezo motivada pero no soy constante" },
              { value: "no-response", label: "Mi cuerpo ya no responde como antes" },
            ]}
          />
        </Question>
      );
    case "email": {
      const err = s.email && s.email.length > 0 && !emailSchema.safeParse(s.email).success;
      return (
        <Question label="¿A qué email enviamos tu plan?">
          <TextField
            value={s.email ?? ""}
            onChange={(v) => set((p) => ({ ...p, email: v }))}
            placeholder="tu@email.com"
            type="email"
            error={err ? "Introduce un email válido" : undefined}
            autoFocus
          />
        </Question>
      );
    }
    case "phone": {
      const err = s.phone && s.phone.length > 0 && !phoneSchema.safeParse(s.phone).success;
      return (
        <Question label="Tu WhatsApp (por si tu plan necesita ajustes)">
          <div className="flex items-stretch gap-2">
            <div className="flex h-12 items-center rounded-md border border-input bg-card px-3 text-sm text-muted-foreground">+34</div>
            <div className="flex-1">
              <TextField
                value={s.phone ?? ""}
                onChange={(v) => set((p) => ({ ...p, phone: v }))}
                placeholder="600 000 000"
                type="tel"
                error={err ? "Introduce un teléfono válido" : undefined}
                autoFocus
              />
            </div>
          </div>
        </Question>
      );
    }
  }
  return null;
}

function Question({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-2xl leading-tight sm:text-3xl">{label}</h2>
      {hint && <p className="mt-2 text-sm text-muted-foreground">{hint}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}

function TextField({
  value, onChange, placeholder, type = "text", error, autoFocus,
}: {
  value: string; onChange: (v: string) => void; placeholder?: string;
  type?: string; error?: string; autoFocus?: boolean;
}) {
  return (
    <div>
      <input
        autoFocus={autoFocus}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-md border border-input bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/70"
      />
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}

type Opt<T extends string> = { value: T; label: string };

function RadioCards<T extends string>({ value, onChange, options }: {
  value: T | undefined; onChange: (v: T) => void; options: Opt<T>[];
}) {
  return (
    <div className="space-y-2.5">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`w-full rounded-md border bg-card px-5 py-4 text-left text-base transition-all duration-[180ms] ${
              active
                ? "border-primary border-[1.5px] bg-accent"
                : "border-border hover:border-primary/40"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function CheckboxCards<T extends string>({ value, onChange, options }: {
  value: T[]; onChange: (v: T[]) => void; options: Opt<T>[];
}) {
  const toggle = (v: T) => {
    if (v === ("none" as T)) {
      if (value.includes(v)) onChange([]); else onChange([v]);
      return;
    }
    const without = value.filter((x) => x !== ("none" as T));
    if (without.includes(v)) onChange(without.filter((x) => x !== v));
    else onChange([...without, v]);
  };

  return (
    <div className="space-y-2.5">
      {options.map((o) => {
        const active = value.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => toggle(o.value)}
            className={`flex w-full items-center justify-between rounded-md border bg-card px-5 py-4 text-left text-base transition-all duration-[180ms] ${
              active
                ? "border-primary border-[1.5px] bg-accent"
                : "border-border hover:border-primary/40"
            }`}
          >
            <span>{o.label}</span>
            {active && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check size={12} strokeWidth={2} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
