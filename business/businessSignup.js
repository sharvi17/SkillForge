import { app } from "../src/firebaseConfig.js";

import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const signupForm = document.getElementById("business-signup-form");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");
const loadingIndicator = document.getElementById("loading-indicator");

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const businessName = document.getElementById("business-name").value.trim();
    const businessLocation = document.getElementById("business-location").value.trim();
    const email = document.getElementById("email").value.trim();
    const googleProfileId = document.getElementById("google-profile-id").value.trim();
    const password = document.getElementById("password").value;
    const selectedCategories = Array.from(document.querySelectorAll('.category-select input[type="checkbox"]:checked')).map((checkbox) => checkbox.value);

    // Validation
    if (!businessName || !businessLocation || !email || !googleProfileId || !password) {
        errorMessage.textContent = "Please fill in all required fields.";
        return;
    }

    if (selectedCategories.length === 0) {
        errorMessage.textContent = "Please select at least one category.";
        return;
    }

    errorMessage.textContent = "";
    successMessage.textContent = "";
    loadingIndicator.style.display = "block"; // Show loading indicator

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "businesses", user.uid), {
            name: businessName,
            location: businessLocation,
            email: email,
            googleProfileId: googleProfileId,
            categories: selectedCategories,
            uid: user.uid,
            status: "active",
            createdAt: new Date().toISOString(),
        });

        uccessMessage.textContent = "Business account created successfully!";
        loadingIndicator.style.display = "none";
        window.location.href = "business\business-dashboard.html"; // Redirect to dashboard

    } catch (error) {
        console.error("Error:", error);
        errorMessage.textContent = `Error: ${error.message}`;
        loadingIndicator.style.display = "none"; // Hide loading indicator
    }
});