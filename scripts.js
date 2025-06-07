document.addEventListener('DOMContentLoaded', () => {
    async function fetchQuote() {
        try {

            const response = await fetch('https://api.quotable.io/random', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
                cache: 'no-store' 
            });
            
            const data = await response.json();
            
            const quoteText = document.getElementById('quote-text');
            const quoteAuthor = document.getElementById('quote-author');
            
            if (quoteText && quoteAuthor) {
                quoteText.textContent = `"${data.content}"`;
                quoteAuthor.textContent = `- ${data.author || 'Unknown'}`;
            } else {
                console.error('Quote elements not found in the DOM');
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
            try {

                const response = await fetch('http://api.quotable.io/random', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                    cache: 'no-store'
                });
                const data = await response.json();
                
                const quoteText = document.getElementById('quote-text');
                const quoteAuthor = document.getElementById('quote-author');
                
                if (quoteText && quoteAuthor) {
                    quoteText.textContent = `"${data.content}"`;
                    quoteAuthor.textContent = `- ${data.author || 'Unknown'}`;
                }
            } catch (fallbackError) {

                const quoteText = document.getElementById('quote-text');
                const quoteAuthor = document.getElementById('quote-author');
                if (quoteText && quoteAuthor) {
                    quoteText.textContent = '"The best way to predict the future is to create it."';
                    quoteAuthor.textContent = '- Peter Drucker';
                }
            }
        }
    }


    fetchQuote();


    document.querySelector('.quote-container').addEventListener('click', fetchQuote);
});
