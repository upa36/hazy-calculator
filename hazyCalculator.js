function isSkippedValue(value) {
  if (value === undefined || value === '') {
    return true
  }
  const operators = ['+', '-', '*', '/']
  if (operators.includes(value)) {
    return false
  }
  return !value
}

function isNumericValue(value) {
  if (value === null) {
    return true
  }
  else if (value == '' || value === undefined) {
    return false
  }
  return !isNaN(value)
}

function isNothingValue(value) {
  return value === null || value === undefined
}

function isAcceptableValue(value) {
  const operators = ['+', '-', '*', '/']
  return typeof Number(value) === 'number' || operators.includes(value)
}

function performCalculationStep(firstOperand, operator, secondOperand) {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand
    case '-':
      return firstOperand - secondOperand
    case '*':
      return firstOperand * secondOperand
    case '/':
      return firstOperand / secondOperand
    default:
      throw new Error('Invalid input!')
  }
}

function calculate(calculationSteps) {
  var total
  var operator

  calculationSteps.forEach(nextCalculationStep => {
    if (!isAcceptableValue(nextCalculationStep)) {
      throw new Error('Invalid input!')
    }

    if (isNothingValue(total) && isNumericValue(nextCalculationStep)) {
      total = Number(nextCalculationStep)

    } else if (isNothingValue(operator) && !isSkippedValue(nextCalculationStep)) {
      operator = nextCalculationStep

    } else if (isNumericValue(nextCalculationStep)) {
      total = performCalculationStep(total, operator, Number(nextCalculationStep))
      operator = null

    } else if (!isSkippedValue(nextCalculationStep)) {
      throw new Error('Invalid input!')
    }
  })

  return total
}

module.exports = calculate
