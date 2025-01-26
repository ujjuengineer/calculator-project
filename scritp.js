let display = document.getElementById("display");
let buttons = document.getElementsByClassName("button");

function checkOperator(value){
    let operators = document.getElementsByClassName("operator");
    for(let i = 0; i<operators.length; i++){
        if(value == operators[i].getAttribute("data-value")) return true;
    }
    return false;
}

function checkNum(value){
    let nums = document.getElementsByClassName("nums");
    for(let i = 0; i<nums.length; i++){
        if(value == nums[i].getAttribute("data-value")) return true;
    }
    return false;
}


let var1 = 0;
let operator= '+';
let var2 = null;

for(let i = 0; i<buttons.length; i++){
    buttons[i].addEventListener('click', function(){
        let value = this.getAttribute("data-value"); // this will give the value stored in the data-value attribute
        let text = display.textContent.trim(); // this will contain the text present inside the display

        if(checkOperator(value)){
            //let ans = eval(var1+' '+operator+' '+var2);
            if(var2 == null) display.textContent = var1 + value;
            else {
                var1 = eval(var1 +' '+ operator+' ' + var2);
                var2 = 0;
                display.textContent = var1.toFixed(5) + value;
            }

            operator = value;   
        }
        else if(checkNum(value)){

            if(var2 == null) {
                var2 = value;
                display.textContent = var2;
            }
            else {

                var2 = var2 + value;

                if(var1 != 0) {
                    display.textContent = var1 + operator + var2;
                }
                else display.textContent = var2;
            }
        }
        else if(value == "sign"){

            if(var2 != null){
                var2 *= -1;
                display.textContent = var1 + operator + '(' + var2 + ')';
            } 
        }
        else if(value == "="){

            if(var2 == null) display.textContent = var1;
            else {
                var1 = eval(var1 +' '+ operator+' ' + var2);
                var2 = 0;
                display.textContent = var1.toFixed(5);
            }

            var1 = 0;
            operator = '+';
            var2 = null;
        }
        else if(value == "ac"){
            var1 = 0;
            var2 = null;
            operator = '+';
            display.textContent = "";
        }
        else if(value == "."){
            
            if(var2 == null) {
                var2 = "0.";
                display.textContent = var2;
            }
            else {
                if(var2[var2.length - 1] != '.'){
                    var2 += ".";
                    display.textContent += '.';
                }
            }
        }
    })
}



/*
Notes : 
    use of "data-value" : use to store any value of any tag, we can extract this value using js
    use of "getAttribute" : use to get the value of the attribute "data-value", syntax : elementName.getAttribute("data-value")
    use of length method : use to find the length of any string or array, e.g., arr.length, str.length;

    use of "textContent" : use to get the text content of any element 
        e.g., let container = document.getElementById("text");
                container.textContent; // this will give the content of the container
    
    use of "trim()" : use to remove the extra space from begining and end of the string, 
        e.g., let str = "    ujjwal    ";
              let newStr = str.trim(); => this will return "ujjwal" 

    use of "eval" : eval(val1 + operator + val2);, better you add space after every input, eval(val1 + " " + operator + " " + val2);

    use of toFixex(dig) : use to fix the number of dicimal places in digit
        e.g., let num = 5.3464624652;
                num = num.toFixed(3); => this will make the num to terminate after 3 dicimal places

    

*/