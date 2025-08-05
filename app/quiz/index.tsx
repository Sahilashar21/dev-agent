import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../../firebase/firebaseConfig';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface Quiz {
  id: string;
  title: string;
  questions?: Question[];
}

const QuizDashboard = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'quizzes'));
        const quizList = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            questions: data.questions || [],
          };
        });
        setQuizzes(quizList);
      } catch (err) {
        console.error('Error fetching quizzes:', err);
      }
    };

    fetchQuizzes();
  }, []);

  const handleSelect = (quizId: string, questionIndex: number, option: string) => {
    const key = `${quizId}_${questionIndex}`;
    setSelectedAnswers(prev => ({ ...prev, [key]: option }));
  };

  const isCorrect = (quizId: string, qIndex: number, correctAnswer: string) => {
    const key = `${quizId}_${qIndex}`;
    return selectedAnswers[key] === correctAnswer;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Available Quizzes</Text>

      {quizzes.length === 0 ? (
        <Text style={styles.noQuizText}>No quizzes found.</Text>
      ) : (
        quizzes.map((quiz, index) => (
          <View key={quiz.id} style={styles.quizCard}>
            <Text style={styles.quizTitle}>{index + 1}. {quiz.title}</Text>

            {quiz.questions?.map((q, qIndex) => {
              const answerKey = `${quiz.id}_${qIndex}`;
              const userAnswer = selectedAnswers[answerKey];
              const showResult = !!userAnswer;

              return (
                <View key={qIndex} style={styles.questionBlock}>
                  <Text style={styles.questionText}>{qIndex + 1}) {q.question}</Text>

                  {q.options.map((opt, i) => {
                    const isSelected = userAnswer === opt;
                    return (
                      <TouchableOpacity
                        key={i}
                        onPress={() => handleSelect(quiz.id, qIndex, opt)}
                        style={[
                          styles.optionButton,
                          isSelected && styles.selectedOption,
                        ]}
                        disabled={showResult}
                      >
                        <Text>{opt}</Text>
                      </TouchableOpacity>
                    );
                  })}

                  {showResult && (
                    <Text
                      style={[
                        styles.answerResult,
                        isCorrect(quiz.id, qIndex, q.answer)
                          ? styles.correct
                          : styles.incorrect,
                      ]}
                    >
                      {isCorrect(quiz.id, qIndex, q.answer)
                        ? 'Correct!'
                        : `Wrong. Answer: ${q.answer}`}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default QuizDashboard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f1f5f9',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  noQuizText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 30,
    color: 'gray',
  },
  quizCard: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  questionBlock: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
  optionButton: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 4,
    borderRadius: 6,
  },
  selectedOption: {
    backgroundColor: '#cce5ff',
  },
  answerResult: {
    marginTop: 8,
    fontStyle: 'italic',
    fontSize: 14,
  },
  correct: {
    color: 'green',
  },
  incorrect: {
    color: 'red',
  },
});
