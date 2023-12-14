// function isLeap(year) {
//     if(year % 4 === 0) {
//         if(year % 100 === 0) {
//             if(year % 400 === 0) {
//                 console.log("Leap year");
//             }
//             else {
//                 console.log("Not a Leap year");
//             }
//         }
//         else {
//             console.log("Leap year")
//         }
//     }
//     else {
//         console.log("Not a Leap year");
//     }
// }

// isLeap(2000);



// var guests = ["Angela", "ramos", "Tekila", "Muppets", "Sergio", "Dandilion"];
// guests.includes("ramos");

// if(guests.includes("wagwan")) {
//     console.log("Welcome!")
// }
// else {
//     console.log("Get outta hear")
// }

// Fizzbuzz
// prints the numbers from 1 to 100.
// multiples of 3 print "Fizz"
// multiples of 5 print "Buzz"
// multiples of both 3 and 5 print "FizzBuzz".

//for loop
// for(var i=1; i<=100; i++) {
//     if(i%3 === 0 && i%5 === 0){
//         console.log("FizzBuzz")
//     }

//     else if(i%3 === 0) {
//         console.log("Fizz")
//     }

//     else if(i%5 === 0){
//         console.log("Buzz")
//     }
//     else {
//         console.log(i)
//     }
// }

// while loop
// var i = 1;

// while(i < 101) {
//     if(i%3 === 0 && i%5 === 0){
//         console.log("FizzBuzz")
//     }

//     else if(i%3 === 0) {
//         console.log("Fizz")
//     }

//     else if(i%5 === 0){
//         console.log("Buzz")
//     }
//     else {
//         console.log(i)
//     }
//     i++
// }


// var output = []
// output.push(1)
// output.push(2)
// output.push(3)
// output.push(4)

// console.log(output)
// output.pop();
// console.log(output);
// var n = 1
// function fizzBuzz() {
//     output.push(n);
//     n++;
//     console.log(output);
// }

// fizzBuzz()
// fizzBuzz()
// fizzBuzz()
// fizzBuzz()

// beers = 99
// while(beers > 0){
//     console.log(beers + " bottles of beer on the wall, " + beers + " bottles of beer.\n")
//     beers--
//     if (beers === 0) {
//         beers = "no more"
//     }
//     console.log("Take one down and pass it around, " + beers + " bottles of beer on the wall.\n\n")
// }

// console.log("No more bottles of beer on the wall, no more bottles of beer.")
// console.log("Go to the store and buy some more, 99 bottles of beer on the wall.")


// Fibonachi Challenge.
function fibonacciGenerator(n) {
    var output = []
    if(n === 0) {
        console.log("The number must be greater than 0")
    }
    else if(n === 1) {
        output.push(0)
    }
    else if(n === 2) {
        output = [0, 1]
    }
    else {
        output = [0, 1]
        for(var i=0; i<n-2; i++) {
            var sumOfLastTwoItems = output[output.length - 2] + output[output.length - 1]
            output.push(sumOfLastTwoItems)
        }
    }
    
    return output
}


output = fibonacciGenerator(10);
console.log(output);

// output = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
// output.push(output[output.length-1] + output[output.length-2])
// console.log(output)