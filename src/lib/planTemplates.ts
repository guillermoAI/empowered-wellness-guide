// Plan content templates. Pure data, no logic.

export type ShoppingItem = { name: string; note?: string };
export type ShoppingSection = { category: string; items: ShoppingItem[]; note?: string };
export type Exercise = { name: string; sets: string; reps: string; note?: string };
export type WorkoutDay = {
  title: string;
  duration: string;
  exercises: Exercise[];
  notes: string[];
};
export type Meal = { name: string; description: string };
export type MealDay = { meals: Meal[]; notes: string[] };
export type ObstacleSection = { title: string; actions: string[] };

// ───────── Strategy texts: 5 goals × 4 weight ranges ─────────
export const STRATEGY_TEXTS: Record<string, string> = {
  "lose-1-10|lt-60":  "Déficit calórico suave. Tu cuerpo no necesita un cambio agresivo, solo constancia. Estimado: 6-10 semanas.",
  "lose-1-10|60-70":  "Déficit moderado con foco en proteína para preservar masa muscular. Estimado: 8-12 semanas.",
  "lose-1-10|70-80":  "Déficit estructurado con énfasis en saciedad y fuerza. Estimado: 10-14 semanas.",
  "lose-1-10|gt-80":  "Déficit firme y sostenible, sin restringir grupos enteros de alimentos. Estimado: 12-16 semanas.",

  "lose-10-plus|lt-60": "Plan por bloques de 8 semanas con pausas estratégicas. Estimado: 5-7 meses.",
  "lose-10-plus|60-70": "Déficit por fases con revisiones mensuales. Estimado: 6-9 meses.",
  "lose-10-plus|70-80": "Plan estructurado en bloques alternando déficit y mantenimiento. Estimado: 8-12 meses.",
  "lose-10-plus|gt-80": "Plan a largo plazo por ciclos. La paciencia es tu mayor aliada. Estimado: 12+ meses.",

  "tone|lt-60":  "Mantenimiento calórico con energía suficiente para entrenar fuerza. Misma báscula, distinto cuerpo en 12 semanas.",
  "tone|60-70":  "Mantenimiento con ligera recomposición. Foco en proteína alta y entrenamiento progresivo.",
  "tone|70-80":  "Recomposición corporal: mantener peso bajando ligeramente la grasa y subiendo masa muscular.",
  "tone|gt-80":  "Recomposición + ligero déficit. Verás el cambio antes en el espejo que en la báscula.",

  "fat-loss-muscle|lt-60": "Superávit calórico ligero con foco en fuerza. La grasa baja por composición, no por déficit. 4-6 meses.",
  "fat-loss-muscle|60-70": "Recomposición clásica: mantenimiento ajustado, proteína alta, fuerza progresiva. 5-7 meses.",
  "fat-loss-muscle|70-80": "Déficit muy ligero + entrenamiento de fuerza prioritario. 6-9 meses.",
  "fat-loss-muscle|gt-80": "Déficit estructurado preservando masa muscular con fuerza pesada. 8-12 meses.",

  "anti-inflammation|lt-60": "Plan antiinflamatorio con foco digestivo: reducir ultraprocesados, alcohol, y priorizar fibra fermentable. 6-8 semanas.",
  "anti-inflammation|60-70": "Protocolo antiinflamatorio + ajuste de horarios de comida. Resultados visibles en 4-6 semanas.",
  "anti-inflammation|70-80": "Reducción de inflamación crónica vía alimentación, sueño y movilidad. 8-12 semanas.",
  "anti-inflammation|gt-80": "Plan antiinflamatorio completo + déficit suave para reducir grasa visceral. 12+ semanas.",
};

export const ACTIVITY_NOTES: Record<string, string | null> = {
  "low":         "Tu día es bastante sedentario, así que vamos a integrar movimiento fuera del entrenamiento: caminar después de comer, levantarse cada hora.",
  "active":      "Tu día ya tiene movimiento natural de pie. Esto trabaja a tu favor.",
  "very-active": "Tu día es muy activo: cuidaremos la recuperación y la fuerza para que ese movimiento te sume sin desgastarte.",
};

// ───────── Intro mensajes: 5 goals × 6 obstacles ─────────
export const INTRO_MESSAGES: Record<string, Record<string, string>> = {
  "lose-1-10": {
    "no-time":        "Tu vida ya está llena. Lo que sigue no te pide más tiempo: te pide hacer lo correcto en el poco que tienes.",
    "dont-know-what": "Tienes el objetivo claro pero te falta el cómo. Aquí está el qué, el cuánto y el cuándo — sin contar gramos.",
    "snacking":       "El picoteo no es debilidad: es comida que no sacia. Lo arreglamos con proteína en cada plato.",
    "consistency":    "No te falta motivación, te falta un sistema sencillo. Tu plan está hecho para días buenos y días regulares.",
    "no-response":    "Tu cuerpo no está roto: pide otro estímulo. Fuerza, proteína suficiente y paciencia.",
    "no-start":       "No saber por dónde empezar es lo más común. Aquí tienes el primer paso claro y abordable.",
  },
  "lose-10-plus": {
    "no-time":        "Perder peso real con poco tiempo se basa en estructura, no en horas. Aquí tienes la estructura.",
    "dont-know-what": "Cuando hay mucho que cambiar, lo último que necesitas es complicarlo. Aquí está claro.",
    "snacking":       "Con este objetivo, controlar el picoteo es prioridad. Vamos a crear entornos y comidas que sacien de verdad.",
    "consistency":    "Este plan se diseña por bloques: tu trabajo es solo seguir esta semana. Una a la vez.",
    "no-response":    "Lo que antes te funcionó ya no lo hace. Cambiamos la estrategia: fuerza, proteína y paciencia con el proceso.",
    "no-start":       "Cuando hay mucho que cambiar, lo crítico es el primer paso. Aquí lo tienes ordenado.",
  },
  "tone": {
    "no-time":        "Tonificar no necesita horas de gimnasio. Necesita intensidad bien dirigida 2-3 veces por semana.",
    "dont-know-what": "Tonificar es comer suficiente y entrenar fuerza con cabeza. Te dejo el cómo, ya.",
    "snacking":       "Si tu peso está bien, el picoteo es energía mal canalizada. Lo redirigimos a comidas reales.",
    "consistency":    "El músculo se construye semana a semana. No necesitas perfección, necesitas presencia.",
    "no-response":    "Si tu cuerpo dejó de cambiar, es momento de cambiar el estímulo: fuerza pesada, descanso real.",
    "no-start":       "Tonificar empieza por entender qué es fuerza bien hecha. Aquí va tu primer entrenamiento.",
  },
  "fat-loss-muscle": {
    "no-time":        "Recomponer cuerpo no es cuestión de horas, es de prioridad: fuerza pesada y comer suficiente proteína.",
    "dont-know-what": "Recomposición tiene reglas claras: comer alrededor del mantenimiento, proteína alta, entrenar fuerte.",
    "snacking":       "Aquí el picoteo no es enemigo si va con proteína. Lo redirigimos a aliado.",
    "consistency":    "La recomposición es el camino lento pero permanente. Cada semana cuenta.",
    "no-response":    "Si nada cambia, probablemente comes menos de lo que crees y entrenas con menos intensidad de la necesaria.",
    "no-start":       "Empezar por fuerza + proteína suficiente es el camino más corto. Aquí está el plan.",
  },
  "anti-inflammation": {
    "no-time":        "Reducir la inflamación pasa por simplificar lo que comes, no por añadir suplementos. Es más fácil de lo que parece.",
    "dont-know-what": "Hay 5 cosas que inflaman y 5 que desinflaman. Aquí tienes ambas listas claras.",
    "snacking":       "El picoteo de ultraprocesados es la causa más común de inflamación crónica. Vamos a reordenarlo.",
    "consistency":    "Notarás los cambios en 2 semanas si eres constante. Eso suele ser el motor que necesitas.",
    "no-response":    "La inflamación crónica es la causa silenciosa de que tu cuerpo no responda. Atacamos la raíz.",
    "no-start":       "Empezamos por simplificar: quitar lo que inflama y añadir lo que desinflama. Por aquí.",
  },
};

export const OBSTACLE_SECTIONS: Record<string, ObstacleSection> = {
  "no-time": {
    title: "Tu plan para hacer hueco",
    actions: [
      "Batch cooking dominical: 2 proteínas y 2 carbohidratos para toda la semana en 90 minutos.",
      "Entrenamientos de 25 min efectivos en lugar de 60 ineficientes.",
      "Comidas de una sola sartén o bandeja al horno tres días por semana.",
      "Lista de la compra fija que repites cada semana: menos decisiones, más tiempo.",
    ],
  },
  "dont-know-what": {
    title: "Tu plato ideal, sin pesar nada",
    actions: [
      "Plato ideal: 1 palma de proteína + medio plato de verduras + 1 puño de carbohidrato + 1 cucharada de grasa.",
      "Calcula con tu mano: palma = proteína, puño = carbohidrato, pulgar = grasa.",
      "Sin contar calorías al principio. Primero estructura, luego ajuste fino.",
      "Lista de 15 platos que rotas: si dudas, eliges uno y ya.",
    ],
  },
  "snacking": {
    title: "Tu plan para el picoteo",
    actions: [
      "Proteína en cada comida: el picoteo casi siempre viene de comidas pobres en proteína.",
      "Snacks de emergencia a mano: yogur griego, fruta con frutos secos, queso fresco.",
      "Regla del agua: ante el impulso, 1 vaso y espera 10 minutos.",
      "Identifica el momento: ¿ansiedad real o aburrimiento? Una caminata corta rompe el patrón.",
    ],
  },
  "consistency": {
    title: "Tu plan para ser constante",
    actions: [
      "Regla del mínimo viable: 2 entrenamientos a la semana > 0. Empieza por ahí.",
      "Hábito ancla: asocia el entrenamiento a algo que ya haces (tras el café, antes de cenar).",
      "Tracking visual simple: marca con una cruz cada día cumplido. La racha visible motiva.",
      "Plan de días malos: no es todo o nada. Si fallas un día, sigues mañana sin culpa.",
    ],
  },
  "no-response": {
    title: "Tu plan cuando el cuerpo no responde",
    actions: [
      "A partir de los 40 lo que antes funcionaba deja de funcionar. La clave nueva: fuerza y proteína suficiente.",
      "Tu cuerpo no está roto: pide otro tipo de estímulo.",
      "Probablemente necesites comer más, no menos. Subir el metabolismo antes de bajar calorías.",
      "Paciencia: cambios más lentos pero más sostenibles. Mide en meses, no en semanas.",
    ],
  },
  "no-start": {
    title: "Tu plan para arrancar desde cero",
    actions: [
      "Paso 1: elige 3 días fijos esta semana para entrenar. Bloquea en agenda.",
      "Paso 2: haz la compra una sola vez con la lista de este plan.",
      "Paso 3: replica el día de comidas tal cual durante 5 días, sin pensar.",
      "Paso 4: la semana que viene, ajustamos. Primero estructura, luego matices.",
    ],
  },
};

// ───────── Lista de la compra (categorías exactas) ─────────
export const BASE_SHOPPING: ShoppingSection[] = [
  {
    category: "Proteínas",
    items: [
      { name: "Huevos" },
      { name: "Pescado" },
      { name: "Pollo" },
      { name: "Pavo" },
      { name: "Yogur griego natural" },
      { name: "Queso fresco batido" },
    ],
  },
  {
    category: "Hidratos",
    items: [
      { name: "Arroz (integral)" },
      { name: "Patata" },
      { name: "Boniato" },
      { name: "Legumbres" },
      { name: "Pan (100% integral)" },
      { name: "Avena" },
    ],
  },
  {
    category: "Fruta y verdura",
    items: [
      { name: "Brócoli" },
      { name: "Pimientos" },
      { name: "Zanahoria" },
      { name: "Frutos rojos" },
      { name: "Kiwi" },
      { name: "Manzana" },
    ],
  },
  {
    category: "Grasas saludables",
    items: [
      { name: "Aceite de oliva virgen extra" },
      { name: "Frutos secos" },
      { name: "Aguacate" },
      { name: "Aceitunas" },
    ],
  },
  {
    category: "Extras",
    items: [
      { name: "Caldo" },
      { name: "Chocolate negro +85%" },
      { name: "Especias (pimienta negra, curry, cúrcuma)" },
      { name: "Salsa de soja / tomate triturado / tomate tamizado" },
    ],
  },
];

// ───────── Planes nutricionales exactos por grupo y peso ─────────
// Grupo nutricional: A = goals 1, 2, 4 (lose/recomp) | B = goal 3 (tone) | C = goal 5 (anti-inflam)
export type NutritionGroup = "A" | "B" | "C";

type MealSet = { breakfast: string; lunch: string; snack: string; dinner: string };

export const MEAL_PLANS: Record<NutritionGroup, Record<string, MealSet>> = {
  // ───── Grupo A — Pérdida de peso / Recomposición (planes 1, 2, 4) ─────
  A: {
    "lt-60": {
      breakfast: "60 g pan integral · 70 g queso cottage o fiambre de pavo 99% · 30 g aguacate · 1 fruta · café con leche desnatada o vegetal.",
      lunch:    "130 g de boniato o 40 g de arroz integral (peso en crudo) · 150 g pechuga de pollo · 150 g verduras (berenjena, calabacín, champiñones, tomate…) · 5 g AOVE + especias. Té verde.",
      snack:    "Yogur de proteínas natural + 1 fruta + 15 g de frutos secos (almendras, avellanas o nueces).",
      dinner:   "150 g patata cocida (peso en crudo) · 150 g verdura y hortalizas · 120 g salmón · 5 g AOVE + especias. Yogur desnatado natural o kéfir con canela + 50 g arándanos.",
    },
    "60-70": {
      breakfast: "80 g pan integral · 70 g queso cottage o fiambre de pavo 99% · 30 g aguacate · 1 fruta · café con leche desnatada o vegetal.",
      lunch:    "150 g de boniato o 50 g de arroz integral (peso en crudo) · 150 g pechuga de pollo · 150 g verduras (berenjena, calabacín, champiñones, tomate…) · 5 g AOVE + especias. Té verde.",
      snack:    "Yogur de proteínas natural + 1 fruta + 15 g de frutos secos (almendras, avellanas o nueces).",
      dinner:   "150 g patata cocida (peso en crudo) · 150 g verdura y hortalizas · 120 g salmón · 5 g AOVE. Yogur desnatado natural o kéfir con canela + 50 g arándanos.",
    },
    "70-80": {
      breakfast: "80 g pan integral · 80 g queso cottage o fiambre de pavo 99% · 40 g aguacate · 1 fruta · café con leche desnatada o vegetal.",
      lunch:    "200 g de boniato o 60 g de arroz integral (peso en crudo) · 160 g pechuga de pollo · 150 g verduras (berenjena, calabacín, champiñones, tomate…) · 5 g AOVE + especias. Té verde.",
      snack:    "Yogur de proteínas natural + 1 fruta + 15 g de frutos secos (almendras, avellanas o nueces).",
      dinner:   "150 g patata (peso en crudo) · 150 g verdura y hortalizas · 130 g salmón · 5 g AOVE. Yogur desnatado natural o kéfir con canela + 50 g arándanos.",
    },
    "gt-80": {
      breakfast: "80 g pan integral · 80 g queso cottage o fiambre de pavo 99% · 40 g aguacate · 1 fruta + 10 g frutos secos · café con leche desnatada o vegetal.",
      lunch:    "200 g de boniato o 60 g de arroz integral (peso en crudo) · 160 g pechuga de pollo · 150 g verduras (berenjena, calabacín, champiñones, tomate…) · 5 g AOVE + especias. Té verde.",
      snack:    "120 g queso fresco batido 0% + 1 fruta + 10 g de frutos secos (almendras, avellanas o nueces).",
      dinner:   "200 g patata (peso en crudo) · 150 g verdura y hortalizas · 130 g salmón · 5 g AOVE + especias. Yogur desnatado natural o kéfir con canela + 50 g arándanos.",
    },
  },

  // ───── Grupo B — Tonificar (plan 3) ─────
  B: {
    "lt-60": {
      breakfast: "70 g pan integral · 70 g queso cottage o fiambre de pavo 99% · 30 g aguacate · 1 fruta · café con leche desnatada o vegetal.",
      lunch:    "150 g de boniato o 50 g de arroz integral (peso en crudo) · 150 g pechuga de pollo · 150 g verduras (berenjena, calabacín, champiñones, tomate…) · 5 g AOVE + especias. Té verde.",
      snack:    "Yogur de proteínas natural + 1 fruta + 15 g de frutos secos (almendras, avellanas o nueces).",
      dinner:   "150 g patata (peso en crudo) · 150 g verdura y hortalizas · 120 g salmón · 5 g AOVE. Yogur desnatado natural o kéfir con canela + 50 g arándanos.",
    },
    "60-70": {
      breakfast: "80 g pan integral · 80 g queso cottage o fiambre de pavo 99% · 40 g aguacate · 1 fruta · café con leche desnatada o vegetal.",
      lunch:    "200 g de boniato o 60 g de arroz integral (peso en crudo) · 160 g pechuga de pollo · 150 g verduras (berenjena, calabacín, champiñones, tomate…) · 5 g AOVE + especias. Té verde.",
      snack:    "Yogur de proteínas natural + 1 fruta + 15 g de frutos secos (almendras, avellanas o nueces).",
      dinner:   "150 g patata (peso en crudo) · 150 g verdura y hortalizas · 130 g salmón · 5 g AOVE. Yogur desnatado natural o kéfir con canela + 50 g arándanos.",
    },
    "70-80": {
      breakfast: "80 g pan integral · 80 g queso cottage o fiambre de pavo 99% · 40 g aguacate · 1 fruta · café con leche desnatada o vegetal.",
      lunch:    "200 g de boniato o 60 g de arroz integral (peso en crudo) · 160 g pechuga de pollo · 150 g verduras (berenjena, calabacín, champiñones, tomate…) · 5 g AOVE + especias. Té verde.",
      snack:    "Yogur de proteínas natural + 1 fruta + 15 g de frutos secos (almendras, avellanas o nueces).",
      dinner:   "150 g patata (peso en crudo) · 150 g verdura y hortalizas · 130 g salmón · 5 g AOVE. Yogur desnatado natural o kéfir con canela + 50 g arándanos.",
    },
    "gt-80": {
      breakfast: "80 g pan integral · 80 g queso cottage o fiambre de pavo 99% · 40 g aguacate · 1 fruta · café con leche desnatada o vegetal.",
      lunch:    "200 g de boniato o 60 g de arroz integral (peso en crudo) · 160 g pechuga de pollo · 150 g verduras (berenjena, calabacín, champiñones, tomate…) · 5 g AOVE + especias. Té verde.",
      snack:    "Yogur de proteínas natural + 1 fruta + 15 g de frutos secos (almendras, avellanas o nueces).",
      dinner:   "150 g patata (peso en crudo) · 150 g verdura y hortalizas · 130 g salmón · 5 g AOVE. Yogur desnatado natural o kéfir con canela + 50 g arándanos.",
    },
  },

  // ───── Grupo C — Reducir inflamación abdominal (plan 5) ─────
  C: {
    "lt-60": {
      breakfast: "60 g pan integral de espelta o centeno · 70 g queso cottage o fiambre de pavo 99% · 30 g aguacate · 1 fruta · café con leche desnatada o vegetal.",
      lunch:    "130 g de boniato (peso en crudo) · 150 g pechuga de pollo · 150 g verduras (berenjena, calabacín, champiñones, tomate…) · 5 g AOVE + especias. Té verde.",
      snack:    "Yogur de proteínas natural + 1 fruta + 15 g de frutos secos (almendras, avellanas o nueces).",
      dinner:   "150 g patata cocida (peso en crudo) · 150 g verdura y hortalizas · 120 g salmón · 5 g AOVE + especias. Kéfir con canela + 50 g arándanos.",
    },
    "60-70": {
      breakfast: "70 g pan integral de espelta o centeno · 70 g queso cottage o fiambre de pavo 99% · 30 g aguacate · 1 fruta · café con leche desnatada o vegetal.",
      lunch:    "150 g de boniato (peso en crudo) · 150 g pechuga de pollo · 150 g verduras (berenjena, calabacín, champiñones, tomate…) · 5 g AOVE + especias. Té verde.",
      snack:    "Yogur de proteínas natural + 1 fruta + 15 g de frutos secos (almendras, avellanas o nueces).",
      dinner:   "150 g patata cocida (peso en crudo) · 150 g verdura y hortalizas · 120 g salmón · 5 g AOVE. Kéfir con canela + 50 g arándanos.",
    },
    "70-80": {
      breakfast: "70 g pan integral de espelta o centeno · 80 g queso cottage o fiambre de pavo 99% · 40 g aguacate · 1 fruta · café con leche desnatada o vegetal.",
      lunch:    "180 g de boniato (peso en crudo) · 150 g pechuga de pollo · 150 g verduras (berenjena, calabacín, champiñones, tomate…) · 5 g AOVE + especias. Té verde.",
      snack:    "Yogur de proteínas natural + 1 fruta + 15 g de frutos secos (almendras, avellanas o nueces).",
      dinner:   "150 g patata cocida (peso en crudo) · 150 g verdura y hortalizas · 130 g salmón · 5 g AOVE. Yogur desnatado natural o kéfir con canela + 50 g arándanos.",
    },
    "gt-80": {
      breakfast: "70 g pan integral · 80 g queso cottage o fiambre de pavo 99% · 40 g aguacate · 1 fruta + 10 g frutos secos · café con leche desnatada o vegetal.",
      lunch:    "200 g de boniato (peso en crudo) · 160 g pechuga de pollo · 150 g verduras (berenjena, calabacín, champiñones, tomate…) · 5 g AOVE + especias. Té verde.",
      snack:    "120 g queso fresco batido 0% + 1 fruta + 10 g de frutos secos (almendras, avellanas o nueces).",
      dinner:   "150 g patata cocida (peso en crudo) · 150 g verdura y hortalizas · 130 g salmón · 5 g AOVE + especias. Yogur desnatado natural o kéfir con canela + 50 g arándanos.",
    },
  },
};

// ───────── Planes de entrenamiento exactos ─────────
export const WORKOUT_PLANS: Record<"gym" | "home", Record<"adult" | "plus60", WorkoutDay>> = {
  gym: {
    adult: {
      title: "Entrenamiento en el gimnasio — 1 día",
      duration: "60 min aprox.",
      exercises: [
        { name: "Calentamiento", sets: "—", reps: "5 min cardio cíclico (elíptica, cinta o bici) + 2-5 min movilidad articular" },
        { name: "Prensa de piernas sentada", sets: "4", reps: "10-15 reps" },
        { name: "Femoral tumbado en máquina", sets: "4", reps: "10-15 reps" },
        { name: "Jalón al pecho con barra (agarre supino)", sets: "4", reps: "10-15 reps" },
        { name: "Press de hombro en máquina", sets: "4", reps: "10-12 reps" },
        { name: "Superserie · Sentadilla sumo con mancuerna + Curl bíceps con mancuernas", sets: "3", reps: "12-15 reps cada uno", note: "alternas un ejercicio y otro; descanso 60-90 s solo al terminar la superserie completa." },
        { name: "Plancha abdominal (con o sin apoyo de rodillas según nivel)", sets: "2", reps: "10-30 segundos" },
        { name: "Estiramientos finales", sets: "—", reps: "5 min, 8-10 s por estiramiento" },
      ],
      notes: [
        "Antes del primer ejercicio realiza 1-2 series de aproximación al peso de trabajo.",
        "Movimientos controlados y congestionando. Intensidad percibida 8/10.",
        "Ajusta siempre las máquinas a tus medidas antes de empezar.",
      ],
    },
    plus60: {
      title: "Entrenamiento en el gimnasio — 1 día (+60 años)",
      duration: "45-55 min",
      exercises: [
        { name: "Calentamiento", sets: "—", reps: "5 min cardio cíclico (elíptica, cinta o bici) + 2-5 min movilidad articular" },
        { name: "Prensa de piernas sentada", sets: "3", reps: "10-12 reps" },
        { name: "Remo en máquina asistida", sets: "3", reps: "10-12 reps" },
        { name: "Femoral sentado en máquina", sets: "3", reps: "10-12 reps" },
        { name: "Press de hombro en máquina", sets: "3", reps: "10-12 reps" },
        { name: "Superserie · Sentadilla sumo con mancuerna + Curl bíceps con mancuernas", sets: "2", reps: "10-12 reps cada uno", note: "alternas un ejercicio y otro; descanso 60-90 s solo al terminar la superserie completa." },
        { name: "Plancha abdominal con apoyo de rodillas", sets: "2", reps: "10-20 segundos" },
        { name: "Estiramientos finales", sets: "—", reps: "5 min, 8-10 s por estiramiento" },
      ],
      notes: [
        "Antes del primer ejercicio realiza 1-2 series de aproximación al peso de trabajo.",
        "Movimientos controlados. Intensidad percibida 7/10.",
        "Técnica antes que peso. Si algo te molesta una articulación, reduce rango.",
      ],
    },
  },
  home: {
    adult: {
      title: "Entrenamiento en casa — 1 día",
      duration: "40-50 min",
      exercises: [
        { name: "Calentamiento", sets: "—", reps: "5-7 min · Marcha con movimiento de brazos (1 min) + círculos de brazos adelante y atrás (1 min)" },
        { name: "Sentadilla con toque de rodilla alterno", sets: "3-5", reps: "12-15 reps" },
        { name: "Aperturas laterales combinadas con frontales (mancuernas)", sets: "3-5", reps: "12-15 reps" },
        { name: "Lunge alterno con bíceps (mancuernas)", sets: "3-5", reps: "12-15 reps" },
        { name: "Remo con mancuernas", sets: "3-5", reps: "12-15 reps", note: "tronco ligeramente inclinado, espalda recta, codos cerca del cuerpo." },
        { name: "Puente de glúteo con abducción (banda elástica)", sets: "3-5", reps: "12-15 reps" },
        { name: "Patada de tríceps con mancuerna", sets: "3-5", reps: "12-15 reps" },
        { name: "Cardio final · Jumping jacks + Skipping con toque a talones", sets: "2", reps: "30-60 s por ejercicio, en circuito alterno" },
      ],
      notes: [
        "Formato circuito: ejercicios seguidos. Descanso 30-60 s entre ejercicios y 1-1,5 min entre rondas.",
        "Realiza de 3 a 5 rondas según tu nivel.",
      ],
    },
    plus60: {
      title: "Entrenamiento en casa — 1 día (+60 años)",
      duration: "35-45 min",
      exercises: [
        { name: "Calentamiento", sets: "—", reps: "5-7 min · Marcha con movimiento de brazos (1 min) + círculos de brazos adelante y atrás (1 min)" },
        { name: "Sentadilla", sets: "2-4", reps: "10-12 reps", note: "pies al ancho de las caderas, espalda recta y pecho abierto." },
        { name: "Remo con mancuernas", sets: "2-4", reps: "10-12 reps", note: "tronco ligeramente inclinado, una o dos mancuernas, codo cerca del cuerpo." },
        { name: "Zancada alterna en el lugar", sets: "2-4", reps: "10-12 reps" },
        { name: "Bíceps alterno con mancuernas", sets: "2-4", reps: "10-12 reps" },
        { name: "Puente de glúteo", sets: "2-4", reps: "10-12 reps", note: "tumbada boca arriba, rodillas flexionadas, eleva cadera apretando glúteos." },
        { name: "Patada de tríceps con mancuerna", sets: "2-4", reps: "10-12 reps" },
        { name: "Movilidad final · gato-vaca apoyada + apertura de pecho y hombros + movilidad de cadera con apoyo", sets: "—", reps: "8-10 reps de cada movimiento" },
      ],
      notes: [
        "Formato circuito: ejercicios seguidos. Descanso 60-90 s entre ejercicios y 1,5-2 min entre rondas.",
        "Realiza de 2 a 4 rondas según tu nivel.",
      ],
    },
  },
};

// kept for compatibility (not used by meal builder anymore)
export type Portion = {
  proteinPalm: string;
  carbFist: string;
  fatThumb: string;
  extraSnack: boolean;
};
export const PORTIONS_BY_WEIGHT: Record<string, Portion> = {
  "lt-60":  { proteinPalm: "1 palma",       carbFist: "1 puñado pequeño", fatThumb: "1 cucharada",    extraSnack: false },
  "60-70":  { proteinPalm: "1 palma",       carbFist: "1 puñado",         fatThumb: "1 cucharada",    extraSnack: true  },
  "70-80":  { proteinPalm: "1-1,5 palmas",  carbFist: "1,5 puñados",      fatThumb: "1,5 cucharadas", extraSnack: true  },
  "gt-80":  { proteinPalm: "1,5 palmas",    carbFist: "1,5 puñados",      fatThumb: "1,5 cucharadas", extraSnack: true  },
};
