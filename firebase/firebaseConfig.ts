import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmXz51Aq9_rk75EbIXtDcMtVlxI-bMfmo",
  authDomain: "developer-agent-e9713.firebaseapp.com",
  projectId: "developer-agent-e9713",
  storageBucket: "developer-agent-e9713.firebasestorage.app",
  messagingSenderId: "1016062478214",
  appId: "1:1016062478214:web:c7d2a60c08f201a8dd8e07",
  measurementId: "G-GSCK6NXH5N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };

