import { Stack, useRouter, useSegments } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Layout() {
  const router = useRouter();
const segments = useSegments(); // gives current path segments
  const isChat = segments[segments.length - 1] === 'chat';

  return (
    <Stack
      screenOptions={{
        headerTitle: () => <Text style={styles.headerTitle}>Dev Agent</Text>,
        headerRight: () => (
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={() => router.push('/roadmap')}>
              <Text style={styles.headerButtonText}>Roadmap</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/chat')}>
              <Text style={styles.headerButtonText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/quiz')}>
              <Text style={styles.headerButtonText}>Quiz</Text>
            </TouchableOpacity>
          </View>
        ),
        headerStyle: styles.header,
        headerTintColor: '#fff',
        headerShown: !isChat, // hide header ONLY for ChatScreen

      }}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1E2A78',
    borderBottomWidth: 1,
    borderBottomColor: '#0F172A',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginRight: 10,
  },
  headerButtonText: {
    color: '#E3F2FD',
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: '#3D5AFE30', // semi-transparent blue
    overflow: 'hidden',
  },
});

// import { Ionicons } from '@expo/vector-icons';
// import { Stack, useRouter } from 'expo-router';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function Layout() {
//   const router = useRouter();

//   return (
//     <>
//       <Stack
//         screenOptions={{
//           headerTitle: () => <Text style={styles.headerTitle}>Dev Agent</Text>,
//           headerStyle: styles.header,
//           headerTintColor: '#fff',
//         }}
//       />

//       <View style={styles.bodyContainer}>
//         <Text style={styles.sectionTitle}>Explore Modules</Text>

//         <TouchableOpacity style={styles.cardButton} onPress={() => router.push('/roadmap')}>
//           <Ionicons name="map-outline" size={24} color="#3D5AFE" />
//           <Text style={styles.cardText}>Developer Roadmap</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.cardButton} onPress={() => router.push('/chat')}>
//           <Ionicons name="chatbubbles-outline" size={24} color="#3D5AFE" />
//           <Text style={styles.cardText}>Tutor Chatbot</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.cardButton} onPress={() => router.push('/quiz')}>
//           <Ionicons name="school-outline" size={24} color="#3D5AFE" />
//           <Text style={styles.cardText}>Quiz & Practice</Text>
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: '#1E2A78',
//     borderBottomWidth: 1,
//     borderBottomColor: '#0F172A',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     letterSpacing: 0.5,
//   },
//   bodyContainer: {
//     flex: 1,
//     backgroundColor: '#F1F5F9',
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 20,
//     color: '#1E293B',
//     textAlign: 'center',
//   },
//   cardButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.06,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   cardText: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginLeft: 12,
//     color: '#1E293B',
//   },
// });
