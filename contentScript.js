chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "RUN_LOGIC") {
        console.log("🟢 Running logic in content script...");

        let pageText = document.body.innerText || "No text found on page.";
        console.log("📜 Extracted Page Text:", pageText);

        // Send extracted text to background script to process with Groq
        chrome.runtime.sendMessage({ type: "GET_GROQ_RESPONSE" }, (response) => {
            if (response && response.status === "success") {
                console.log("🤖 Groq AI Response:", response.response);
                sendResponse({ status: "done", extractedText: pageText, aiResponse: response.response });
            } else {
                console.error("❌ Error fetching AI response:", response?.message);
                sendResponse({ status: "error", error: response?.message });
            }
        });

        return true; // Keeps the message channel open for async response
    }
});
