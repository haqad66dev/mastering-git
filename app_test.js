function calculater(str) {
  // Try simple binary expression first
  const regex = /^\s*(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)\s*$/;
  const match = str.match(regex);

  if (match) {
    const num1 = parseFloat(match[1]);
    const num2 = parseFloat(match[3]);

    switch (match[2]) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '*': return num1 * num2;
      case '/': return num2 !== 0 ? num1 / num2 : 'Error: Division by zero';
      default: return 'Error: Unsupported operator';
    }
  }

  // Fallback: evaluate full expression safely
  try {
    const safeExpression = str.replace(/[^0-9+\-*/().\s]/g, '');

    // Reject if expression is empty or starts/ends with operator
    if (
      !safeExpression.trim() ||
      /^[+\-*/]/.test(safeExpression.trim()) ||
      /[+\-*/]$/.test(safeExpression.trim())
    ) {
      throw new Error('Invalid expression');
    }

    const result = Function('"use strict"; return (' + safeExpression + ')')();

    if (typeof result !== 'number' || isNaN(result)) {
      throw new Error('Invalid calculation');
    }

    return result;
  } catch {
    return 'Error: Invalid input format';
  }
}


//unit tests for the calculater function
const assert = require('assert');
assert.equal(calculater("1 + 1"), 2);
assert.equal(calculater("1 - 1"), 0);
assert.equal(calculater("1 * 1"), 1);
assert.equal(calculater("1 / 1"), 1);
assert.equal(calculater("10 / 0"), 'Error: Division by zero');
assert.equal(calculater("3 + 4 * 2"), 11);
assert.equal(calculater("(3 + 4) * 2"), 14);
assert.equal(calculater("10 / (2 + 3)"), 2);
assert.ok(Math.abs(calculater("-5 + 3.2") - (-1.8)) < 1e-10);
assert.equal(calculater("abc + 1"), 'Error: Invalid input format');
console.log("All tests passed!");
