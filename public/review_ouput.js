document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const codeInput = document.getElementById('code-input');
    const functionalityElement = document.getElementById('functionality-score');
    const styleElement = document.getElementById('style-score');
    const optimizationElement = document.getElementById('optimization-score');
    const securityElement = document.getElementById('security-score');
    const loadingSpinner = document.getElementById('loading');

    submitButton.addEventListener('click', async () => {
        const code = codeInput.value;

        if (!code) {
            alert('Please enter some code.');
            return;
        }

        loadingSpinner.style.display = 'block';

        try {
            const response = await fetch('/api/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: code }),
            });

            const data = await response.json();

            if (data) {
                functionalityElement.innerText = `Functionality: ${data.functionality}`;
                styleElement.innerText = `Style: ${data.style}`;
                optimizationElement.innerText = `Optimization: ${data.optimization}`;
                securityElement.innerText = `Security: ${data.security}`;
            } else {
                alert('Error fetching scores.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error connecting to server.');
        } finally {
            loadingSpinner.style.display = 'none';
        }
    });
});
