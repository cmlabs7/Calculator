window.addEventListener('keydown', function(e){
    var keyboard = document.querySelector(`[data-key="${e.key}"]`);
    console.log(keyboard);
    keyboard.click();
    });

var tempValue=0;
var operatorsObj = {
                "+" : "addition",
                "-" : "subtraction",
                "/" : "division",
                "*" : "mulitplication",
};  

const clearScreen = document.getElementById("clear").addEventListener("click", clrScn)

function clrScn(){
document.getElementById("inner-screen-bottom").innerHTML = 0;
document.getElementById("inner-screen-top").innerHTML = "";
result = 0;
a=0;
b=0;
tempValue=0;
}

const numberBtn = document.querySelectorAll('[data-num]');
numberBtn.forEach(btn => btn.addEventListener("click", getNum));


function getNum(e){
    errorCheck();
    let nextValue = e.currentTarget.innerHTML;
    let topDisplay = document.getElementById("inner-screen-top").innerHTML;
    let screenValue = document.getElementById("inner-screen-bottom").innerHTML;
    let checkOperator = topDisplay.charAt(topDisplay.length-1);
   

    if (screenValue === "0"){
            screenValue = nextValue;
    }else if(topDisplay == ""){
            screenValue = screenValue + nextValue;    
    }else if(checkOperator in operatorsObj && tempValue ==""){
        screenValue = nextValue;
        tempValue = nextValue;
    }else if(checkOperator in operatorsObj){
        screenValue = screenValue + nextValue;    
    }
    
    document.getElementById("inner-screen-bottom").innerHTML = screenValue;
    screenValue = screenValue + nextValue;
}


const operatorBtn = document.querySelectorAll("[data-op");
operatorBtn.forEach(btn => btn.addEventListener("click", getOperator));
var a = "";
var b = "";

function getOperator(e){
   errorCheck();
a = document.getElementById("inner-screen-bottom").innerHTML;
   operator = e.currentTarget.innerHTML;
   document.getElementById("inner-screen-top").innerHTML = `${a} ${operator}`;
   tempValue ="";
}

const deleteLast = document.getElementById("del").addEventListener("click", function(e){
let str = document.getElementById("inner-screen-bottom").innerHTML;
str=str.slice(0,-1);
document.getElementById("inner-screen-bottom").innerHTML = str;
})

document.getElementById("execute").addEventListener("keydown", function(e){

console.log(e.key);
if (e.key === "Enter"){
document.getElementByID("execute").click();
}
})

document.getElementById("execute").addEventListener("click", function(){

let display = document.getElementById("inner-screen-top").innerHTML;

if (tempValue=="="){
    a = result; 
    document.getElementById("inner-screen-top").innerHTML = `${a} ${operator} ${b} =`;

result = operate(a, b, operator);
n = result.toString().length
if (n>10){
    result = result.toPrecision(5);
}
document.getElementById("inner-screen-bottom").innerHTML = result;

} else if (tempValue === "Error"){

    document.getElementById("inner-screen-bottom").innerHTML = "We don't do that here!";
} else  { 

b = document.getElementById("inner-screen-bottom").innerHTML;

display = display + " " + b + " =";

document.getElementById("inner-screen-top").innerHTML = display;

a = Number(a);
b = Number(b);

result = operate(a, b, operator);
n = result.toString().length
if (n>10){
    result = result.toPrecision(5);
}
if (result == "Error"){
    document.getElementById("inner-screen-bottom").innerHTML = "We don't do that here!";
    tempValue="Error";
} else {
document.getElementById("inner-screen-bottom").innerHTML = result;
tempValue = "=";
}
} 
})

function errorCheck(){
if (tempValue === "Error"){
    clrScn();
}
}
   
function division(a, b){
    return a / b;
}

function multiplication(a, b){
    return a * b;
}

function addition(a, b){
    return a + b;
}

function subtraction(a, b){
    return a - b;
}

function operate(a, b, operator){
    
    if (operator == "-"){
        return subtraction(a, b);
    } else if (operator == "+"){
        return addition(a, b);
    } else if (operator == "*"){
        return multiplication(a, b);
    } else if (operator == "/"){
        if (b == 0){
            return "Error"
        } else {
        return division(a, b);
        }
    }
}