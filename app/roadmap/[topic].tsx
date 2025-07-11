import React from 'react';
import { ScrollView, Text, Linking, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { TopicPath, TopicData } from '@/types';

// Import all topic detail maps
import { topicDetails as frontendTopics } from '@/data/frontendTopics';
import { topicDetails as backendTopics } from '@/data/backendTopics';
import { topicDetails as fullstackTopics } from '@/data/fullstackTopics';
import { topicDetails as dsaTopics } from '@/data/dsaTopics';

// Merge all into one map
const dataMap: Record<TopicPath, TopicData> = {
  ...frontendTopics,
  ...backendTopics,
  ...fullstackTopics,
  ...dsaTopics,
};

const TopicDetails = () => {
  const { topic } = useLocalSearchParams<{ topic: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const data: TopicData | null = topic ? dataMap[topic as TopicPath] ?? null : null;

  if (!data) {
    router.replace('/roadmap');
    return null;
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f2f4f8' }]}>
      <Text style={[styles.title, { color: isDark ? '#ffffff' : '#1a1a1a' }]}>{data.title}</Text>
      <Text style={[styles.description, { color: isDark ? '#dddddd' : '#333333' }]}>{data.description}</Text>

      <View style={[styles.section, { backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#90CAF9' : '#3D5AFE' }]}>What You’ll Learn</Text>
        {data.learn.map((item, idx) => (
          <Text key={idx} style={[styles.bullet, { color: isDark ? '#eeeeee' : '#444444' }]}>• {item}</Text>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#90CAF9' : '#3D5AFE' }]}>Real-World Use</Text>
        <Text style={[styles.sectionContent, { color: isDark ? '#dddddd' : '#555555' }]}>{data.realWorld}</Text>
      </View>

      <View style={[styles.section, { backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#90CAF9' : '#3D5AFE' }]}>Mini Project Idea</Text>
        <Text style={[styles.sectionContent, { color: isDark ? '#dddddd' : '#555555' }]}>{data.project}</Text>
      </View>

      <View style={[styles.section, { backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#90CAF9' : '#3D5AFE' }]}>Useful Resources</Text>
        {data.links.map((link, idx) => (
          <Text
            key={idx}
            onPress={() => Linking.openURL(link.url)}
            style={[styles.link, { color: isDark ? '#6CA0FF' : '#007BFF' }]}
          >
            {link.label}
          </Text>
        ))}
      </View>

      {/* <Text
        onPress={() => router.back()}
        style={[styles.backLink, { color: isDark ? '#90CAF9' : '#3D5AFE' }]}
      >
        ← Back to Roadmap
      </Text> */}
    </ScrollView>
  );
};

export default TopicDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    borderLeftWidth: 5,
    borderLeftColor: '#3D5AFE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 15,
    lineHeight: 22,
    marginLeft: 10,
    marginBottom: 6,
  },
  sectionContent: {
    fontSize: 15,
    lineHeight: 22,
  },
  link: {
    fontSize: 15,
    textDecorationLine: 'underline',
    marginTop: 6,
    lineHeight: 22,
  },
  backLink: {
    fontSize: 16,
    marginTop: 30,
    textAlign: 'center',
    fontWeight: '600',
  },
});
