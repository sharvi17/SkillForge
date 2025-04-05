import { app } from "./firebaseConfig.js";  // 🔍 Check the path (should not be `./src/firebaseConfig.js` unless it's inside `src/`)

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";


document.addEventListener("DOMContentLoaded", function () {
    console.log("script.js loaded successfully!");

    const signupForm = document.getElementById("signup-form");

    if (!signupForm) {
        console.error("Signup form not found! Check your HTML.");
        return;
    }

    console.log("Signup form found!");

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("Signup form submitted!");

        const auth = getAuth(app);
        const db = getFirestore(app);

        const name = document.getElementById("name").value;
        const location = document.getElementById("location").value;
        const email = document.getElementById("email").value;
        const giTag = document.getElementById("gi-tag").value;
        const password = document.getElementById("password").value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name: name,
                location: location,
                email: email,
                giTag: giTag,
                uid: user.uid
            });

            alert("Account created successfully!");
            console.log("Redirecting to home page..."); // Debugging log
            window.location.href = "index.html";
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });
});
