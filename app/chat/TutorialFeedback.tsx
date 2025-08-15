// /chat/TutorialFeedback.tsx
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Markdown from 'react-native-markdown-display';

type Props = {
  prompt: string;
  disabled: boolean;
  skillLevel?: string;
  videoTitle: string;
};

const GEMINI_API_KEY = "AIzaSyCtuMoqszvl0tyjtf8tkTfLn4XhFJ0vPE0";

const GeminiChat = ({ prompt, disabled, skillLevel = 'Beginner', videoTitle }: Props) => {
  const router = useRouter();
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAIResponse = async () => {
    if (!prompt.trim() || disabled) return;
    setLoading(true);
    setAiResponse('');

    try {
const evaluationPrompt = `
Hey! You're chatting with your friendly coding mentor 😎. I'm here to help You learn better and have a bit of fun along the way.  

Let's look at what You just watched:

- Video Title: ${videoTitle}
- Your Skill Level: ${skillLevel}
- Your Reflection: ${prompt}

Please give feedback in **Markdown**. Keep it casual, like You’re talking to a friend. Make it fun if possible, but still helpful.  

Rules:
- Use ## headings for each section: Skill Level, Analysis, Correct, Improve, Recommendation
- Make **key concepts bold**
- Use \`inline code\` for code references
- Use bullets for lists
- Address the user as "You" and "Your" everywhere

## Skill Level
- ${skillLevel}

## Analysis
- Tell You how Your reflection matches Your skill level, in a friendly tone

## Correct
- Point out the concepts You got right (cheer You on!)

## Improve
- Suggest things You can work on, but keep it encouraging and fun

## Recommendation
- Give practical next steps, maybe with little tips or jokes to make learning lighter
`;
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: evaluationPrompt.trim() }] }],
          generationConfig: { temperature: 0.5, topP: 1, topK: 40, maxOutputTokens: 2048 }
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      let reply = res.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI.';

      // Post-process: Make all ## headings bold if AI missed it
      reply = reply.replace(/^## (.+)$/gm, '**$1**');

      setAiResponse(reply);

    } catch (err: any) {
      console.error('Gemini API Error:', err.response?.data || err.message);
      setAiResponse(`Error: ${err.response?.data?.error?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChatRedirect = () => router.push('/chat');
  const displaySkillLevel = skillLevel;

  return (
    <View style={styles.container}>
      <Button
        title="Evaluate My Learning"
        onPress={fetchAIResponse}
        disabled={loading || disabled}
      />

      {loading && <ActivityIndicator size="large" style={styles.loader} />}

      {aiResponse ? (
        <ScrollView style={styles.responseBox}>
          <Markdown style={markdownStyles}>
            {aiResponse}
          </Markdown>

          <View style={styles.skillLevelBadge}>
            <Text style={styles.badgeText}>
              Current Skill Level: {displaySkillLevel}
            </Text>
          </View>

          <Button
            title="Need More Help? Chat Now"
            onPress={handleChatRedirect}
            color="#3D5AFE"
            style={styles.chatButton}
          />
        </ScrollView>
      ) : null}
    </View>
  );
};

export default GeminiChat;

const markdownStyles: { [key: string]: any } = {
  body: { fontSize: 15, color: '#333' },
  strong: { fontWeight: 'bold' as const },
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
  heading1: { fontSize: 20, fontWeight: 'bold' as const, color: '#1E88E5', marginBottom: 6 },
  heading2: { fontSize: 18, fontWeight: 'bold' as const, color: '#3949AB', marginBottom: 4 },
  bullet_list: { marginVertical: 6, marginLeft: 12 },
};

const styles = StyleSheet.create({
  container: { marginTop: 10, padding: 16, backgroundColor: '#fff' },
  loader: { marginTop: 10, marginBottom: 10 },
  responseBox: {
    marginTop: 10,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    maxHeight: 400,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  skillLevelBadge: {
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 15,
    backgroundColor: '#3D5AFE',
    width: '80%',
    alignItems: 'center'
  },
  badgeText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  chatButton: { marginTop: 20, marginBottom: 10 }
});
