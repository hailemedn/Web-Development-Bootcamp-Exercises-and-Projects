const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const lists = ["Welcome to 2Do", "Enter your tasks below", "<-- Click here to delete"]

app.get("/", (req, res) => {
    res.render("list", {
        listTitle: "Today",
        lists: lists});
});

app.listen("3000", () => {
    console.log("Server started at port 3000!");
});
