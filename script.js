class Calculator {
    constructor(previousOperand, currentOperand){
        this.previousOperandDisplay = previousOperand;
        this.currentOperandDisplay = currentOperand;
        this.clear();
    }

    updateDisplay(){
        this.currentOperandDisplay.innerText = this.currentOperand;
        this.previousOperandDisplay.innerText = this.previousOperand;
    }

    clear(){
        this.currentOperand='';
        this.previousOperand='';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    addNumber(number){
        if(number ==='.' && this.currentOperand.includes('.')) return;
       this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    operate(operation){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.calculate();
        }   
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }

    calculate(){
        let calculation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case '+':
                calculation = prev + current;
                break;
            case '-':
                calculation = prev - current;
                break;
            case '*':
                calculation = prev * current;
                break;
            case '÷':
                calculation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = calculation;
        this.operation = undefined;
        this.previousOperand = '';
    }


}

const numberButtons = document.querySelectorAll('.Number');
const operationButtons = document.querySelectorAll('.Operation');
const equalButton = document.querySelector('.Equals');
const clearButton = document.querySelector('.AC');
const deleteButton = document.querySelector('.DEL');
const previousOperand = document.querySelector('.previous-operand');
const currentOperand = document.querySelector('.current-operand');
const calculator = new Calculator(previousOperand, currentOperand);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("Clicked number");
        calculator.addNumber(button.innerText);
        calculator.updateDisplay();
    }
    )
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

operationButtons.forEach(button => {   //for each operation button
    button.addEventListener('click', () => {
        console.log("Clicked operation");
        calculator.operate(button.innerText);
        calculator.updateDisplay();
    }
    )
});

equalButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
});