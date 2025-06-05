import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { WorkoutStackParamList } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

type WorkoutDetailsScreenNavigationProp = StackNavigationProp<WorkoutStackParamList, 'WorkoutDetails'>;
type WorkoutDetailsScreenRouteProp = RouteProp<WorkoutStackParamList, 'WorkoutDetails'>;

interface Props {
  navigation: WorkoutDetailsScreenNavigationProp;
  route: WorkoutDetailsScreenRouteProp;
}

const WorkoutDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { programId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Text style={styles.title}>Workout Details</Text>
          <Text style={styles.subtitle}>Program ID: {programId}</Text>
          <Text style={styles.description}>
            This screen will show detailed information about the selected workout program,
            including exercises, sets, reps, and instructions.
          </Text>
          <Button
            title="Start Workout"
            onPress={() => navigation.navigate('WorkoutSession', { workoutId: 'workout_001' })}
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

export default WorkoutDetailsScreen;