function clearDisplay() {
    const displayValue = document.querySelector('#result');
    displayValue.textContent = "";
}

function backspace() {
    const displayValue = document.querySelector('#result');
    displayValue.textContent = `${displayValue.textContent.slice(0,(displayValue.textContent.length - 1))}`;
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.id == 'clearBtn') clearDisplay();
        else if (button.id == 'deleteBtn') backspace();
        else if (button.id == 'numBtn') {
            const displayValue = document.querySelector('#result');
            displayValue.textContent = `${displayValue.textContent}${button.textContent}`;
        }
    }); 
});