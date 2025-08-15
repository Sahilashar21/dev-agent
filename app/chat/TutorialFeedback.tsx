// /chat/TutorialFeedback.tsx
import axios from 'axios';
import { useState } from 'react';
import {
    ActivityIndicator,
    Button,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import Markdown from 'react-native-markdown-display';

type Props = {
  prompt: string; // reflection prompt from TutorialsScreen
};

const GEMINI_API_KEY = 'AIzaSyCtuMoqszvl0tyjtf8tkTfLn4XhFJ0vPE0';

const TutorialFeedback = ({ prompt }: Props) => {
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAIResponse = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setAiResponse('');

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          model: 'models/gemini-2.0-flash',
          input: [
            {
              role: 'user',
              content: [{ type: 'text', text: prompt.trim() }],
            },
          ],
          temperature: 0.7,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const reply =
        res.data?.candidates?.[0]?.content?.[0]?.text ||
        'No response from AI.';
      setAiResponse(reply);
    } catch (err) {
      console.error(err);
      setAiResponse('Failed to fetch AI feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Get AI Feedback"
        onPress={fetchAIResponse}
        disabled={loading}
      />
      {loading && <ActivityIndicator size="large" style={{ marginTop: 10 }} />}
      {aiResponse ? (
        <ScrollView style={styles.responseBox}>
          <Markdown>{`**AI Feedback:** ${aiResponse}`}</Markdown>
        </ScrollView>
      ) : null}
    </View>
  );
};

export default TutorialFeedback;

const styles = StyleSheet.create({
  container: { marginTop: 10 },
  responseBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f4ff',
    borderRadius: 8,
    maxHeight: 300,
  },
});
