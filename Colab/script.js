const collabData = [
    { id: 1, title: "Pottery Artisans Needed", category: "pottery", description: "Looking for skilled potters to create unique clay vases.", requirements: "Must have experience in clay modeling.", contact: "pottery@business.com" },
    { id: 2, title: "Handwoven Textiles", category: "textile", description: "Need weavers for handwoven shawls and scarves.", requirements: "Skilled in loom weaving.", contact: "textiles@business.com" },
    { id: 3, title: "Carved Wooden Sculptures", category: "woodwork", description: "Seeking artisans for high-quality wood sculptures.", requirements: "Experience with wood carving tools.", contact: "woodwork@business.com" },
    { id: 4, title: "Traditional Pottery Workshop", category: "pottery", description: "Partner with us for a pottery-making event.", requirements: "Teaching experience preferred.", contact: "event@pottery.com" },
    { id: 5, title: "Eco-friendly Textile Designs", category: "textile", description: "Work with us to create sustainable clothing.", requirements: "Organic material expertise needed.", contact: "eco@textile.com" },
    { id: 6, title: "Handmade Wooden Decor", category: "woodwork", description: "Create hand-carved furniture for our brand.", requirements: "Furniture crafting experience required.", contact: "wood@decor.com" }
];

function displayCollabs(data) {
    const container = document.getElementById("collabContainer");
    container.innerHTML = "";  // Clear previous content

    data.forEach(collab => {
        const box = document.createElement("div");
        box.className = "collab-box";
        box.innerHTML = `
            <h3>${collab.title}</h3>
            <p><strong>Category:</strong> ${collab.category}</p>
            <p><strong>Description:</strong> ${collab.description}</p>
            <p><strong>Requirements:</strong> ${collab.requirements}</p>
            <p><strong>Contact:</strong> ${collab.contact}</p>
            <button onclick="sendRequest('${collab.title}', '${collab.description}', '${collab.requirements}')">Send Collaboration Request</button>
        `;
        container.appendChild(box);
    });
}

function filterCollabs() {
    const selectedCategory = document.getElementById("category").value;

    if (selectedCategory === "all") {
        displayCollabs(collabData);
    } else {
        const filteredData = collabData.filter(collab => collab.category === selectedCategory);
        displayCollabs(filteredData);
    }
}

function sendRequest(title, description, requirements) {
    let storedRequests = JSON.parse(localStorage.getItem("collabRequests")) || [];
    storedRequests.push({ title, description, requirements, status: "Requested" });
    localStorage.setItem("collabRequests", JSON.stringify(storedRequests));

    alert("Collaboration request sent!");
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize display with all collaborations
document.addEventListener("DOMContentLoaded", () => displayCollabs(collabData));
