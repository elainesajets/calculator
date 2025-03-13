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

function clearAll() {
  console.log(num1, num2, operator);
  display.textContent = '';
  num1 = 0;
  num2 = 0;
  operator = '';

  console.log(num1, num2, operator);
}

function checkAll() {
  console.log(`Num1: ${num1}`);
  console.log(`Num2: ${num2}`);
  console.log(`Operator: ${operator}`);
  console.log(`Sum: ${sum}`);
}
let num1 = 0;
let num2 = 0;
let operator = '';
let sum = 0;
let operatorArr = ['+', '-', '*', 'x', '/', '÷', '%'];
let calculationArr = [0, '', 0];

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
    case '/' || '÷':
      return divide(number1, number2);
    case '÷':
      return divide(number1, number2);
    case '%':
      return modulo(number1, number2);
    default:
      return 'Invalid operator';
  }
}

const display = document.getElementById('display');
const buttonContainer = document.getElementById('button-container');

buttonContainer.addEventListener('click', (e) => {
  const number = e.target.closest('.number-button');
  if (!number) return;
  if (sum) display.textContent = ''; //let's user make new calculation with sum as num
  if (display.textContent.includes('.') && number.textContent === '.') return;
  if (display.textContent === operator) {
    display.textContent = '';
    display.textContent += number.textContent;
  } else {
    display.textContent += number.textContent;
  }
});

buttonContainer.addEventListener('click', (e) => {
  const button = e.target.closest('.top-button');
  if (!button) return;
  console.log(button.textContent);
  if (button.textContent === 'AC') clearAll();
});

buttonContainer.addEventListener('click', (e) => {
  const button = e.target.closest('.operator-button');
  if (!button) return;
  if (!num1) num1 = Number(display.textContent);
  if (!num2) num2 = Number(display.textContent);
  /*   if (sum) {
    num1 = sum;
    sum = 0;
  } */
  if (button.textContent === '=') {
    if (!num1 || !num2) {
      console.log('<Missing input');
      return;
    }
    checkAll();
    sum = operate(num1, num2, operator);
    display.textContent = sum;
    num1 = sum;
    checkAll();
    num1 = sum;
  } else if (display.textContent === '' || display.textContent === '0') {
    return;
  } else {
    operator = button.textContent;
    display.textContent = operator;
    num2 = 0;
    console.log(`${num1} ${operator}`);
  }
});
