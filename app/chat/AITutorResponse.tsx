import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import Markdown from 'react-native-markdown-display'; // ✅ Import this

const GEMINI_API_KEY = 'AIzaSyCtuMoqszvl0tyjtf8tkTfLn4XhFJ0vPE0';

interface AITutorResponseProps {
  topic: string;
}

const AITutorResponse: React.FC<AITutorResponseProps> = ({ topic }) => {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAIResponse = async () => {
      setLoading(true);
      try {
        const prompt = `
You are Dev Agent AI – an expert software development tutor trained to guide beginners.

Your task is to explain the topic: "${topic}".

Instructions:
- Begin with a beginner-friendly introduction to the topic, assuming no prior experience.
- Explain its real-world application in actual software or web development scenarios.
- Provide simple examples or analogies to make the concept easy to understand.
- Avoid overly technical jargon. When using any technical term, explain it clearly.
- Keep the explanation structured and concise but information-rich.
- End with a tip or best practice that helps learners implement or remember the concept.

Make sure the content feels like a personal tutor is walking the learner through the topic with clarity, motivation, and relevance to real-world development work.
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
          'No explanation generated.';
        setResponse(reply);
      } catch (err) {
        setError('Failed to load AI explanation.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAIResponse();
  }, [topic]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Developer Tutor</Text>

      {loading && <ActivityIndicator size="small" color="#3D5AFE" />}

      {error && <Text style={styles.error}>{error}</Text>}

      {response && (
        <Markdown style={markdownStyles}>
          {response}
        </Markdown>
      )}

      <Button
        title="Open in Full Chat"
        onPress={() => router.push(`/chat?topic=${encodeURIComponent(topic)}`)}
      />
    </View>
  );
};

export default AITutorResponse;

// ✅ Style your Markdown here
const markdownStyles = {
  body: {
    fontSize: 15,
    color: '#333',
  },
  heading1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 10,
  },
  heading2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3949AB',
    marginBottom: 8,
  },
  strong: {
    fontWeight: '700',
  },
  code_inline: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#000',
    flexWrap: 'wrap',         // ✅ wrap long inline code
  },
  code_block: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 6,
    fontFamily: 'monospace',
    fontSize: 14,
  },
  bullet_list: {
    marginVertical: 8,
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: '#f0f4ff',
    borderLeftWidth: 4,
    borderLeftColor: '#3D5AFE',
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#3D5AFE',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
