import { app } from "./src/firebaseConfig.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const location = document.getElementById("location").value;
    const email = document.getElementById("email").value;
    const giTag = document.getElementById("gi-tag").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            location: location,
            email: email,
            giTag: giTag,
            uid: user.uid
        });

        alert("Account created successfully!");
        window.location.href = "profile.html";  // Redirect to profile page
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});
