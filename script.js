document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    // Function to update the display
    function updateDisplay(value) {
        display.textContent = value || '0';
    }

    // Function to handle input (both from buttons and keyboard)
    function handleInput(value) {
        if (value === 'AC') {
            currentInput = '';
            previousInput = '';
            operator = '';
            updateDisplay('0');
        } else if (!isNaN(value) || value === '.') {
            currentInput += value;
            updateDisplay(currentInput);
        } else if (value === '=' || value === 'Enter') {
            if (currentInput && previousInput) {
                currentInput = calculate(previousInput, operator, currentInput);
                updateDisplay(currentInput);
                previousInput = '';
                operator = '';
            }
        } else if (value === '+' || value === '-' || value === '*' || value === '/') {
            if (currentInput) {
                if (previousInput) {
                    currentInput = calculate(previousInput, operator, currentInput);
                    updateDisplay(currentInput);
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '';
            }
        } else if (value === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput);
        } else if (value === 'Escape') {
            currentInput = '';
            previousInput = '';
            operator = '';
            updateDisplay('0');
        }
    }

    // Add event listeners for button clicks
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            handleInput(value);
        });
    });

    // Add event listener for keyboard input
    document.addEventListener('keydown', function (event) {
        const key = event.key;
        handleInput(key);
    });

    // Function to perform calculations
    function calculate(a, operator, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: return b;
        }
    }
});
