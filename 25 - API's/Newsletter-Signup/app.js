const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/" , (req, res) => {
   var firstName = req.body.firstName;
   var lastName = req.body.lastName;
   var email = req.body.email;
   console.log("Inputed Name: " + firstName + " " + lastName);
   res.send("Submitted Successfully");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})


// api key
// 48ba6140e8d4e4a3c9b3aea67be262b5-us9

//audience id
// 1c12c482d8
