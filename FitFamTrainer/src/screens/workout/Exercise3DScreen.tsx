import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { WorkoutStackParamList } from '../../types';
import Card from '../../components/common/Card';

type Exercise3DScreenNavigationProp = StackNavigationProp<WorkoutStackParamList, 'Exercise3D'>;
type Exercise3DScreenRouteProp = RouteProp<WorkoutStackParamList, 'Exercise3D'>;

interface Props {
  navigation: Exercise3DScreenNavigationProp;
  route: Exercise3DScreenRouteProp;
}

const Exercise3DScreen: React.FC<Props> = ({ navigation, route }) => {
  const { exerciseId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Text style={styles.title}>3D Exercise View</Text>
          <Text style={styles.subtitle}>Exercise ID: {exerciseId}</Text>
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>🏃‍♂️</Text>
            <Text style={styles.description}>
              3D animation and interactive model will be displayed here
              showing proper exercise form and technique.
            </Text>
          </View>
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
  placeholder: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  placeholderText: {
    fontSize: 60,
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default Exercise3DScreen;