import axios from 'axios';
import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Markdown from 'react-native-markdown-display'; // ✅ Markdown import

const GEMINI_API_KEY = 'AIzaSyCtuMoqszvl0tyjtf8tkTfLn4XhFJ0vPE0';

const ChatScreen = () => {
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const prompt = `
You are Dev Agent AI – a smart, helpful programming assistant.

You must ONLY answer questions related to **software development** such as:
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
- Any real-world use in software dev career

❌ If the question is unrelated (like history, cooking, jokes, or general topics), politely reply:
"I'm designed to help only with software development-related queries."

User: ${userMessage}
`;

      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const reply =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'No response from Dev Agent AI.';

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Sorry, something went wrong reaching Dev Agent AI.',
        },
      ]);
    } finally {
      setLoading(false);
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
        <Button title="Send" onPress={handleSend} disabled={loading} />
      </View>
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
