const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));


const connect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");
        console.log("Connected with MongoDB database successfully");
    } catch (err) {
        console.log("unable to connect with MongoDB database, Error: " + err);
    }
}

connect();

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", async (req, res) => {
    try {
        const foundArticles = await Article.find({});
        res.send(foundArticles);
    } catch (err) {
        res.send(err);
    }
})

app.post("/articles", async (req, res) => {
    console.log(req.body.title);
    console.log(req.body.content);

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    })

    try {
        await newArticle.save();
    } catch (err) {
        console.log("Unable to save, Error:" + err);
    }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server started at port " + PORT);
})