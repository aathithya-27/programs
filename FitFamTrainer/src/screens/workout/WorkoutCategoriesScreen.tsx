import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { WorkoutStackParamList, FitnessGoal } from '../../types';
import Card from '../../components/common/Card';

type WorkoutCategoriesScreenNavigationProp = StackNavigationProp<WorkoutStackParamList, 'WorkoutCategories'>;

interface Props {
  navigation: WorkoutCategoriesScreenNavigationProp;
}

const { width } = Dimensions.get('window');

interface WorkoutCategory {
  id: FitnessGoal;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradient: [string, string];
  benefits: string[];
}

const workoutCategories: WorkoutCategory[] = [
  {
    id: 'weight_loss',
    title: 'Weight Loss',
    description: 'Burn calories and shed pounds with cardio-focused workouts',
    icon: 'flame-outline',
    gradient: ['#FF6B35', '#F7931E'],
    benefits: ['Burn fat', 'Improve cardio', 'Boost metabolism'],
  },
  {
    id: 'weight_gain',
    title: 'Weight Gain',
    description: 'Build lean muscle mass with strength training',
    icon: 'trending-up-outline',
    gradient: ['#34C759', '#30D158'],
    benefits: ['Build muscle', 'Increase strength', 'Gain healthy weight'],
  },
  {
    id: 'bulking',
    title: 'Bulking',
    description: 'Maximize muscle growth with intense strength training',
    icon: 'barbell-outline',
    gradient: ['#007AFF', '#0056CC'],
    benefits: ['Maximum gains', 'Power building', 'Muscle hypertrophy'],
  },
  {
    id: 'abs_cutting',
    title: 'Abs Cutting',
    description: 'Define your core and reduce body fat percentage',
    icon: 'body-outline',
    gradient: ['#FF3B30', '#FF2D92'],
    benefits: ['Core definition', 'Fat reduction', 'Muscle definition'],
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    description: 'Maintain your current fitness level and overall health',
    icon: 'heart-outline',
    gradient: ['#AF52DE', '#BF5AF2'],
    benefits: ['Stay fit', 'General health', 'Balanced approach'],
  },
];

const WorkoutCategoriesScreen: React.FC<Props> = ({ navigation }) => {
  const handleCategoryPress = (goal: FitnessGoal) => {
    navigation.navigate('WorkoutPrograms', { goal });
  };

  const renderCategory = (category: WorkoutCategory) => (
    <TouchableOpacity
      key={category.id}
      onPress={() => handleCategoryPress(category.id)}
      style={styles.categoryContainer}
    >
      <Card style={styles.categoryCard}>
        <LinearGradient
          colors={category.gradient}
          style={styles.categoryHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name={category.icon} size={32} color="#FFFFFF" />
          <Text style={styles.categoryTitle}>{category.title}</Text>
        </LinearGradient>
        
        <View style={styles.categoryContent}>
          <Text style={styles.categoryDescription}>{category.description}</Text>
          
          <View style={styles.benefitsContainer}>
            {category.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={16} color="#34C759" />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.categoryFooter}>
            <Text style={styles.exploreText}>Explore Programs</Text>
            <Ionicons name="chevron-forward" size={20} color="#007AFF" />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Choose Your Goal</Text>
          <Text style={styles.headerSubtitle}>
            Select a fitness category that matches your current goals
          </Text>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          {workoutCategories.map(renderCategory)}
        </View>

        {/* Info Section */}
        <Card style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
            <Text style={styles.infoTitle}>Not sure which to choose?</Text>
          </View>
          <Text style={styles.infoText}>
            Each category includes beginner, intermediate, and advanced programs. 
            You can always switch between categories as your goals change.
          </Text>
          <TouchableOpacity style={styles.helpButton}>
            <Text style={styles.helpButtonText}>Get Personalized Recommendation</Text>
          </TouchableOpacity>
        </Card>

        {/* Bottom Spacing */}
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
  categoriesContainer: {
    paddingHorizontal: 24,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryCard: {
    padding: 0,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  categoryContent: {
    padding: 20,
    paddingTop: 16,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 16,
  },
  benefitsContainer: {
    marginBottom: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 8,
  },
  categoryFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  exploreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  infoCard: {
    marginHorizontal: 24,
    marginTop: 8,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 16,
  },
  helpButton: {
    backgroundColor: '#F0F8FF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  helpButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  bottomSpacing: {
    height: 24,
  },
});

export default WorkoutCategoriesScreen;