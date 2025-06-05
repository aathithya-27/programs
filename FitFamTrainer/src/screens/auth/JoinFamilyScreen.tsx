import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../types';
import { FamilyService } from '../../services/firebase';
import { useAuthStore, useFamilyStore } from '../../store';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';

type JoinFamilyScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'JoinFamily'>;
type JoinFamilyScreenRouteProp = RouteProp<AuthStackParamList, 'JoinFamily'>;

interface Props {
  navigation: JoinFamilyScreenNavigationProp;
  route: JoinFamilyScreenRouteProp;
}

const JoinFamilyScreen: React.FC<Props> = ({ navigation, route }) => {
  const { userId } = route.params;
  const [loading, setLoading] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [mode, setMode] = useState<'join' | 'create' | null>(null);
  const { setAuthenticated } = useAuthStore();
  const { setFamilyGroup } = useFamilyStore();

  const handleJoinFamily = async () => {
    if (!inviteCode.trim()) {
      Alert.alert('Error', 'Please enter the invite code');
      return;
    }

    setLoading(true);
    try {
      const familyGroupId = await FamilyService.joinFamilyGroup(inviteCode.trim().toUpperCase(), userId);
      const familyGroup = await FamilyService.getFamilyGroup(familyGroupId);
      
      setFamilyGroup(familyGroup);
      setAuthenticated(true);
    } catch (error) {
      Alert.alert('Error', 'Invalid invite code or failed to join family group');
      console.error('Join family error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFamily = async () => {
    if (!familyName.trim()) {
      Alert.alert('Error', 'Please enter a family group name');
      return;
    }

    setLoading(true);
    try {
      const familyGroupId = await FamilyService.createFamilyGroup(familyName.trim(), userId);
      const familyGroup = await FamilyService.getFamilyGroup(familyGroupId);
      
      setFamilyGroup(familyGroup);
      Alert.alert(
        'Family Group Created!',
        `Your invite code is: ${familyGroup.inviteCode}\nShare this with your family members to invite them.`,
        [
          {
            text: 'OK',
            onPress: () => setAuthenticated(true),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create family group');
      console.error('Create family error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    setAuthenticated(true);
  };

  if (loading) {
    return <LoadingSpinner text="Setting up your family group..." overlay />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>👨‍👩‍👧‍👦</Text>
          <Text style={styles.title}>Join Your Family</Text>
          <Text style={styles.subtitle}>
            Connect with your family members to support each other's fitness journey
          </Text>
        </View>

        {/* Options */}
        {!mode && (
          <View style={styles.optionsContainer}>
            <Card style={styles.optionCard} onPress={() => setMode('join')}>
              <Text style={styles.optionIcon}>🔗</Text>
              <Text style={styles.optionTitle}>Join Existing Group</Text>
              <Text style={styles.optionDescription}>
                Enter an invite code to join your family's group
              </Text>
            </Card>

            <Card style={styles.optionCard} onPress={() => setMode('create')}>
              <Text style={styles.optionIcon}>➕</Text>
              <Text style={styles.optionTitle}>Create New Group</Text>
              <Text style={styles.optionDescription}>
                Start a new family group and invite others
              </Text>
            </Card>
          </View>
        )}

        {/* Join Family Form */}
        {mode === 'join' && (
          <Card style={styles.form}>
            <Text style={styles.formTitle}>Join Family Group</Text>
            <Text style={styles.formDescription}>
              Enter the 6-character invite code shared by your family member
            </Text>

            <Input
              label="Invite Code"
              placeholder="ABC123"
              value={inviteCode}
              onChangeText={(text) => setInviteCode(text.toUpperCase())}
              maxLength={6}
              autoCapitalize="characters"
              leftIcon="key-outline"
              autoFocus
            />

            <View style={styles.buttonRow}>
              <Button
                title="Back"
                onPress={() => setMode(null)}
                variant="outline"
                style={styles.backButton}
              />
              <Button
                title="Join Group"
                onPress={handleJoinFamily}
                style={styles.joinButton}
              />
            </View>
          </Card>
        )}

        {/* Create Family Form */}
        {mode === 'create' && (
          <Card style={styles.form}>
            <Text style={styles.formTitle}>Create Family Group</Text>
            <Text style={styles.formDescription}>
              Give your family group a name that everyone will recognize
            </Text>

            <Input
              label="Family Group Name"
              placeholder="The Smith Family"
              value={familyName}
              onChangeText={setFamilyName}
              leftIcon="people-outline"
              autoFocus
            />

            <View style={styles.buttonRow}>
              <Button
                title="Back"
                onPress={() => setMode(null)}
                variant="outline"
                style={styles.backButton}
              />
              <Button
                title="Create Group"
                onPress={handleCreateFamily}
                style={styles.joinButton}
              />
            </View>
          </Card>
        )}

        {/* Skip Option */}
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 16,
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
  optionsContainer: {
    marginBottom: 32,
  },
  optionCard: {
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 24,
  },
  optionIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  form: {
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  formDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  backButton: {
    flex: 0.45,
  },
  joinButton: {
    flex: 0.45,
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

export default JoinFamilyScreen;