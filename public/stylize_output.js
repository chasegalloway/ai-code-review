document.addEventListener('DOMContentLoaded', () => {
    const styleSelect = document.getElementById('style-select');
    const codeInput = document.getElementById('code-input');
    const loadingSpinner = document.getElementById('loading');

    styleSelect.addEventListener('change', async () => {
        const code = codeInput.value;
        const style = styleSelect.value;

        if (!code) {
            alert('Please enter some code.');
            return;
        }

        loadingSpinner.style.display = 'block';

        try {
            const response = await fetch('/api/stylize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: code, style: style }),
            });
            

            const data = await response.json();

            if (data.stylizedCode) {
                codeInput.value = data.stylizedCode;
            } else {
                alert('Error stylizing code.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error connecting to server.');
        } finally {
            loadingSpinner.style.display = 'none';
        }
    });
});
