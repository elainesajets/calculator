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
  return num1 === 0 && num2 === 0 && sum === 0 && operator === '';
}

function clearAll() {
  display.textContent = '';
  num1 = 0;
  num2 = 0;
  operator = '';
  clearOnNextInput = false;

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
  if (!number) return;
  if (noInput() === true && display.textContent === '0') {
    display.textContent = number.textContent;
    return;
  }
  if (display.textContent.includes('.') && number.textContent === '.') return;
  if (clearOnNextInput) {
    display.textContent = '';
    clearOnNextInput = false;
  }
  if (sum && num2) {
    clearAll();
  }
  display.textContent += number.textContent;
});

buttonContainer.addEventListener('click', (e) => {
  const button = e.target.closest('.top-button');
  if (!button) return;

  deselectOperators();
  button.classList.toggle('button-selected');

  if (button.textContent === 'AC') clearAll();
});

buttonContainer.addEventListener('click', (e) => {
  const button = e.target.closest('.operator-button');
  if (!button) return;
  if (!num1) num1 = Number(display.textContent);
  if (!num2) num2 = Number(display.textContent);

  //Check if operator button has been highlighted and behave accordingly
  deselectOperators();
  button.classList.toggle('button-selected');

  if (button.textContent === '=') {
    if (!num1 || !num2 || !operator) {
      console.log('<Missing input');
      return;
    }

    checkAll(); //Debugging
    sum = operate(num1, num2, operator);
    display.textContent = sum.toFixed(8);
    num1 = sum;
    checkAll(); //Debugging
    operator = '';
    return;
  } else {
    operator = button.textContent;
    //display.textContent = operator;
    num2 = 0;
    console.log(`${num1} ${operator}`);

    clearOnNextInput = true;
  }
});
