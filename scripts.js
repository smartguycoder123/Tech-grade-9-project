document.addEventListener('DOMContentLoaded', () => {

    const localQuotes = [
        { content: "The best way to predict the future is to create it.", author: "Peter Drucker" },
        { content: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
        { content: "Technology is best when it brings people together.", author: "Matt Mullenweg" },
        { content: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
        { content: "The advance of technology is based on making it fit in so that you don't really even notice it.", author: "Bill Gates" }
    ];

    async function fetchQuote() {
        try {
            const response = await fetch('https://api.quotable.io/random', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Security-Policy': "upgrade-insecure-requests"
                },
                cache: 'no-store',
                mode: 'cors'
            });
            
            if (!response.ok) throw new Error('API response not ok');
            
            const data = await response.json();
            updateQuote(data.content, data.author);
        } catch (error) {
            console.warn('Falling back to local quotes:', error);

            const randomQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
            updateQuote(randomQuote.content, randomQuote.author);
        }
    }

    function updateQuote(content, author) {
        const quoteText = document.getElementById('quote-text');
        const quoteAuthor = document.getElementById('quote-author');
        
        if (quoteText && quoteAuthor) {
            quoteText.textContent = `"${content}"`;
            quoteAuthor.textContent = `- ${author || 'Unknown'}`;
        }
    }


    fetchQuote();

    document.querySelector('.quote-container').addEventListener('click', fetchQuote);
});
