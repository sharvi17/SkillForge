ocument.addEventListener("DOMContentLoaded", function () {
    displayExhibitions();

    // Category Filter
    document.getElementById("categoryFilter").addEventListener("change", function () {
        displayExhibitions(this.value);
    });
});

// Dummy Exhibitions Data
const exhibitions = [
    { name: "Pottery Expo", description: "Handmade clay pottery", location: "Mumbai", category: "Pottery", duration: "2025-05-01 to 2025-05-10", status: "Ongoing" },
    { name: "Weaving Wonders", description: "Traditional handlooms", location: "Delhi", category: "Weaving", duration: "2025-06-05 to 2025-06-15", status: "Upcoming" },
    { name: "Wooden Creations", description: "Fine carpentry art", location: "Chennai", category: "Carpentry", duration: "2025-04-10 to 2025-04-20", status: "Ongoing" },
    { name: "Artistic Strokes", description: "Paintings exhibition", location: "Bangalore", category: "Painting", duration: "2025-07-01 to 2025-07-10", status: "Upcoming" }
];

// Function to Display Exhibitions
function displayExhibitions(filterCategory = "All") {
    const container = document.getElementById("exhibitionContainer");
    container.innerHTML = "";

    exhibitions.forEach(exhibition => {
        if (filterCategory === "All" || exhibition.category === filterCategory) {
            let card = document.createElement("div");
            card.classList.add("exhibition-card");

            card.innerHTML = `
                <p><strong>Exhibition Name:</strong> ${exhibition.name}</p>
                <p><strong>Description:</strong> ${exhibition.description}</p>
                <p>📍 <strong>Location:</strong> ${exhibition.location}</p>
                <p><strong>Category:</strong> ${exhibition.category}</p>
                <p>🗓️ <strong>Duration:</strong> ${exhibition.duration}</p>
                <p><strong>Status:</strong> ${exhibition.status}</p>
                <button onclick="viewExhibition('${exhibition.name}')">View</button>
                
            `;

            container.appendChild(card);
        }
    });
}

// View Button Action
function viewExhibition(exhibitionName) {
    alert(`Viewing details for ${exhibitionName}`);
}

