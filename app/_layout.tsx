import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Layout() {
  const router = useRouter();
  const segments = useSegments();
  const isChat = segments[segments.length - 1] === 'chat';

  const fullText = "Dev Agent";
  const [displayText, setDisplayText] = useState('');
  const indexRef = useRef(0);
  const forwardRef = useRef(true);

  // Typing and deleting animation
useEffect(() => {
let timeout: ReturnType<typeof setTimeout>;
  const typingDelay = 250;
  const pauseDelay = 12000;

  const type = () => {
    if (forwardRef.current) {
      indexRef.current += 1;
      setDisplayText(fullText.slice(0, indexRef.current));
      if (indexRef.current >= fullText.length) {
        timeout = setTimeout(() => { forwardRef.current = false; type(); }, pauseDelay);
        return;
      }
    } else {
      indexRef.current -= 1;
      setDisplayText(fullText.slice(0, indexRef.current));
      if (indexRef.current <= 0) {
        forwardRef.current = true;
      }
    }
    timeout = setTimeout(type, typingDelay);
  };

  type();
  return () => clearTimeout(timeout);
}, []);

  // Blinking cursor
  const blinkAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, { toValue: 1, duration: 500, easing: Easing.linear, useNativeDriver: false }),
        Animated.timing(blinkAnim, { toValue: 0, duration: 500, easing: Easing.linear, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerTitle: () => (
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.headerTitle}>{displayText}</Text>
            <Animated.Text
              style={[
                styles.headerTitle,
                { opacity: blinkAnim },
              ]}
            >
              |
            </Animated.Text>
          </View>
        ),
        headerRight: () => (
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={styles.headerButtonText}>Home</Text>
            </TouchableOpacity>
          </View>
        ),
        headerStyle: styles.header,
        headerTintColor: '#fff',
        headerShown: !isChat,
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
    gap: 10,
    marginRight: 10,
  },
  headerButtonText: {
    color: '#E3F2FD',
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    backgroundColor: '#3D5AFE30',
    overflow: 'hidden',
  },
});
