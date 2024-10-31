// Array to store quote objects
let quotes = [
    { text: "Believe you can and you're halfway there.", category: "Inspiration" },
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Perseverance" },
    { text: "Don't watch the clock; do what it does. Keep going.", category: "Productivity" },
    { text: "You miss 100% of the shots you don't take.", category: "Sports" }
];

function showRandomQuote() {
    const quoteElement = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    // Clear existing content
    quoteElement.innerHTML = '';
    
    // Create and append elements for the quote
    const p = document.createElement('p');
    p.textContent = randomQuote.text;
    quoteElement.appendChild(p);

    // Add category information
    const categorySpan = document.createElement('span');
    categorySpan.textContent = ` - ${randomQuote.category}`;
    quoteElement.appendChild(categorySpan);
}

function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        
        // Show the newly added quote
        showRandomQuote();

        // Clear form inputs
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        alert('Quote added successfully!');
    } else {
        alert('Please fill out both fields.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
});
