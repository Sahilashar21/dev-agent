import { useRouter } from "expo-router";
import he from "he";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

/** ----- Types ----- */
type Difficulty = "easy" | "medium" | "hard";
type UiCategory = "frontend" | "backend" | "db" | "dsa";

type OTDBQuestion = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type Q = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};

type QWithUserAnswer = Q & { userAnswerIndex?: number };

type JsonOption = { id: string; text: string; isCorrect: boolean };
type JsonQuestion = {
  category: string;
  difficulty: string;
  question: string;
  options: JsonOption[];
  explanation?: string;
};

/** ----- OTDB categories to pull from ----- */
const OTDB_CATS: Record<UiCategory, number[]> = {
  frontend: [18, 9],
  backend: [18, 9],
  db: [18, 9],
  dsa: [19, 18],
};

/** ----- Helpers ----- */
const decodeHtml = (s: string) => he.decode(s);
const shuffle = <T,>(arr: T[]) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

// Keyword filtering only for OTDB
const CATEGORY_KEYWORDS: Record<UiCategory, string[]> = {
  frontend: ["html","css","javascript","typescript","react","vue","angular","dom","browser","layout","flexbox","grid","accessibility","semantics","frontend"],
  backend: ["api","http","https","rest","graphql","server","node","express","django","spring","php","laravel","ruby","rails","authentication","authorization","session","jwt","cache","redis","backend"],
  db: ["database","sql","mysql","postgres","sqlite","mongodb","index","query","join","normalization","acid","transaction","primary key","foreign key","db","database"],
  dsa: ["algorithm","time complexity","space complexity","big-o","datastructure","data structure","stack","queue","tree","graph","hash","binary","sort","search","recursion","dynamic programming","dsa","algorithm"],
};

function normalizeJsonQuestions(questions: JsonQuestion[]): QWithUserAnswer[] {
  return questions.map((q, idx) => {
    const options = q.options.map(opt => opt.text);
    const correctIndex = q.options.findIndex(opt => opt.isCorrect);
    return {
      id: `${Date.now()}_${idx}_${Math.random().toString(36).slice(2,6)}`,
      question: q.question,
      options,
      correctIndex,
    };
  });
}

function normalizeOTDB(questions: OTDBQuestion[]): QWithUserAnswer[] {
  return questions.map((q, idx) => {
    const decodedQ = decodeHtml(q.question);
    const options = shuffle([q.correct_answer, ...q.incorrect_answers].map(decodeHtml));
    const correctIndex = options.findIndex((o) => o === decodeHtml(q.correct_answer));
    return { id: `${Date.now()}_${idx}_${Math.random().toString(36).slice(2,6)}`, question: decodedQ, options, correctIndex };
  });
}

function filterOTDBByKeywords(qs: QWithUserAnswer[], cat: UiCategory): QWithUserAnswer[] {
  const keys = CATEGORY_KEYWORDS[cat];
  return qs.filter(q => keys.some(k => q.question.toLowerCase().includes(k) || q.options.some(o => o.toLowerCase().includes(k))));
}

// Local JSON fallback
const LOCAL_FALLBACK: JsonQuestion[] = require("../../fallback_quiz_questions.json");

/** ----- Component ----- */
export default function QuizPlay() {
  const router = useRouter();

  /** --- pre-quiz selection state --- */
  const [category, setCategory] = useState<UiCategory>("frontend");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [count, setCount] = useState("10");
  const [quizStarted, setQuizStarted] = useState(false);

  /** --- quiz state --- */
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QWithUserAnswer[]>([]);
  const [stage, setStage] = useState<"playing" | "result">("playing");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  const desiredCount = Math.max(1, Math.min(50, Number(count)));

  /** ----- Timer ----- */
  useEffect(() => {
    if (!quizStarted || stage !== "playing") return;
    if (current >= questions.length) return;
    if (timeLeft === 0) {
      setCurrent((c) => c + 1);
      setTimeLeft(15);
      return;
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, stage, current, questions.length, quizStarted]);

  const progress = useMemo(() => (questions.length ? (current / questions.length) * 100 : 0), [current, questions.length]);

  /** ----- Fetch OTDB ----- */
  async function fetchFromOTDB(amount: number, otdbCategory: number, difficulty: Difficulty) {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${otdbCategory}&difficulty=${difficulty}&type=multiple`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`OTDB HTTP ${res.status}`);
    const data = await res.json();
    return (data?.results ?? []) as OTDBQuestion[];
  }

  /** ----- Load Questions ----- */
  const loadQuestions = async () => {
    setLoading(true);
    try {
      // 1️⃣ Load from local JSON first
      const filteredJson = LOCAL_FALLBACK.filter(q =>
        q.category.toLowerCase() === category && q.difficulty === difficulty
      );
      let normalized = normalizeJsonQuestions(filteredJson);

      // 2️⃣ If local not enough, fetch from OTDB
      if (normalized.length < desiredCount) {
        const remaining = desiredCount - normalized.length;
        const pools = OTDB_CATS[category] ?? [18];
        let otQuestions: OTDBQuestion[] = [];

        for (const c of pools) {
          try {
            const got = await fetchFromOTDB(30, c, difficulty);
            otQuestions.push(...got);
          } catch (e) {
            console.warn("OTDB pool error", e);
          }
        }

        const normalizedOT = normalizeOTDB(otQuestions);
        const filteredOT = filterOTDBByKeywords(normalizedOT, category);
        const extra = shuffle(filteredOT).slice(0, remaining);
        normalized = [...normalized, ...extra];
      }

      setQuestions(shuffle(normalized).slice(0, desiredCount));

    } catch (e) {
      console.error("loadQuestions error", e);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    loadQuestions();
  };

  const handleAnswer = (idx: number) => {
    const q = questions[current];
    if (!q) return;

    const updatedQuestions = [...questions];
    updatedQuestions[current] = { ...q, userAnswerIndex: idx };
    setQuestions(updatedQuestions);

    if (idx === q.correctIndex) setScore((s) => s + 1);

    const next = current + 1;
    if (next >= questions.length) {
      setStage("result");
      router.push({
        pathname: "/quiz/result",
        params: {
          score: String(score + (idx === q.correctIndex ? 1 : 0)),
          total: String(questions.length),
          questions: JSON.stringify(updatedQuestions),
        },
      });
    } else {
      setCurrent(next);
      setTimeLeft(15);
    }
  };

  /** ----- UI ----- */
  if (!quizStarted) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Select Quiz Options</Text>

          <Text style={styles.label}>Category</Text>
          <View style={styles.row}>
            {(["frontend","backend","db","dsa"] as const).map(c => (
              <TouchableOpacity key={c} style={[styles.btn, category === c && styles.btnSelected]} onPress={() => setCategory(c)}>
                <Text style={category === c ? styles.btnTextSelected : styles.btnText}>{c.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Difficulty</Text>
          <View style={styles.row}>
            {(["easy","medium","hard"] as const).map(d => (
              <TouchableOpacity key={d} style={[styles.btn, difficulty === d && styles.btnSelected]} onPress={() => setDifficulty(d)}>
                <Text style={difficulty === d ? styles.btnTextSelected : styles.btnText}>{d.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Number of Questions</Text>
          <TextInput style={styles.input} keyboardType="number-pad" value={count} onChangeText={setCount} placeholder="Enter number of questions" />

          <TouchableOpacity style={styles.startBtn} onPress={startQuiz}>
            <Text style={styles.startText}>Start Quiz</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#111827" />
          <Text style={{ marginTop: 12 }}>Loading questions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!questions.length) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}><Text>No questions available.</Text></View>
      </SafeAreaView>
    );
  }

  const q = questions[current];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.smallMuted}>{category.toUpperCase()} • {difficulty?.toUpperCase()}</Text>
        <Text style={styles.timer}>⏱ {timeLeft}s</Text>

        <View style={styles.progressBarOuter}>
          <View style={[styles.progressBarInner, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.qCount}>Question {current + 1} / {questions.length}</Text>
        <Text style={styles.question}>{q.question}</Text>

        <View style={{ marginTop: 12 }}>
          {q.options.map((opt, i) => (
            <TouchableOpacity key={i} style={styles.optionBtn} onPress={() => handleAnswer(i)}>
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.smallMuted}>Score: {score}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

/** ----- Styles ----- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { padding: 16 },
  smallMuted: { color: "#6B7280" },
  timer: { fontWeight: "800", fontSize: 16, color: "#111827", marginTop: 4 },
  progressBarOuter: { height: 8, backgroundColor: "#E5E7EB", borderRadius: 999, overflow: "hidden", marginTop: 8 },
  progressBarInner: { height: 8, backgroundColor: "#111827" },
  qCount: { color: "#6B7280", fontWeight: "600", marginTop: 8 },
  question: { fontSize: 18, fontWeight: "700", color: "#111827", marginTop: 6 },
  optionBtn: { borderWidth: 1, borderColor: "#D1D5DB", borderRadius: 10, padding: 12, marginBottom: 8 },
  optionText: { color: "#111827", fontWeight: "600" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 24, textAlign: "center" },
  label: { fontSize: 16, fontWeight: "600", marginTop: 12 },
  row: { flexDirection: "row", flexWrap: "wrap", marginVertical: 8 },
  btn: { borderWidth: 1, borderColor: "#D1D5DB", borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12, marginRight: 8, marginBottom: 8 },
  btnSelected: { backgroundColor: "#111827", borderColor: "#111827" },
  btnText: { color: "#111827", fontWeight: "600" },
  btnTextSelected: { color: "#fff", fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#D1D5DB", borderRadius: 8, padding: 10, marginTop: 8 },
  startBtn: { backgroundColor: "#111827", borderRadius: 8, padding: 14, marginTop: 24, alignItems: "center" },
  startText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
