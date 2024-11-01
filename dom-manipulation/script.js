let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" },
    { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
];

// Function to save quotes array to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to populate unique categories in a dropdown menu
function populateCategories() {
    const categories = [...new Set(quotes.map(quote => quote.category))];
    const categoryDropdown = document.getElementById("categoryDropdown");
    categoryDropdown.innerHTML = '<option value="all">All Categories</option>';

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });

    // Set last selected category if it exists
    const savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory) {
        categoryDropdown.value = savedCategory;
        filterQuote(savedCategory);
    }
}

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p>${quote.text}</p><small>— ${quote.category}</small>`;
}

// Function to filter and display quotes based on selected category
function filterQuote(selectedCategory) {
    const filteredQuotes = selectedCategory === "all"
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);

    // Update the display with the filtered quotes
    const quoteDisplay = document.getElementById("quoteDisplay");
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const quote = filteredQuotes[randomIndex];
        quoteDisplay.innerHTML = `<p>${quote.text}</p><small>— ${quote.category}</small>`;
    } else {
        quoteDisplay.innerHTML = `<p>No quotes available for the selected category.</p>`;
    }

    // Save the selected category to local storage
    localStorage.setItem("selectedCategory", selectedCategory);
}

// Event listener for category selection change
document.getElementById("categoryDropdown").addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    filterQuote(selectedCategory);
});

// Call functions to initialize page
populateCategories();
showRandomQuote(); // Show a random quote initially

// Optional: Add button to refresh random quotes within a selected category
document.getElementById("newQuote").addEventListener("click", () => {
    const selectedCategory = document.getElementById("categoryDropdown").value;
    filterQuote(selectedCategory);
});
