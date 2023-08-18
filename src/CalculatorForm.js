import React, { useState } from 'react';

function CalculatorForm({ num1, num2, operator, onNum1Change, onNum2Change, onOperatorChange, calculateResult, result }) {
  const [validationErrors, setValidationErrors] = useState({ num1: '', num2: '', operator: '' });
  const [showResult, setShowResult] = useState(false);

  const isValidNumber = (value) => !isNaN(value);

  const handleCalculate = () => {
    const newValidationErrors = {};

    if (!num1) newValidationErrors.num1 = 'Please enter a number.';
    if (!num2) newValidationErrors.num2 = 'Please enter a number.';
    if (!operator) {
      newValidationErrors.operator = 'Please select an operator.';
      setValidationErrors(newValidationErrors);
      setShowResult(false);
      window.alert('Please select an operator.');
      return;
    }

    if (!isValidNumber(num1)) newValidationErrors.num1 = 'Please enter a valid number.';
    if (!isValidNumber(num2)) newValidationErrors.num2 = 'Please enter a valid number.';
    if (operator === '/' && parseFloat(num2) === 0) {
      window.alert('Cannot divide by zero.');
      return;
    }

    if (Object.keys(newValidationErrors).length > 0) {
      setValidationErrors(newValidationErrors);
      setShowResult(false); 
      return;
    }

    setValidationErrors({});
    calculateResult();
    setShowResult(true); 
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center mt-3">
          <h1 className="fw-bold mt-4">Calculator</h1>
          <div className={`mb-3 px-5 mt-5 ${validationErrors.num1 ? 'has-error' : ''}`}>
            <input
              className={`form-control border ${validationErrors.num1 ? 'border-danger' : 'border-dark'}`}
              type="number"
              value={num1}
              onChange={onNum1Change}
              placeholder="Enter first number"
            />
            {validationErrors.num1 && <div className="text-danger text-start">{validationErrors.num1}</div>}
          </div>

          <div className={`py-3 px-5 ${validationErrors.num2 ? 'has-error' : ''}`}>
            <input
              className={`form-control border ${validationErrors.num2 ? 'border-danger' : 'border-dark'}`}
              type="number"
              value={num2}
              onChange={onNum2Change}
              placeholder="Enter second number"
            />
            {validationErrors.num2 && <div className="text-danger text-start">{validationErrors.num2}</div>}
          </div>

          <div className="py-4">
            <div className="btn-group">
              <button
                className={`btn btn-lg rounded border border-dark ${operator === '+' ? 'btn-dark' : 'btn-light'} me-3 px-5`}
                onClick={() => onOperatorChange('+')}
              >
                +
              </button>
              <button
                className={`btn btn-lg rounded border border-dark ${operator === '-' ? 'btn-dark' : 'btn-light'} me-3 px-5`}
                onClick={() => onOperatorChange('-')}
              >
                -
              </button>
              <button
                className={`btn btn-lg rounded border border-dark ${operator === '*' ? 'btn-dark' : 'btn-light'} me-3 px-5`}
                onClick={() => onOperatorChange('*')}
              >
                x
              </button>
              <button
                className={`btn btn-lg rounded border border-dark ${operator === '/' ? 'btn-dark' : 'btn-light'} px-5`}
                onClick={() => onOperatorChange('/')}
              >
                /
              </button>
            </div>
          </div>

          <button className="btn btn-lg btn-success fw-bolder" onClick={handleCalculate}>
            Calculate
          </button>
          <div className="mt-3 fw-bold fs-4">
            {showResult ? `Result: ${result !== '' ? result : 'N/A'}` : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalculatorForm;
