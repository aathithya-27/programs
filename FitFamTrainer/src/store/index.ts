import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, FamilyGroup, WorkoutSession, DailyNutrition, ProgressEntry, AppSettings } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

interface FamilyState {
  familyGroup: FamilyGroup | null;
  familyMembers: User[];
  familyActivities: any[];
  setFamilyGroup: (group: FamilyGroup | null) => void;
  setFamilyMembers: (members: User[]) => void;
  setFamilyActivities: (activities: any[]) => void;
  addFamilyActivity: (activity: any) => void;
}

interface WorkoutState {
  currentProgram: any | null;
  currentWorkout: any | null;
  workoutSessions: WorkoutSession[];
  todaysWorkout: any | null;
  setCurrentProgram: (program: any) => void;
  setCurrentWorkout: (workout: any) => void;
  setWorkoutSessions: (sessions: WorkoutSession[]) => void;
  addWorkoutSession: (session: WorkoutSession) => void;
  setTodaysWorkout: (workout: any) => void;
}

interface NutritionState {
  currentMealPlan: any | null;
  dailyNutrition: DailyNutrition | null;
  waterIntake: number;
  setCurrentMealPlan: (plan: any) => void;
  setDailyNutrition: (nutrition: DailyNutrition) => void;
  setWaterIntake: (intake: number) => void;
  addWater: (amount: number) => void;
  logMeal: (meal: any) => void;
}

interface ProgressState {
  progressEntries: ProgressEntry[];
  currentWeight: number | null;
  currentBodyFat: number | null;
  achievements: any[];
  setProgressEntries: (entries: ProgressEntry[]) => void;
  addProgressEntry: (entry: ProgressEntry) => void;
  setCurrentWeight: (weight: number) => void;
  setCurrentBodyFat: (bodyFat: number) => void;
  setAchievements: (achievements: any[]) => void;
  addAchievement: (achievement: any) => void;
}

interface SettingsState {
  settings: AppSettings | null;
  setSettings: (settings: AppSettings) => void;
  updateSettings: (updates: Partial<AppSettings>) => void;
}

// Auth Store
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user }),
      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
      setLoading: (loading) => set({ isLoading: loading }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Family Store
export const useFamilyStore = create<FamilyState>((set, get) => ({
  familyGroup: null,
  familyMembers: [],
  familyActivities: [],
  setFamilyGroup: (group) => set({ familyGroup: group }),
  setFamilyMembers: (members) => set({ familyMembers: members }),
  setFamilyActivities: (activities) => set({ familyActivities: activities }),
  addFamilyActivity: (activity) => {
    const { familyActivities } = get();
    set({ familyActivities: [activity, ...familyActivities] });
  },
}));

// Workout Store
export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      currentProgram: null,
      currentWorkout: null,
      workoutSessions: [],
      todaysWorkout: null,
      setCurrentProgram: (program) => set({ currentProgram: program }),
      setCurrentWorkout: (workout) => set({ currentWorkout: workout }),
      setWorkoutSessions: (sessions) => set({ workoutSessions: sessions }),
      addWorkoutSession: (session) => {
        const { workoutSessions } = get();
        set({ workoutSessions: [session, ...workoutSessions] });
      },
      setTodaysWorkout: (workout) => set({ todaysWorkout: workout }),
    }),
    {
      name: 'workout-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Nutrition Store
export const useNutritionStore = create<NutritionState>()(
  persist(
    (set, get) => ({
      currentMealPlan: null,
      dailyNutrition: null,
      waterIntake: 0,
      setCurrentMealPlan: (plan) => set({ currentMealPlan: plan }),
      setDailyNutrition: (nutrition) => set({ dailyNutrition: nutrition }),
      setWaterIntake: (intake) => set({ waterIntake: intake }),
      addWater: (amount) => {
        const { waterIntake } = get();
        set({ waterIntake: waterIntake + amount });
      },
      logMeal: (meal) => {
        const { dailyNutrition } = get();
        if (dailyNutrition) {
          const updatedNutrition = {
            ...dailyNutrition,
            meals: [...dailyNutrition.meals, meal],
            totalCalories: dailyNutrition.totalCalories + meal.calories,
          };
          set({ dailyNutrition: updatedNutrition });
        }
      },
    }),
    {
      name: 'nutrition-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Progress Store
export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progressEntries: [],
      currentWeight: null,
      currentBodyFat: null,
      achievements: [],
      setProgressEntries: (entries) => set({ progressEntries: entries }),
      addProgressEntry: (entry) => {
        const { progressEntries } = get();
        set({ progressEntries: [entry, ...progressEntries] });
        
        // Update current weight and body fat if provided
        if (entry.weight) set({ currentWeight: entry.weight });
        if (entry.bodyFat) set({ currentBodyFat: entry.bodyFat });
      },
      setCurrentWeight: (weight) => set({ currentWeight: weight }),
      setCurrentBodyFat: (bodyFat) => set({ currentBodyFat: bodyFat }),
      setAchievements: (achievements) => set({ achievements }),
      addAchievement: (achievement) => {
        const { achievements } = get();
        set({ achievements: [achievement, ...achievements] });
      },
    }),
    {
      name: 'progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Settings Store
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      settings: null,
      setSettings: (settings) => set({ settings }),
      updateSettings: (updates) => {
        const { settings } = get();
        if (settings) {
          set({ settings: { ...settings, ...updates } });
        }
      },
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Computed selectors
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useFamilyMembers = () => useFamilyStore((state) => state.familyMembers);
export const useCurrentProgram = () => useWorkoutStore((state) => state.currentProgram);
export const useTodaysWorkout = () => useWorkoutStore((state) => state.todaysWorkout);
export const useWaterIntake = () => useNutritionStore((state) => state.waterIntake);
export const useCurrentWeight = () => useProgressStore((state) => state.currentWeight);
export const useAppSettings = () => useSettingsStore((state) => state.settings);