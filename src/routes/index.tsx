import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShoppingBasket, Dumbbell, UtensilsCrossed } from "lucide-react";
import { Navbar, Footer } from "@/components/site-chrome";

export const Route = createFileRoute("/")({ component: Index });

const easing = [0.22, 1, 0.36, 1] as const;

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <SocialProof />
      <WhatsIncluded />
      <About />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="px-6 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing, delay: 0.1 }}
            className="font-serif text-4xl leading-[1.1] sm:text-5xl lg:text-[56px]"
          >
            Tu plan personalizado de un día para sentirte con energía y fuerza
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing, delay: 0.3 }}
            className="mt-6 max-w-lg text-lg text-muted-foreground sm:text-xl"
          >
            Lista de la compra, entrenamiento full body y comidas. Hecho a tu medida en menos de 60 segundos.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing, delay: 0.45 }}
            className="mt-10"
          >
            <Link
              to="/formulario"
              className="inline-flex h-12 items-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
            >
              Comenzar formulario
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Diseñado por [nombre]  ·  Gratis, sin tarjeta
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easing, delay: 0.4 }}
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
      <div className="absolute inset-x-6 -bottom-3 h-12 rounded-full bg-secondary/60 blur-2xl" />
      <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="text-xs uppercase tracking-[0.18em] text-primary">Tu plan · 1 día</div>
        <h3 className="mt-3 font-serif text-2xl">Para María, 47</h3>
        <div className="mt-6 space-y-4 text-sm">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Estrategia</div>
            <p className="mt-1 text-foreground">Déficit suave · fuerza pesada · 3-4 meses</p>
          </div>
          <div className="h-px bg-border" />
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Comida</div>
            <p className="mt-1 text-foreground">Salmón al horno · brócoli salteado · medio boniato · AOVE</p>
          </div>
          <div className="h-px bg-border" />
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Entrenamiento</div>
            <p className="mt-1 text-foreground">Full body · 6 ejercicios · 50 min</p>
          </div>
          <div className="h-px bg-border" />
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Lista</div>
            <p className="mt-1 text-foreground">28 ingredientes priorizados</p>
          </div>
        </div>
        <div className="absolute bottom-6 left-8 right-8 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          NOMBRE STUDIO · Plan personalizado
        </div>
      </div>
    </div>
  );
}

const TESTIMONIALS = [
  {
    initials: "MC",
    name: "Marta C.",
    age: 48,
    text: "Por primera vez tengo un plan que entiende mi cuerpo a esta edad. La fuerza ha cambiado todo.",
  },
  {
    initials: "LR",
    name: "Lucía R.",
    age: 52,
    text: "Pensé que era un PDF más. Es una hoja de ruta clara, sin promesas raras. Me sirvió desde el primer día.",
  },
];

function SocialProof() {
  return (
    <section className="bg-secondary/50 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: easing }}
          className="text-center font-serif text-3xl sm:text-4xl"
        >
          Quienes ya lo han probado
        </motion.h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: easing, delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card p-8"
            >
              <p className="font-serif text-lg italic leading-relaxed">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-secondary font-serif text-base text-foreground">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.age} años</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const INCLUDED = [
  { Icon: ShoppingBasket, title: "Tu lista de la compra", text: "Categorizada por proteínas, verduras, grasas y carbohidratos. Adaptada a tu objetivo y a tus condiciones." },
  { Icon: Dumbbell, title: "Tu entrenamiento full body", text: "Una sesión completa, en casa o gimnasio, ajustada a tu frecuencia y a tus articulaciones." },
  { Icon: UtensilsCrossed, title: "Tu día de comidas", text: "Desayuno, comida, merienda y cena. Cantidades en porciones reales, no en gramos." },
];

function WhatsIncluded() {
  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: easing }}
          className="max-w-2xl"
        >
          <div className="text-sm font-medium tracking-wide text-primary">Qué incluye</div>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Tres piezas, una sola estrategia</h2>
        </motion.div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {INCLUDED.map(({ Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: easing, delay: i * 0.08 }}
              className="group rounded-xl border border-border bg-card p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/30"
            >
              <Icon strokeWidth={1.5} size={28} />
              <h3 className="mt-6 font-serif text-xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre-mi" className="bg-secondary/30 px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: easing }}
          className="aspect-square w-full max-w-md rounded-2xl bg-gradient-to-br from-secondary to-accent"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: easing, delay: 0.1 }}
        >
          <div className="text-sm font-medium text-primary">Sobre mí</div>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Especializada en mujeres a partir de los 40</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>Llevo más de [X] años acompañando a mujeres a recuperar su energía, su fuerza y su relación con el cuerpo en una etapa donde lo de siempre deja de funcionar.</p>
            <p>Soy [credenciales placeholder: especialista en nutrición clínica + fuerza para mujeres en peri y menopausia]. Trabajo desde el equilibrio hormonal, no contra él.</p>
            <p>Este plan que te llevas hoy es una versión condensada de lo que diseño en consulta. Está hecho para que pruebes el enfoque y veas si tiene sentido para ti.</p>
          </div>
        </motion.div>
      </div>
    </section>
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
        <p className="mt-4 text-muted-foreground">Sin tarjeta, sin compromisos. Solo responde unas preguntas y lo recibes al momento.</p>
        <Link
          to="/formulario"
          className="mt-10 inline-flex h-12 items-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
        >
          Comenzar formulario
        </Link>
      </motion.div>
    </section>
  );
}
