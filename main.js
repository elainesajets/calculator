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

function noInput() {
  return !num1 && !num2 && !sum && operator === '';
}

function clearAll() {
  display.textContent = '0';
  num1 = 0;
  num2 = 0;
  sum = 0;
  operator = '';
  clearOnNextInput = false;
  resultDisplayed = false;

  document
    .querySelectorAll('.button-selected')
    .forEach((btn) => btn.classList.remove('button-selected'));
}

//Only one operator can be highlighted at the time. This function check is a button is highlighted, and removes the highlight accordingly.
function deselectOperators() {
  document
    .querySelectorAll('.operator-button')
    .forEach((btn) => btn.classList.remove('button-selected'));
}

function checkAll() {
  console.table({ num1, num2, operator, sum, clearOnNextInput });
}

function operate(number1, number2, operatorChoice) {
  switch (operatorChoice) {
    case '+':
      return add(number1, number2);
    case '-':
      return subtract(number1, number2);
    case '*':
      return multiply(number1, number2);
    case 'x':
      return multiply(number1, number2);
    case '/':
      return divide(number1, number2);
    case '÷':
      return divide(number1, number2);
    case '%':
      return modulo(number1, number2);
    default:
      return 'Invalid operator';
  }
}

let num1 = 0;
let num2 = 0;
let operator = '';
let sum = 0;
let clearOnNextInput = false;
const MAX_DISPLAY_LENGTH = 10;

const display = document.getElementById('display');
const buttonContainer = document.getElementById('buttons');

buttonContainer.addEventListener('click', (e) => {
  const number = e.target.closest('.number-button');

  if (!number) return;

  if (display.textContent.length > MAX_DISPLAY_LENGTH && !num1) return;

  if (number.textContent === '.') {
    if (display.textContent === '' || display.textContent === '0') {
      display.textContent = '0.';
    } else if (!display.textContent.includes('.')) {
      display.textContent += '.';
    }
    return;
  }

  if (
    (noInput() && display.textContent === '0') ||
    display.textContent === 'Try again!'
  ) {
    display.textContent = number.textContent;
    return;
  }

  if (clearOnNextInput) {
    display.textContent = '';
    clearOnNextInput = false;
    resultDisplayed = false;
  }

  //Starts a new calculation instead of appending more numbers
  if (sum && num2) clearAll();

  display.textContent === '0'
    ? (display.textContent = number.textContent)
    : (display.textContent += number.textContent);
});

buttonContainer.addEventListener('click', (e) => {
  const button = e.target.closest('.top-button');
  if (!button) return;

  if (button.textContent === 'AC') {
    clearAll();
    return;
  }

  deselectOperators();

  if (operator && button.textContent !== '=') {
    operator = button.textContent;
    button.classList.add('button-selected');
    return;
  }

  button.classList.toggle('button-selected');
});

let resultDisplayed = false;

buttonContainer.addEventListener('click', (e) => {
  const button = e.target.closest('.operator-button');
  if (!button) return;

  !num1
    ? (num1 = Number(display.textContent))
    : (num2 = Number(display.textContent));

  deselectOperators();

  if (operator && button.textContent !== '=') {
    operator = button.textContent;
    button.classList.add('button-selected');
    return;
  }

  button.classList.toggle('button-selected');

  if (button.textContent === '=') {
    const invalidCalculation =
      !num1 || !num2 || !operator || (operator === '/' && num2 === 0);

    if (invalidCalculation) {
      //display.textContent = 'Try again!';
      return;
    }

    sum = operate(num1, num2, operator);

    if (sum.toString().length > MAX_DISPLAY_LENGTH) {
      display.textContent = `I'm just a basic calculator!`;
    } else {
      display.textContent = sum;
    }

    num1 = sum;
    operator = '';
    resultDisplayed = true;
    return;
  } else {
    operator = button.textContent;
    num2 = 0;
    clearOnNextInput = true;
  }
});

window.addEventListener('keydown', (e) => {
  let key = e.code;

  if (e.shiftKey) {
    if (e.code === 'Equal') key = 'NumpadAdd';
    if (e.code === 'Digit8') key = 'NumpadMultiply';
  }

  const button = document.querySelector(`button[data-key="${key}"]`);

  if (!button) return;

  button.click();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    if (resultDisplayed) return;

    if (display.textContent.length > 0 && !clearOnNextInput)
      display.textContent = display.textContent.slice(0, -1);
    if (!display.textContent || display.textContent === '')
      display.textContent = '0';
  }
});
