const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Enable parsing of JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample API endpoint
app.get("/api/message", (req, res) => {
    res.json({ message: "Backend connected successfully!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
