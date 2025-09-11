import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import problemsData from "./dsaQuestions.json";

type User = {
  id: string;
  name: string;
  email: string;
  solvedCount: number;
  solvedProblems?: string[];
};

type Problem = {
  id: string;
  title: string;
  statement: string;
  input: string;
  output: string;
};

export default function TopicScreen() {
  const { topic } = useLocalSearchParams();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState("");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem("user");
      if (!stored) {
        router.replace("/dsa/login");
        return;
      }
      setUser(JSON.parse(stored));
      setLoading(false);
    };
    loadUser();
  }, []);

  const handleSubmit = async () => {
    if (!selectedProblem || !user) return;
    setRunning(true);

    try {
      // ✅ User's code will be wrapped inside a function
      const func = new Function("input", code);

      const parsedInput = JSON.parse(selectedProblem.input); // from JSON file
      const got = func(parsedInput); // run user code
      const expected = JSON.parse(selectedProblem.output);

      if (JSON.stringify(got) === JSON.stringify(expected)) {
        Alert.alert("✅ Correct!", "Your code produced the right output.");

        const solvedProblems = user.solvedProblems || [];
        if (!solvedProblems.includes(selectedProblem.id)) {
          const updatedUser = {
            ...user,
            solvedProblems: [...solvedProblems, selectedProblem.id],
            solvedCount: user.solvedCount + 1,
          };
          setUser(updatedUser);
          await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
        }
      } else {
        Alert.alert(
          "❌ Wrong",
          `Got: ${JSON.stringify(got)}\nExpected: ${JSON.stringify(expected)}`
        );
      }
    } catch (err: any) {
      Alert.alert("Error", "Code crashed: " + err.message);
      console.error(err);
    } finally {
      setRunning(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  const problems = (problemsData as Record<string, Problem[]>)[topic as string] || [];

  if (!selectedProblem) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>📌 {topic} Problems</Text>
        {problems.map((prob) => (
          <TouchableOpacity
            key={prob.id}
            style={styles.card}
            onPress={() => setSelectedProblem(prob)}
          >
            <Text style={styles.title}>{prob.title}</Text>
            <Text style={styles.subtitle}>{prob.statement.slice(0, 60)}...</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{selectedProblem.title}</Text>
      <Text style={styles.statement}>{selectedProblem.statement}</Text>

      <Text style={styles.label}>Example Input</Text>
      <Text style={styles.example}>{selectedProblem.input}</Text>

      <Text style={styles.label}>Expected Output</Text>
      <Text style={styles.example}>{selectedProblem.output}</Text>

      <Text style={styles.label}>Write Your Code (JS)</Text>
      <TextInput
        style={styles.codeBox}
        placeholder="// Example: return Math.max(...input);"
        multiline
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={running}>
        <Text style={styles.buttonText}>{running ? "Running..." : "Run Code"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#9CA3AF" }]}
        onPress={() => setSelectedProblem(null)}
      >
        <Text style={styles.buttonText}>Back to Problems</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F9FAFB" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "600" },
  subtitle: { fontSize: 13, color: "#6B7280", marginTop: 4 },
  statement: { fontSize: 15, color: "#111827", marginBottom: 12 },
  label: { fontSize: 14, fontWeight: "600", marginTop: 10 },
  example: { fontSize: 14, color: "#374151", marginBottom: 6 },
  codeBox: {
    minHeight: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    fontFamily: "monospace",
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#3B82F6",
    padding: 14,
    borderRadius: 10,
    marginTop: 12,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
