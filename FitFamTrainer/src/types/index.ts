export interface User {
  id: string;
  phoneNumber: string;
  name: string;
  age?: number;
  weight?: number;
  height?: number;
  goal?: FitnessGoal;
  familyGroupId?: string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FamilyGroup {
  id: string;
  name: string;
  members: string[]; // User IDs
  createdBy: string;
  createdAt: Date;
  inviteCode: string;
}

export type FitnessGoal = 'weight_loss' | 'weight_gain' | 'bulking' | 'abs_cutting' | 'maintenance';

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export interface WorkoutProgram {
  id: string;
  name: string;
  goal: FitnessGoal;
  level: FitnessLevel;
  duration: number; // weeks
  description: string;
  workouts: Workout[];
}

export interface Workout {
  id: string;
  name: string;
  day: number;
  week: number;
  exercises: Exercise[];
  estimatedDuration: number; // minutes
}

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  sets: number;
  reps: number | string; // can be "10-12" or "30 seconds"
  restTime: number; // seconds
  instructions: string[];
  muscleGroups: string[];
  equipment: string[];
  videoUrl?: string;
  animationUrl?: string;
}

export type ExerciseCategory = 'strength' | 'cardio' | 'flexibility' | 'core' | 'compound';

export interface WorkoutSession {
  id: string;
  userId: string;
  workoutId: string;
  date: Date;
  completed: boolean;
  exercises: CompletedExercise[];
  duration?: number; // actual duration in minutes
  notes?: string;
}

export interface CompletedExercise {
  exerciseId: string;
  sets: CompletedSet[];
  completed: boolean;
}

export interface CompletedSet {
  reps: number;
  weight?: number;
  duration?: number; // for time-based exercises
  completed: boolean;
}

export interface MealPlan {
  id: string;
  goal: FitnessGoal;
  level: FitnessLevel;
  dailyCalories: number;
  macros: Macros;
  meals: Meal[];
}

export interface Macros {
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber?: number; // grams
}

export interface Meal {
  id: string;
  name: string;
  type: MealType;
  calories: number;
  macros: Macros;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  imageUrl?: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  calories: number;
  macros: Macros;
}

export interface DailyNutrition {
  id: string;
  userId: string;
  date: Date;
  meals: ConsumedMeal[];
  waterIntake: number; // ml
  totalCalories: number;
  totalMacros: Macros;
}

export interface ConsumedMeal {
  mealId: string;
  servings: number;
  consumed: boolean;
  time?: Date;
}

export interface ProgressEntry {
  id: string;
  userId: string;
  date: Date;
  weight?: number;
  bodyFat?: number;
  measurements?: BodyMeasurements;
  photos?: ProgressPhoto[];
  notes?: string;
}

export interface BodyMeasurements {
  chest?: number;
  waist?: number;
  hips?: number;
  bicep?: number;
  thigh?: number;
  neck?: number;
}

export interface ProgressPhoto {
  id: string;
  url: string;
  type: 'front' | 'side' | 'back';
  date: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: AchievementType;
  requirement: number;
  unit: string;
}

export type AchievementType = 'workout_streak' | 'weight_loss' | 'weight_gain' | 'total_workouts' | 'total_calories';

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  unlockedAt: Date;
  progress: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}

export type NotificationType = 'workout_reminder' | 'meal_reminder' | 'family_encouragement' | 'achievement' | 'progress_update';

export interface AppSettings {
  userId: string;
  notifications: NotificationSettings;
  units: UnitSettings;
  theme: 'light' | 'dark';
  language: string;
}

export interface NotificationSettings {
  workoutReminders: boolean;
  mealReminders: boolean;
  familyUpdates: boolean;
  achievements: boolean;
  reminderTime: string; // HH:MM format
}

export interface UnitSettings {
  weight: 'kg' | 'lbs';
  height: 'cm' | 'ft';
  distance: 'km' | 'miles';
  temperature: 'celsius' | 'fahrenheit';
}

export interface SmartWatchData {
  userId: string;
  date: Date;
  steps: number;
  heartRate: number[];
  caloriesBurned: number;
  sleepDuration?: number; // minutes
  activeMinutes: number;
}

export interface FamilyActivity {
  id: string;
  familyGroupId: string;
  userId: string;
  type: ActivityType;
  data: any;
  createdAt: Date;
}

export type ActivityType = 'workout_completed' | 'goal_achieved' | 'progress_update' | 'meal_logged' | 'achievement_unlocked';

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  OnboardingStack: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  OTPVerification: { phoneNumber: string };
  CreateProfile: { phoneNumber: string };
  JoinFamily: { userId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Workouts: undefined;
  Nutrition: undefined;
  Progress: undefined;
  Profile: undefined;
};

export type WorkoutStackParamList = {
  WorkoutCategories: undefined;
  WorkoutPrograms: { goal: FitnessGoal };
  WorkoutDetails: { programId: string };
  ExerciseDetails: { exerciseId: string };
  WorkoutSession: { workoutId: string };
  Exercise3D: { exerciseId: string };
};

export type NutritionStackParamList = {
  MealPlanner: undefined;
  MealDetails: { mealId: string };
  GroceryList: undefined;
  WaterTracker: undefined;
  NutritionLog: undefined;
};

export type ProgressStackParamList = {
  ProgressOverview: undefined;
  ProgressEntry: undefined;
  ProgressCharts: undefined;
  Achievements: undefined;
  BodyMeasurements: undefined;
};

export type ProfileStackParamList = {
  ProfileOverview: undefined;
  EditProfile: undefined;
  FamilyGroup: undefined;
  Settings: undefined;
  SmartWatchSync: undefined;
  About: undefined;
};