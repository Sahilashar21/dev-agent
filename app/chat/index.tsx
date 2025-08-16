// ChatScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useTheme } from '../../constants/theme';

const GEMINI_API_KEY = 'AIzaSyCtuMoqszvl0tyjtf8tkTfLn4XhFJ0vPE0';

const ChatScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();

  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const [dotAnim] = useState(new Animated.Value(0));

  // Keyboard listeners
  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => setKeyboardHeight(e.endCoordinates.height));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardHeight(0));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Load chat history
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const savedMessages = await AsyncStorage.getItem('chatHistory');
        if (savedMessages) setMessages(JSON.parse(savedMessages));
      } catch (err) {
        console.error('Failed to load chat history:', err);
      }
    };
    loadHistory();
  }, []);

  // Save chat history
  useEffect(() => {
    if (messages.length > 0) {
      AsyncStorage.setItem('chatHistory', JSON.stringify(messages)).catch(console.error);
    }
  }, [messages]);

  // Loading dots animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotAnim, { toValue: 1, duration: 400, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(dotAnim, { toValue: 0, duration: 400, easing: Easing.linear, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    const prompt = `You are Dev Agent AI – a smart, helpful programming assistant.\n\nUser: ${userMessage}`;

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text: prompt }] }] },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const reply = res.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Dev Agent AI.';
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, something went wrong reaching Dev Agent AI.' }]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const handleClearChat = async () => {
    await AsyncStorage.removeItem('chatHistory');
    setMessages([]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={[styles.chatHeader, { backgroundColor: '#1E2A78' }]}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>🤖 Dev Agent</Text>
            <TouchableOpacity
              style={[styles.clearChatBtn, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
              onPress={handleClearChat}
            >
              <Text style={[styles.clearChatBtnText, { color: '#FFFFFF' }]}>Clear Chat</Text>
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{ padding: 20, paddingBottom: 20 + keyboardHeight }}
            keyboardShouldPersistTaps="handled"
          >
            {messages.length === 0 && (
              <View style={styles.welcomeMessage}>
                <Text style={[styles.welcomeTitle, { color: colors.accent }]}>Welcome to Dev Agent!</Text>
                <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>
                  I'm your coding tutor AI. Ask me anything about programming, web development, algorithms, or any coding questions you have.
                </Text>
              </View>
            )}

            {messages.map((msg, idx) => (
              <View key={idx} style={[styles.message, msg.sender === 'user' ? styles.user : styles.bot]}>
                <View
                  style={[
                    styles.messageBubble,
                    { backgroundColor: msg.sender === 'user' ? colors.card : colors.background },
                  ]}
                >
                  {msg.sender === 'user' ? (
                    <Text style={[styles.userText, { color: colors.textPrimary }]}>{msg.text}</Text>
                  ) : (
                    <Markdown
                      style={{
                        ...markdownStyles,
                        body: { ...markdownStyles.body, color: colors.textSecondary },
                        code_inline: { ...markdownStyles.code_inline, color: colors.danger },
                        heading1: { ...markdownStyles.heading1, color: colors.accent },
                        heading2: { ...markdownStyles.heading2, color: colors.accent },
                      }}
                    >
                      {msg.text}
                    </Markdown>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Input */}
          <View style={[styles.inputContainer, { marginBottom: keyboardHeight, backgroundColor: colors.background }]}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ask me anything about coding..."
              placeholderTextColor={colors.textSecondary}
              style={[
                styles.messageInput,
                {
                  backgroundColor: colors.card,
                  color: colors.textPrimary,
                  borderColor: colors.accent + '50',
                },
              ]}
              multiline
            />
            <TouchableOpacity
              style={[styles.sendBtn, { backgroundColor: colors.accent }]}
              onPress={handleSend}
              disabled={loading}
            >
              <Text style={[styles.sendBtnText, { color: colors.textPrimary }]}>➡️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  chatHeader: {
    paddingTop: Constants.statusBarHeight + 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: { marginRight: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', flex: 1 },
  clearChatBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
  clearChatBtnText: { fontWeight: '600' },
  chatBox: { flex: 1 },
  welcomeMessage: { alignItems: 'center', paddingVertical: 40 },
  welcomeTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  welcomeText: { fontSize: 14, textAlign: 'center' },
  message: { marginBottom: 12, maxWidth: '75%' },
  user: { alignSelf: 'flex-end' },
  bot: { alignSelf: 'flex-start' },
  messageBubble: { borderRadius: 5, paddingHorizontal: 16, paddingVertical: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 1 },
  userText: {},
  inputContainer: { flexDirection: 'row', padding: 16, borderTopWidth: 1, borderColor: '#ddd', alignItems: 'flex-end' },
  messageInput: { flex: 1, borderWidth: 2, borderRadius: 25, paddingHorizontal: 16, paddingVertical: 10, fontSize: 16, maxHeight: 120 },
  sendBtn: { width: 50, height: 50, marginLeft: 10, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  sendBtnText: { fontSize: 20 },
});

const markdownStyles = {
  body: { fontSize: 15 },
  strong: { fontWeight: 'bold' },
  code_inline: { backgroundColor: '#eeeeee', borderRadius: 4, paddingHorizontal: 4, paddingVertical: 2, fontFamily: 'monospace' },
  code_block: { backgroundColor: '#f4f4f4', padding: 10, borderRadius: 6, fontFamily: 'monospace', fontSize: 14 },
  heading1: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  heading2: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  bullet_list: { marginVertical: 8 },
};
