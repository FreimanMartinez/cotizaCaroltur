import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCETwYIy4iCD90uAiZdcAfpxj_TnAxIAoE",
  authDomain: "caroltur-2023.firebaseapp.com",
  projectId: "caroltur-2023",
  storageBucket: "caroltur-2023.appspot.com",
  messagingSenderId: "361032402066",
  appId: "1:361032402066:web:a9977ea2537a3d6c74d24b"
};

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase)
export const store=getStorage(firebase)
export default firebase;