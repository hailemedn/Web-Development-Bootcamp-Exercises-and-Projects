// function test() {
//     var a = "3"
//     var b = "8"

//     var c = a
//     a = b
//     b = c

//     console.log("a is " + a)
//     console.log("b is " + b)
// }


// test()

// BMI Calculator

function bmiCalculator(weight, height) {
    return weight / Math.pow(height, 2)
}

bmi = bmiCalculator(53, 1.67)
console.log("Your BMI is " + bmi)