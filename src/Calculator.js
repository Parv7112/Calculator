import React, { useState } from 'react';
import CalculatorForm from './CalculatorForm';

function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('');
  const [result, setResult] = useState('');

  const handleNum1Change = (event) => {
    setNum1(event.target.value);
  };

  const handleNum2Change = (event) => {
    setNum2(event.target.value);
  };

  const handleOperatorChange = (newOperator) => {
    setOperator(newOperator);
  };

  const calculateResult = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    switch (operator) {
      case '+':
        setResult(n1 + n2);
        break;
      case '-':
        setResult(n1 - n2);
        break;
      case '*':
        setResult(n1 * n2);
        break;
      case '/':
        setResult(n1 / n2);
        break;
      default:
        setResult('');
    }
  };

  return (
    <CalculatorForm
      num1={num1}
      num2={num2}
      operator={operator}
      onNum1Change={handleNum1Change}
      onNum2Change={handleNum2Change}
      onOperatorChange={handleOperatorChange}
      calculateResult={calculateResult}
      result={result}
    />
  );
}

export default Calculator;
