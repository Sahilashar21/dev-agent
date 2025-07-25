import { Stack, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Layout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerTitle: () => <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#fff' }}>Developer Agent</Text>,
        headerRight: () => (
          <View style={{ flexDirection: 'row', gap: 10, marginRight: 10 }}>
            <TouchableOpacity onPress={() => router.push('/roadmap')}>
              <Text style={{ color: 'white' }}>Roadmap</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/chat')}>
              <Text style={{ color: 'white' }}>Chat</Text>
            </TouchableOpacity>
          </View>
        ),
        headerStyle: { backgroundColor: '#3D5AFE' },
        headerTintColor: '#fff',
      }}
    />
  );
}



