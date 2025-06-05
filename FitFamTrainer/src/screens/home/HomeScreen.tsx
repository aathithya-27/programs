import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore, useWorkoutStore, useNutritionStore, useProgressStore, useFamilyStore } from '../../store';
import { ActivityService, WorkoutService, NutritionService } from '../../services/firebase';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const HomeScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const user = useAuthStore((state) => state.user);
  const { todaysWorkout, setTodaysWorkout } = useWorkoutStore();
  const { waterIntake, dailyNutrition } = useNutritionStore();
  const { currentWeight } = useProgressStore();
  const { familyMembers, familyActivities, setFamilyActivities } = useFamilyStore();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    if (!user) return;
    
    try {
      // Load today's workout
      const workoutSessions = await WorkoutService.getUserWorkoutSessions(user.id, 1);
      const today = new Date();
      const todaySession = workoutSessions.find(session => 
        new Date(session.date).toDateString() === today.toDateString()
      );
      
      if (!todaySession && user.goal) {
        // Get recommended workout for today
        const programs = await WorkoutService.getWorkoutPrograms(user.goal);
        if (programs.length > 0) {
          const program = programs[0];
          if (program.workouts.length > 0) {
            setTodaysWorkout(program.workouts[0]);
          }
        }
      }

      // Load family activities
      if (user.familyGroupId) {
        const activities = await ActivityService.getFamilyActivities(user.familyGroupId, 10);
        setFamilyActivities(activities);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Let's crush today's goals! 💪",
      "Every workout counts! 🔥",
      "You're stronger than yesterday! ⚡",
      "Progress, not perfection! 🌟",
      "Your family believes in you! ❤️",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  if (loading) {
    return <LoadingSpinner text="Loading your dashboard..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <LinearGradient
          colors={['#007AFF', '#0056CC']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>{getGreeting()}</Text>
              <Text style={styles.userName}>{user?.name || 'Fitness Warrior'}!</Text>
              <Text style={styles.motivationalMessage}>{getMotivationalMessage()}</Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <Ionicons name="person-circle-outline" size={40} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <Card style={styles.statCard}>
              <Ionicons name="fitness-outline" size={24} color="#007AFF" />
              <Text style={styles.statValue}>{currentWeight || '--'}</Text>
              <Text style={styles.statLabel}>Weight (kg)</Text>
            </Card>
            
            <Card style={styles.statCard}>
              <Ionicons name="water-outline" size={24} color="#00C7BE" />
              <Text style={styles.statValue}>{waterIntake || 0}</Text>
              <Text style={styles.statLabel}>Water (ml)</Text>
            </Card>
            
            <Card style={styles.statCard}>
              <Ionicons name="flame-outline" size={24} color="#FF6B35" />
              <Text style={styles.statValue}>{dailyNutrition?.totalCalories || 0}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </Card>
          </View>

          {/* Today's Workout */}
          <Card style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today's Workout</Text>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={20} color="#007AFF" />
              </TouchableOpacity>
            </View>
            
            {todaysWorkout ? (
              <View style={styles.workoutContent}>
                <Text style={styles.workoutName}>{todaysWorkout.name}</Text>
                <Text style={styles.workoutDetails}>
                  {todaysWorkout.exercises?.length || 0} exercises • {todaysWorkout.estimatedDuration || 30} min
                </Text>
                <Button
                  title="Start Workout"
                  onPress={() => {}}
                  style={styles.startButton}
                />
              </View>
            ) : (
              <View style={styles.noWorkoutContent}>
                <Ionicons name="checkmark-circle-outline" size={48} color="#34C759" />
                <Text style={styles.noWorkoutText}>Great job! You've completed today's workout</Text>
                <Button
                  title="Browse Workouts"
                  onPress={() => {}}
                  variant="outline"
                  style={styles.browseButton}
                />
              </View>
            )}
          </Card>

          {/* Nutrition Summary */}
          <Card style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Nutrition Today</Text>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={20} color="#007AFF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.nutritionContent}>
              <View style={styles.nutritionRow}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{dailyNutrition?.totalMacros?.protein || 0}g</Text>
                  <Text style={styles.nutritionLabel}>Protein</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{dailyNutrition?.totalMacros?.carbs || 0}g</Text>
                  <Text style={styles.nutritionLabel}>Carbs</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{dailyNutrition?.totalMacros?.fat || 0}g</Text>
                  <Text style={styles.nutritionLabel}>Fat</Text>
                </View>
              </View>
              
              <Button
                title="Log Meal"
                onPress={() => {}}
                variant="outline"
                size="small"
                style={styles.logMealButton}
              />
            </View>
          </Card>

          {/* Family Activity */}
          {familyMembers.length > 0 && (
            <Card style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Family Activity</Text>
                <TouchableOpacity>
                  <Ionicons name="chevron-forward" size={20} color="#007AFF" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.familyContent}>
                {familyActivities.slice(0, 3).map((activity, index) => (
                  <View key={index} style={styles.activityItem}>
                    <View style={styles.activityIcon}>
                      <Ionicons name="person-circle" size={32} color="#007AFF" />
                    </View>
                    <View style={styles.activityDetails}>
                      <Text style={styles.activityText}>
                        {activity.userName} completed a workout
                      </Text>
                      <Text style={styles.activityTime}>2 hours ago</Text>
                    </View>
                    <TouchableOpacity style={styles.cheerButton}>
                      <Ionicons name="heart-outline" size={20} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                ))}
                
                {familyActivities.length === 0 && (
                  <Text style={styles.noActivityText}>
                    No recent family activity. Be the first to log a workout!
                  </Text>
                )}
              </View>
            </Card>
          )}

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#FF6B35', '#F7931E']}
                style={styles.actionGradient}
              >
                <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />
                <Text style={styles.actionText}>Log Progress</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#00C7BE', '#00A8A0']}
                style={styles.actionGradient}
              >
                <Ionicons name="water-outline" size={24} color="#FFFFFF" />
                <Text style={styles.actionText}>Add Water</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  motivationalMessage: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  profileButton: {
    padding: 4,
  },
  content: {
    padding: 24,
    paddingTop: 0,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: -15,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    paddingVertical: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
  },
  sectionCard: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  workoutContent: {
    alignItems: 'center',
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  workoutDetails: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  startButton: {
    paddingHorizontal: 32,
  },
  noWorkoutContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noWorkoutText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  browseButton: {
    paddingHorizontal: 24,
  },
  nutritionContent: {
    alignItems: 'center',
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666666',
  },
  logMealButton: {
    paddingHorizontal: 24,
  },
  familyContent: {
    paddingVertical: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  activityIcon: {
    marginRight: 12,
  },
  activityDetails: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#999999',
  },
  cheerButton: {
    padding: 8,
  },
  noActivityText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    flex: 0.48,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});

export default HomeScreen;