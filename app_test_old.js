function calculater(str) {
 //const match = expression.match(/^\s*(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)\s*$/);

// regex to match the numbers and the operators
//var regex = /(\d+)([+\-*\/])(\d+)/;  //no space between numbers and operators and need to remove spaces from below

// Updated regex to allow optional whitespace around operands and operator
  var regex = /^\s*(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)\s*$/;

//use match method to get the numbers and the operator
var match = str.match(regex);

// prevent runtime errors if the input does not match expected pattern
if (match) {
//use parseInt to convert the string numbers to integers
var num1 = parseFloat(match[1]);
var num2 = parseFloat(match[3]);

// use switch to evaluate the operator and perform the corresponding operation
switch (match[2]) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num2 !== 0 ? num1 / num2 : 'Error: Division by zero';
    default:
      return 'Error: Unsupported operator';
  }
}

/*
// test the calculater function
console.log(calculater("1 + 1")); // 2
console.log(calculater("1 - 1")); // 0
console.log(calculater("1 * 1")); // 1
console.log(calculater("1 / 1")); // 1  
console.log(calculater("10 / 0")); // Error: Division by zero
*/

// Fallback: evaluate full expression safely
  try {
    const safeExpression = str.replace(/[^0-9+\-*/().\s]/g, '');
    const result = Function('"use strict"; return (' + safeExpression + ')')();

    if (typeof result !== 'number' || isNaN(result)) {
      throw new Error('Invalid calculation');
    }

    return result;
  } catch (error) {
    return 'Error: Invalid input format';
  }
}


// create unit tests for the calculater function
var assert = require('assert');
assert.equal(calculater("1 + 1"), 2);
assert.equal(calculater("1 - 1"), 0);
assert.equal(calculater("1 * 1"), 1);
assert.equal(calculater("1 / 1"), 1);
assert.equal(calculater("10 / 0"), 'Error: Division by zero');
assert.equal(calculater("3 + 4 * 2"), 11);
assert.equal(calculater("(3 + 4) * 2"), 14);
assert.equal(calculater("10 / (2 + 3)"), 2);
assert.ok(Math.abs(calculater("-5 + 3.2") - (-1.8)) < 1e-10, "calculator handles decimals correctly");
assert.equal(calculater("abc + 1"), 'Error: Invalid input format');
console.log("All tests passed!");
