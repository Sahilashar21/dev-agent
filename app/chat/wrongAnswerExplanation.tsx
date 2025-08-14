import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Markdown from "react-native-markdown-display";

const GEMINI_API_KEY = "AIzaSyCtuMoqszvl0tyjtf8tkTfLn4XhFJ0vPE0";

interface WrongAnswerProps {
  question: string;
  correctAnswer: string;
  userAnswer: string; // ✅ add this
}

const WrongAnswerExplanation: React.FC<WrongAnswerProps> = ({ question, correctAnswer, userAnswer }) => {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExplanation = async () => {
      setLoading(true);
      try {
        const prompt = `
You are a Dev Agent AI tutor. A student answered a question incorrectly.
Question: "${question}"
Correct answer: "${correctAnswer}"
Student's answer: "${userAnswer}"

Provide a beginner-friendly explanation why the correct answer is correct and why the student's answer is wrong. Explain it step by step.
 suggest some books or youtube videos from where user can study about ${correctAnswer}`;

        const res = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
          { contents: [{ parts: [{ text: prompt }] }] },
          { headers: { "Content-Type": "application/json" } }
        );

        const reply =
          res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No explanation generated.";
        setResponse(reply);
      } catch (err) {
        console.error(err);
        setError("Failed to load AI explanation.");
      } finally {
        setLoading(false);
      }
    };

    fetchExplanation();
  }, [question, correctAnswer, userAnswer]);

  if (loading) return <ActivityIndicator size="small" color="#3D5AFE" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Why this answer is correct</Text>
      <Markdown style={markdownStyles}>{response}</Markdown>
    </View>
  );
};


export default WrongAnswerExplanation;

const markdownStyles = {
  body: { fontSize: 15, color: "#333" },
  heading1: { fontSize: 20, fontWeight: "bold", color: "#1E88E5", marginBottom: 8 },
  strong: { fontWeight: "700" },
  code_inline: { backgroundColor: "#e0e0e0", borderRadius: 4, paddingHorizontal: 4, paddingVertical: 2, fontFamily: "monospace", fontSize: 14 },
  code_block: { backgroundColor: "#f4f4f4", padding: 10, borderRadius: 6, fontFamily: "monospace", fontSize: 14 },
};

const styles = StyleSheet.create({
  container: { padding: 16, marginTop: 16, borderRadius: 12, backgroundColor: "#fff3f0", borderLeftWidth: 4, borderLeftColor: "#FF5722" },
  heading: { fontSize: 16, fontWeight: "700", marginBottom: 8, color: "#FF5722" },
  error: { color: "red", marginBottom: 10 },
});
