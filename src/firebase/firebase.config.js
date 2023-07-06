// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe5z3JJPR4xIVoVzSQa9MIfIR4jzkJcIg",
  authDomain: "audio-vibe-dd46f.firebaseapp.com",
  projectId: "audio-vibe-dd46f",
  storageBucket: "audio-vibe-dd46f.appspot.com",
  messagingSenderId: "461619501391",
  appId: "1:461619501391:web:2ab7c2eca3ce7925880d3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;