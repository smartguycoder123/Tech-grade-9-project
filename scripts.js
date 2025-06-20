document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'QjpMDrfHzw3oNrkGSryQhA==PRRp1DbjnuBBHUdA';
    let currentQuote = '';
    let updateInterval = null;
    const backgroundToggle = document.getElementById('backgroundToggle');
    const switchLabel = document.querySelector('.switch-label');

    async function fetchQuote() {
        try {
            const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=', {
                method: 'GET',
                headers: {
                    'X-Api-Key': API_KEY,
                    'Content-Type': 'application/json'
                },
                cache: 'no-store'
            });
            
            if (response.status === 429) {
                throw new Error('Quote limit expired');
            }
            
            if (!response.ok) {
                throw new Error('API response not ok');
            }
            
            const [data] = await response.json();
            

            if (data.quote === currentQuote) {
                return fetchQuote();
            }
            
            currentQuote = data.quote;
            updateQuote(data.quote, data.author);
        } catch (error) {
            console.error('Error fetching quote:', error);
            if (error.message === 'Quote limit expired') {
                updateQuote('Quote limit expired, try again later', 'System');
            } else {
                updateQuote('Error fetching quote', 'Please try again later');
            }
        }
    }

    function updateQuote(content, author) {
        const quoteText = document.getElementById('quote-text');
        const quoteAuthor = document.getElementById('quote-author');
        
        if (quoteText && quoteAuthor) {
            quoteText.textContent = `"${content}"`;
            quoteAuthor.textContent = `- ${author}`;
        }
    }

    function startUpdates() {
        fetchQuote();
        updateInterval = setInterval(fetchQuote, 50000);
        switchLabel.textContent = 'Background Updates';
    }

    function stopUpdates() {
        if (updateInterval) {
            clearInterval(updateInterval);
            updateInterval = null;
        }
        switchLabel.textContent = 'Background Updates: Off';
    }


    
    document.addEventListener('visibilitychange', () => {
        if (!backgroundToggle.checked && document.hidden) {
            stopUpdates();
        } else if (!backgroundToggle.checked && !document.hidden) {
            startUpdates();
        }
    });


    backgroundToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            startUpdates();
        } else {
            if (document.hidden) {
                stopUpdates();
            }
        }
    });


    startUpdates();
});
