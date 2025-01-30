let display = document.getElementById("display");
let buttons = document.getElementsByClassName("button");

let val1 = "";
let val2 = "";
let operator = "+";

// use to display the val1 and val2, depending upon positive, negative and decimal value
function Display(value){
    value = value.toString();
    let temp = Number(value);

    if(temp < 0) {
        if(value[value.length-1] == "."){
            return `(${value}0)`;
        }
        return `(${value})`;
    }
    else {
        if(value[value.length-1] == "."){
            return `${value}0`;
        }
        return `${value}`;
    }
}

function containPoint(val){
    val = val.toString();
    for(let i = 0; i<val.length; i++){
        if(val[i] == '.') return true;
    }
    return false;
}

function isNum(value){
    let nums = document.getElementsByClassName("nums");
    for(let i = 0; i<nums.length; i++){
        if(nums[i].getAttribute("data-value")==value) return true;
    }
    return false;
}
function isOperator(value){
    let operators = document.getElementsByClassName("operator");
    for(let i = 0; i<operators.length; i++){
        if(operators[i].getAttribute("data-value")==value) return true;
    }
    return false;
}

for(let i = 0; i<buttons.length; i++){

    buttons[i].addEventListener('click', function(){
        let value = this.getAttribute("data-value");

        if(isNum(value)){
            val2 += value;
            if(val1 == "")display.textContent = Display(val2);
            else {
                if(operator != "") display.textContent = Display(val1) + operator + Display(val2);
                else{
                    val1 = "";
                    display.textContent = Display(val1) + operator + Display(val2);
                }
            }
        }

        else if(isOperator(value)){
            // if(operator == "") operator = value;
            if(val1 == "" && val2 == "") return;
            else if(val1=="" && val2 !=""){
                val1 = val2;
                val2 = "";
                operator = value;
            }
            else if(val1 != "" && val2=="") operator = value;
            else if(val1 !="" && val2 != ""){
                val1 = eval(val1 + ' ' + operator + ' ' + val2);
                val1 = parseFloat(val1).toFixed(5);
                operator = value;
                val2 = "";
            }
            display.textContent = Display(val1) + operator;
        }

        else if(value == "."){
            if(val1 == "" && val2 == ""){
                val2 += "0.";
                display.textContent = Display(val2); // +0
            }
            else if(val1 == "" && val2 != ""){
                // // check if . already exist or not
                // if . don't exist then add it
                val2 = val2.toString();
                if(containPoint(val2) == false){
                    val2 += '.';
                    display.textContent = Display(val2); // +0
                }
            }
            else if(val1 != "" && val2 == ""){
                if(operator == "") return;
                val2 += "0.";
                display.textContent = Display(val1) + operator + Display(val2); //+ 0;
            }
            else if(val1 != "" && val2 != ""){
                if(operator == "") return;
                // check if val2 have . or not
                // if . don't exist then add it
                val2 = val2.toString();
                if(containPoint(val2) == false){
                    val2 += '.';
                    display.textContent = Display(val1) + operator + Display(val2); // + 0;
                }
            }
        }

        else if(value == "="){
            if(val1 == "" && val2 == "") {
                display.textContent = 0;
                return;
            }
            else if(val1 == "" && val2 != ""){
                display.textContent = val2;
            }
            else if (val1 != "" && val2 == "") {
                display.textContent = val1;
                operator = "";
            }
            else if (val1 != "" && val2 != "") {
                val1 = eval(val1 + ' ' + operator + ' ' + val2);
                val2 = "";
                operator = "";
                val1 = parseFloat(val1).toFixed(5);
                display.textContent = val1;
            }
        }

        else if(value == "sign") {
            if(val1 == "" && val2 == "") return;
            else if(val1 == "" && val2 != ""){
                val2 *= -1;
                display.textContent = Display(val2);
            }
            else if(val1 != "" && val2 == ""){
                // operator khali hai and val1 me value hai means ye pehle ka evaluated result h
                if(operator == ""){
                    val1 *= -1;
                    display.textContent = Display(val1);
                }
                else {
                    val2 = "0";
                    val2 *= -1;
                    display.textContent = Display(val1) + operator + Display(val2);
                }
            }
            else if(val1 != "" && val2 != ""){
                val2 *= -1;
                display.textContent = Display(val1) + operator + Display(val2);
            }          
        }

        else if(value == "ac"){
            val1 = "";
            val2 = "";
            operator = "+";
            display.textContent = "UJJWALCAL";
        }
    })
}

/*
    Important Notes

    to convert string into integer we use : parseInt(str);
    to convert string into float we use : parseFloat(str);

    to convert string into number (float or int) : Number(str);

    string literals : 
    to get any value of variable inside of string we use string literals
    let x = 20;
    `the value of x is ${x}` : output -> the value of x is 20;

    to get the length of string or array we use str.length; or arr.length;

    to convert numbers into string we use toString();
    e.g., let val = 3532;
            val = val.toString(); , notice the syntax !

    

    To set and get the value of any element we use data-value attribute inside the tag, and in js we use getAttributte("data-value");
    e.g., 
    <div id="ele" data-value="99" >   <div>
    
    let ele = doument.getElementById("ele");
           ele.getAttribute(data-value); 
    note that the data value will be string, so use it after type conversion


    addEventListner('event name like click', function(){ code })
    you can even collect the event inside the function, and use the function to manupulate the event or delay the event or whatever


    to set the text content of any tag we use "textContent"
    let container = document.getElementById("cont");
    container.textContent = "hellow world";

    
    
    eval function is use to evaluate the value of 2 values
    eval(val1 + ' ' + operator + ' ' + val2);


    to fix the decimal places of any number we use toFixed(numberOfDecimalPlaces);
    let num = 6.3452435245;
    num.toFixed(3); this return 6.345


*/