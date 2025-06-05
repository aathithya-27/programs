import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { AuthStackParamList, FitnessGoal } from '../../types';
import { UserService } from '../../services/firebase';
import { useAuthStore } from '../../store';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';

type CreateProfileScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'CreateProfile'>;
type CreateProfileScreenRouteProp = RouteProp<AuthStackParamList, 'CreateProfile'>;

interface Props {
  navigation: CreateProfileScreenNavigationProp;
  route: CreateProfileScreenRouteProp;
}

const CreateProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    goal: 'weight_loss' as FitnessGoal,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { setUser, setAuthenticated } = useAuthStore();

  const fitnessGoals = [
    { label: 'Weight Loss', value: 'weight_loss' },
    { label: 'Weight Gain', value: 'weight_gain' },
    { label: 'Bulking', value: 'bulking' },
    { label: 'Abs Cutting', value: 'abs_cutting' },
    { label: 'Maintenance', value: 'maintenance' },
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 13 || Number(formData.age) > 100) {
      newErrors.age = 'Please enter a valid age (13-100)';
    }

    if (!formData.weight.trim()) {
      newErrors.weight = 'Weight is required';
    } else if (isNaN(Number(formData.weight)) || Number(formData.weight) < 30 || Number(formData.weight) > 300) {
      newErrors.weight = 'Please enter a valid weight (30-300 kg)';
    }

    if (!formData.height.trim()) {
      newErrors.height = 'Height is required';
    } else if (isNaN(Number(formData.height)) || Number(formData.height) < 100 || Number(formData.height) > 250) {
      newErrors.height = 'Please enter a valid height (100-250 cm)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateProfile = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userData = {
        phoneNumber,
        name: formData.name.trim(),
        age: Number(formData.age),
        weight: Number(formData.weight),
        height: Number(formData.height),
        goal: formData.goal,
      };

      const userId = await UserService.createUser(userData);
      const user = await UserService.getUser(userId);
      
      setUser(user);
      navigation.navigate('JoinFamily', { userId });
    } catch (error) {
      Alert.alert('Error', 'Failed to create profile. Please try again.');
      console.error('Profile creation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (loading) {
    return <LoadingSpinner text="Creating your profile..." overlay />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Create Your Profile</Text>
            <Text style={styles.subtitle}>
              Tell us about yourself to get personalized workouts and nutrition plans
            </Text>
          </View>

          {/* Form */}
          <Card style={styles.form}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
              error={errors.name}
              leftIcon="person-outline"
            />

            <Input
              label="Age"
              placeholder="Enter your age"
              value={formData.age}
              onChangeText={(value) => updateFormData('age', value)}
              error={errors.age}
              keyboardType="numeric"
              leftIcon="calendar-outline"
            />

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Input
                  label="Weight (kg)"
                  placeholder="70"
                  value={formData.weight}
                  onChangeText={(value) => updateFormData('weight', value)}
                  error={errors.weight}
                  keyboardType="numeric"
                  leftIcon="fitness-outline"
                />
              </View>
              
              <View style={styles.halfWidth}>
                <Input
                  label="Height (cm)"
                  placeholder="175"
                  value={formData.height}
                  onChangeText={(value) => updateFormData('height', value)}
                  error={errors.height}
                  keyboardType="numeric"
                  leftIcon="resize-outline"
                />
              </View>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Fitness Goal</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={formData.goal}
                  onValueChange={(value) => updateFormData('goal', value)}
                  style={styles.picker}
                >
                  {fitnessGoals.map((goal) => (
                    <Picker.Item
                      key={goal.value}
                      label={goal.label}
                      value={goal.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <Button
              title="Create Profile"
              onPress={handleCreateProfile}
              size="large"
              fullWidth
              style={styles.createButton}
            />
          </Card>

          {/* Skip Option */}
          <TouchableOpacity
            onPress={() => navigation.navigate('JoinFamily', { userId: 'temp_user_id' })}
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
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
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  picker: {
    height: 48,
  },
  createButton: {
    marginTop: 16,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipText: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});

export default CreateProfileScreen;