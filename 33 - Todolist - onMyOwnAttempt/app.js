const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const lists = ["Welcome to 2Do", "Enter your tasks below", "<-- Click here to delete"]
const workList = ["Welcome to 2Do", "Enter your tasks below", "<-- Click here to delete"]

app.get("/", (req, res) => {
    res.render("list", {
        listTitle: "Today",
        lists: lists});
});

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work", lists: workList});
});

app.post("/", (req, res) => {
    const newItem = req.body.newItem;
    const list = req.body.list;
    console.log(list)
    if(list === "Work") {
        workList.push(newItem);
        res.redirect("/" + list);
    }
    else {
        lists.push(newItem);
        res.redirect("/");
    }
});

app.post("/delete", (req, res) => {
    const list = req.body.list
    const itemIndex = req.body.itemIndex;
    if (list === "Work") {
        workList.splice(itemIndex, 1);
        res.redirect("/work");
    } else {
        lists.splice(itemIndex, 1);
        res.redirect("/");
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started at port 3000!");
});
