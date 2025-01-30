// let x = -10;
// x = Number(x);
// console.log(`(${x})`);

function Display(value){
    
    // generally to convert string to integer we use parseInt(str), but this don't work on decimal numbers, so we use Number(str) to convert string into number

    value = Number(value);
    if(value < 0) console.log(`(${value})`);
    else console.log(value);
}