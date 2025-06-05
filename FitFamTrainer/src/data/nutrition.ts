import { MealPlan, Meal, Ingredient, FitnessGoal, FitnessLevel, Macros } from '../types';

export const ingredients: Ingredient[] = [
  // Proteins
  {
    id: 'ing_001',
    name: 'Chicken Breast',
    amount: 100,
    unit: 'g',
    calories: 165,
    macros: { protein: 31, carbs: 0, fat: 3.6 }
  },
  {
    id: 'ing_002',
    name: 'Salmon',
    amount: 100,
    unit: 'g',
    calories: 208,
    macros: { protein: 25, carbs: 0, fat: 12 }
  },
  {
    id: 'ing_003',
    name: 'Eggs',
    amount: 1,
    unit: 'large',
    calories: 70,
    macros: { protein: 6, carbs: 0.6, fat: 5 }
  },
  {
    id: 'ing_004',
    name: 'Greek Yogurt',
    amount: 100,
    unit: 'g',
    calories: 100,
    macros: { protein: 10, carbs: 6, fat: 5 }
  },
  // Carbohydrates
  {
    id: 'ing_005',
    name: 'Brown Rice',
    amount: 100,
    unit: 'g cooked',
    calories: 111,
    macros: { protein: 2.6, carbs: 23, fat: 0.9 }
  },
  {
    id: 'ing_006',
    name: 'Quinoa',
    amount: 100,
    unit: 'g cooked',
    calories: 120,
    macros: { protein: 4.4, carbs: 22, fat: 1.9 }
  },
  {
    id: 'ing_007',
    name: 'Sweet Potato',
    amount: 100,
    unit: 'g',
    calories: 86,
    macros: { protein: 1.6, carbs: 20, fat: 0.1 }
  },
  {
    id: 'ing_008',
    name: 'Oats',
    amount: 100,
    unit: 'g dry',
    calories: 389,
    macros: { protein: 16.9, carbs: 66, fat: 6.9 }
  },
  // Vegetables
  {
    id: 'ing_009',
    name: 'Broccoli',
    amount: 100,
    unit: 'g',
    calories: 34,
    macros: { protein: 2.8, carbs: 7, fat: 0.4 }
  },
  {
    id: 'ing_010',
    name: 'Spinach',
    amount: 100,
    unit: 'g',
    calories: 23,
    macros: { protein: 2.9, carbs: 3.6, fat: 0.4 }
  },
  {
    id: 'ing_011',
    name: 'Bell Peppers',
    amount: 100,
    unit: 'g',
    calories: 31,
    macros: { protein: 1, carbs: 7, fat: 0.3 }
  },
  // Fats
  {
    id: 'ing_012',
    name: 'Avocado',
    amount: 100,
    unit: 'g',
    calories: 160,
    macros: { protein: 2, carbs: 9, fat: 15 }
  },
  {
    id: 'ing_013',
    name: 'Almonds',
    amount: 30,
    unit: 'g',
    calories: 174,
    macros: { protein: 6, carbs: 6, fat: 15 }
  },
  {
    id: 'ing_014',
    name: 'Olive Oil',
    amount: 1,
    unit: 'tbsp',
    calories: 119,
    macros: { protein: 0, carbs: 0, fat: 13.5 }
  },
  // Fruits
  {
    id: 'ing_015',
    name: 'Banana',
    amount: 1,
    unit: 'medium',
    calories: 105,
    macros: { protein: 1.3, carbs: 27, fat: 0.4 }
  },
  {
    id: 'ing_016',
    name: 'Blueberries',
    amount: 100,
    unit: 'g',
    calories: 57,
    macros: { protein: 0.7, carbs: 14, fat: 0.3 }
  }
];

export const meals: Meal[] = [
  // Breakfast Meals
  {
    id: 'meal_001',
    name: 'Protein Power Breakfast',
    type: 'breakfast',
    calories: 420,
    macros: { protein: 35, carbs: 30, fat: 18 },
    ingredients: [
      ingredients.find(i => i.id === 'ing_003')!, // Eggs
      ingredients.find(i => i.id === 'ing_008')!, // Oats
      ingredients.find(i => i.id === 'ing_016')!, // Blueberries
      ingredients.find(i => i.id === 'ing_013')!, // Almonds
    ],
    instructions: [
      'Cook 2 eggs scrambled or boiled',
      'Prepare 40g oats with water or milk',
      'Top oats with blueberries and almonds',
      'Serve eggs alongside oats'
    ],
    prepTime: 5,
    cookTime: 10,
    servings: 1,
    imageUrl: 'https://example.com/meals/protein_breakfast.jpg'
  },
  {
    id: 'meal_002',
    name: 'Greek Yogurt Parfait',
    type: 'breakfast',
    calories: 280,
    macros: { protein: 20, carbs: 35, fat: 8 },
    ingredients: [
      ingredients.find(i => i.id === 'ing_004')!, // Greek Yogurt
      ingredients.find(i => i.id === 'ing_016')!, // Blueberries
      ingredients.find(i => i.id === 'ing_008')!, // Oats
    ],
    instructions: [
      'Layer Greek yogurt in a bowl',
      'Add fresh blueberries',
      'Sprinkle with granola or oats',
      'Repeat layers and enjoy'
    ],
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    imageUrl: 'https://example.com/meals/yogurt_parfait.jpg'
  },
  // Lunch Meals
  {
    id: 'meal_003',
    name: 'Grilled Chicken Bowl',
    type: 'lunch',
    calories: 450,
    macros: { protein: 40, carbs: 35, fat: 15 },
    ingredients: [
      ingredients.find(i => i.id === 'ing_001')!, // Chicken Breast
      ingredients.find(i => i.id === 'ing_005')!, // Brown Rice
      ingredients.find(i => i.id === 'ing_009')!, // Broccoli
      ingredients.find(i => i.id === 'ing_014')!, // Olive Oil
    ],
    instructions: [
      'Season and grill 150g chicken breast',
      'Cook 80g brown rice according to package instructions',
      'Steam broccoli until tender',
      'Drizzle with olive oil and serve'
    ],
    prepTime: 10,
    cookTime: 20,
    servings: 1,
    imageUrl: 'https://example.com/meals/chicken_bowl.jpg'
  },
  {
    id: 'meal_004',
    name: 'Quinoa Power Salad',
    type: 'lunch',
    calories: 380,
    macros: { protein: 18, carbs: 45, fat: 12 },
    ingredients: [
      ingredients.find(i => i.id === 'ing_006')!, // Quinoa
      ingredients.find(i => i.id === 'ing_010')!, // Spinach
      ingredients.find(i => i.id === 'ing_011')!, // Bell Peppers
      ingredients.find(i => i.id === 'ing_012')!, // Avocado
    ],
    instructions: [
      'Cook quinoa and let cool',
      'Mix with fresh spinach and diced bell peppers',
      'Add sliced avocado',
      'Dress with lemon and olive oil'
    ],
    prepTime: 15,
    cookTime: 15,
    servings: 1,
    imageUrl: 'https://example.com/meals/quinoa_salad.jpg'
  },
  // Dinner Meals
  {
    id: 'meal_005',
    name: 'Baked Salmon Dinner',
    type: 'dinner',
    calories: 520,
    macros: { protein: 35, carbs: 30, fat: 25 },
    ingredients: [
      ingredients.find(i => i.id === 'ing_002')!, // Salmon
      ingredients.find(i => i.id === 'ing_007')!, // Sweet Potato
      ingredients.find(i => i.id === 'ing_009')!, // Broccoli
      ingredients.find(i => i.id === 'ing_014')!, // Olive Oil
    ],
    instructions: [
      'Bake 150g salmon at 400°F for 15 minutes',
      'Roast sweet potato wedges with olive oil',
      'Steam broccoli until tender',
      'Season all with herbs and spices'
    ],
    prepTime: 10,
    cookTime: 25,
    servings: 1,
    imageUrl: 'https://example.com/meals/salmon_dinner.jpg'
  },
  // Snack Meals
  {
    id: 'meal_006',
    name: 'Protein Smoothie',
    type: 'snack',
    calories: 250,
    macros: { protein: 20, carbs: 25, fat: 8 },
    ingredients: [
      ingredients.find(i => i.id === 'ing_004')!, // Greek Yogurt
      ingredients.find(i => i.id === 'ing_015')!, // Banana
      ingredients.find(i => i.id === 'ing_016')!, // Blueberries
    ],
    instructions: [
      'Blend Greek yogurt with banana',
      'Add blueberries and blend until smooth',
      'Add ice if desired',
      'Serve immediately'
    ],
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    imageUrl: 'https://example.com/meals/protein_smoothie.jpg'
  },
  {
    id: 'meal_007',
    name: 'Almond Energy Balls',
    type: 'snack',
    calories: 180,
    macros: { protein: 8, carbs: 15, fat: 12 },
    ingredients: [
      ingredients.find(i => i.id === 'ing_013')!, // Almonds
      ingredients.find(i => i.id === 'ing_008')!, // Oats
    ],
    instructions: [
      'Blend almonds and oats in food processor',
      'Form into small balls',
      'Refrigerate for 30 minutes',
      'Store in fridge for up to a week'
    ],
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    imageUrl: 'https://example.com/meals/energy_balls.jpg'
  }
];

export const mealPlans: MealPlan[] = [
  // Weight Loss Meal Plans
  {
    id: 'plan_001',
    goal: 'weight_loss',
    level: 'beginner',
    dailyCalories: 1500,
    macros: { protein: 120, carbs: 150, fat: 50 },
    meals: [
      meals.find(m => m.id === 'meal_002')!, // Greek Yogurt Parfait
      meals.find(m => m.id === 'meal_004')!, // Quinoa Power Salad
      meals.find(m => m.id === 'meal_005')!, // Baked Salmon Dinner
      meals.find(m => m.id === 'meal_006')!, // Protein Smoothie
    ]
  },
  {
    id: 'plan_002',
    goal: 'weight_loss',
    level: 'intermediate',
    dailyCalories: 1400,
    macros: { protein: 130, carbs: 140, fat: 45 },
    meals: [
      meals.find(m => m.id === 'meal_002')!, // Greek Yogurt Parfait
      meals.find(m => m.id === 'meal_003')!, // Grilled Chicken Bowl
      meals.find(m => m.id === 'meal_005')!, // Baked Salmon Dinner
      meals.find(m => m.id === 'meal_007')!, // Almond Energy Balls
    ]
  },
  // Weight Gain Meal Plans
  {
    id: 'plan_003',
    goal: 'weight_gain',
    level: 'beginner',
    dailyCalories: 2500,
    macros: { protein: 150, carbs: 300, fat: 85 },
    meals: [
      meals.find(m => m.id === 'meal_001')!, // Protein Power Breakfast
      meals.find(m => m.id === 'meal_003')!, // Grilled Chicken Bowl
      meals.find(m => m.id === 'meal_005')!, // Baked Salmon Dinner
      meals.find(m => m.id === 'meal_006')!, // Protein Smoothie
      meals.find(m => m.id === 'meal_007')!, // Almond Energy Balls
    ]
  },
  // Bulking Meal Plans
  {
    id: 'plan_004',
    goal: 'bulking',
    level: 'advanced',
    dailyCalories: 3000,
    macros: { protein: 180, carbs: 375, fat: 100 },
    meals: [
      meals.find(m => m.id === 'meal_001')!, // Protein Power Breakfast
      meals.find(m => m.id === 'meal_003')!, // Grilled Chicken Bowl
      meals.find(m => m.id === 'meal_005')!, // Baked Salmon Dinner
      meals.find(m => m.id === 'meal_006')!, // Protein Smoothie
      meals.find(m => m.id === 'meal_007')!, // Almond Energy Balls
    ]
  },
  // Abs Cutting Meal Plans
  {
    id: 'plan_005',
    goal: 'abs_cutting',
    level: 'intermediate',
    dailyCalories: 1600,
    macros: { protein: 140, carbs: 120, fat: 60 },
    meals: [
      meals.find(m => m.id === 'meal_002')!, // Greek Yogurt Parfait
      meals.find(m => m.id === 'meal_004')!, // Quinoa Power Salad
      meals.find(m => m.id === 'meal_005')!, // Baked Salmon Dinner
      meals.find(m => m.id === 'meal_006')!, // Protein Smoothie
    ]
  },
  // Maintenance Meal Plans
  {
    id: 'plan_006',
    goal: 'maintenance',
    level: 'intermediate',
    dailyCalories: 2000,
    macros: { protein: 130, carbs: 250, fat: 70 },
    meals: [
      meals.find(m => m.id === 'meal_001')!, // Protein Power Breakfast
      meals.find(m => m.id === 'meal_003')!, // Grilled Chicken Bowl
      meals.find(m => m.id === 'meal_005')!, // Baked Salmon Dinner
      meals.find(m => m.id === 'meal_006')!, // Protein Smoothie
    ]
  }
];

export const getMealPlansByGoal = (goal: FitnessGoal): MealPlan[] => {
  return mealPlans.filter(plan => plan.goal === goal);
};

export const getMealPlansByLevel = (level: FitnessLevel): MealPlan[] => {
  return mealPlans.filter(plan => plan.level === level);
};

export const getMealPlan = (id: string): MealPlan | undefined => {
  return mealPlans.find(plan => plan.id === id);
};

export const getMeal = (id: string): Meal | undefined => {
  return meals.find(meal => meal.id === id);
};

export const getIngredient = (id: string): Ingredient | undefined => {
  return ingredients.find(ingredient => ingredient.id === id);
};

export const generateGroceryList = (mealPlan: MealPlan): Ingredient[] => {
  const groceryList: Ingredient[] = [];
  const ingredientMap = new Map<string, Ingredient>();

  mealPlan.meals.forEach(meal => {
    meal.ingredients.forEach(ingredient => {
      if (ingredientMap.has(ingredient.id)) {
        const existing = ingredientMap.get(ingredient.id)!;
        existing.amount += ingredient.amount;
      } else {
        ingredientMap.set(ingredient.id, { ...ingredient });
      }
    });
  });

  return Array.from(ingredientMap.values());
};