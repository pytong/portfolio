function Calculator() {
  var operands = [],
      operators = [],
      operatorEntered = false,
      newOperation = true;

  return {
    addNumberListeners: function() {
      var numberEl,
          displayEl = $(".display"),
          displayText,
          numberPressed,
          _this = this;

      $(".number").click(function(e) {
        numberEl = $(e.target);
        numberPressed = numberEl.text();

        if(operatorEntered === true) {
          _this.saveOperand();
          operatorEntered = false;
        }

        displayText = displayEl.val();
        if(numberPressed === "." && displayText.indexOf(".") >= 0) {
          return;
        }

        if(newOperation === true) {
          displayEl.val(numberPressed);
          newOperation= false;
        } else if(displayText.length < 10) {
          displayEl.val(displayText + numberPressed);
        }
      });
    },

    saveOperand: function() {
      var displayEl = $(".display"),
          displayText = displayEl.val();

      if(displayText.length === 0) {
        return;
      }

      var operand = +displayText;
      operands.unshift(operand);
      displayEl.val("");
    },

    addOperatorListeners: function() {
      var operator,
          _this = this;

      $(".operator").click(function(e) {
        if(operators.length > operands.length) {
          _this.clearMemory();
          $(".display").val("");
        }
        operatorEntered = true;
        operator = $(e.target).data("operator");
        operators.unshift(operator);
      });
    },

    addAllClearListener: function() {
      var _this = this;
      $(".all-clear").click(function(e) {
        _this.clearMemory();
        $(".display").val("");
      });
    },

    addClearListener: function() {
      $(".clear").click(function(e) {
        $(".display").val("");
      });
    },

    addEqualListener: function() {
      var _this = this;
      $(".equal").click(function (e) {
        _this.saveOperand();

        if(_this.canCalculate() === true) {
          _this.calculate();
          var result = operands[0];
          if(result > 9999999999) {
            $(".display").val("");
          } else {
            $(".display").val(result);
          }
          newOperation= true;
          _this.clearMemory();
        }
      });
    },

    clearMemory: function() {
      operators = [];
      operands = [];
    },

    multiplyAndDivide: function() {
      var operator,
          operatorIndex,
          operandIndex,
          operand1,
          operand2,
          result,
          preciseResult;

      ["multiply", "divide"].forEach(function(operatorType) {
        while(operators.indexOf(operatorType) >= 0) {
          operatorIndex = operators.indexOf(operatorType);
          operator = operators.splice(operatorIndex, 1)[0];
          operandIndex =  operatorIndex;
          operand1 = operands.splice(operandIndex, 1)[0];
          operand2 = operands.splice(operandIndex, 1)[0];

          if(operator === "multiply") {
            result = operand2 * operand1;
            preciseResult = +result.toPrecision(3);
            operands.splice(operandIndex, 0, result === preciseResult ? result : preciseResult);
          } else {
            result = operand2 / operand1;
            preciseResult = +result.toPrecision(3);
            operands.splice(operandIndex, 0, result === preciseResult ? result : preciseResult);
          }
        }
      });
    },

    addAndMinus: function() {
      var operand1,
        operand2,
        operator;

      while(operands.length > 1) {
        operand1 = operands.pop();
        operand2 = operands.pop();
        operator = operators.pop();

        switch(operator) {
          case "plus":
            operands.push(+operand1 + +operand2);
            break;
          case "minus":
            operands.push(operand1 - operand2);
            break;
          case "multiply":
            operands.push(operand1 * operand2);
            break;
          case "divide":
            operands.push(operand1 / operand2);
        }
      }
    },

    calculate: function() {
      this.multiplyAndDivide();
      this.addAndMinus();
    },

    canCalculate: function() {
      return (operands.length > 0) &&
             (operators.length > 0) &&
             (operands.length > operators.length);
    }

  }
}



var calculator = Calculator();
calculator.addNumberListeners();
calculator.addOperatorListeners();
calculator.addAllClearListener();
calculator.addClearListener();
calculator.addEqualListener();
