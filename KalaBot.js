export async function askKalaBot(userMessage) {
    const API_KEY = "AIzaSyCF4NKD4O01ktWWoRPWluyx9fD2MaFg8iU"; // Replace with your working key

    const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [

                role: "user",
                parts: [{ text: userMessage }]
                }
            ]
})
    });

const data = await response.json();
console.log("Gemini API Response:", data);

if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text;
} else {
    return "Sorry, I couldn't understand that.";
}
}
