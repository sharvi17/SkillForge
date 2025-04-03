// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Firebase Config
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

// DOM Elements
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("search-results");

// Function to Perform Firestore Search
const searchFirestore = async () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (!searchTerm) {
        alert("Please enter a search term!");
        return;
    }

    searchResults.innerHTML = `<p>Searching...</p>`;

    try {
        console.log("Searching for:", searchTerm);

        // Search by Business Name (stored in lower case for easier comparison)
        const nameQuery = query(collection(db, "businesses"), where("nameLower", "==", searchTerm));
        const nameSnapshot = await getDocs(nameQuery);
        console.log("Name Query Results:", nameSnapshot.docs);

        // Search by Product (case-insensitive search for array elements)
        const productQuery = query(collection(db, "businesses"), where("products", "array-contains", searchTerm));
        const productSnapshot = await getDocs(productQuery);
        console.log("Product Query Results:", productSnapshot.docs);

        // Search by GI Tag
        const giTagQuery = query(collection(db, "businesses"), where("giTag", "==", searchTerm));
        const giTagSnapshot = await getDocs(giTagQuery);
        console.log("GI Tag Query Results:", giTagSnapshot.docs);

        // Display Results
        let resultsHTML = "";
        let found = false;

        // Display business name results
        nameSnapshot.forEach(doc => {
            const data = doc.data();
            resultsHTML += `<div>
                <strong>Business:</strong> ${data.name}<br>
                <strong>Location:</strong> ${data.location}<br>
                <strong>Products:</strong> ${data.products.join(", ")}<br>
                <strong>GI Tag:</strong> ${data.giTag}
            </div><hr>`;
            found = true;
        });

        // Display product results
        productSnapshot.forEach(doc => {
            const data = doc.data();
            resultsHTML += `<div>
                <strong>Business:</strong> ${data.name}<br>
                <strong>Location:</strong> ${data.location}<br>
                <strong>Products:</strong> ${data.products.join(", ")}<br>
                <strong>GI Tag:</strong> ${data.giTag}
            </div><hr>`;
            found = true;
        });

        // Display GI tag results
        giTagSnapshot.forEach(doc => {
            const data = doc.data();
            resultsHTML += `<div>
                <strong>Business:</strong> ${data.name}<br>
                <strong>Location:</strong> ${data.location}<br>
                <strong>Products:</strong> ${data.products.join(", ")}<br>
                <strong>GI Tag:</strong> ${data.giTag}
            </div><hr>`;
            found = true;
        });

        // Show results or no results message
        searchResults.innerHTML = found ? resultsHTML : `<p>No results found for "${searchTerm}".</p>`;

    } catch (error) {
        console.error("Error searching Firestore:", error);
        searchResults.innerHTML = `<p>Error searching Firestore. Try again later.</p>`;
    }
};

// Event listener for search button
searchButton.addEventListener("click", searchFirestore);
