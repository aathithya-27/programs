import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { NutritionStackParamList } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

type MealDetailsScreenNavigationProp = StackNavigationProp<NutritionStackParamList, 'MealDetails'>;
type MealDetailsScreenRouteProp = RouteProp<NutritionStackParamList, 'MealDetails'>;

interface Props {
  navigation: MealDetailsScreenNavigationProp;
  route: MealDetailsScreenRouteProp;
}

const MealDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { mealId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Text style={styles.title}>Meal Details</Text>
          <Text style={styles.subtitle}>Meal ID: {mealId}</Text>
          <Text style={styles.description}>
            This screen will show detailed meal information including
            ingredients, nutrition facts, cooking instructions, and prep time.
          </Text>
          <Button
            title="Log This Meal"
            onPress={() => navigation.goBack()}
            style={styles.button}
          />
        </Card>
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
  card: {
    margin: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 24,
  },
  button: {
    marginTop: 16,
  },
});

export default MealDetailsScreen;