// DECLARE VARS
let numStr = ""; // operand a
let prevNum = null; // operand b
let selectedOperator = null;

// SELECT ELEMENTS
const functionBtns = document.querySelectorAll(".calculator__function-btns-wrapper > .calculator__btn");
const clearBtn = document.querySelector(".calculator__btn--clear");
const topDisplayText = document.querySelector(".calculator__display--top");
const bottomDisplayText = document.querySelector(".calculator__display--bottom");

// DEFINE FNS
function sum(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) { 
    return a / b;
}

function operate() {    
    if (selectedOperator.includes("+")) {
        return Math.round(sum(prevNum, parseFloat(numStr)) * 1000)/1000;
    }
    else if (selectedOperator.includes("-")) {
        return Math.round(subtract(prevNum, parseFloat(numStr)) * 1000)/1000;
    }
    else if (selectedOperator.includes("x")) {
        return Math.round(multiply(prevNum, parseFloat(numStr)) * 1000)/1000;
    }
    else if (selectedOperator.includes("÷")) {
        if (numStr === "0" || numStr === "") {
            return "Error: cannot divide by 0";
        } 
        return Math.round(divide(prevNum, parseFloat(numStr)) * 1000)/1000;
    }
}

function onCalculatorfunctionBtnClick() { 
    let result = null;
    let char = this.innerText;
    
    if (/[0-9.]/.test(char)) {
        if (char === "." && numStr.includes(".")) {
            return;
        }
        numStr += char;
        console.log(typeof numStr);
        console.log(numStr);

        bottomDisplayText.innerText = numStr;
        if (prevNum !== null) {
            topDisplayText.innerText = `${prevNum} ${selectedOperator}`;
        }
    }

    if (/[\+\-\x\÷]/.test(char)) {
        // CASE ONE: if both operands not defined
        if (prevNum === null && numStr !== "") {
            selectedOperator = char;
            prevNum = parseFloat(numStr);
            numStr = "";

            topDisplayText.innerText = `${prevNum} ${selectedOperator}`;
            bottomDisplayText.innerText = prevNum;
        }
        // CASE TWO: if both operands defined
        else if (prevNum !== null && numStr !== "") {
            result = operate();
            prevNum = result;
            numStr = "";
            selectedOperator = char;

            topDisplayText.innerText = `${result} ${selectedOperator}`;
            bottomDisplayText.innerText = result;
        }
        // CASE THREE: if click on different operators in a row
        else if (prevNum !== null && numStr === "") {
            selectedOperator = char;
            topDisplayText.innerText = `${prevNum} ${selectedOperator}`;
            bottomDisplayText.innerText = prevNum;
        }
        // CASE FOUR: if operate with undefined operand b
        else if (numStr === "") {
            selectedOperator = char;
            prevNum = 0;
            topDisplayText.innerText = `${prevNum} ${selectedOperator}`;
            bottomDisplayText.innerText = prevNum;
        }
    }
    
    if (char === "=") {
        if (prevNum !== null && numStr !== "") {
            result = operate();
            topDisplayText.innerText = `${prevNum} ${selectedOperator} ${numStr} =`;
            prevNum = null;
            numStr = result;
        }
        if (prevNum === null && numStr === "") {
            result = "Error: specify numbers to calculate";
        }
        
        bottomDisplayText.innerText = result;
    }
}

function onClearButtonClick() {
    numStr = "";
    prevNum = null;
    selectedOperator = null;
    topDisplayText.innerText = "";
    bottomDisplayText.innerText = "";
}

// EVENT LISTENERS
functionBtns.forEach(functionBtn => {
    functionBtn.addEventListener("click", onCalculatorfunctionBtnClick);
});
clearBtn.addEventListener("click", onClearButtonClick);
