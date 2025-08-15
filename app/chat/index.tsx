import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

const GEMINI_API_KEY = 'AIzaSyCtuMoqszvl0tyjtf8tkTfLn4XhFJ0vPE0';

const ChatScreen = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const [dotAnim] = useState(new Animated.Value(0));

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

  useEffect(() => {
    const saveHistory = async () => {
      try {
        await AsyncStorage.setItem('chatHistory', JSON.stringify(messages));
      } catch (err) {
        console.error('Failed to save chat history:', err);
      }
    };
    if (messages.length > 0) saveHistory();
  }, [messages]);

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
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  };

  const handleClearChat = async () => {
    try {
      await AsyncStorage.removeItem('chatHistory');
      setMessages([]);
    } catch (err) {
      console.error('Failed to clear chat history:', err);
    }
  };

  const autoResize = (text: string) => setInput(text);

  const renderLoading = () => (
    <View style={styles.loadingIndicator}>
      <Text style={{ marginRight: 8 }}>Dev Agent AI is typing</Text>
      <View style={styles.loadingDots}>
        {[0, 1, 2].map(i => (
          <Animated.View
            key={i}
            style={[
              styles.loadingDot,
              { opacity: dotAnim.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1], extrapolate: 'clamp' }) },
            ]}
          />
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Chat Header with Back Arrow */}
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🤖 Dev Agent</Text>
        <TouchableOpacity style={styles.clearChatBtn} onPress={handleClearChat}>
          <Text style={styles.clearChatBtnText}>Clear Chat</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.chatBox}
        ref={scrollRef}
        contentContainerStyle={{ padding: 20 }}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.length === 0 && (
          <View style={styles.welcomeMessage}>
            <Text style={styles.welcomeTitle}>Welcome to Dev Agent!</Text>
            <Text style={styles.welcomeText}>
              I'm your coding tutor AI. Ask me anything about programming, web development, algorithms, or any coding questions you have.
            </Text>
          </View>
        )}

        {messages.map((msg, idx) => (
          <View key={idx} style={[styles.message, msg.sender === 'user' ? styles.user : styles.bot]}>
            <View style={styles.messageBubble}>
              {msg.sender === 'user' ? <Text style={styles.userText}>{msg.text}</Text> : <Markdown style={markdownStyles}>{msg.text}</Markdown>}
            </View>
          </View>
        ))}

        {loading && renderLoading()}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={autoResize}
          placeholder="Ask me anything about coding..."
          style={styles.messageInput}
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend} disabled={loading}>
          <Text style={styles.sendBtnText}>➡️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

// Updated styles for back button
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  chatHeader: {
    backgroundColor: '#3D5AFE',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: { marginRight: 10 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', flex: 1 },
  clearChatBtn: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
  clearChatBtnText: { color: '#fff', fontWeight: '600' },
  chatBox: { flex: 1 },
  welcomeMessage: { alignItems: 'center', paddingVertical: 40 },
  welcomeTitle: { fontSize: 18, fontWeight: 'bold', color: '#3D5AFE', marginBottom: 10 },
  welcomeText: { fontSize: 14, color: '#666', textAlign: 'center' },
  message: { marginBottom: 12, maxWidth: '75%' },
  user: { alignSelf: 'flex-end' },
  bot: { alignSelf: 'flex-start' },
  messageBubble: { borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 1 },
  userText: { color: '#000000ff' },
  inputContainer: { flexDirection: 'row', padding: 16, borderTopWidth: 1, borderColor: '#ddd', backgroundColor: '#fff', alignItems: 'flex-end' },
  messageInput: { flex: 1, borderWidth: 2, borderColor: '#e0e0e0', borderRadius: 25, paddingHorizontal: 16, paddingVertical: 10, fontSize: 16, maxHeight: 120, backgroundColor: '#fff' },
  sendBtn: { width: 50, height: 50, marginLeft: 10, borderRadius: 25, backgroundColor: '#3D5AFE', alignItems: 'center', justifyContent: 'center' },
  sendBtnText: { color: '#fff', fontSize: 20 },
  loadingIndicator: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, alignSelf: 'flex-start', marginBottom: 12 },
  loadingDots: { flexDirection: 'row', gap: 4 },
  loadingDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#3D5AFE', marginHorizontal: 2 },
});

const markdownStyles = {
  body: { fontSize: 15, color: '#333' },
  strong: { fontWeight: 'bold' },
  code_inline: { backgroundColor: '#eeeeee', borderRadius: 4, paddingHorizontal: 4, paddingVertical: 2, fontFamily: 'monospace', color: '#e74c3c' },
  code_block: { backgroundColor: '#f4f4f4', padding: 10, borderRadius: 6, fontFamily: 'monospace', fontSize: 14 },
  heading1: { fontSize: 22, fontWeight: 'bold', color: '#1E88E5', marginBottom: 6 },
  heading2: { fontSize: 18, fontWeight: 'bold', color: '#3949AB', marginBottom: 4 },
  bullet_list: { marginVertical: 8 },
};
