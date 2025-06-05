import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Card from '../../components/common/Card';

const GroceryListScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Text style={styles.title}>Grocery List</Text>
          <Text style={styles.description}>
            This screen will show a generated grocery list based on
            your selected meal plan for the week.
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

export default GroceryListScreen;