const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
const categoryFilter = document.getElementById('categoryFilter');
const quoteDisplay = document.getElementById('quoteDisplay');

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Populate categories in the dropdown menu
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
        localStorage.setItem('quotes', JSON.stringify(quotes));

        populateCategories();
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert('Quote added successfully!');
    }
}

// Filter quotes based on selected category
function filterQuotes() {
    localStorage.setItem('selectedCategory', categoryFilter.value);
    showRandomQuote();
}

// Save selected category on page load
window.onload = () => {
    populateCategories();
    const lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';
    categoryFilter.value = lastSelectedCategory;
    showRandomQuote();
}

// Export quotes to JSON
function exportQuotes() {
    const dataStr = JSON.stringify(quotes);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'quotes.json';
    downloadLink.click();

    URL.revokeObjectURL(url);
}

// Import quotes from JSON
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        populateCategories();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}
