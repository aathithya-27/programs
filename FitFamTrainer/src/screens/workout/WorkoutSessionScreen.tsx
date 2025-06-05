import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { WorkoutStackParamList } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

type WorkoutSessionScreenNavigationProp = StackNavigationProp<WorkoutStackParamList, 'WorkoutSession'>;
type WorkoutSessionScreenRouteProp = RouteProp<WorkoutStackParamList, 'WorkoutSession'>;

interface Props {
  navigation: WorkoutSessionScreenNavigationProp;
  route: WorkoutSessionScreenRouteProp;
}

const WorkoutSessionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { workoutId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Text style={styles.title}>Workout Session</Text>
          <Text style={styles.subtitle}>Workout ID: {workoutId}</Text>
          <Text style={styles.description}>
            This screen will provide an interactive workout session with
            timers, exercise tracking, and progress logging.
          </Text>
          <Button
            title="Complete Workout"
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

export default WorkoutSessionScreen;