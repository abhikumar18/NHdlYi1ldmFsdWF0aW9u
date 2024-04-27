/*
* Numeric Input Component
*   HTML (initial state): <input type="text" class="c-numeric-input" />
*   Requirement:
*   - should only accept numeric value only such as: 1, 1.2, -5, or 1000
*   - if user enters leading zero, or .  when user moves focus away from the input, it should
*     change to correct format:
*       .1 ==> 0.1 and 01 => 1
*   - if user enter invalid character/value, HTML should change to this
*       <input type="text" class="c-numeric-input c-numeric-input--error" />
*       <span class="c-numeric-input__error-msg">invalid input</span>
*   - if user enter valid value and move focus away from the input HTML should change to this:
*       <input type="text" class="c-numeric-input c-numeric-input--valid" />
*   - if user focus on the input or user clear value from the input,
*     HTML should return to initial stage
*
* Lastly, please add some css for c-numeric-input--error and c-numeric-input--valid to show
* red or green border to the input
* */

const NumericInput = {
  init: () => {
    document.querySelectorAll('.c-numeric-input').forEach(elem => {
      elem.addEventListener('focus', NumericInput.handleFocus);
      elem.addEventListener('blur', NumericInput.handleBlur);
      elem.addEventListener('input', NumericInput.handleInput);
    });
  },
  
  handleFocus: (event) => {
    const input = event.target;
    input.classList.remove('c-numeric-input--error', 'c-numeric-input--valid');
    NumericInput.removeErrorMessage(input);
  },
  
  handleBlur: (event) => {
    const input = event.target;
    const value = input.value.trim();
    if (!NumericInput.isValidNumber(value)) {
      NumericInput.showError(input);
    } else {
      NumericInput.showValid(input);
    }
  },
  
  handleInput: (event) => {
    const input = event.target;
    let value = input.value.trim();
    
    if (value === '') {
      input.classList.remove('c-numeric-input--error', 'c-numeric-input--valid');
      NumericInput.removeErrorMessage(input);
      return;
    }
    
    value = NumericInput.formatNumber(value);
    input.value = value;
  },
  
  isValidNumber: (value) => {
    return /^-?\d*\.?\d+$/.test(value);
  },
  
  formatNumber: (value) => {
    if (value.startsWith('.')) {
      value = '0' + value;
    }
    if (value.startsWith('0') && !value.startsWith('0.')) {
      value = value.replace(/^0+/, '');
    }
    return value;
  },
  
  showError: (input) => {
    input.classList.remove('c-numeric-input--valid');
    input.classList.add('c-numeric-input--error');
    const errorMsg = document.createElement('span');
    errorMsg.classList.add('c-numeric-input__error-msg');
    errorMsg.textContent = 'invalid input';
    input.parentNode.insertBefore(errorMsg, input.nextSibling);
  },
  
  showValid: (input) => {
    input.classList.remove('c-numeric-input--error');
    input.classList.add('c-numeric-input--valid');
    NumericInput.removeErrorMessage(input);
  },
  
  removeErrorMessage: (input) => {
    const errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains('c-numeric-input__error-msg')) {
      errorMsg.remove();
    }
  }
};

document.addEventListener('DOMContentLoaded', NumericInput.init);

