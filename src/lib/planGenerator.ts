import {
  BASE_SHOPPING, INTRO_MESSAGES, OBSTACLE_SECTIONS, STRATEGY_TEXTS, ACTIVITY_NOTES,
  type ShoppingSection, type WorkoutDay, type MealDay, type ObstacleSection, type Exercise,
} from "./planTemplates";

export type Goal = "perder" | "mantener" | "ganar";
export type KgRange = "1-5" | "5-10" | "10-15" | "15+";
export type Activity = "sit-less-8" | "sit-more-8" | "active" | "no-work";
export type Training = "2-3-home" | "2-3-gym" | "4-5-home" | "4-5-gym";
export type Condition = "menopause" | "joints" | "metabolic" | "none";
export type Obstacle = "no-time" | "dont-know-what" | "snacking" | "consistency" | "no-response";

export type FormAnswers = {
  name: string;
  email: string;
  phone: string;
  goal: Goal;
  kgRange?: KgRange;
  dailyActivity: Activity;
  training: Training;
  conditions: Condition[];
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
  const key = `${a.goal}|${a.goal === "mantener" ? "" : (a.kgRange ?? "")}`;
  return {
    main: STRATEGY_TEXTS[key] ?? STRATEGY_TEXTS["mantener|"],
    activityNote: ACTIVITY_NOTES[a.dailyActivity],
  };
}

function buildWorkout(a: FormAnswers): WorkoutDay {
  const isGym = a.training.endsWith("gym");
  const isHighFreq = a.training.startsWith("4-5");
  const hasJoints = a.conditions.includes("joints");
  const hasMeno = a.conditions.includes("menopause");

  let exercises: Exercise[];
  if (isGym) {
    exercises = [
      { name: "Movilidad inicial", sets: "—", reps: "5 min", note: "rotaciones de cadera, gato-vaca, círculos de hombros" },
      { name: hasJoints ? "Sentadilla en silla con mancuerna" : "Sentadilla con barra (o goblet pesada)", sets: isHighFreq ? "5" : "4", reps: hasMeno ? "8-10 reps" : "8-10 reps" },
      { name: "Hip thrust con barra o en máquina", sets: isHighFreq ? "5" : "4", reps: "10 reps" },
      { name: hasJoints ? "Press inclinado suave con mancuernas ligeras" : "Press inclinado con mancuernas", sets: "3", reps: "10 reps" },
      { name: "Remo en máquina o jalón al pecho", sets: "3", reps: "10 reps" },
      { name: "Plancha frontal + dead bug", sets: "3", reps: "30s + 8 por lado" },
      { name: "Cardio Zone 2 (cinta o elíptica suave)", sets: "—", reps: "15-20 min" },
    ];
  } else {
    exercises = [
      { name: "Movilidad inicial", sets: "—", reps: "5 min" },
      { name: hasJoints ? "Sentadilla en silla (sentarse y levantarse con control)" : "Sentadilla goblet con mancuerna o garrafa de 5L", sets: isHighFreq ? "4" : "3", reps: "12 reps" },
      { name: "Hip thrust en suelo con peso en cadera", sets: isHighFreq ? "4" : "3", reps: "15 reps" },
      { name: hasJoints ? "Flexiones en pared" : "Flexiones en banco o pared (según nivel)", sets: "3", reps: "8-12 reps" },
      { name: "Remo a una mano con mancuerna o garrafa", sets: "3", reps: "10 por lado" },
      { name: "Plancha frontal", sets: "3", reps: "30 segundos" },
      { name: "Caminata final", sets: "—", reps: "20 min" },
    ];
  }

  const notes: string[] = [];
  if (hasMeno) {
    notes.push("Descansos de 90-120 segundos en los movimientos principales.");
    notes.push("El entrenamiento de fuerza es tu mejor herramienta hormonal ahora mismo. No saltes los movimientos pesados.");
  }
  if (hasJoints) {
    notes.push("Sin saltos. Reduce el rango si algún movimiento te molesta.");
    notes.push("Añade 5 minutos extra de movilidad al final.");
  }
  if (a.conditions.includes("metabolic")) {
    notes.push("Caminata de 10-15 min después de las comidas principales (hábito diario, no parte del workout).");
    notes.push("Evita entrenar en ayunas si tu energía está baja: una fruta o un café con leche antes está bien.");
    notes.push("Intenta entrenar siempre en un horario similar.");
  }

  return {
    title: isGym ? "Full body — gimnasio" : "Full body — casa",
    duration: "45-60 min",
    exercises,
    notes,
  };
}

function buildShopping(a: FormAnswers): ShoppingSection[] {
  const list: ShoppingSection[] = BASE_SHOPPING.map((s) => ({ ...s, items: [...s.items] }));

  if (a.goal === "perder") {
    list[0].note = "Raciones generosas en cada comida.";
    list[4].note = "Raciones moderadas, principalmente en torno al entrenamiento.";
  } else if (a.goal === "ganar") {
    list[4].items.push({ name: "Pasta integral" }, { name: "Arroz blanco (post-entreno)" });
    list[4].note = "Raciones generosas. Sé constante con los carbohidratos.";
    list[3].note = "Aumenta ligeramente las grasas saludables: aguacate, frutos secos.";
  }

  if (a.conditions.includes("metabolic")) {
    list[2].note = "Consume las frutas preferentemente enteras, nunca en zumo.";
  }
  if (a.conditions.includes("menopause")) {
    list[0].note = (list[0].note ? list[0].note + " " : "") + "Las legumbres, lino y soja contienen fitoestrógenos suaves que pueden ayudar en esta etapa.";
  }
  if (a.conditions.includes("joints")) {
    list[0].note = (list[0].note ? list[0].note + " " : "") + "Pescado azul 3 veces por semana por sus omega-3 antiinflamatorios.";
  }
  return list;
}

function buildMeals(a: FormAnswers): MealDay {
  const isGain = a.goal === "ganar";
  const isMaintain = a.goal === "mantener";
  const hasMetabolic = a.conditions.includes("metabolic");
  const hasMeno = a.conditions.includes("menopause");
  const hasJoints = a.conditions.includes("joints");

  let breakfast = isGain
    ? "Avena cocida (1 tazón) + 1 plátano + 1 cucharada de crema de cacahuete + 1 cucharada de semillas + 1 huevo aparte."
    : "Yogur griego (1 tazón) + frutos rojos (1 puñado) + nueces (puñado pequeño) + 1 cucharadita de semillas de chía.";

  if (hasMetabolic) {
    breakfast = "2-3 huevos + medio aguacate + tomate cherry + 1 rebanada de pan integral. Empieza el día con proteína y grasa antes que con carbohidrato puro.";
  }

  const carbPortion = isGain ? "1,5 puñados" : isMaintain ? "1,5 puñados" : "1 puñado";
  const proteinPortion = isGain ? "1,5 palmas" : "1 palma";

  const lunch = `${proteinPortion} de proteína (pollo, pescado o tofu a la plancha) + medio plato de verduras + ${carbPortion} de arroz integral o medio boniato + 1 cucharada de AOVE${hasJoints ? ". Si puedes, que sea pescado azul." : "."}`;

  const snack = isGain
    ? "2 tortitas de arroz + crema de cacahuete + plátano."
    : "Hummus (3 cucharadas) + bastones de zanahoria y pepino + 1 tortita de arroz integral.";

  const dinner = `${proteinPortion} de proteína (pescado preferiblemente) + plato lleno de verduras al horno o salteadas${isGain ? " + 1 patata mediana al horno" : ""} + 1 cucharada de AOVE.${hasMeno ? " Cena ligera, no más tarde de 2h antes de dormir." : ""}`;

  const meals = [
    { name: "Desayuno", description: breakfast },
    { name: "Media mañana (opcional)", description: isGain ? "Yogur griego + frutos rojos + 1 puñado de nueces." : "1 pieza de fruta + 5-6 almendras." },
    { name: "Comida", description: lunch },
    { name: "Merienda", description: snack },
    { name: "Cena", description: dinner },
  ];

  const notes: string[] = [];
  if (hasMeno) notes.push("Añade 1 cucharada de semillas de lino molidas al desayuno o merienda.");
  if (hasJoints) notes.push("La cúrcuma con pimienta negra en las cocciones ayuda con la inflamación articular.");
  if (hasMetabolic) notes.push("Acompaña siempre la fruta o el carbohidrato con proteína y grasa para amortiguar la glucemia.");

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
