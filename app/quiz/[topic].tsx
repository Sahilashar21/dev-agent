import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../../firebase/firebaseConfig";

type Question = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};

const QuizScreen = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchQuiz = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "quizzes"));
      const qData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Question[];
      setQuestions(qData);
    } catch (e) {
      console.error("Error fetching quiz:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleOptionSelect = (option: string) => setSelected(option);

  const handleNext = () => {
    if (!selected) return;

    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setSubmitted(true);
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#3D5AFE" />;

  if (submitted)
    return (
      <View style={styles.container}>
        <Text style={styles.result}>Quiz Completed!</Text>
        <Text style={styles.score}>Your Score: {score} / {questions.length}</Text>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.question}>Q{current + 1}. {questions[current]?.question}</Text>
      {questions[current]?.options.map((opt, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleOptionSelect(opt)}
          style={[
            styles.option,
            selected === opt && { backgroundColor: "#BBDEFB" }
          ]}
        >
          <Text>{opt}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={handleNext} style={styles.button}>
        <Text style={styles.buttonText}>{current + 1 === questions.length ? "Submit" : "Next"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "center"
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold"
  },
  option: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },
  button: {
    backgroundColor: "#3D5AFE",
    padding: 12,
    borderRadius: 8,
    marginTop: 20
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  },
  result: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  score: {
    fontSize: 18,
    textAlign: "center"
  }
});
