let currentNumber = "";
let previousNumber = "";
let operator = "";

const currentDisplay = document.getElementById("currentDisplay");
const previousDisplay = document.getElementById("previousDisplay");


// Add number to display
function appendNumber(number) {

    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    if (currentNumber === "0" && number !== ".") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }

    updateDisplay();
}


// Choose operator
function chooseOperator(selectedOperator) {

    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (currentNumber !== "" && previousNumber !== "") {
        calculate();
    }

    if (currentNumber !== "") {
        previousNumber = currentNumber;
        currentNumber = "";
    }

    operator = selectedOperator;

    updateDisplay();
}


// Calculate result
function calculate() {

    if (previousNumber === "" || currentNumber === "" || operator === "") {
        return;
    }

    const num1 = parseFloat(previousNumber);
    const num2 = parseFloat(currentNumber);

    let result;

    switch (operator) {

        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "×":
            result = num1 * num2;
            break;

        case "÷":

            if (num2 === 0) {
                currentNumber = "Error";
                previousNumber = "";
                operator = "";

                updateDisplay();
                return;
            }

            result = num1 / num2;
            break;

        case "%":
            result = num1 % num2;
            break;
    }

    currentNumber = String(
        Number(result.toFixed(10))
    );

    previousNumber = "";
    operator = "";

    updateDisplay();
}


// Clear calculator
function clearDisplay() {

    currentNumber = "";
    previousNumber = "";
    operator = "";

    updateDisplay();
}


// Delete last number
function deleteNumber() {

    if (currentNumber === "Error") {
        clearDisplay();
        return;
    }

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();
}


// Update screen
function updateDisplay() {

    currentDisplay.textContent =
        currentNumber || "0";

    if (previousNumber && operator) {

        previousDisplay.textContent =
            `${previousNumber} ${operator}`;

    } else {

        previousDisplay.textContent = "";

    }
}


// Keyboard Support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    // Numbers
    if (key >= "0" && key <= "9") {
        appendNumber(key);
    }

    // Decimal
    else if (key === ".") {
        appendNumber(".");
    }

    // Operators
    else if (key === "+") {
        chooseOperator("+");
    }

    else if (key === "-") {
        chooseOperator("-");
    }

    else if (key === "*") {
        chooseOperator("×");
    }

    else if (key === "/") {
        event.preventDefault();
        chooseOperator("÷");
    }

    else if (key === "%") {
        chooseOperator("%");
    }

    // Enter = Calculate
    else if (key === "Enter" || key === "=") {
        calculate();
    }

    // Backspace = Delete
    else if (key === "Backspace") {
        deleteNumber();
    }

    // Escape = Clear
    else if (key === "Escape") {
        clearDisplay();
    }

});