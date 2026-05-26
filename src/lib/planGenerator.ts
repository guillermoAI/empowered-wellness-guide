import {
  BASE_SHOPPING, INTRO_MESSAGES, OBSTACLE_SECTIONS, STRATEGY_TEXTS, ACTIVITY_NOTES, PORTIONS_BY_WEIGHT,
  type ShoppingSection, type WorkoutDay, type MealDay, type ObstacleSection, type Exercise,
} from "./planTemplates";

export type Goal = "lose-1-10" | "lose-10-plus" | "tone" | "fat-loss-muscle" | "anti-inflammation";
export type WeightRange = "lt-60" | "60-70" | "70-80" | "gt-80";
export type AgeRange = "35-50" | "50-60" | "60-plus";
export type Activity = "low" | "active" | "very-active";
export type Training = "2-3-home" | "2-3-gym" | "3-4-home" | "3-4-gym";
export type Obstacle = "no-time" | "dont-know-what" | "snacking" | "consistency" | "no-response" | "no-start";

export type FormAnswers = {
  name: string;
  email: string;
  phone: string;
  goal: Goal;
  weightRange: WeightRange;
  ageRange: AgeRange;
  dailyActivity: Activity;
  training: Training;
  obstacle: Obstacle;
};

export type Plan = {
  personalIntro: { greeting: string; message: string };
  strategyNote: { main: string; activityNote: string | null };
  shoppingList: ShoppingSection[];
  workout: WorkoutDay;
  meals: MealDay;
  obstacleSection: ObstacleSection;
};

function buildIntro(a: FormAnswers) {
  const msg = INTRO_MESSAGES[a.goal]?.[a.obstacle] ?? "Aquí tienes tu plan, hecho a tu medida.";
  return { greeting: `${a.name}, aquí tienes tu plan.`, message: msg };
}

function buildStrategy(a: FormAnswers) {
  const key = `${a.goal}|${a.weightRange}`;
  return {
    main: STRATEGY_TEXTS[key] ?? "Plan personalizado a tu situación actual.",
    activityNote: ACTIVITY_NOTES[a.dailyActivity],
  };
}

// ───────── WORKOUT ─────────
// 4 training plans × home/gym × +60 adaptation
function buildWorkout(a: FormAnswers): WorkoutDay {
  const isGym = a.training.endsWith("gym");
  const isHighFreq = a.training.startsWith("3-4");
  const isPlus60 = a.ageRange === "60-plus";
  const hasJoints = false;
  const hasMeno = a.ageRange !== "35-50";

  // Map goal → training plan
  let planType: "loss" | "tone" | "recomp" | "anti-inflam";
  if (a.goal === "lose-1-10" || a.goal === "lose-10-plus") planType = "loss";
  else if (a.goal === "tone") planType = "tone";
  else if (a.goal === "fat-loss-muscle") planType = "recomp";
  else planType = "anti-inflam";

  let exercises: Exercise[] = [];
  let title = "";
  const duration = isPlus60 ? "35-45 min" : "45-60 min";

  // Common warm-up
  const warmup: Exercise = { name: "Movilidad inicial", sets: "—", reps: "5-7 min", note: "rotaciones de cadera, gato-vaca, hombros" };

  if (planType === "loss") {
    title = isGym ? "Pérdida de peso — gimnasio" : "Pérdida de peso — casa";
    if (isGym) {
      exercises = [warmup,
        { name: isPlus60 ? "Sentadilla en máquina Smith con apoyo" : "Sentadilla goblet con mancuerna pesada", sets: isHighFreq ? "4" : "3", reps: "10-12 reps" },
        { name: "Hip thrust en máquina o con barra", sets: isHighFreq ? "4" : "3", reps: "12 reps" },
        { name: isPlus60 ? "Press de pecho en máquina sentada" : "Press inclinado con mancuernas", sets: "3", reps: "10 reps" },
        { name: "Remo en máquina (agarre neutro)", sets: "3", reps: "12 reps" },
        { name: "Plancha frontal", sets: "3", reps: isPlus60 ? "20 segundos" : "30-45 segundos" },
        { name: "Cardio Zone 2 (cinta inclinada o elíptica)", sets: "—", reps: isPlus60 ? "15 min" : "20-25 min" },
      ];
    } else {
      exercises = [warmup,
        { name: isPlus60 ? "Sentadilla en silla (sentarse y levantarse con control)" : "Sentadilla goblet con mancuerna o garrafa 5L", sets: isHighFreq ? "4" : "3", reps: "12-15 reps" },
        { name: "Hip thrust en suelo con peso en cadera", sets: isHighFreq ? "4" : "3", reps: "15 reps" },
        { name: isPlus60 ? "Flexiones en pared" : "Flexiones en banco o pared (según nivel)", sets: "3", reps: "8-12 reps" },
        { name: "Remo a una mano con mancuerna o garrafa", sets: "3", reps: "10 por lado" },
        { name: "Plancha frontal", sets: "3", reps: isPlus60 ? "20 segundos" : "30 segundos" },
        { name: "Caminata final a buen ritmo", sets: "—", reps: isPlus60 ? "15 min" : "25-30 min" },
      ];
    }
  } else if (planType === "tone") {
    title = isGym ? "Tonificación — gimnasio" : "Tonificación — casa";
    if (isGym) {
      exercises = [warmup,
        { name: isPlus60 ? "Prensa de pierna inclinada" : "Sentadilla con barra (o goblet pesada)", sets: "4", reps: "10 reps" },
        { name: "Hip thrust con barra", sets: "4", reps: "10-12 reps" },
        { name: "Peso muerto rumano con mancuernas", sets: "3", reps: "10 reps", note: isPlus60 ? "rango parcial, sin bajar tanto" : undefined },
        { name: "Press hombro en máquina sentada", sets: "3", reps: "10 reps" },
        { name: "Jalón al pecho", sets: "3", reps: "12 reps" },
        { name: "Abductor + plancha lateral", sets: "3", reps: "15 + 20s por lado" },
      ];
    } else {
      exercises = [warmup,
        { name: isPlus60 ? "Sentadilla en silla con mancuernas" : "Sentadilla búlgara con mancuernas", sets: "3", reps: "10 por pierna" },
        { name: "Hip thrust en suelo a una pierna", sets: "3", reps: "12 por pierna" },
        { name: "Peso muerto rumano con mancuernas o garrafas", sets: "3", reps: "12 reps" },
        { name: isPlus60 ? "Press hombro sentada con mancuernas ligeras" : "Press hombro de pie con mancuernas", sets: "3", reps: "10 reps" },
        { name: "Remo invertido en mesa o TRX", sets: "3", reps: "10 reps" },
        { name: "Abducción de pierna en suelo + plancha lateral", sets: "3", reps: "15 + 20s por lado" },
      ];
    }
  } else if (planType === "recomp") {
    title = isGym ? "Pérdida grasa + masa muscular — gimnasio" : "Pérdida grasa + masa muscular — casa";
    if (isGym) {
      exercises = [warmup,
        { name: isPlus60 ? "Sentadilla goblet pesada con apoyo" : "Sentadilla con barra (peso medio-alto)", sets: isHighFreq ? "5" : "4", reps: "8-10 reps" },
        { name: "Hip thrust con barra (pesado)", sets: isHighFreq ? "5" : "4", reps: "8-10 reps" },
        { name: isPlus60 ? "Press inclinado con mancuernas ligeras" : "Press inclinado con mancuernas", sets: "4", reps: "8-10 reps" },
        { name: "Remo en máquina con apoyo", sets: "4", reps: "10 reps" },
        { name: "Elevaciones laterales", sets: "3", reps: "12 reps" },
        { name: "Core: plancha + dead bug", sets: "3", reps: isPlus60 ? "20s + 6 lado" : "40s + 8 lado" },
        { name: "Cardio LISS final", sets: "—", reps: "10-15 min" },
      ];
    } else {
      exercises = [warmup,
        { name: isPlus60 ? "Sentadilla goblet con mancuerna" : "Sentadilla goblet pesada (mancuerna o garrafa 8-10L)", sets: isHighFreq ? "5" : "4", reps: "10 reps" },
        { name: "Hip thrust en suelo con peso máximo en cadera", sets: isHighFreq ? "5" : "4", reps: "12 reps" },
        { name: isPlus60 ? "Flexiones en pared/banco" : "Flexiones en banco progresando a suelo", sets: "4", reps: "8-12 reps" },
        { name: "Remo a una mano (mancuerna o garrafa pesada)", sets: "4", reps: "10 por lado" },
        { name: "Elevaciones laterales con mancuernas o botellas", sets: "3", reps: "12 reps" },
        { name: "Plancha + dead bug", sets: "3", reps: isPlus60 ? "20s + 6 lado" : "40s + 8 lado" },
      ];
    }
  } else {
    // anti-inflammation: lower impact, mobility-heavy, more cardio Z2
    title = isGym ? "Antiinflamatorio — gimnasio" : "Antiinflamatorio — casa";
    if (isGym) {
      exercises = [warmup,
        { name: "Cardio Zone 2 inicial (caminar inclinada)", sets: "—", reps: isPlus60 ? "15 min" : "20 min" },
        { name: isPlus60 ? "Prensa de pierna ligera" : "Sentadilla goblet a banco", sets: "3", reps: "12 reps" },
        { name: "Hip thrust en máquina", sets: "3", reps: "12-15 reps" },
        { name: "Remo sentada en máquina", sets: "3", reps: "12 reps" },
        { name: "Press de pecho en máquina", sets: "3", reps: "12 reps" },
        { name: "Movilidad de cadera + columna", sets: "—", reps: "10 min" },
      ];
    } else {
      exercises = [warmup,
        { name: "Caminata enérgica inicial (sin parar)", sets: "—", reps: isPlus60 ? "15 min" : "20 min" },
        { name: "Sentadilla a silla con control", sets: "3", reps: "12 reps" },
        { name: "Hip thrust en suelo con peso ligero", sets: "3", reps: "15 reps" },
        { name: "Remo a una mano con mancuerna", sets: "3", reps: "10 por lado" },
        { name: "Flexiones en pared o banco", sets: "3", reps: "10 reps" },
        { name: "Movilidad de cadera + estiramientos diafragma", sets: "—", reps: "10 min" },
      ];
    }
  }

  const notes: string[] = [];
  if (isPlus60) {
    notes.push("Adaptación +60: rangos más cortos, técnica antes que peso, y 2 días completos de descanso a la semana.");
    notes.push("Si un movimiento te molesta una articulación, reduce rango o cámbialo por una variante sentada.");
  }
  if (hasMeno) {
    notes.push("Descansos de 90-120 segundos en los movimientos principales.");
    notes.push("El entrenamiento de fuerza es tu mejor herramienta hormonal ahora mismo.");
  }
  if (hasJoints && !isPlus60) {
    notes.push("Sin saltos. Reduce el rango si algún movimiento te molesta.");
    notes.push("Añade 5 minutos extra de movilidad al final.");
  }
  if (planType === "anti-inflam") {
    notes.push("Foco en Zone 2 (puedes mantener una conversación). Nada de cardio de alta intensidad esta semana.");
  }

  return { title, duration, exercises, notes };
}

// ───────── SHOPPING ─────────
function buildShopping(a: FormAnswers): ShoppingSection[] {
  const list: ShoppingSection[] = BASE_SHOPPING.map((s) => ({ ...s, items: [...s.items], note: s.note }));

  if (a.goal === "lose-1-10" || a.goal === "lose-10-plus") {
    list[0].note = "Raciones generosas en cada comida.";
    list[4].note = "Raciones moderadas, principalmente en torno al entrenamiento.";
  } else if (a.goal === "tone") {
    list[0].note = "Proteína alta y constante: clave para tonificar.";
    list[4].note = "Carbohidratos moderados, prioriza alrededor del entrenamiento.";
  } else if (a.goal === "fat-loss-muscle") {
    list[0].note = "Proteína muy alta: 1,6-2g por kg de peso.";
    list[4].items.push({ name: "Arroz blanco (post-entreno)" });
    list[4].note = "Carbohidratos prioritarios en comida y cena los días que entrenas.";
  } else if (a.goal === "anti-inflammation") {
    list[0].note = "Pescado azul 3-4 veces por semana por su omega-3.";
    list[2].note = "Frutos rojos diarios. Evita zumos y mermeladas.";
    list[5].items.push({ name: "Jengibre fresco" }, { name: "Cúrcuma fresca o en polvo" });
    list[5].note = "Especias antiinflamatorias diarias: cúrcuma + pimienta, jengibre, canela.";
    // remove pan
    list[4].items = list[4].items.filter((i) => !/pan/i.test(i.name));
  }

  return list;
}

// ───────── MEALS ─────────
function buildMeals(a: FormAnswers): MealDay {
  const p = PORTIONS_BY_WEIGHT[a.weightRange];
  const hasMetabolic = false;
  const hasMeno = a.ageRange !== "35-50";
  const hasJoints = false;
  const isAntiInflam = a.goal === "anti-inflammation";
  const isRecomp = a.goal === "fat-loss-muscle";
  const isTone = a.goal === "tone";

  // Breakfast varies by goal + metabolic
  let breakfast: string;
  if (isAntiInflam) {
    breakfast = "Bol de yogur griego natural + frutos rojos (1 puñado generoso) + 1 cda de semillas de lino molidas + 1 cdta de cúrcuma con pimienta.";
  } else if (hasMetabolic) {
    breakfast = `2-3 huevos + medio aguacate + tomate cherry + 1 rebanada pequeña de pan integral. Empieza con proteína y grasa antes que carbohidrato puro.`;
  } else if (isRecomp || isTone) {
    breakfast = `Tortilla de 3 huevos + tomate + 1 rebanada pan integral con aguacate + café con leche. Proteína alta desde la mañana.`;
  } else {
    breakfast = `Yogur griego (1 tazón) + frutos rojos + ${p.fatThumb.includes("1,5") ? "puñado de" : "puñado pequeño de"} nueces + 1 cdta de semillas de chía.`;
  }

  // Mid-morning (optional)
  const midMorning = p.extraSnack
    ? (isRecomp ? "1 pieza de fruta + 20g de almendras + 1 yogur griego pequeño." : "1 pieza de fruta + 5-6 almendras.")
    : null;

  // Lunch
  const proteinSrc = hasJoints || isAntiInflam ? "salmón o sardinas a la plancha" : "pollo, pescado o tofu a la plancha";
  const carbLine = isAntiInflam
    ? `medio boniato o ${p.carbFist} de quinoa`
    : `${p.carbFist} de arroz integral o medio boniato`;
  const lunch = `${p.proteinPalm} de proteína (${proteinSrc}) + medio plato de verduras de hoja verde + ${carbLine} + ${p.fatThumb} de AOVE.`;

  // Snack
  const snack = isRecomp
    ? "2 tortitas de arroz + crema de cacahuete 100% + 1 plátano."
    : isAntiInflam
    ? "Tres palitos de apio con hummus + infusión de jengibre."
    : `Hummus (3 cdas) + bastones de zanahoria y pepino + 1 tortita de arroz integral.`;

  // Dinner
  const dinnerCarb = isRecomp ? " + 1 patata pequeña al horno" : "";
  const dinnerExtra = hasMeno ? " Cena ligera, no más tarde de 2h antes de dormir." : "";
  const dinner = `${p.proteinPalm} de proteína (pescado preferiblemente) + plato lleno de verduras al horno o salteadas${dinnerCarb} + ${p.fatThumb} de AOVE.${dinnerExtra}`;

  const meals = [
    { name: "Desayuno", description: breakfast },
    ...(midMorning ? [{ name: "Media mañana (opcional)", description: midMorning }] : []),
    { name: "Comida", description: lunch },
    { name: "Merienda", description: snack },
    { name: "Cena", description: dinner },
  ];

  const notes: string[] = [];
  if (hasMeno) notes.push("Añade 1 cda de semillas de lino molidas al desayuno o merienda.");
  if (hasJoints) notes.push("La cúrcuma con pimienta negra en las cocciones ayuda con la inflamación articular.");
  if (hasMetabolic) notes.push("Acompaña siempre la fruta o el carbohidrato con proteína y grasa para amortiguar la glucemia.");
  if (isAntiInflam) {
    notes.push("Evita esta semana: alcohol, ultraprocesados, azúcar añadido, lácteos enteros y exceso de gluten.");
    notes.push("Bebe 2L de agua + 2 infusiones (jengibre, manzanilla, cúrcuma).");
  }
  if (isRecomp) notes.push("Apunta proteína total del día: objetivo ~1,6g por kg de peso.");

  return { meals, notes };
}

export function generatePlan(answers: FormAnswers): Plan {
  return {
    personalIntro: buildIntro(answers),
    strategyNote: buildStrategy(answers),
    shoppingList: buildShopping(answers),
    workout: buildWorkout(answers),
    meals: buildMeals(answers),
    obstacleSection: OBSTACLE_SECTIONS[answers.obstacle],
  };
}
