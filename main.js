let num1 = 0,
  num2 = 0,
  operator = '',
  sum = 0,
  clearOnNextInput = false;
calculationComplete = false; //True if next input is a new number

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
  mainDisplay.textContent = '';
  history.textContent = '';
  num1 = 0;
  num2 = 0;
  operator = '';
  clearOnNextInput = false;

  document
    .querySelectorAll('.button-selected')
    .forEach((btn) => btn.classList.remove('button-selected'));

  console.log(num1, num2, operator);
}

//Removes highlight (.button-selected) from previously highlighted operator
function deselectOperators() {
  document
    .querySelectorAll('.operator-button')
    .forEach((btn) => btn.classList.remove('button-selected'));
}

//For debugging
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

//let operatorArr = ['+', '-', '*', 'x', '/', '÷', '%'];
//let calculationArr = [0, '', 0];

const mainDisplay = document.getElementById('main-display');
const buttonContainer = document.getElementById('button-container');
const history = document.getElementById('history-display');

//Mouse event listeners

buttonContainer.addEventListener('click', (e) => {
  const number = e.target.closest('.number-button');
  if (!number) return;
  if (noInput() === true && mainDisplay.textContent === '0') {
    mainDisplay.textContent = number.textContent;
    history.textContent = number.textContent;
    return;
  }
  if (mainDisplay.textContent.includes('.') && number.textContent === '.')
    return;
  if (clearOnNextInput) {
    mainDisplay.textContent = '';
    clearOnNextInput = false;
    calculationComplete = false;
  }
  if (sum && num2) {
    clearAll();
  }
  mainDisplay.textContent += number.textContent;
  history.textContent += number.textContent;
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

  if (!num1) num1 = Number(mainDisplay.textContent);
  if (!num2) num2 = Number(mainDisplay.textContent);

  //Check if operator button has been highlighted and behave accordingly
  deselectOperators();
  button.classList.toggle('button-selected');

  if (
    operator &&
    button.textContent !== '=' &&
    !history.textContent.includes('=')
  ) {
    return;
  } else if (operator && button.textContent !== '=') {
    return;
  }

  if (calculationComplete && history.textContent.includes('=')) {
    history.textContent = `${num1} ${button.textContent} `;
    calculationComplete = false;
  } else if (history.textContent.includes('=') && button.textContent === '=') {
    return;
  } else {
    history.textContent += ` ${button.textContent} `;
  }

  if (button.textContent === '=') {
    if (!num1 || !num2 || !operator) {
      console.log('Missing input');
      return;
    }

    checkAll(); //Debugging
    sum = operate(num1, num2, operator);
    mainDisplay.textContent = sum.toFixed(8) / 1;
    num1 = sum;
    num2 = 0;
    checkAll(); //Debugging
    //history.textContent += ' =';
    operator = '';
    calculationComplete = true;
    return;
  } else {
    operator = button.textContent;
    //mainDisplay.textContent = operator;
    num2 = 0;

    console.log(`${num1} ${operator}`);

    clearOnNextInput = true;
  }
});

//Keyboard functionality
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

  if (button) button.click(); // Simulate a button click
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    console.log(e.key);
    if (!num1 && !operator) {
      if (mainDisplay.textContent > 0 && clearOnNextInput === false) {
        mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
        history.textContent = mainDisplay.textContent.slice(0, -1);
      } else {
        return;
      }
    } else {
      mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
    }
  }
});
