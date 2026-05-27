import {
  BASE_SHOPPING, INTRO_MESSAGES, OBSTACLE_SECTIONS, STRATEGY_TEXTS, ACTIVITY_NOTES,
  MEAL_PLANS, WORKOUT_PLANS, type NutritionGroup,
  type ShoppingSection, type WorkoutDay, type MealDay, type ObstacleSection,
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
function buildWorkout(a: FormAnswers): WorkoutDay {
  const place: "gym" | "home" = a.training.endsWith("gym") ? "gym" : "home";
  const variant: "adult" | "plus60" = a.ageRange === "60-plus" ? "plus60" : "adult";
  const base = WORKOUT_PLANS[place][variant];
  return { ...base, exercises: [...base.exercises], notes: [...base.notes] };
}

// ───────── SHOPPING ─────────
function buildShopping(_a: FormAnswers): ShoppingSection[] {
  return BASE_SHOPPING.map((s) => ({ ...s, items: [...s.items], note: s.note }));
}

// ───────── MEALS ─────────
function goalToGroup(goal: Goal): NutritionGroup {
  if (goal === "tone") return "B";
  if (goal === "anti-inflammation") return "C";
  return "A"; // lose-1-10, lose-10-plus, fat-loss-muscle
}

function buildMeals(a: FormAnswers): MealDay {
  const group = goalToGroup(a.goal);
  const set = MEAL_PLANS[group][a.weightRange];

  const meals = [
    { name: "Desayuno", description: set.breakfast },
    { name: "Comida",   description: set.lunch },
    { name: "Merienda", description: set.snack },
    { name: "Cena",     description: set.dinner },
  ];

  const notes: string[] = [];
  if (group === "C") {
    notes.push("Evita esta semana: alcohol, ultraprocesados, azúcar añadido y exceso de gluten.");
    notes.push("Bebe 2 L de agua e incluye infusiones (jengibre, manzanilla, cúrcuma con pimienta).");
  }
  if (a.ageRange !== "35-50") {
    notes.push("Cena ligera, no más tarde de 2 h antes de dormir.");
  }
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
