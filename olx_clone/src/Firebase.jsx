import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjSg7SGO0vJZyvsgDKy5lvpULMgiY2NPY",
  authDomain: "olxclone-981a2.firebaseapp.com",
  projectId: "olxclone-981a2",
  storageBucket: "olxclone-981a2.appspot.com",
  messagingSenderId: "451375498499",
  appId: "1:451375498499:web:69e19270cf8e15f68b5536"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
export default app;
