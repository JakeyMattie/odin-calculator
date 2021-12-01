 function clearDisplay() {
    const displayValue = document.querySelector('#result');
    displayValue.textContent = "";
    firstValue = 0;
    secondValue = 0;
    decimalValue = false;
}

function backspace() {
    const displayValue = document.querySelector('#result');
    displayValue.textContent = `${displayValue.textContent.slice(0,(displayValue.textContent.length - 1))}`;
}

function evaluate(operator, firstValue, secondValue) {
    if (typeof(firstValue) == 'string') { //this is for the first pass of firstValue, where it is still a string
        if (firstValue.indexOf(`.`) == -1) {
            switch(operator) {
                case "+": return parseInt(firstValue) + parseInt(secondValue);
                case "-": return parseInt(firstValue) - parseInt(secondValue);
                case "×": return parseInt(firstValue) * parseInt(secondValue);
                case "÷": return parseInt(firstValue) / parseInt(secondValue);
            }
        }
        else {
            switch(operator) {
                case "+": return parseFloat(firstValue) + parseFloat(secondValue);
                case "-": return parseFloat(firstValue) - parseFloat(secondValue);
                case "×": return parseFloat(firstValue) * parseFloat(secondValue);
                case "÷": return parseFloat(firstValue) / parseFloat(secondValue);
            }
        }
    }
    else if (typeof(firstValue) == 'number') { //for succeeding passes for evaluate
        if (firstValue % 1 == 0) {
            switch(operator) {
                case "+": return parseInt(firstValue) + parseInt(secondValue);
                case "-": return parseInt(firstValue) - parseInt(secondValue);
                case "×": return parseInt(firstValue) * parseInt(secondValue);
                case "÷": return parseInt(firstValue) / parseInt(secondValue);
            }
        }
        else {
            switch(operator) {
                case "+": return parseFloat(firstValue) + parseFloat(secondValue);
                case "-": return parseFloat(firstValue) - parseFloat(secondValue);
                case "×": return parseFloat(firstValue) * parseFloat(secondValue);
                case "÷": return parseFloat(firstValue) / parseFloat(secondValue);
            }
        }
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
let decimalValue = false;

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
        else if (button.id == 'decimalBtn') {
            if (decimalValue == false) {
                if (displayValue.textContent == "" || isNaN(displayValue.textContent))
                    displayValue.textContent = `0.`;
                else displayValue.textContent = `${displayValue.textContent}.`;
                decimalValue = true;
            }
        }
        else if (button.id == 'operatorBtn') {
            if (firstValue == 0) { //If the user clicks/presses an operator for the first time
                firstValue = displayValue.textContent;
                operatorValue = button.textContent;
                displayValue.textContent = operatorValue;
                // console.log(`=====`);
                // console.log(`firstValue: ${firstValue}`);
                // console.log(`operatorValue: ${operatorValue}`);
            }
            else if (button.textContent == "=") { //If the user presses the equal sign under the ff conditions:
                if (secondValue != 0) { //
                    firstValue = evaluate(operatorValue, firstValue, secondValue);
                    displayValue.textContent = firstValue;
                    // console.log(`=====`);
                    // console.log(`firstValue: ${firstValue}`);
                    // console.log(`secondValue: ${secondValue}`);
                    // console.log(`operatorValue: ${operatorValue}`);
                }
                else if ((firstValue != 0) && (isNaN(displayValue.textContent))) { //
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
                    // console.log(`typeof: ${typeof(firstValue)}`);
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
                console.log(`=====`);
                console.log(`firstValue: ${firstValue}`);
                console.log(`secondValue: ${secondValue}`);
                console.log(`operatorValue: ${operatorValue}`);
                console.log(`typeof: ${typeof(firstValue)}`);
            }
            decimalValue = false;
        }
    }); 
});