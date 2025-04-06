import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";




// ✅ Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCYQBMwKw3StqGIJ1OP0Qnk9c0UmnatnQk",
    authDomain: "skillforge-8e5b3.firebaseapp.com",
    projectId: "skillforge-8e5b3",
    storageBucket: "skillforge-8e5b3.appspot.com",
    messagingSenderId: "126378296654",
    appId: "1:126378296654:web:d3f0f7abb3fa444caf0a1f",
    measurementId: "G-E6X2VQV0TN"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

console.log("Firebase Initialized Successfully!");
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in:", user.email);
        // Allow submission logic here if needed
    } else {
        console.warn("User is NOT signed in. Redirecting or disabling form.");
        alert("You must be signed in to register.");
        // You can disable the form or redirect to login
        // document.getElementById("registration-form").style.display = "none";
    }
});


// ✅ Handle Form Submission
document.getElementById("registration-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const artworkTitle = document.getElementById("artwork_title").value;
    const price = document.getElementById("price").value;
    const imageUrl = document.getElementById("imageURL").value;

    if (!imageUrl.startsWith("https://")) {
        alert("Please paste a valid Google Drive image link.");
        return;
    }

    try {
        await addDoc(collection(db, "exhibition_registrations"), {
            name,
            email,
            artworkTitle,
            price,
            imageUrl,
            timestamp: new Date()
        });

        alert("Registration successful!");
        document.getElementById("registration-form").reset();
    } catch (error) {
        console.error("Error registering:", error);
        alert("Error registering. Please try again.");
    }
});
