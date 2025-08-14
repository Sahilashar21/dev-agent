// uploadQuestions.js
import { addDoc, collection } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import db from "./firebase/firebase.js";

// ES Modules __dirname handling
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your JSON file
const questionsPath = path.join(__dirname, "fallback_quiz_questions.json");

// Read and parse JSON
const questionsData = JSON.parse(fs.readFileSync(questionsPath, "utf8"));

async function uploadQuestions() {
  try {
    for (const category in questionsData) {
      for (const difficulty in questionsData[category]) {
        for (const question of questionsData[category][difficulty]) {
          await addDoc(collection(db, "quizQuestions"), {
            category,
            difficulty,
            ...question
          });
        }
      }
    }
    console.log("✅ Questions uploaded to Firestore!");
  } catch (error) {
    console.error("❌ Error uploading questions:", error);
  }
}

uploadQuestions();
