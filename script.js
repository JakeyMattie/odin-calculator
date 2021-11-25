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

function evaluate(operator, firstValue, secondValue) {
    switch(operator) {
        case "+": return parseInt(firstValue) + parseInt(secondValue);
        case "-": return parseInt(firstValue) - parseInt(secondValue);
        case "×": return parseInt(firstValue) * parseInt(secondValue);
        case "÷": return parseInt(firstValue) / parseInt(secondValue);
    }
}

let firstValue = 0;
let secondValue = 0;
let operatorValue = "";

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const displayValue = document.querySelector('#result');

        if (button.id == 'clearBtn') clearDisplay();
        else if (button.id == 'deleteBtn') backspace();
        else if (button.id == 'numBtn') {
            if (isNaN(displayValue.textContent)) displayValue.textContent = `${button.textContent}`;
            else {
                displayValue.textContent = `${displayValue.textContent}${button.textContent}`;
            }
        }
        else if (button.id == 'operatorBtn') {
            if (firstValue == 0) {
                firstValue = displayValue.textContent;
                operatorValue = button.textContent;
                displayValue.textContent = operatorValue;
            }
            else if (button.textContent == "=") {
                if (secondValue != 0) {
                    firstValue = evaluate(operatorValue, firstValue, secondValue);
                    displayValue.textContent = firstValue;
                }
                else if ((firstValue != 0) && (isNaN(displayValue.textContent))) {
                    firstValue = displayValue.textContent;
                    displayValue.textContent = firstValue;
                } 
                else if (firstValue == 0) displayValue.textContent = button.textContent;
                else displayValue.textContent = button.textContent;
            }
            else if (isNaN(displayValue.textContent)) {
                operatorValue = button.textContent;
                displayValue.textContent = operatorValue;
            }
            else {
                secondValue = displayValue.textContent;
                firstValue = evaluate(operatorValue, firstValue, secondValue);
                operatorValue = button.textContent;
                displayValue.textContent = operatorValue;
            }
        }
    }); 
});