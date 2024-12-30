document.addEventListener('DOMContentLoaded', () => {
    const styleSelect = document.getElementById('style-select');

    styleSelect.addEventListener('change', async () => {
        const code = codeInput.value;
        const style = styleSelect.value;

        if (!code) {
            alert('Please enter some code.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/stylize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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
        }
    });
});