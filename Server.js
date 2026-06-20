const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simple phishing detection logic
function analyzeEmail(text) {
    let score = 0;

    const flags = [
        "urgent",
        "password",
        "bank",
        "verify",
        "login",
        "click here",
        "limited time",
        "account suspended",
        "update your details"
    ];

    let detected = [];

    flags.forEach(word => {
        if (text.toLowerCase().includes(word)) {
            score += 1;
            detected.push(word);
        }
    });

    let result = "Safe";

    if (score >= 4) result = "Malicious";
    else if (score >= 2) result = "Suspicious";

    return {
        result,
        score,
        detected,
        advice:
            result === "Malicious"
                ? "Do NOT interact with this message. Report immediately."
                : result === "Suspicious"
                ? "Be careful. Verify sender before taking action."
                : "No major phishing indicators found."
    };
}

// API endpoint
app.post("/analyze", (req, res) => {
    const { message } = req.body;
    const analysis = analyzeEmail(message);
    res.json(analysis);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
