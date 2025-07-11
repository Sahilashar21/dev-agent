import React from 'react';
import { Stack } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: () => <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Dev Agent</Text>,
        headerRight: () => <NavButton />,
        headerStyle: { backgroundColor: '#3D5AFE' },
        headerTintColor: '#fff',
      }}
    />
  );
}

function NavButton() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push('/roadmap')}>
      <Text style={{ color: 'white', marginRight: 10 }}>Roadmap</Text>
    </TouchableOpacity>
  );
}
