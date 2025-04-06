// Import Firebase modules correctly
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCYQBMwKw3StqGIJ1OP0Qnk9c0UmnatnQk",
    authDomain: "skillforge-8e5b3.firebaseapp.com",
    projectId: "skillforge-8e5b3",
    storageBucket: "skillforge-8e5b3.appspot.com",
    messagingSenderId: "126378296654",
    appId: "1:126378296654:web:d3f0f7abb3fa444caf0a1f",
    measurementId: "G-E6X2VQV0TN"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Wait until DOM loads
document.addEventListener("DOMContentLoaded", () => {
    const createBtn = document.getElementById("createExhibition");

    // Make sure the user is signed in
    onAuthStateChanged(auth, user => {
        if (!user) {
            alert("You must be logged in to initiate an exhibition.");
            return;
        }

        createBtn.addEventListener("click", async () => {
            const exhibitionName = document.getElementById("exhibitionName").value;
            const description = document.getElementById("description").value;
            const category = document.getElementById("category").value;
            const location = document.getElementById("location").value;
            const fromDate = document.getElementById("fromDate").value;
            const toDate = document.getElementById("toDate").value;

            if (!exhibitionName || !category || !location || !fromDate || !toDate) {
                alert("Please fill in all required fields.");
                return;
            }

            try {
                await addDoc(collection(db, "exhibitions"), {
                    exhibitionName,
                    description,
                    category,
                    location,
                    fromDate,
                    toDate,
                    createdBy: user.uid,
                    createdAt: new Date()
                });
                alert("Exhibition created successfully!");
                window.location.href = "exhibitions.html";
            } catch (error) {
                console.error("Error creating exhibition:", error);
                alert("Failed to create exhibition.");
            }
        });
    });
});

