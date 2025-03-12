function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b === 0 ? 'Division by zero' : a / b;
}

function modulo(a, b) {
  return a % b;
}
let num1, num2, operator;

function operate(number1, number2, operatorChoice) {
  switch (operatorChoice) {
    case '+':
      return add(number1, number2);
    case '-':
      return subtract(number1, number2);
    case '*' || 'x':
      return multiply(number1, number2);
    case '/' || '÷':
      return divide(number1, number2);
    case '%':
      return modulo(number1, number2);
    default:
      return 'Invalid operator';
  }
}

const display = document.getElementById('display');
const numberButtons = document.getElementById('numbers');
const buttonContainer = document.getElementById('button-container');

numberButtons.addEventListener('click', (e) => {
  const button = e.target.closest('.number-button');
  if (!button) return;
  if (display.textContent.includes('.') && button.textContent === '.') return;

  display.textContent += button.textContent;
});

buttonContainer.addEventListener('click', (e) => {
  const button = e.target.closest('.top-button');
  if (!button) return;
  console.log(button.textContent);
  if (button.textContent === 'AC') display.textContent = '';
});

buttonContainer.addEventListener('click', (e) => {
  const button = e.target.closest('.operator-button');
  if (!button) return;
  if (button.textContent === '=') {
    display.textContent = operate(num1, num2, operator);
  } else {
    if (!num1) num1 = display.textContent;
    operator = button.textContent;
    display.textContent = operator;
    console.log(`${num1} ${operator}`);
  }
});
