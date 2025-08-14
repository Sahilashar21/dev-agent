import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WrongAnswerExplanation from "../chat/wrongAnswerExplanation";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  userAnswerIndex: number;
}

export default function QuizResult() {
  const params = useLocalSearchParams();
  const router = useRouter();
  
  const score = Number(params.score ?? 0);
  const total = Number(params.total ?? 0);

  // Parse questions array from string param (must be JSON.stringified in quiz.tsx)
  const questions: QuizQuestion[] = params.questions ? JSON.parse(params.questions as string) : [];

  const wrongQuestions = questions.filter(q => q.userAnswerIndex !== q.correctIndex);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>All done! 🎉</Text>
        <Text style={styles.score}>Score: {score} / {total}</Text>

        <TouchableOpacity style={styles.btn} onPress={() => router.push("/quiz")}>
          <Text style={styles.btnText}>Back to Categories</Text>
        </TouchableOpacity>

        {wrongQuestions.length > 0 && (
          <View style={{ marginTop: 24 }}>
            <Text style={styles.subtitle}>Explanations for wrong answers:</Text>
            {wrongQuestions.map((q, idx) => (
              <View key={idx} style={styles.wrongContainer}>
                <Text style={styles.question}>{q.question}</Text>
                <Text style={styles.correctAnswer}>Correct Answer: {q.options[q.correctIndex]}</Text>

                {/* Gemini API explanation */}
                <WrongAnswerExplanation
                  question={q.question}
                  correctAnswer={q.options[q.correctIndex]}
                  userAnswer={q.options[q.userAnswerIndex]}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 24 },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 8 },
  score: { fontSize: 18, marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  btn: { backgroundColor: "#111827", padding: 12, borderRadius: 8, marginBottom: 16 },
  btnText: { color: "#fff", fontWeight: "700" },
  wrongContainer: { marginBottom: 24, padding: 12, borderWidth: 1, borderColor: "#D1D5DB", borderRadius: 10, backgroundColor: "#f9fafb" },
  question: { fontWeight: "600", marginBottom: 4 },
  correctAnswer: { color: "#059669", fontWeight: "600", marginBottom: 8 },
});
