import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import OTPVerificationScreen from '../screens/auth/OTPVerificationScreen';
import CreateProfileScreen from '../screens/auth/CreateProfileScreen';
import JoinFamilyScreen from '../screens/auth/JoinFamilyScreen';

// Main Screens
import HomeScreen from '../screens/home/HomeScreen';
import WorkoutCategoriesScreen from '../screens/workout/WorkoutCategoriesScreen';
import WorkoutProgramsScreen from '../screens/workout/WorkoutProgramsScreen';
import WorkoutDetailsScreen from '../screens/workout/WorkoutDetailsScreen';
import ExerciseDetailsScreen from '../screens/workout/ExerciseDetailsScreen';
import WorkoutSessionScreen from '../screens/workout/WorkoutSessionScreen';
import Exercise3DScreen from '../screens/workout/Exercise3DScreen';

import MealPlannerScreen from '../screens/nutrition/MealPlannerScreen';
import MealDetailsScreen from '../screens/nutrition/MealDetailsScreen';
import GroceryListScreen from '../screens/nutrition/GroceryListScreen';
import WaterTrackerScreen from '../screens/nutrition/WaterTrackerScreen';
import NutritionLogScreen from '../screens/nutrition/NutritionLogScreen';

import ProgressOverviewScreen from '../screens/progress/ProgressOverviewScreen';
import ProgressEntryScreen from '../screens/progress/ProgressEntryScreen';
import ProgressChartsScreen from '../screens/progress/ProgressChartsScreen';
import AchievementsScreen from '../screens/progress/AchievementsScreen';
import BodyMeasurementsScreen from '../screens/progress/BodyMeasurementsScreen';

import ProfileOverviewScreen from '../screens/profile/ProfileOverviewScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import FamilyGroupScreen from '../screens/profile/FamilyGroupScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import SmartWatchSyncScreen from '../screens/profile/SmartWatchSyncScreen';
import AboutScreen from '../screens/profile/AboutScreen';

import { RootStackParamList, AuthStackParamList, MainTabParamList, WorkoutStackParamList, NutritionStackParamList, ProgressStackParamList, ProfileStackParamList } from '../types';

const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const WorkoutStack = createStackNavigator<WorkoutStackParamList>();
const NutritionStack = createStackNavigator<NutritionStackParamList>();
const ProgressStack = createStackNavigator<ProgressStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <AuthStack.Screen name="CreateProfile" component={CreateProfileScreen} />
      <AuthStack.Screen name="JoinFamily" component={JoinFamilyScreen} />
    </AuthStack.Navigator>
  );
};

const WorkoutNavigator = () => {
  return (
    <WorkoutStack.Navigator>
      <WorkoutStack.Screen 
        name="WorkoutCategories" 
        component={WorkoutCategoriesScreen}
        options={{ title: 'Workouts' }}
      />
      <WorkoutStack.Screen 
        name="WorkoutPrograms" 
        component={WorkoutProgramsScreen}
        options={{ title: 'Programs' }}
      />
      <WorkoutStack.Screen 
        name="WorkoutDetails" 
        component={WorkoutDetailsScreen}
        options={{ title: 'Workout Details' }}
      />
      <WorkoutStack.Screen 
        name="ExerciseDetails" 
        component={ExerciseDetailsScreen}
        options={{ title: 'Exercise' }}
      />
      <WorkoutStack.Screen 
        name="WorkoutSession" 
        component={WorkoutSessionScreen}
        options={{ title: 'Workout Session' }}
      />
      <WorkoutStack.Screen 
        name="Exercise3D" 
        component={Exercise3DScreen}
        options={{ title: '3D Exercise View' }}
      />
    </WorkoutStack.Navigator>
  );
};

const NutritionNavigator = () => {
  return (
    <NutritionStack.Navigator>
      <NutritionStack.Screen 
        name="MealPlanner" 
        component={MealPlannerScreen}
        options={{ title: 'Meal Planner' }}
      />
      <NutritionStack.Screen 
        name="MealDetails" 
        component={MealDetailsScreen}
        options={{ title: 'Meal Details' }}
      />
      <NutritionStack.Screen 
        name="GroceryList" 
        component={GroceryListScreen}
        options={{ title: 'Grocery List' }}
      />
      <NutritionStack.Screen 
        name="WaterTracker" 
        component={WaterTrackerScreen}
        options={{ title: 'Water Tracker' }}
      />
      <NutritionStack.Screen 
        name="NutritionLog" 
        component={NutritionLogScreen}
        options={{ title: 'Nutrition Log' }}
      />
    </NutritionStack.Navigator>
  );
};

const ProgressNavigator = () => {
  return (
    <ProgressStack.Navigator>
      <ProgressStack.Screen 
        name="ProgressOverview" 
        component={ProgressOverviewScreen}
        options={{ title: 'Progress' }}
      />
      <ProgressStack.Screen 
        name="ProgressEntry" 
        component={ProgressEntryScreen}
        options={{ title: 'Log Progress' }}
      />
      <ProgressStack.Screen 
        name="ProgressCharts" 
        component={ProgressChartsScreen}
        options={{ title: 'Charts' }}
      />
      <ProgressStack.Screen 
        name="Achievements" 
        component={AchievementsScreen}
        options={{ title: 'Achievements' }}
      />
      <ProgressStack.Screen 
        name="BodyMeasurements" 
        component={BodyMeasurementsScreen}
        options={{ title: 'Body Measurements' }}
      />
    </ProgressStack.Navigator>
  );
};

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen 
        name="ProfileOverview" 
        component={ProfileOverviewScreen}
        options={{ title: 'Profile' }}
      />
      <ProfileStack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{ title: 'Edit Profile' }}
      />
      <ProfileStack.Screen 
        name="FamilyGroup" 
        component={FamilyGroupScreen}
        options={{ title: 'Family Group' }}
      />
      <ProfileStack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <ProfileStack.Screen 
        name="SmartWatchSync" 
        component={SmartWatchSyncScreen}
        options={{ title: 'Smart Watch' }}
      />
      <ProfileStack.Screen 
        name="About" 
        component={AboutScreen}
        options={{ title: 'About' }}
      />
    </ProfileStack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Workouts') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'Nutrition') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Progress') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen name="Workouts" component={WorkoutNavigator} />
      <MainTab.Screen name="Nutrition" component={NutritionNavigator} />
      <MainTab.Screen name="Progress" component={ProgressNavigator} />
      <MainTab.Screen name="Profile" component={ProfileNavigator} />
    </MainTab.Navigator>
  );
};

const AppNavigator = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={MainNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;