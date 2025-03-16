import { fetchGroqResponse } from "./groqRequest.js";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "GET_GROQ_RESPONSE") {
        console.log("🔄 Fetching Groq AI response...");

        fetchGroqResponse().then(response => {
            if (response) {
                console.log("🤖 Groq AI Response:", response);
                sendResponse({ status: "success", response });
            } else {
                console.error("❌ Failed to get AI response.");
                sendResponse({ status: "error", message: "Failed to fetch AI response" });
            }
        }).catch(error => {
            console.error("❌ Groq API Error:", error);
            sendResponse({ status: "error", message: error.message });
        });

        return true; // Keeps the message channel open for async response
    }
});
