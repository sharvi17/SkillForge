// ✅ Import Firebase as a module (correct way for Firebase v10+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// ✅ Your Firebase config (replace with actual config values)
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
const storage = getStorage(app);

console.log("Firebase Initialized Successfully!");

// ✅ Handle Form Submission
document.getElementById("registration-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const artworkTitle = document.getElementById("artwork_title").value;
    const price = document.getElementById("price").value;
    const imageFile = document.getElementById("imageUpload").files[0];

    if (!imageFile) {
        alert("Please upload an artwork image.");
        return;
    }

    try {
        // ✅ Upload Image to Firebase Storage
        const storageRef = ref(storage, `artworks/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const imageUrl = await getDownloadURL(storageRef);

        // ✅ Save Form Data to Firestore
        await addDoc(collection(db, "exhibition_registrations"), {
            name: name,
            email: email,
            artworkTitle: artworkTitle,
            price: price,
            imageUrl: imageUrl,
            timestamp: new Date()
        });

        alert("Registration successful!");
        document.getElementById("registration-form").reset();
    } catch (error) {
        console.error("Error registering:", error);
        alert("Error registering. Please try again.");
    }
});
