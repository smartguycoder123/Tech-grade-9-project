document.addEventListener('DOMContentLoaded', () => {
    async function fetchDailyQuote() {
        try {
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();
            
            const quoteText = document.getElementById('quote-text');
            const quoteAuthor = document.getElementById('quote-author');
            
            if (quoteText && quoteAuthor) {
                quoteText.textContent = `"${data.content}"`;
                quoteAuthor.textContent = `- ${data.author}`;
            } else {
                console.error('Quote elements not found in the DOM');
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    }


    fetchDailyQuote();


    let lastUpdate = new Date().getDate();

    setInterval(() => {
        const currentDate = new Date().getDate();
        if (currentDate !== lastUpdate) {
            fetchDailyQuote();
            lastUpdate = currentDate;
        }
    }, 3600000);
});