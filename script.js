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

function displayTextWidth(text, font) {
    let canvas = displayTextWidth.canvas || (displayTextWidth.canvas = document.createElement("canvas"));
    let context = canvas.getContext("2d");
    context.font = font;
    let metrics = context.measureText(text);
    return metrics.width;
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
                if (displayTextWidth(displayValue.textContent, "Karla 64px") < 38) {
                    displayValue.textContent = `${displayValue.textContent}${button.textContent}`;
                    console.log("Text Width: " + displayTextWidth(displayValue.textContent, "Karla 64px"));
                }
            }
        }
        else if (button.id == 'operatorBtn') {
            if (firstValue == 0) {
                firstValue = displayValue.textContent;
                operatorValue = button.textContent;
                displayValue.textContent = operatorValue;
                // console.log(`=====`);
                // console.log(`firstValue: ${firstValue}`);
                // console.log(`operatorValue: ${operatorValue}`);
            }
            else if (button.textContent == "=") {
                if (secondValue != 0) {
                    firstValue = evaluate(operatorValue, firstValue, secondValue);
                    displayValue.textContent = firstValue;
                    // console.log(`=====`);
                    // console.log(`firstValue: ${firstValue}`);
                    // console.log(`secondValue: ${secondValue}`);
                    // console.log(`operatorValue: ${operatorValue}`);
                }
                else if ((firstValue != 0) && (isNaN(displayValue.textContent))) {
                    firstValue = displayValue.textContent;
                    displayValue.textContent = firstValue;
                } 
                else if (secondValue == 0) {
                    secondValue = displayValue.textContent;
                    firstValue = evaluate(operatorValue, firstValue, secondValue);
                    displayValue.textContent = firstValue;
                    // console.log(`=====`);
                    // console.log(`firstValue: ${firstValue}`);
                    // console.log(`secondValue: ${secondValue}`);
                    // console.log(`operatorValue: ${operatorValue}`);
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
                // console.log(`=====`);
                // console.log(`firstValue: ${firstValue}`);
                // console.log(`secondValue: ${secondValue}`);
                // console.log(`operatorValue: ${operatorValue}`);
            }
        }
    }); 
});