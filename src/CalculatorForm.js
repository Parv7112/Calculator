import React, { useState } from 'react';

function CalculatorForm({
  num1,
  num2,
  operator,
  onNum1Change,
  onNum2Change,
  onOperatorChange,
  calculateResult,
  result
}) {
  const [validationErrors, setValidationErrors] = useState({ num1: '', num2: '', operator: '' });
  const [showResult, setShowResult] = useState(false);

  const isValidNumber = (value) => !isNaN(value);

  const validateInputs = () => {
    const newValidationErrors = {};

    if (!num1) newValidationErrors.num1 = 'Please enter a number.';
    if (!num2) newValidationErrors.num2 = 'Please enter a number.';

    if (!isValidNumber(num1)) newValidationErrors.num1 = 'Please enter a valid number.';
    if (!isValidNumber(num2)) newValidationErrors.num2 = 'Please enter a valid number.';

    setValidationErrors(newValidationErrors);
    return Object.keys(newValidationErrors).length === 0;
  };

  const validateOperator = () => {
    if (!operator) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        operator: 'Please select an operator.'
      }));
      return false;
    }
    return true;
  };

  const handleCalculate = () => {
    if (!validateInputs() || !validateOperator()) {
      alert('Please select an Operator');
    }

    if (operator === '/' && parseFloat(num2) === 0) {
      alert('Cannot divide by zero.');
      return;
    }

    calculateResult();
    setShowResult(true);
  };

  const { num1: num1Error, num2: num2Error } = validationErrors;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center mt-3">
          <h1 className="fw-bold mt-4">Calculator</h1>

          <div className={`mb-3 px-5 mt-5 ${num1Error ? 'has-error' : ''}`}>
            <input
              className={`form-control border ${num1Error ? 'border-danger' : 'border-dark'}`}
              type="number"
              value={num1}
              onChange={onNum1Change}
              placeholder="Enter first number"
            />
            {num1Error && <div className="text-danger text-start">{num1Error}</div>}
          </div>

          <div className={`py-3 px-5 ${num2Error ? 'has-error' : ''}`}>
            <input
              className={`form-control border ${num2Error ? 'border-danger' : 'border-dark'}`}
              type="number"
              value={num2}
              onChange={onNum2Change}
              placeholder="Enter second number"
            />
            {num2Error && <div className="text-danger text-start">{num2Error}</div>}
          </div>

          <div className="py-4">
            <div className="btn-group">
              {['+', '-', '*', '/'].map((op) => (
                <button
                  key={op}
                  className={`btn btn-lg rounded border border-dark ${
                    operator === op ? 'btn-dark' : 'btn-light'
                  } me-3 px-5`}
                  onClick={() => onOperatorChange(op)}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn-lg btn-success fw-bolder" onClick={handleCalculate}>
            Calculate
          </button>

          <div className="mt-3 fw-bold fs-4">
            {showResult && `Result: ${result !== '' ? result : 'N/A'}`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalculatorForm;
