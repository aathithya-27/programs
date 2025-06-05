import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { WorkoutStackParamList, WorkoutProgram, FitnessLevel } from '../../types';
import { getWorkoutsByGoal } from '../../data/workouts';
import { useWorkoutStore } from '../../store';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';

type WorkoutProgramsScreenNavigationProp = StackNavigationProp<WorkoutStackParamList, 'WorkoutPrograms'>;
type WorkoutProgramsScreenRouteProp = RouteProp<WorkoutStackParamList, 'WorkoutPrograms'>;

interface Props {
  navigation: WorkoutProgramsScreenNavigationProp;
  route: WorkoutProgramsScreenRouteProp;
}

const WorkoutProgramsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { goal } = route.params;
  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<FitnessLevel>('beginner');
  const [loading, setLoading] = useState(true);
  const { setCurrentProgram } = useWorkoutStore();

  const levels: { value: FitnessLevel; label: string; description: string }[] = [
    { value: 'beginner', label: 'Beginner', description: 'New to fitness or returning after a break' },
    { value: 'intermediate', label: 'Intermediate', description: 'Regular exercise for 3-6 months' },
    { value: 'advanced', label: 'Advanced', description: 'Consistent training for 6+ months' },
  ];

  useEffect(() => {
    loadPrograms();
  }, [goal, selectedLevel]);

  const loadPrograms = async () => {
    setLoading(true);
    try {
      const allPrograms = getWorkoutsByGoal(goal);
      const filteredPrograms = allPrograms.filter(program => program.level === selectedLevel);
      setPrograms(filteredPrograms);
    } catch (error) {
      console.error('Error loading programs:', error);
      Alert.alert('Error', 'Failed to load workout programs');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProgram = (program: WorkoutProgram) => {
    setCurrentProgram(program);
    navigation.navigate('WorkoutDetails', { programId: program.id });
  };

  const getGoalTitle = () => {
    switch (goal) {
      case 'weight_loss': return 'Weight Loss Programs';
      case 'weight_gain': return 'Weight Gain Programs';
      case 'bulking': return 'Bulking Programs';
      case 'abs_cutting': return 'Abs Cutting Programs';
      case 'maintenance': return 'Maintenance Programs';
      default: return 'Workout Programs';
    }
  };

  const getGoalIcon = () => {
    switch (goal) {
      case 'weight_loss': return 'flame-outline';
      case 'weight_gain': return 'trending-up-outline';
      case 'bulking': return 'barbell-outline';
      case 'abs_cutting': return 'body-outline';
      case 'maintenance': return 'heart-outline';
      default: return 'fitness-outline';
    }
  };

  const renderLevelSelector = () => (
    <Card style={styles.levelCard}>
      <Text style={styles.levelTitle}>Select Your Fitness Level</Text>
      <View style={styles.levelButtons}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level.value}
            style={[
              styles.levelButton,
              selectedLevel === level.value && styles.levelButtonActive,
            ]}
            onPress={() => setSelectedLevel(level.value)}
          >
            <Text
              style={[
                styles.levelButtonText,
                selectedLevel === level.value && styles.levelButtonTextActive,
              ]}
            >
              {level.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.levelDescription}>
        {levels.find(l => l.value === selectedLevel)?.description}
      </Text>
    </Card>
  );

  const renderProgram = (program: WorkoutProgram) => (
    <Card key={program.id} style={styles.programCard}>
      <View style={styles.programHeader}>
        <View style={styles.programTitleContainer}>
          <Ionicons name={getGoalIcon()} size={24} color="#007AFF" />
          <Text style={styles.programTitle}>{program.name}</Text>
        </View>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{program.duration} weeks</Text>
        </View>
      </View>

      <Text style={styles.programDescription}>{program.description}</Text>

      <View style={styles.programStats}>
        <View style={styles.statItem}>
          <Ionicons name="calendar-outline" size={16} color="#666666" />
          <Text style={styles.statText}>{program.workouts.length} workouts</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="time-outline" size={16} color="#666666" />
          <Text style={styles.statText}>
            {Math.round(program.workouts.reduce((acc, w) => acc + w.estimatedDuration, 0) / program.workouts.length)} min avg
          </Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="trophy-outline" size={16} color="#666666" />
          <Text style={styles.statText}>{program.level}</Text>
        </View>
      </View>

      <View style={styles.programActions}>
        <Button
          title="View Details"
          onPress={() => handleSelectProgram(program)}
          variant="outline"
          style={styles.detailsButton}
        />
        <Button
          title="Start Program"
          onPress={() => handleSelectProgram(program)}
          style={styles.startButton}
        />
      </View>
    </Card>
  );

  if (loading) {
    return <LoadingSpinner text="Loading programs..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{getGoalTitle()}</Text>
          <Text style={styles.headerSubtitle}>
            Choose a program that matches your fitness level and schedule
          </Text>
        </View>

        {/* Level Selector */}
        {renderLevelSelector()}

        {/* Programs */}
        <View style={styles.programsContainer}>
          {programs.length > 0 ? (
            programs.map(renderProgram)
          ) : (
            <Card style={styles.noProgramsCard}>
              <Ionicons name="search-outline" size={48} color="#CCCCCC" />
              <Text style={styles.noProgramsTitle}>No Programs Found</Text>
              <Text style={styles.noProgramsText}>
                We're working on adding more {selectedLevel} level programs for {goal.replace('_', ' ')}.
                Try selecting a different fitness level.
              </Text>
            </Card>
          )}
        </View>

        {/* Custom Program Option */}
        <Card style={styles.customCard}>
          <View style={styles.customHeader}>
            <Ionicons name="create-outline" size={24} color="#007AFF" />
            <Text style={styles.customTitle}>Need Something Custom?</Text>
          </View>
          <Text style={styles.customText}>
            Can't find the perfect program? Create a custom workout plan tailored to your specific needs.
          </Text>
          <Button
            title="Create Custom Program"
            onPress={() => {}}
            variant="outline"
            style={styles.customButton}
          />
        </Card>

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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
  },
  levelCard: {
    marginHorizontal: 24,
    marginBottom: 20,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  levelButtons: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  levelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  levelButtonActive: {
    backgroundColor: '#007AFF',
  },
  levelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  levelButtonTextActive: {
    color: '#FFFFFF',
  },
  levelDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  programsContainer: {
    paddingHorizontal: 24,
  },
  programCard: {
    marginBottom: 20,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  programTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 8,
    flex: 1,
  },
  durationBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1976D2',
  },
  programDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 16,
  },
  programStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  programActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsButton: {
    flex: 0.45,
  },
  startButton: {
    flex: 0.45,
  },
  noProgramsCard: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noProgramsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 16,
    marginBottom: 8,
  },
  noProgramsText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  customCard: {
    marginHorizontal: 24,
    marginTop: 8,
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  customTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 8,
  },
  customText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 16,
  },
  customButton: {
    alignSelf: 'center',
    paddingHorizontal: 24,
  },
  bottomSpacing: {
    height: 24,
  },
});

export default WorkoutProgramsScreen;