import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Markdown from 'react-native-markdown-display';

const GEMINI_API_KEY = 'AIzaSyCtuMoqszvl0tyjtf8tkTfLn4XhFJ0vPE0';

const ChatScreen = () => {
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Load chat history on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const savedMessages = await AsyncStorage.getItem('chatHistory');
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    };
    loadHistory();
  }, []);

  // Save chat history whenever messages update
  useEffect(() => {
    const saveHistory = async () => {
      try {
        await AsyncStorage.setItem('chatHistory', JSON.stringify(messages));
      } catch (error) {
        console.error('Failed to save chat history:', error);
      }
    };
    if (messages.length > 0) saveHistory();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
const prompt = `
You are Dev Agent AI – a smart, helpful programming assistant.

You must ONLY answer questions related to:
- Software development:
  - Frontend (React, HTML, CSS, etc.)
  - Backend (Node.js, APIs, Databases, etc.)
  - Fullstack development
  - Programming languages (JavaScript, Python, etc.)
  - Data Structures & Algorithms
  - Version Control (Git, GitHub)
  - App Development (Web, Mobile)
  - Tools (VS Code, IDEs, Docker)
  - Deployment (Netlify, Vercel, Firebase)
  - Cloud platforms (AWS, GCP)
  - Security, Testing, Performance
  - Any real-world use in a software dev career

- Cybersecurity:
  - Best practices for securing applications, networks, and data
  - Explaining cyber threats (phishing, ransomware, malware, etc.)
  - Secure coding practices
  - Ethical hacking and penetration testing basics
  - Incident response guidelines

When the user reports being hacked, scammed, or facing a cyberattack:
- Ask clarifying questions if needed (e.g., "Was it a social media account, bank account, or device?")
- Give calm, step-by-step emergency guidance relevant to India.
- Always include CERT-In contact info and the National Cyber Crime Reporting Portal link.
- Adapt wording to the situation — avoid repeating the same phrases every time.
- If it's about banking, emphasize contacting the bank immediately before anything else.
- If it's about social media, suggest reporting to the platform and changing passwords.
✅ If the user greets you, greet them back politely and warmly.

❌ If the question is unrelated to software development or cybersecurity, politely reply:
"I'm designed to help only with software development and cybersecurity-related queries."

User: ${userMessage}
`;


      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const reply =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'No response from Dev Agent AI.';

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'Sorry, something went wrong reaching Dev Agent AI.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = async () => {
    try {
      await AsyncStorage.removeItem('chatHistory');
      setMessages([]);
    } catch (error) {
      console.error('Failed to clear chat history:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatBox}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              msg.sender === 'user' ? styles.userMessage : styles.botMessage,
            ]}
          >
            {msg.sender === 'user' ? (
              <Text style={styles.userText}>You: {msg.text}</Text>
            ) : (
              <Markdown style={markdownStyles}>
                {`**Dev Agent AI:** ${msg.text}`}
              </Markdown>
            )}
          </View>
        ))}
        {loading && <ActivityIndicator size="small" color="#3D5AFE" />}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask about anything in development..."
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          disabled={loading}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.clearButton} onPress={handleClearChat}>
        <Text style={styles.clearButtonText}>Clear Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatBox: {
    flex: 1,
    marginBottom: 10,
  },
  messageBubble: {
    marginVertical: 4,
    padding: 8,
    borderRadius: 8,
    maxWidth: '90%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#D1C4E9',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
  },
  userText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#3D5AFE',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const markdownStyles = {
  body: {
    fontSize: 15,
    color: '#333',
  },
  strong: {
    fontWeight: 'bold',
  },
  code_inline: {
    backgroundColor: '#eeeeee',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontFamily: 'monospace',
    color: '#000',
  },
  code_block: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 6,
    fontFamily: 'monospace',
    fontSize: 14,
  },
  heading1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 6,
  },
  heading2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3949AB',
    marginBottom: 4,
  },
  bullet_list: {
    marginVertical: 8,
  },
};
