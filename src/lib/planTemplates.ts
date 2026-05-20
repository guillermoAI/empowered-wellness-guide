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

export const STRATEGY_TEXTS: Record<string, string> = {
  "perder|1-5":  "Déficit calórico suave y sostenible. Tu cuerpo no necesita un cambio agresivo, sino consistencia durante 6-10 semanas.",
  "perder|5-10": "Déficit calórico moderado con énfasis en proteína. Plan estimado de 3-4 meses con ajustes cada 4 semanas.",
  "perder|10-15":"Déficit estructurado por fases. Empezaremos firmes para crear momentum y aliviaremos a medias. Estimado: 5-7 meses.",
  "perder|15+":  "Plan por bloques de 8 semanas. El cuerpo necesita pausas estratégicas para no estancarse ni perder masa muscular. Estimado: 9-12 meses.",
  "mantener|":   "Mantenimiento calórico con énfasis en composición corporal. Mismo peso en la báscula, distinto cuerpo en el espejo.",
  "ganar|1-5":   "Superávit calórico ligero. Foco en proteína y entrenamiento de fuerza. 8-12 semanas.",
  "ganar|5-10":  "Superávit moderado estructurado. 4-6 meses con revisiones mensuales.",
  "ganar|10-15": "Plan de masa por fases. Alternaremos bloques de ganancia con bloques de definición. 6-9 meses.",
  "ganar|15+":   "Plan a largo plazo con ciclos. Construir masa muscular de calidad en mujer 40+ requiere paciencia. 12+ meses.",
};

export const ACTIVITY_NOTES: Record<string, string | null> = {
  "sit-more-8": "Tu día es sedentario, así que vamos a integrar movimiento fuera del entrenamiento: caminar después de comer, levantarse cada hora.",
  "active":     "Tu día ya tiene mucho movimiento natural. Esto trabaja a tu favor.",
  "sit-less-8": null,
  "no-work":    null,
};

// Intro mensajes — combinación objetivo × obstáculo
export const INTRO_MESSAGES: Record<string, Record<string, string>> = {
  perder: {
    "no-time":       "Tu vida ya está llena. Lo que sigue no te pide más tiempo: te pide hacer lo correcto en el poco que tienes.",
    "dont-know-what":"Tienes el objetivo claro pero te falta el cómo. Aquí tienes el qué, el cuánto y el cuándo — sin contar gramos.",
    "snacking":      "El picoteo no es debilidad: es comida que no sacia. Lo arreglamos con proteína en cada plato y un entorno preparado.",
    "consistency":   "No te falta motivación, te falta un sistema sencillo de mantener. Tu plan está hecho para días buenos y días regulares.",
    "no-response":   "Sé que llevas tiempo intentándolo y sientes que tu cuerpo ya no responde como antes. Lo que vamos a hacer es distinto: fuerza, proteína suficiente y paciencia. Funciona.",
  },
  mantener: {
    "no-time":       "Mantener el peso sin obsesionarte con la comida pasa por simplificar. Menos decisiones, mejores resultados.",
    "dont-know-what":"Estás bien donde estás. Solo necesitas saber con claridad cómo seguir comiendo sin pensar en ello todo el día.",
    "snacking":      "Mantener no es restringir. Es construir comidas que sacien de verdad para que el picoteo deje de tener sentido.",
    "consistency":   "Tienes el peso donde quieres pero te falta el cómo mantenerlo sin obsesionarte. Tu plan está hecho para integrarse en tu vida real, no al revés.",
    "no-response":   "Si tu cuerpo dejó de cambiar con lo de siempre, es momento de cambiar el estímulo: fuerza, proteína y descanso. No más cardio.",
  },
  ganar: {
    "no-time":       "Ganar masa muscular en 40+ no requiere horas de gimnasio. Requiere intensidad bien dirigida y comer suficiente.",
    "dont-know-what":"Querer ganar masa muscular pasa por comer suficiente y entrenar pesado. Te dejo todo claro: qué, cuánto y cuándo.",
    "snacking":      "Aquí el picoteo no es el problema: es energía extra. Lo canalizamos hacia comidas reales y snacks que aporten.",
    "consistency":   "La masa muscular se construye semana a semana. No hace falta perfección, hace falta presencia constante.",
    "no-response":   "Si te cuesta ganar masa, es muy probable que estés comiendo menos de lo que crees. Vamos a ajustar eso primero.",
  },
};

export const OBSTACLE_SECTIONS: Record<string, ObstacleSection> = {
  "no-time": {
    title: "Tu plan para hacer hueco",
    actions: [
      "Batch cooking dominical: cocina 2 proteínas y 2 carbohidratos para toda la semana en 90 minutos.",
      "Entrenamientos de 25 minutos efectivos en lugar de 60 ineficientes. Tu plan está construido para que cada minuto cuente.",
      "Comidas de una sola sartén (o bandeja al horno) tres días por semana.",
      "Lista de la compra fija que repites cada semana: menos decisiones, más ahorro de tiempo.",
    ],
  },
  "dont-know-what": {
    title: "Tu plato ideal, sin pesar nada",
    actions: [
      "Tu plato ideal: 1 palma de proteína + medio plato de verduras + 1 puño de carbohidrato + 1 cucharada de grasa.",
      "Aprende a calcular con tu mano: palma = proteína, puño = carbohidrato, pulgar = grasa.",
      "Sin contar calorías al principio. Primero estructura, luego ajuste fino.",
      "Lista de 15 platos que rotas: si dudas, eliges uno y ya.",
    ],
  },
  "snacking": {
    title: "Tu plan para el picoteo",
    actions: [
      "Proteína en cada comida: la mayor parte del picoteo viene de comidas pobres en proteína que no sacian.",
      "Snacks 'de emergencia' siempre a mano: yogur griego, fruta con frutos secos, queso fresco.",
      "Regla del agua: cuando aparece el impulso, bebe 1 vaso y espera 10 minutos. La mitad de las veces era sed.",
      "Identifica el momento exacto del día: ¿ansiedad real o aburrimiento? Una caminata corta rompe el patrón.",
    ],
  },
  "consistency": {
    title: "Tu plan para ser constante",
    actions: [
      "Regla del mínimo viable: 2 entrenamientos a la semana son infinitamente mejor que 0. Empieza por ahí.",
      "Hábito ancla: asocia el entrenamiento a algo que ya haces (después del café, antes de cenar).",
      "Tracking visual simple: marca con una cruz cada día que cumpliste. La racha visible motiva más que la báscula.",
      "Plan de 'días malos': no es todo o nada. Si fallas un día, sigues mañana sin culpa.",
    ],
  },
  "no-response": {
    title: "Tu plan cuando el cuerpo no responde",
    actions: [
      "A partir de los 40, lo que antes funcionaba deja de funcionar. La clave nueva: fuerza y proteína suficiente.",
      "Tu cuerpo no está roto: está pidiendo otro tipo de estímulo.",
      "Es probable que necesites comer más, no menos. Subir el metabolismo vía masa muscular antes de bajar calorías de nuevo.",
      "Paciencia con los tiempos: a esta edad los cambios son más lentos pero más sostenibles. Mide en meses, no en semanas.",
    ],
  },
};

// Lista de compra base
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
