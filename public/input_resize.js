const codeInput = document.getElementById('code-input');

function autoResize() {
    codeInput.style.height = 'auto';
    codeInput.style.height = codeInput.scrollHeight + 'px'; 
}

codeInput.addEventListener('input', autoResize);

autoResize();
