document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const codeInput = document.getElementById('code-input');
    const scoreElement = document.getElementById('score');

    submitButton.addEventListener('click', async () => {
        const code = codeInput.value;

        if (!code) {
            alert('Please enter some code.');
            return;
        }

        try {
            const response = await fetch('/api/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: code }),
            });
            

            const data = await response.json();

            if (data.score) {
                scoreElement.innerText = `Score: ${data.score}`;
            } else {
                alert('Error fetching score.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error connecting to server.');
        }
    });
});
