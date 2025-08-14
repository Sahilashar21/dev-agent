// firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (from Firebase console)
const firebaseConfig = {
  apiKey: 'AIzaSyAmXz51Aq9_rk75EbIXtDcMtVlxI-bMfmo',
  authDomain: 'developer-agent-e9713.firebaseapp.com',
  projectId: 'developer-agent-e9713',
  storageBucket: 'developer-agent-e9713.appspot.com',
  messagingSenderId: '1016062478214',
  appId: '1:1016062478214:web:c7d2a60c08f201a8dd8e07',
  measurementId: 'G-GSCK6NXH5N',
  // ❌ Do NOT include databaseURL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore instance
const db = getFirestore(app);

export default db;
