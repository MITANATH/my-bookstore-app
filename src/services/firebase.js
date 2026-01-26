// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmAFTivoDgmC7ceFY8gR8xTE_e19xHYzQ",
  authDomain: "my-bookstore-app-cb586.firebaseapp.com",
  projectId: "my-bookstore-app-cb586",
  storageBucket: "my-bookstore-app-cb586.firebasestorage.app",
  messagingSenderId: "573885318308",
  appId: "1:573885318308:web:b5bfd1d7a04d65fcd3d231",
  measurementId: "G-DPGQZQNQFB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export default app;