const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("Hello from the 2nd one");
})

app.get("/contact", (req, res) => {
    res.send("Contact me at angela@gmail.com")
})

app.get("/about", (req, res) => {
    res.send("About me, I'm him");
})

app.get("/hobbies", (req, res) => {
    res.send("Playing Chess");
})

app.listen(3000, function() {
    console.log("We listening at 3000");
});



