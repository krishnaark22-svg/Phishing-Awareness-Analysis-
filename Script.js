async function analyze() {
    const message = document.getElementById("emailText").value;

    const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
    });

    const data = await res.json();

    document.getElementById("resultBox").innerHTML = `
        <h3>Result: ${data.result}</h3>
        <p><b>Score:</b> ${data.score}</p>
        <p><b>Detected Flags:</b> ${data.detected.join(", ")}</p>
        <p><b>Advice:</b> ${data.advice}</p>
    `;
}
