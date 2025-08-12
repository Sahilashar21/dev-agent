// import { TopicData, TopicPath } from '@/types';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

// // Import all topic detail maps
// import { topicDetails as backendTopics } from '@/data/backendTopics';
// import { topicDetails as dsaTopics } from '@/data/dsaTopics';
// import { topicDetails as frontendTopics } from '@/data/frontendTopics';
// import { topicDetails as fullstackTopics } from '@/data/fullstackTopics';

// // Merge all into one map
// const dataMap: Record<TopicPath, TopicData> = {
//   ...frontendTopics,
//   ...backendTopics,
//   ...fullstackTopics,
//   ...dsaTopics,
// };

// const TopicDetails = () => {
//   const { topic } = useLocalSearchParams<{ topic: string }>();
//   const router = useRouter();
//   const colorScheme = useColorScheme();
//   const isDark = colorScheme === 'dark';

//   const data: TopicData | null = topic ? dataMap[topic as TopicPath] ?? null : null;

//   if (!data) {
//     router.replace('/roadmap');
//     return null;
//   }

//   return (
//     <ScrollView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f2f4f8' }]}>
//       <Text style={[styles.title, { color: isDark ? '#ffffff' : '#1a1a1a' }]}>{data.title}</Text>
//       <Text style={[styles.description, { color: isDark ? '#dddddd' : '#333333' }]}>{data.description}</Text>

//       {/* What You'll Learn - clickable items */}
//       <View style={[styles.section, { backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }]}>
//         <Text style={[styles.sectionTitle, { color: isDark ? '#90CAF9' : '#3D5AFE' }]}>What You’ll Learn</Text>
//         {data.learn.map((item, idx) => {
//           const subtopicSlug = item.toLowerCase().replace(/\s+/g, '-'); // HTML Elements -> html-elements
//           return (
//             <TouchableOpacity
//               key={idx}
//               onPress={() => router.push(`/roadmap/${topic}/${subtopicSlug}`)}
//             >
//               <Text style={[styles.bullet, { color: isDark ? '#6CA0FF' : '#007BFF' }]}>• {item}</Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       {/* Real-World Use */}
//       <View style={[styles.section, { backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }]}>
//         <Text style={[styles.sectionTitle, { color: isDark ? '#90CAF9' : '#3D5AFE' }]}>Real-World Use</Text>
//         <Text style={[styles.sectionContent, { color: isDark ? '#dddddd' : '#555555' }]}>{data.realWorld}</Text>
//       </View>

//       {/* Mini Project Idea */}
//       <View style={[styles.section, { backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }]}>
//         <Text style={[styles.sectionTitle, { color: isDark ? '#90CAF9' : '#3D5AFE' }]}>Mini Project Idea</Text>
//         <Text style={[styles.sectionContent, { color: isDark ? '#dddddd' : '#555555' }]}>{data.project}</Text>
//       </View>

//       {/* Useful Resources */}
//       <View style={[styles.section, { backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }]}>
//         <Text style={[styles.sectionTitle, { color: isDark ? '#90CAF9' : '#3D5AFE' }]}>Useful Resources</Text>
//         {data.links.map((link, idx) => (
//           <Text
//             key={idx}
//             onPress={() => Linking.openURL(link.url)}
//             style={[styles.link, { color: isDark ? '#6CA0FF' : '#007BFF' }]}
//           >
//             {link.label}
//           </Text>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// export default TopicDetails;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     flex: 1,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '800',
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     lineHeight: 24,
//     marginBottom: 24,
//   },
//   section: {
//     borderRadius: 14,
//     padding: 16,
//     marginBottom: 18,
//     borderLeftWidth: 5,
//     borderLeftColor: '#3D5AFE',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginBottom: 8,
//   },
//   bullet: {
//     fontSize: 15,
//     lineHeight: 22,
//     marginLeft: 10,
//     marginBottom: 6,
//   },
//   sectionContent: {
//     fontSize: 15,
//     lineHeight: 22,
//   },
//   link: {
//     fontSize: 15,
//     textDecorationLine: 'underline',
//     marginTop: 6,
//     lineHeight: 22,
//   },
// });

import { TopicData, TopicPath } from '@/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';



// Import all topic detail maps
import { topicDetails as backendTopics } from '@/data/backendTopics';
import { topicDetails as dsaTopics } from '@/data/dsaTopics';
import { topicDetails as frontendTopics } from '@/data/frontendTopics';
import { topicDetails as fullstackTopics } from '@/data/fullstackTopics';
import AITutorResponse from '../chat/AITutorResponse';

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

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

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
          <View key={idx} style={{ marginBottom: 10 }}>
            <TouchableOpacity onPress={() => handleToggle(idx)}>
              <Text style={[styles.bullet, { color: isDark ? '#eeeeee' : '#444444' }]}>• {item}</Text>
            </TouchableOpacity>
            {expandedIndex === idx && (
  <View style={{ marginTop: 10 }}>
    <AITutorResponse topic={item} />
  </View>
)}

          </View>
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
  aiPlaceholder: {
    marginTop: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#2c2c2c',
  },
});
