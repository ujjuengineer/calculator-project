let display = document.getElementById("display");
let buttons = document.getElementsByClassName("button");

let val1 = "";
let val2 = "";
let operator = "+";

//let firstRound = true;

function containPoint(val){
    val = toString(val);
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
            if(val1 == "")display.textContent = val2;
            else if(val1[val1.length-1] == '.') display.textContent = val1 + 0 + operator + val2;
            else {
                if(operator != "") display.textContent = val1 + operator + val2;
                else{
                    val1 = "";
                    display.textContent = val1 + operator + val2;
                }
            }
        }

        else if(isOperator(value)){
            // if(operator == "") operator = value;
            if(val1 == "" && val2 == ""){
                return;
            }
            else if(val1=="" && val2 !=""){
                val1 = val2;
                val2 = "";
                operator = value;
            }
            else if(val1 != "" && val2==""){
                operator = value;
            }
            else if(val1 !="" && val2 != ""){
                val1 = eval(val1 + ' ' + operator + ' ' + val2);
                val1 = parseFloat(val1).toFixed(5);
                operator = value;
                val2 = "";
            }
            if(val1[val1.length-1] == '.') display.textContent = val1 + 0 + operator;
            else display.textContent = val1 + operator;
        }

        else if(value == "."){
            
            if(val1 == "" && val2 == ""){
                val2 += "0.";
                display.textContent = val2 + 0;
            }
            else if(val1 == "" && val2 != ""){
                // check if . already exist or not
                //console.log(typeof(val2));
                let flag = false;
                // agar val2 string hai then check directly if . exist or not, else pehle string me convert kro and then check kro !!
                if(typeof(val2) == String){
                    for(let i = 0; i<val2.length; i++){
                        if(val2[i] == ".") flag = true;
                    }
                }
                else{
                    val2 = val2.toString();
                    for(let i = 0; i<val2.length; i++){
                        if(val2[i] == ".") flag = true;
                    }
                }

                // if . don't exist then add it
                if(flag == false){
                    val2 += '.';
                    display.textContent = val2 + 0;
                }

            }
            else if(val1 != "" && val2 == ""){

                if(operator == "") return;

                val2 += "0.";
                if(val1[val1.length-1] == '.') {
                    display.textContent = val1 + 0 + operator + val2 + 0;
                }
                else display.textContent = val1 + operator + val2 + 0;

            }
            else if(val1 != "" && val2 != ""){

                if(operator == "") return;

                // check if val2 have . or not
                let flag = false;
                for(let i = 0; i<val2.length; i++){
                    if(val2[i] == ".") flag = true;
                }

                // if . don't exist then add it
                if(flag == false){
                    val2 += '.';
                    if(val1[val1.length-1] == '.') {
                        display.textContent = val1 + 0 + operator + val2 + 0;
                    }
                    else display.textContent = val1 + operator + val2 + 0;
                }

            }
        }
        else if(value == "="){
            if(val1 == "" && val2 == "") {
                display.textContent = 0;
                return;
            }
            else if(val1 == "" && val2 != ""){
                if(val2[val2.length - 1] == '.') display.textContent = val2 + 0;
                else display.textContent = val2;
            }
            else if (val1 != "" && val2 == "") {
                if (val1[val1.length-1] == '.') display.textContent = val1 + 0;
                else display.textContent = val1;
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
                if(containPoint(val2)){
                    display.textContent = val2 + 0;
                }
                else display.textContent = val2;
            }
            else if(val1 != "" && val2 == ""){
                if(operator == ""){
                    val1 *= -1;
                    if(containPoint(val1)){
                        display.textContent = val1 + 0;
                    }
                    else display.textContent = val1;
                }
                else {
                    val2 = "0";
                    val2 *= -1;
                    if(containPoint(val1)){
                        display.textContent = val1 + 0 + operator + val2;
                    }
                    else display.textContent = val1 + operator + val2;
                    //display.textContent = val2;
                }
            }
            else if(val1 != "" && val2 != ""){
                val2 *= -1;
                if(val1[val1.length-1] == '.'){
                    if(val2[val2.length - 1] == '.'){
                        display.textContent = val1 + 0 + operator + '(' + val2 + 0+')';
                    }
                    else display.textContent = val1+0+operator+'('+val2+')';
                }
                else {
                    if(val2[val2.length - 1] == '.'){
                        display.textContent = val1 + operator + '(' + val2 + 0+')';
                    }
                    else display.textContent = val1 + operator + '('+val2+')';
                }
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
