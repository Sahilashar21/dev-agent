// components/AdminPanel.tsx
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { db } from '../../firebase/firebaseConfig'; // make sure db is exported from here

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const AdminPanel = () => {
  const [quizTitle, setQuizTitle] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([
    { question: '', options: ['', '', '', ''], answer: '' },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], answer: '' },
    ]);
  };

  const handleQuestionChange = (
    index: number,
    field: 'question' | 'answer' | number,
    value: string
  ) => {
    const updated = [...questions];
    if (field === 'question' || field === 'answer') {
      updated[index][field] = value;
    } else {
      updated[index].options[field] = value;
    }
    setQuestions(updated);
  };

  const submitQuiz = async () => {
    if (!quizTitle.trim()) {
      alert('Quiz title is required.');
      return;
    }

    try {
      await addDoc(collection(db, 'quizzes'), {
        title: quizTitle.trim(),
        questions,
      });

      alert('Quiz uploaded successfully!');
      setQuizTitle('');
      setQuestions([{ question: '', options: ['', '', '', ''], answer: '' }]);
    } catch (error) {
      console.error('Error uploading quiz:', error);
      alert('Failed to upload quiz.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Create a New Quiz</Text>

      <TextInput
        style={styles.input}
        placeholder="Quiz Title"
        value={quizTitle}
        onChangeText={setQuizTitle}
      />

      {questions.map((q, index) => (
        <View key={index} style={styles.questionBlock}>
          <TextInput
            style={styles.input}
            placeholder={`Question ${index + 1}`}
            value={q.question}
            onChangeText={(text) =>
              handleQuestionChange(index, 'question', text)
            }
          />
          {q.options.map((opt, i) => (
            <TextInput
              key={i}
              style={styles.input}
              placeholder={`Option ${String.fromCharCode(65 + i)}`}
              value={opt}
              onChangeText={(text) => handleQuestionChange(index, i, text)}
            />
          ))}
          <TextInput
            style={styles.input}
            placeholder="Correct Answer"
            value={q.answer}
            onChangeText={(text) =>
              handleQuestionChange(index, 'answer', text)
            }
          />
        </View>
      ))}

      <Button title="Add Another Question" onPress={addQuestion} />
      <View style={{ height: 12 }} />
      <Button title="Submit Quiz" onPress={submitQuiz} color="#4f46e5" />
    </ScrollView>
  );
};

export default AdminPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
  },
  questionBlock: {
    marginBottom: 24,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
});
