// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsuHpXQYWSfGUTT3LP4PrvdqQ6czVMp0w",
  authDomain: "itemtracker-be97c.firebaseapp.com",
  projectId: "itemtracker-be97c",
  storageBucket: "itemtracker-be97c.firebasestorage.app",
  messagingSenderId: "764373621577",
  appId: "1:764373621577:web:706df0f7c7cd786ed01898",
  measurementId: "G-1XNRXXNJYW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };