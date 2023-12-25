const express = require('express');

// installed using npm install body-parser
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", (req, res) => {
    //req.body.num1, num1 refers to the name attribute of the input
    var num1 = Number(req.body.num1)
    var num2 = Number(req.body.num2)
    var answer = num1 + num2
    res.send("The result of the calculation is " + answer)
})


app.get("/bmiCalculator", (req, res) => {
    res.sendFile(__dirname + "/bmiCalculator.html");
})

app.post("/bmiCalculator", (req, res) => {
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);

    var bmi = Math.floor(weight / Math.pow(height, 2));

    res.send("Your BMI is " + bmi);
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});





