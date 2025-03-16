import Groq from "groq-sdk";

export async function fetchGroqResponse() {
    try {
        console.log("🔄 Fetching API key from config.json...");

        const response = await fetch(chrome.runtime.getURL("config.json"));
        const config = await response.json();
        const API_KEY = config.API_KEY;

        console.log("🔑 Loaded API Key:", API_KEY);

        if (!API_KEY) {
            console.error("❌ Groq API Key is missing!");
            return null;
        }

        const groq = new Groq({ apiKey: API_KEY });

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: "Explain the importance of fast language models",
                },
            ],
            model: "llama-3.3-70b-versatile",
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("❌ Groq API Error:", error);
        return null;
    }
}
