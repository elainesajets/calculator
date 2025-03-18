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
  display.textContent = '';
  num1 = 0;
  num2 = 0;
  sum = 0;
  operator = '';
  clearOnNextInput = false;
  resultDisplayed = false;

  document
    .querySelectorAll('.button-selected')
    .forEach((btn) => btn.classList.remove('button-selected'));

  console.log(num1, num2, operator);
}

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
//let operatorArr = ['+', '-', '*', 'x', '/', '÷', '%'];
//let calculationArr = [0, '', 0];

const display = document.getElementById('display');
const buttonContainer = document.getElementById('button-container');

buttonContainer.addEventListener('click', (e) => {
  const number = e.target.closest('.number-button');
  console.log(e.target.textContent);

  if (!number) return;

  if (
    (noInput() === true && display.textContent === '0') ||
    display.textContent === 'Try again!'
  ) {
    display.textContent = number.textContent;
    return;
  }

  if (number.textContent === '.') {
    if (display.textContent === '' || display.textContent === '0') {
      display.textContent = '0.';
    } else if (!display.textContent.includes('.')) {
      display.textContent += '.';
    }
    return;
  }

  if (clearOnNextInput) {
    display.textContent = '';
    clearOnNextInput = false;
    resultDisplayed = false;
  }
  if (sum && num2) {
    clearAll();
  }
  if (display.textContent === '0') {
    display.textContent = number.textContent;
  } else {
    display.textContent += number.textContent;
  }
});

buttonContainer.addEventListener('click', (e) => {
  const button = e.target.closest('.top-button');
  if (!button) return;

  deselectOperators();

  if (operator && button.textContent !== '=') {
    operator = button.textContent;
    button.classList.add('button-selected');
    return;
  }

  button.classList.toggle('button-selected');

  if (button.textContent === 'AC') clearAll();
});

let resultDisplayed = false;

buttonContainer.addEventListener('click', (e) => {
  const button = e.target.closest('.operator-button');
  if (!button) return;
  if (!num1) {
    num1 = Number(display.textContent);
  } else {
    num2 = Number(display.textContent);
  }
  //if (operator) operator = button.textContent;

  //Check if operator button has been highlighted and behave accordingly
  deselectOperators();

  if (operator && button.textContent !== '=') {
    operator = button.textContent;
    button.classList.add('button-selected');
    return;
  }

  button.classList.toggle('button-selected');

  if (button.textContent === '=') {
    if (!num1 || !num2 || !operator || (operator === '/' && num2 === 0)) {
      clearAll();
      display.textContent = 'Try again!';
      return;
    }

    sum = operate(num1, num2, operator);

    display.textContent = Number(sum.toFixed(8));
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
  if (e.code === 'Enter') {
    e.preventDefault();
  }

  if (button.classList.contains('operator-button')) {
    deselectOperators();

    if (operator && button.textContent !== '=') {
      operator = button.textContent;
      button.classList.add('button-selected');
      return;
    }
  }

  if (button) button.click(); // Simulate a button click
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    if (resultDisplayed) return;
    if (display.textContent.length > 0 && !clearOnNextInput) {
      display.textContent = display.textContent.slice(0, -1);
    }
  }
});
