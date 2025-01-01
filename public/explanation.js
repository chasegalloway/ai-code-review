document.addEventListener('DOMContentLoaded', function () {
    const functionalityScore = document.getElementById('functionality-score');
    const styleScore = document.getElementById('style-score');
    const optimizationScore = document.getElementById('optimization-score');
    const securityScore = document.getElementById('security-score');

    const explanationContainer = document.getElementById('explanation-container');
    const explanation = document.getElementById('explanation');
    const fog = document.getElementById('fog');

    let functionalityExplanation = '';
    let styleExplanation = '';
    let optimizationExplanation = '';
    let securityExplanation = '';

    async function fetchExplanations() {
        const codeInput = document.getElementById('code-input').value;

        if (!codeInput) {
            alert('Please enter some code.');
            return;
        }
        try {
            const response = await fetch('/api/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: codeInput }),
            });

            const data = await response.json();

            functionalityExplanation = data.functionalityExplanation;
            styleExplanation = data.styleExplanation;
            optimizationExplanation = data.optimizationExplanation;
            securityExplanation = data.securityExplanation;

        } catch (error) {
            console.error('Error fetching explanations:', error);
            alert('Error connecting to server.');
        }
    }

    function showExplanation(x) {
        explanation.innerText = x;
        explanationContainer.style.display = 'block';
        fog.style.display = 'block';
    }

    functionalityScore.addEventListener('click', function () {
        if (functionalityScore.innerText !== 'Functionality: --/10') {
            showExplanation(functionalityExplanation);
        }
    });

    styleScore.addEventListener('click', function () {
        if (styleScore.innerText !== 'Style: --/10') {
            showExplanation(styleExplanation);
        }
    });

    optimizationScore.addEventListener('click', function () {
        if (optimizationScore.innerText !== 'Optimization: --/10') {
            showExplanation(optimizationExplanation);
        }
    });

    securityScore.addEventListener('click', function () {
        if (securityScore.innerText !== 'Security: --/10') {
            showExplanation(securityExplanation);
        }
    });

    fog.addEventListener('click', function () {
        explanationContainer.style.display = 'none';
        fog.style.display = 'none';
    });

    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', fetchExplanations);
});
