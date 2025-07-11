import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme(); // 'light' or 'dark'
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f2f2f2' }]}>
      <Text style={[styles.heading, { color: isDark ? '#ffffff' : '#1a1a1a' }]}>
        Welcome to Dev Agent
      </Text>
      <Text style={[styles.description, { color: isDark ? '#cccccc' : '#333333' }]}>
        Dev Agent is a smart learning platform for aspiring web and software developers.
        It offers curated roadmaps, learning resources, real-world project ideas, and structured guidance for frontend, backend, fullstack, and DSA topics.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
});
