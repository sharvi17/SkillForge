import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBgmyk6qgKezvHreR1dNzjOrPSsLDj-T3M",
    authDomain: "skillforge123c.firebaseapp.com",
    projectId: "skillforge123c",
    storageBucket: "skillforge123c.firebasestorage.app",
    messagingSenderId: "369787571092",
    appId: "1:369787571092:web:2e35dc93a9c4eb8c699d81",
    measurementId: "G-FR149VM4YC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.getElementById("google-login").addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            localStorage.setItem("username", user.displayName || "User");
            window.location.href = "old_index.html";
        })
        .catch((error) => {
            alert("Google sign-in failed: " + error.message);
        });
});
