// Initialize quotes array, loading from localStorage if available
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" },
    { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
];

// Function to save quotes array to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote on the page
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p>${quote.text}</p><small>— ${quote.category}</small>`;
}

// Add event listener to show a new random quote when button is clicked
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
showRandomQuote(); // Display a random quote on page load

// Function to add a new quote based on user input
function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value;
    const quoteCategory = document.getElementById("newQuoteCategory").value;

    if (quoteText && quoteCategory) {
        quotes.push({ text: quoteText, category: quoteCategory });
        saveQuotes(); // Save updated quotes to localStorage
        document.getElementById("newQuoteText").value = '';
        document.getElementById("newQuoteCategory").value = '';
        alert("Quote added successfully!");
    } else {
        alert("Please enter both quote text and category.");
    }
}

// Function to export quotes array to JSON file for download
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

// Function to import quotes from a JSON file uploaded by the user
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            // Check if the imported data is valid
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
