import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Card from '../../components/common/Card';

const SmartWatchSyncScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Text style={styles.title}>Smart Watch Sync</Text>
          <Text style={styles.description}>
            This screen will allow you to connect and sync data
            from your Apple Watch or Wear OS device.
          </Text>
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
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default SmartWatchSyncScreen;