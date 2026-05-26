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
  // PLAN 1 — Pérdida de peso (1 a 10 kg)
  "lose-1-10|lt-60":  "Déficit calórico suave. Tu cuerpo no necesita un cambio agresivo, solo constancia. Estimado: 6-10 semanas.",
  "lose-1-10|60-70":  "Déficit moderado con foco en proteína para preservar masa muscular. Estimado: 8-12 semanas.",
  "lose-1-10|70-80":  "Déficit estructurado con énfasis en saciedad y fuerza. Estimado: 10-14 semanas.",
  "lose-1-10|gt-80":  "Déficit firme y sostenible, sin restringir grupos enteros de alimentos. Estimado: 12-16 semanas.",

  // PLAN 2 — Pérdida de peso (10-15 kg y más)
  "lose-10-plus|lt-60": "Plan por bloques de 8 semanas con pausas estratégicas. Estimado: 5-7 meses.",
  "lose-10-plus|60-70": "Déficit por fases con revisiones mensuales. Estimado: 6-9 meses.",
  "lose-10-plus|70-80": "Plan estructurado en bloques alternando déficit y mantenimiento. Estimado: 8-12 meses.",
  "lose-10-plus|gt-80": "Plan a largo plazo por ciclos. La paciencia es tu mayor aliada. Estimado: 12+ meses.",

  // PLAN 3 — Tonificar
  "tone|lt-60":  "Mantenimiento calórico con energía suficiente para entrenar fuerza. Misma báscula, distinto cuerpo en 12 semanas.",
  "tone|60-70":  "Mantenimiento con ligera recomposición. Foco en proteína alta y entrenamiento progresivo.",
  "tone|70-80":  "Recomposición corporal: mantener peso bajando ligeramente la grasa y subiendo masa muscular.",
  "tone|gt-80":  "Recomposición + ligero déficit. Verás el cambio antes en el espejo que en la báscula.",

  // PLAN 4 — Pérdida de grasa + ganar masa muscular
  "fat-loss-muscle|lt-60": "Superávit calórico ligero con foco en fuerza. La grasa baja por composición, no por déficit. 4-6 meses.",
  "fat-loss-muscle|60-70": "Recomposición clásica: mantenimiento ajustado, proteína alta, fuerza progresiva. 5-7 meses.",
  "fat-loss-muscle|70-80": "Déficit muy ligero + entrenamiento de fuerza prioritario. 6-9 meses.",
  "fat-loss-muscle|gt-80": "Déficit estructurado preservando masa muscular con fuerza pesada. 8-12 meses.",

  // PLAN 5 — Reducir inflamación abdominal
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

// ───────── Intro mensajes: 5 goals × 5 obstacles ─────────
export const INTRO_MESSAGES: Record<string, Record<string, string>> = {
  "lose-1-10": {
    "no-time":        "Tu vida ya está llena. Lo que sigue no te pide más tiempo: te pide hacer lo correcto en el poco que tienes.",
    "dont-know-what": "Tienes el objetivo claro pero te falta el cómo. Aquí está el qué, el cuánto y el cuándo — sin contar gramos.",
    "snacking":       "El picoteo no es debilidad: es comida que no sacia. Lo arreglamos con proteína en cada plato.",
    "consistency":    "No te falta motivación, te falta un sistema sencillo. Tu plan está hecho para días buenos y días regulares.",
    "no-response":    "Tu cuerpo no está roto: pide otro estímulo. Fuerza, proteína suficiente y paciencia.",
  },
  "lose-10-plus": {
    "no-time":        "Perder peso real con poco tiempo se basa en estructura, no en horas. Aquí tienes la estructura.",
    "dont-know-what": "Cuando hay mucho que cambiar, lo último que necesitas es complicarlo. Aquí está claro.",
    "snacking":       "Con este objetivo, controlar el picoteo es prioridad. Vamos a crear entornos y comidas que sacien de verdad.",
    "consistency":    "Este plan se diseña por bloques: tu trabajo es solo seguir esta semana. Una a la vez.",
    "no-response":    "Lo que antes te funcionó ya no lo hace. Cambiamos la estrategia: fuerza, proteína y paciencia con el proceso.",
  },
  "tone": {
    "no-time":        "Tonificar no necesita horas de gimnasio. Necesita intensidad bien dirigida 2-3 veces por semana.",
    "dont-know-what": "Tonificar es comer suficiente y entrenar fuerza con cabeza. Te dejo el cómo, ya.",
    "snacking":       "Si tu peso está bien, el picoteo es energía mal canalizada. Lo redirigimos a comidas reales.",
    "consistency":    "El músculo se construye semana a semana. No necesitas perfección, necesitas presencia.",
    "no-response":    "Si tu cuerpo dejó de cambiar, es momento de cambiar el estímulo: fuerza pesada, descanso real.",
  },
  "fat-loss-muscle": {
    "no-time":        "Recomponer cuerpo no es cuestión de horas, es de prioridad: fuerza pesada y comer suficiente proteína.",
    "dont-know-what": "Recomposición tiene reglas claras: comer alrededor del mantenimiento, proteína alta, entrenar fuerte.",
    "snacking":       "Aquí el picoteo no es enemigo si va con proteína. Lo redirigimos a aliado.",
    "consistency":    "La recomposición es el camino lento pero permanente. Cada semana cuenta.",
    "no-response":    "Si nada cambia, probablemente comes menos de lo que crees y entrenas con menos intensidad de la necesaria.",
  },
  "anti-inflammation": {
    "no-time":        "Reducir la inflamación pasa por simplificar lo que comes, no por añadir suplementos. Es más fácil de lo que parece.",
    "dont-know-what": "Hay 5 cosas que inflaman y 5 que desinflaman. Aquí tienes ambas listas claras.",
    "snacking":       "El picoteo de ultraprocesados es la causa más común de inflamación crónica. Vamos a reordenarlo.",
    "consistency":    "Notarás los cambios en 2 semanas si eres constante. Eso suele ser el motor que necesitas.",
    "no-response":    "La inflamación crónica es la causa silenciosa de que tu cuerpo no responda. Atacamos la raíz.",
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
};

// ───────── Lista de la compra base ─────────
export const BASE_SHOPPING: ShoppingSection[] = [
  {
    category: "Proteínas",
    items: [
      { name: "Pechuga de pollo o pavo" },
      { name: "Huevos camperos" },
      { name: "Pescado blanco (merluza, lubina, dorada)" },
      { name: "Pescado azul (salmón, sardinas, caballa)" },
      { name: "Yogur griego natural" },
      { name: "Queso fresco o cottage" },
      { name: "Legumbres (lentejas, garbanzos)" },
      { name: "Tofu firme" },
    ],
  },
  {
    category: "Verduras",
    items: [
      { name: "Espinacas y hojas verdes" },
      { name: "Brócoli o coliflor" },
      { name: "Calabacín y berenjena" },
      { name: "Pimientos" },
      { name: "Tomates" },
      { name: "Pepino y rúcula" },
      { name: "Cebolla, ajo" },
      { name: "Espárragos o judía verde" },
    ],
  },
  {
    category: "Frutas",
    items: [
      { name: "Frutos rojos (arándanos, fresas, frambuesas)", note: "antiinflamatorios" },
      { name: "Manzana o pera" },
      { name: "Kiwi" },
      { name: "Plátano (entrenamiento)" },
      { name: "Naranja o mandarinas" },
    ],
  },
  {
    category: "Grasas saludables",
    items: [
      { name: "Aguacate" },
      { name: "Aceite de oliva virgen extra" },
      { name: "Frutos secos crudos (almendras, nueces)" },
      { name: "Semillas (chía, lino, calabaza)" },
      { name: "Aceitunas" },
    ],
  },
  {
    category: "Carbohidratos complejos",
    items: [
      { name: "Arroz integral o basmati" },
      { name: "Patata o boniato" },
      { name: "Avena en copos" },
      { name: "Pan integral 100% o masa madre" },
      { name: "Quinoa" },
    ],
  },
  {
    category: "Despensa",
    items: [
      { name: "Especias: cúrcuma, jengibre, comino, orégano, pimentón" },
      { name: "Vinagre de manzana" },
      { name: "Tahini o crema de cacahuete 100%" },
      { name: "Caldo de huesos o caldo vegetal" },
      { name: "Té verde o infusiones" },
    ],
  },
];

// ───────── Portion guides per weight range ─────────
export type Portion = {
  proteinPalm: string;       // ej. "1 palma"
  carbFist: string;          // ej. "1 puñado"
  fatThumb: string;          // ej. "1 cucharada"
  extraSnack: boolean;       // ¿añadir media mañana?
};
export const PORTIONS_BY_WEIGHT: Record<string, Portion> = {
  "lt-60":  { proteinPalm: "1 palma",       carbFist: "1 puñado pequeño", fatThumb: "1 cucharada",   extraSnack: false },
  "60-70":  { proteinPalm: "1 palma",       carbFist: "1 puñado",         fatThumb: "1 cucharada",   extraSnack: true  },
  "70-80":  { proteinPalm: "1-1,5 palmas",  carbFist: "1,5 puñados",      fatThumb: "1,5 cucharadas",extraSnack: true  },
  "gt-80":  { proteinPalm: "1,5 palmas",    carbFist: "1,5 puñados",      fatThumb: "1,5 cucharadas",extraSnack: true  },
};
