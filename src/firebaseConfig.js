import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCYQBMwKw3StqGIJ1OP0Qnk9c0UmnatnQk",
    authDomain: "skillforge-8e5b3.firebaseapp.com",
    projectId: "skillforge-8e5b3",
    storageBucket: "skillforge-8e5b3.appspot.com",
    messagingSenderId: "126378296654",
    appId: "1:126378296654:web:d3f0f7abb3fa444caf0a1f",
    measurementId: "G-E6X2VQV0TN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
