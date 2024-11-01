
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" },
    { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
];

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p>${quote.text}</p><small>— ${quote.category}</small>`;
}
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
showRandomQuote(); // Display a random quote on page load

function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value;
    const quoteCategory = document.getElementById("newQuoteCategory").value;

    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        saveQuotes(); // Save updated quotes to localStorage
        postQuoteToServer(newQuote); // Sync with server
        document.getElementById("newQuoteText").value = '';
        document.getElementById("newQuoteCategory").value = '';
        alert("Quote added successfully!");
    } else {
        alert("Please enter both quote text and category.");
    }
}
function exportToJson() {
    const jsonData = JSON.stringify(quotes);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();

    URL.revokeObjectURL(url); // Clean up URL object
}
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes) && importedQuotes.every(q => q.text && q.category)) {
                quotes.push(...importedQuotes);
                saveQuotes(); // Save updated quotes to localStorage
                alert('Quotes imported successfully!');
                showRandomQuote(); // Show a random quote from the updated list
            } else {
                alert('Invalid file format.');
            }
        } catch (error) {
            alert('Error reading file.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

async function postQuoteToServer(quote) {
    try {
        await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quote),
        });
        console.log("Quote synced with server.");
    } catch (error) {
        console.error("Error syncing with server:", error);
    }
}
async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const serverQuotes = await response.json();

        // Check if serverQuotes has new data not in local quotes
        let hasNewQuotes = false;
        serverQuotes.forEach(serverQuote => {
            if (!quotes.some(localQuote => localQuote.text === serverQuote.title)) {
                quotes.push({ text: serverQuote.title, category: "Imported" });
                hasNewQuotes = true;
            }
        });

        if (hasNewQuotes) {
            saveQuotes(); // Update localStorage with new quotes
            alert('New quotes added from server!');
            showRandomQuote();
        }
    } catch (error) {
        console.error("Error fetching from server:", error);
    }
}

// Periodically check for updates from the server every 60 seconds
setInterval(fetchQuotesFromServer, 60000); // Fetch quotes every 1 minute

// Initial fetch to populate with server data on page load
fetchQuotesFromServer();
