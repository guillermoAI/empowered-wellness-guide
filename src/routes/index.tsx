import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/site-chrome";

export const Route = createFileRoute("/")({ component: Index });

const easing = [0.22, 1, 0.36, 1] as const;

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <MisChicas />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:py-28 lg:py-36">
      {/* Soft rose ambient glows */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-rose-soft opacity-60 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 right-0 h-[520px] w-[520px] rounded-full bg-accent opacity-70 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-primary"
          >
            <span className="loader-dots text-primary"><span /><span /><span /></span>
            Tu plan en 60 segundos
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easing, delay: 0.1 }}
            className="font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-[60px]"
          >
            Un plan hecho a tu medida para volver a <span className="text-primary italic">sentirte tú</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easing, delay: 0.25 }}
            className="mt-7 max-w-lg text-lg text-muted-foreground sm:text-xl"
          >
            Lista de la compra, entrenamiento full body y comidas. Adaptado a tu cuerpo, tu objetivo y tu vida real.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easing, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/formulario"
              className="inline-flex h-12 items-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-[0_6px_24px_-8px_rgb(0_0_0/0.18)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_10px_30px_-10px_rgb(0_0_0/0.25)] active:scale-[0.98]"
            >
              Comenzar formulario
            </Link>
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Gratis</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing, delay: 0.35 }}
          className="relative"
        >
          <MockupCard />
        </motion.div>
      </div>
    </section>
  );
}

function MockupCard() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
      <div className="absolute inset-x-6 -bottom-3 h-16 rounded-full bg-primary/25 blur-3xl" />
      <div className="relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="text-[11px] uppercase tracking-[0.22em] text-primary">Tu plan · 1 día</div>
        <h3 className="mt-3 font-serif text-2xl">Para María, 47</h3>
        <div className="mt-6 space-y-4 text-sm">
          {[
            ["Estrategia", "Recomposición · fuerza pesada · 4-6 meses"],
            ["Comida", "Salmón al horno · brócoli salteado · medio boniato · AOVE"],
            ["Entrenamiento", "Full body · 6 ejercicios · 50 min"],
            ["Lista", "28 ingredientes priorizados"],
          ].map(([label, value], i) => (
            <div key={label}>
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
              <p className="mt-1 text-foreground">{value}</p>
              {i < 3 && <div className="mt-4 h-px bg-border" />}
            </div>
          ))}
        </div>
        <div className="absolute bottom-6 left-8 right-8 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          VIKYFIT · Plan personalizado
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="sobre-mi" className="bg-rose-tint/60 px-6 py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: easing }}
          className="aspect-square w-full max-w-md rounded-3xl bg-gradient-to-br from-secondary via-accent to-background"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: easing, delay: 0.1 }}
        >
          <div className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Sobre mí</div>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl">Especializada en mujeres a partir de los 40</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>Acompaño a mujeres a recuperar su energía, su fuerza y su relación con el cuerpo en una etapa donde lo de siempre deja de funcionar.</p>
            <p>Especialista en nutrición clínica y entrenamiento de fuerza para mujeres en peri y menopausia. Trabajo desde el equilibrio hormonal, no contra él.</p>
            <p>Este plan que te llevas hoy es una versión condensada de lo que diseño en consulta — para que pruebes el enfoque y veas si tiene sentido para ti.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const CHICAS = [
  {
    name: "Elena, 52",
    goal: "Pérdida de grasa + masa muscular",
    weeks: "16 semanas",
    quote: "Por primera vez tengo un plan que entiende mi cuerpo a esta edad. La fuerza ha cambiado todo.",
  },
  {
    name: "Marta, 47",
    goal: "Reducir inflamación abdominal",
    weeks: "10 semanas",
    quote: "La hinchazón con la que llevaba años bajó en dos semanas. No sabía que se podía sentir tan ligera.",
  },
];

function MisChicas() {
  return (
    <section id="mis-chicas" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: easing }}
          className="max-w-2xl"
        >
          <div className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Mis chicas</div>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl">Casos reales, transformaciones reales</h2>
          <p className="mt-4 text-muted-foreground">Mujeres que empezaron donde estás tú ahora.</p>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {CHICAS.map((c, i) => (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: easing, delay: i * 0.1 }}
              className="overflow-hidden rounded-3xl border border-border bg-card"
            >
              <div className="grid grid-cols-2">
                <BeforeAfterPlaceholder label="Antes" tone="muted" />
                <BeforeAfterPlaceholder label="Después" tone="rose" />
              </div>
              <div className="p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-serif text-2xl">{c.name}</h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-primary">{c.weeks}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{c.goal}</p>
                <p className="mt-5 font-serif text-lg italic leading-relaxed">"{c.quote}"</p>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          * Sustituye los marcos con las fotos reales de antes/después de cada chica.
        </p>
      </div>
    </section>
  );
}

function BeforeAfterPlaceholder({ label, tone }: { label: string; tone: "muted" | "rose" }) {
  const bg = tone === "rose"
    ? "bg-gradient-to-br from-secondary via-accent to-rose-tint"
    : "bg-gradient-to-br from-muted via-background to-secondary/40";
  return (
    <div className={`relative aspect-[3/4] ${bg}`}>
      <div className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
        {label}
      </div>
    </div>
  );
}

function FinalCTA() {
  return (
    <section className="bg-background px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: easing }}
        className="mx-auto max-w-2xl"
      >
        <h2 className="font-serif text-3xl sm:text-4xl">Tu plan está a 60 segundos.</h2>
        <p className="mt-4 text-muted-foreground">Responde unas preguntas y lo recibes al momento.</p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            to="/formulario"
            className="inline-flex h-12 items-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
          >
            Comenzar formulario
          </Link>
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Gratis</span>
        </div>
      </motion.div>
    </section>
  );
}
