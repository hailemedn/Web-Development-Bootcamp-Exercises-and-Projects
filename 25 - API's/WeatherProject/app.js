const express = require("express");
const https = require("https");

const app  = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const apikey = "6bf99c73664b55fefef2ee9497809109";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey +"&units=metric"

    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + weatherDescription + "<p>");
            res.write("<h1>The temperature in "+ query +" is " + temp + " degree Celcius.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();

        });
    });
})

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
})


/*

*/