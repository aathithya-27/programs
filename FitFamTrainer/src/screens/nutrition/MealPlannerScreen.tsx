import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { NutritionStackParamList, MealPlan, Meal } from '../../types';
import { getMealPlansByGoal } from '../../data/nutrition';
import { useAuthStore, useNutritionStore } from '../../store';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';

type MealPlannerScreenNavigationProp = StackNavigationProp<NutritionStackParamList, 'MealPlanner'>;

interface Props {
  navigation: MealPlannerScreenNavigationProp;
}

const MealPlannerScreen: React.FC<Props> = ({ navigation }) => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(true);
  
  const user = useAuthStore((state) => state.user);
  const { currentMealPlan, setCurrentMealPlan, dailyNutrition } = useNutritionStore();

  useEffect(() => {
    loadMealPlans();
  }, [user]);

  const loadMealPlans = async () => {
    if (!user?.goal) {
      setLoading(false);
      return;
    }

    try {
      const plans = getMealPlansByGoal(user.goal);
      setMealPlans(plans);
      
      if (currentMealPlan) {
        setSelectedPlan(currentMealPlan);
      } else if (plans.length > 0) {
        setSelectedPlan(plans[0]);
      }
    } catch (error) {
      console.error('Error loading meal plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan: MealPlan) => {
    setSelectedPlan(plan);
    setCurrentMealPlan(plan);
  };

  const renderMealPlanCard = (plan: MealPlan) => (
    <Card
      key={plan.id}
      style={[
        styles.planCard,
        ...(selectedPlan?.id === plan.id ? [styles.selectedPlanCard] : []),
      ]}
      onPress={() => handleSelectPlan(plan)}
    >
      <View style={styles.planHeader}>
        <Text style={styles.planTitle}>
          {plan.goal.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Plan
        </Text>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{plan.level}</Text>
        </View>
      </View>
      
      <View style={styles.planStats}>
        <View style={styles.statItem}>
          <Ionicons name="flame-outline" size={16} color="#FF6B35" />
          <Text style={styles.statText}>{plan.dailyCalories} cal</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="restaurant-outline" size={16} color="#007AFF" />
          <Text style={styles.statText}>{plan.meals.length} meals</Text>
        </View>
      </View>
      
      <View style={styles.macrosContainer}>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{plan.macros.protein}g</Text>
          <Text style={styles.macroLabel}>Protein</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{plan.macros.carbs}g</Text>
          <Text style={styles.macroLabel}>Carbs</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{plan.macros.fat}g</Text>
          <Text style={styles.macroLabel}>Fat</Text>
        </View>
      </View>
      
      {selectedPlan?.id === plan.id && (
        <View style={styles.selectedIndicator}>
          <Ionicons name="checkmark-circle" size={20} color="#34C759" />
          <Text style={styles.selectedText}>Selected</Text>
        </View>
      )}
    </Card>
  );

  const renderTodaysMeals = () => {
    if (!selectedPlan) return null;

    return (
      <Card style={styles.todayCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          <TouchableOpacity onPress={() => navigation.navigate('NutritionLog')}>
            <Ionicons name="chevron-forward" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
        
        {selectedPlan.meals.map((meal, index) => (
          <TouchableOpacity
            key={meal.id}
            style={styles.mealItem}
            onPress={() => navigation.navigate('MealDetails', { mealId: meal.id })}
          >
            <View style={styles.mealIcon}>
              <Text style={styles.mealEmoji}>
                {meal.type === 'breakfast' ? '🍳' : 
                 meal.type === 'lunch' ? '🥗' : 
                 meal.type === 'dinner' ? '🍽️' : '🍎'}
              </Text>
            </View>
            <View style={styles.mealDetails}>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealInfo}>
                {meal.calories} cal • {meal.prepTime + meal.cookTime} min
              </Text>
            </View>
            <View style={styles.mealActions}>
              <TouchableOpacity style={styles.checkButton}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#34C759" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </Card>
    );
  };

  if (loading) {
    return <LoadingSpinner text="Loading meal plans..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Meal Planner</Text>
          <Text style={styles.headerSubtitle}>
            Choose a meal plan that fits your fitness goals
          </Text>
        </View>

        {/* Meal Plans */}
        <View style={styles.plansContainer}>
          <Text style={styles.sectionTitle}>Available Plans</Text>
          {mealPlans.map(renderMealPlanCard)}
        </View>

        {/* Today's Meals */}
        {renderTodaysMeals()}

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Button
            title="View Grocery List"
            onPress={() => navigation.navigate('GroceryList')}
            variant="outline"
            style={styles.actionButton}
          />
          <Button
            title="Track Water"
            onPress={() => navigation.navigate('WaterTracker')}
            style={styles.actionButton}
          />
        </View>

        <View style={styles.bottomSpacing} />
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
    padding: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
  },
  plansContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  planCard: {
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPlanCard: {
    borderColor: '#007AFF',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  levelBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1976D2',
  },
  planStats: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 12,
    color: '#666666',
  },
  selectedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34C759',
    marginLeft: 4,
  },
  todayCard: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  mealIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mealEmoji: {
    fontSize: 20,
  },
  mealDetails: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  mealInfo: {
    fontSize: 14,
    color: '#666666',
  },
  mealActions: {
    marginLeft: 12,
  },
  checkButton: {
    padding: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  actionButton: {
    flex: 0.48,
  },
  bottomSpacing: {
    height: 24,
  },
});

export default MealPlannerScreen;