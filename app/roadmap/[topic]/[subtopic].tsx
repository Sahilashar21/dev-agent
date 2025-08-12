import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, useColorScheme } from 'react-native';

export default function SubtopicDetails() {
  const { topic, subtopic } = useLocalSearchParams<{ topic: string; subtopic: string }>();
  const isDark = useColorScheme() === 'dark';

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f2f4f8' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
        {subtopic.replace(/-/g, ' ')}
      </Text>
      <Text style={[styles.description, { color: isDark ? '#ddd' : '#333' }]}>
        This is where the learning content for {subtopic.replace(/-/g, ' ')} in {topic} will go.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, lineHeight: 22 },
});
