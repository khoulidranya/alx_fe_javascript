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

function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    formContainer.id = 'addQuoteForm';

    const h2 = document.createElement('h2');
    h2.textContent = 'Add New Quote';
    formContainer.appendChild(h2);

    const form = document.createElement('form');
    form.addEventListener('submit', handleSubmitNewQuote);

    const inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.id = 'newQuoteText';
    inputText.placeholder = 'Enter your quote here...';
    form.appendChild(inputText);

    const inputCategory = document.createElement('input');
    inputCategory.type = 'text';
    inputCategory.id = 'newQuoteCategory';
    inputCategory.placeholder = 'Enter quote category...';
    form.appendChild(inputCategory);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Quote';
    form.appendChild(submitButton);

    formContainer.appendChild(form);

    const button = document.querySelector('#newQuote');
    button.parentNode.insertBefore(formContainer, button.nextSibling);
}

function handleSubmitNewQuote(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newQuoteText = formData.get('newQuoteText');
    const newQuoteCategory = formData.get('newQuoteCategory');

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        
        // Show the newly added quote
        showRandomQuote();

        // Clear the form after submission
        event.target.reset();
    } else {
        alert('Please fill out both fields.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
});
