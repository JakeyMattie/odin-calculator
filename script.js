function clearDisplay() {
    const displayValue = document.querySelector('#result');
    displayValue.textContent = "";
    firstValue = 0;
    secondValue = 0;
}

function backspace() {
    const displayValue = document.querySelector('#result');
    displayValue.textContent = `${displayValue.textContent.slice(0,(displayValue.textContent.length - 1))}`;
}

let firstValue = 0;
let secondValue = 0;
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const displayValue = document.querySelector('#result');

        if (button.id == 'clearBtn') clearDisplay();
        else if (button.id == 'deleteBtn') backspace();
        else if (button.id == 'numBtn') {
            if (isNaN(displayValue.textContent)) displayValue.textContent = `${button.textContent}`;
            else displayValue.textContent = `${displayValue.textContent}${button.textContent}`;
        }
        else {
            firstValue = displayValue.textContent;
            displayValue.textContent = button.textContent;
        }
    }); 
});