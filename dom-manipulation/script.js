const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
const categoryFilter = document.getElementById('categoryFilter');
const quoteDisplay = document.getElementById('quoteDisplay');

// Load last-selected category and populate UI on page load
window.onload = () => {
    populateCategories();
    const lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';
    categoryFilter.value = lastSelectedCategory;
    showRandomQuote();
    fetchQuotesFromServer(); // Initial fetch from server
    setInterval(syncQuotes, 10000); // Sync with server every 10 seconds
};

// Fetch quotes from the server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const serverQuotes = await response.json();

        // Simulate server quotes as objects with text and category properties
        const formattedQuotes = serverQuotes.map(quote => ({
            text: quote.body,
            category: 'General'
        }));

        // Update local storage if there are new quotes on the server
        const localQuotesText = quotes.map(quote => quote.text);
        formattedQuotes.forEach(serverQuote => {
            if (!localQuotesText.includes(serverQuote.text)) {
                quotes.push(serverQuote);
            }
        });

        saveQuotes();
        populateCategories();
        showNotification('Quotes synced from server');
    } catch (error) {
        console.error('Error fetching quotes from server:', error);
    }
}

// Post new quote to the server
async function postQuoteToServer(quote) {
    try {
        await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quote)
        });
        showNotification('Quote posted to server');
    } catch (error) {
        console.error('Error posting quote to server:', error);
    }
}

// Sync quotes periodically with server and resolve conflicts
async function syncQuotes() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const serverQuotes = await response.json();

        // Conflict resolution: Server data takes precedence
        const serverQuotesText = serverQuotes.map(quote => quote.body);
        const newQuotes = quotes.filter(localQuote => !serverQuotesText.includes(localQuote.text));

        newQuotes.forEach(quote => postQuoteToServer(quote));

        fetchQuotesFromServer(); // Re-fetch to ensure local storage matches server
    } catch (error) {
        console.error('Error syncing quotes with server:', error);
    }
}

// Show a random quote based on the selected category
function showRandomQuote() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes = selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === selectedCategory);

    if (filteredQuotes.length > 0) {
        const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
        quoteDisplay.textContent = randomQuote.text;
    } else {
        quoteDisplay.textContent = 'No quotes available for this category.';
    }
}

// Add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        saveQuotes();

        populateCategories();
        postQuoteToServer(newQuote); // Post new quote to server
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        showNotification('Quote added successfully!');
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Populate categories dynamically in the dropdown
function populateCategories() {
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter quotes based on selected category
function filterQuotes() {
    localStorage.setItem('selectedCategory', categoryFilter.value);
    showRandomQuote();
}

// Show notifications for updates or conflicts
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'notification';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Additional features for export and import can remain as in the previous example
