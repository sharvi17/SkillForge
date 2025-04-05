import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const location = document.getElementById("location").value;
    const email = document.getElementById("email").value;
    const giTag = document.getElementById("gi-tag").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        await setDoc(doc(db, "users", uid), {
            name: name,
            location: location,
            giTag: giTag,
            email: email
        });

        window.location.href = "index.html";
    } catch (error) {
        alert("Signup failed: " + error.message);
    }
});
