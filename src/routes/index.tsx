import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/site-chrome";
import nataliaImg from "@/assets/chicas/natalia.jpg";
import cristinaImg from "@/assets/chicas/cristina.jpg";
import montseImg from "@/assets/chicas/montse.jpg";
import elenaImg from "@/assets/chicas/elena.jpg";
import susanaImg from "@/assets/chicas/susana.jpg";
import raquelImg from "@/assets/chicas/raquel.jpg";
import silviaImg from "@/assets/chicas/silvia.jpg";
import vikyImg from "@/assets/viky.png";


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
          FITVIKY · Plan personalizado
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
          className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-muted"
        >
          <img
            src={vikyImg}
            alt="Viky — entrenadora personal"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="lazy"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: easing, delay: 0.1 }}
        >
          <div className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Sobre mí</div>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl">Entrenadora personal especializada en mujeres</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>El deporte ha formado parte de mi vida desde siempre. Con apenas 16 años, mientras estudiaba, ya era instructora de aerobic y tonificación, y desde entonces, ayudar a mujeres a sentirse mejor con su cuerpo y salud ha sido mi vocación.</p>
            <p>Años después, esa pasión se convirtió en especialización. Soy entrenadora personal acreditada oficialmente e inscrita en el ROPEC, con certificación en nutrición y especializada en perimenopausia y menopausia.</p>
            <p>Mi misión es acompañarte y ayudarte a recuperar el control: de tu energía, de tu composición corporal y de tu bienestar. Sin dietas extremas. Sin entrenamientos imposibles. Con hábitos que puedas mantener en el tiempo y que de verdad transformen cómo te sientes y cómo te ves.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

type Chica = {
  name: string;
  age: number;
  job: string;
  kids: string;
  identity: string;
  story: string;
  result: string;
  photo: string;
};


const CHICAS: Chica[] = [
  {
    name: "Natalia",
    age: 38,
    job: "Gerente comercial",
    kids: "1 hija",
    identity: "Viajaba semanalmente y pensaba que no podía cuidarse.",
    story:
      "Por su trabajo viajaba y tenía eventos fuera constantemente. Llevaba tiempo sin actividad física y se sentía muy estancada, sin energía y frustrada.",
    result:
      "En 3 meses ha perdido 6 kilos y desinflamado su cuerpo, integrando hábitos saludables a pesar de su ritmo de vida. Ahora vuelve a reconocerse.",
    photo: nataliaImg,
  },
  {
    name: "Cristina",
    age: 54,
    job: "Recepcionista / Administrativa",
    kids: "2 hijos",
    identity: "Se había dejado de cuidar y pensaba que ya era tarde para empezar.",
    story:
      "No entrenaba, no se alimentaba bien y llevaba una vida totalmente sedentaria. Tenía complejo con los brazos y se planteaba operarse.",
    result:
      "Perdió 12 kg en 5 meses entrenando desde casa, eliminó la barriga, mejoró su composición corporal al completo y recuperó energía, motivación y entusiasmo por la vida.",
    photo: cristinaImg,
  },
  {
    name: "Montse",
    age: 45,
    job: "Arquitecta",
    kids: "2 hijos",
    identity: "Entrenaba sin resultados y se sentía estancada, hasta que entendió qué le faltaba.",
    story:
      "Entrenaba, pero sin rutina ni estructura. No veía cambios en su cuerpo y no entendía qué estaba fallando.",
    result:
      "Perdió 5 kg en 3 meses y recompuso su cuerpo, desinflamando su abdomen y viéndose más tonificada y definida.",
    photo: montseImg,
  },
  {
    name: "Elena",
    age: 47,
    job: "Contable",
    kids: "1 hijo",
    identity: "No se reconocía cuando se miraba al espejo y recuperó su cuerpo y su confianza.",
    story:
      "Veía cómo su cuerpo cambiaba con la perimenopausia: más flácida, más barriga y sin reconocerse. Pensaba que ya no tenía solución.",
    result:
      "Perdió 5,5 kg en 3 meses y volvió a sentirse bien consigo misma, ha desinflamado su abdomen y tonificado su cuerpo.",
    photo: elenaImg,
  },
  {
    name: "Inés",
    age: 62,
    job: "Ama de casa",
    kids: "",
    identity: "Pensaba que el pilates y caminar eran suficientes, hasta que entendió lo que su cuerpo necesitaba de verdad.",
    story:
      "Hacía pilates y caminaba, pero nunca había entrenado fuerza. Le preocupaba la osteopenia y sentía que le faltaba un enfoque más claro y personalizado.",
    result:
      "En 3 meses perdió 3 kg, mejoró su condición muscular y empezó a sentirse más fuerte, más funcional y segura en su cuerpo y cuidando su salud.",
    photo: raquelImg,
  },
  {
    name: "Susana",
    age: 51,
    job: "Enfermera",
    kids: "3 hijos",
    identity: "No conseguía volver a su peso anterior y necesitaba un plan a su medida.",
    story:
      "Había cogido 5 kg en poco tiempo, y era algo que le preocupaba. Hacía clases dirigidas pero no veía resultados y quería ayuda personalizada.",
    result:
      "5 kg en 3 meses con un plan adaptado a ella, a su etapa hormonal y su ritmo de vida. Ahora se siente muy bien consigo misma y vuelve a reconocerse.",
    photo: susanaImg,
  },
  {
    name: "Silvia",
    age: 53,
    job: "Limpiadora",
    kids: "1 hija",
    identity: "Pensaba que con comer bien era suficiente y entendió lo que realmente le faltaba.",
    story:
      "No hacía ejercicio y, aunque cuidaba la alimentación, no veía cambios. Sentía que algo estaba fallando y se frustraba al no avanzar.",
    result:
      "En 2 meses perdió 3 kg, redujo volumen y empezó a verse más firme y con más energía. Ahora vuelve a sentirse cómoda con ropa que había dejado de ponerse.",
    photo: silviaImg,
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

        <div className="mt-14 space-y-10">
          {CHICAS.map((c, i) => (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: easing, delay: (i % 3) * 0.08 }}
              className="overflow-hidden rounded-3xl border border-border bg-card md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
            >
              <PhotoPlaceholder name={c.name} photo={c.photo} />
              <div className="p-8 sm:p-10">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-serif text-2xl">{c.name}, {c.age}</h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-primary">{c.kids}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{c.job}</p>
                <p className="mt-5 font-serif text-lg italic leading-relaxed">"{c.identity}"</p>
                <div className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p><span className="font-medium uppercase tracking-wide text-[11px] text-foreground/80 mr-2">Antes</span>{c.story}</p>
                  <p><span className="font-medium uppercase tracking-wide text-[11px] text-primary mr-2">Después</span>{c.result}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}

function PhotoPlaceholder({ name, photo }: { name: string; photo: string }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted md:aspect-auto md:min-h-full">
      <img
        src={photo}
        alt={`${name} — antes y después`}
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
      />
      <div className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
        Antes · Después
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
