import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SimpleNavigator from './src/navigation/SimpleNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SimpleNavigator />
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
