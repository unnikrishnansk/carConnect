// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBY0fFPm8ox8-UelM8amX_0GX-4RlcQrtk",
  authDomain: "carconnect-authentication.firebaseapp.com",
  projectId: "carconnect-authentication",
  storageBucket: "carconnect-authentication.appspot.com",
  messagingSenderId: "739574436717",
  appId: "1:739574436717:web:784402c6bed3e02d2a4064",
  measurementId: "G-LWRX7CV1YW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};
