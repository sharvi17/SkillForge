// Import Firebase
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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

// ✅ Check if Firebase app is already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);


// DOM Elements
const authForm = document.getElementById("auth-form");
const signupForm = document.getElementById("signup-form");
const authContainer = document.querySelector(".auth-container");
const signupContainer = document.querySelector(".signup-container");

// Toggle between login and signup forms
document.getElementById("toggle-auth").addEventListener("click", () => {
    authContainer.style.display = "none";
    signupContainer.style.display = "block";
});

document.getElementById("toggle-login").addEventListener("click", () => {
    signupContainer.style.display = "none";
    authContainer.style.display = "block";
});

// ✅ Handle Signup Form Submission
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name").value;
    const location = document.getElementById("signup-location").value;
    const email = document.getElementById("signup-email").value;
    const giTag = document.getElementById("signup-gi-tag").value;
    const password = document.getElementById("signup-password").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user details in Firestore
        await setDoc(doc(db, "users", user.uid), {
            name,
            location,
            email,
            giTag,
            uid: user.uid
        });

        alert("Signup successful! Redirecting to login...");
        window.location.href = "auth.html";  // ✅ Redirect to login page

    } catch (error) {
        console.error("Error signing up:", error.message);
        alert("Signup failed: " + error.message);
    }
});

// ✅ Handle Login
authForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
        window.location.href = "index.html";  // ✅ Redirect to homepage
    } catch (error) {
        console.error("Error:", error.message);
        alert("Invalid login credentials.");
    }
});
