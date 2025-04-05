// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";


// Your web app's Firebase configuration
// Replace these values with your actual Firebase project configuration
// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCYQBMwKw3StqGIJ1OP0Qnk9c0UmnatnQk",
    authDomain: "skillforge-8e5b3.firebaseapp.com",
    projectId: "skillforge-8e5b3",
    storageBucket: "skillforge-8e5b3.appspot.com",
    messagingSenderId: "126378296654",
    appId: "1:126378296654:web:d3f0f7abb3fa444caf0a1f",
    measurementId: "G-E6X2VQV0TN"
};

const app = initializeApp(firebaseConfig);

export { app }; // Export it, don't declare again elsewhere