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

// Requests targeting all articles
app.route("/articles")

.get(async (req, res) => {
    try {
        const foundArticles = await Article.find({});
        res.send(foundArticles);
    } catch (err) {
        res.send(err);
    }
})

.post(async (req, res) => {
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    })

    try {
        await newArticle.save();
        res.send("Successfully added a new article");
    } catch (err) {
        console.log("Unable to save, Error:" + err);
        res.send(err);
    }
})

.delete(async (req, res) => {
    try {
        await Article.deleteMany({});
        res.send("Successfully deleted all articles.");
    } catch (err) {
        res.send(err);
    }
});


// Requesting targeting a specific article.
app.route("/articles/:articleTitle")

.get(async (req, res) => {
    try{
        const foundArticle = await Article.findOne({title: req.params.articleTitle});
        if(foundArticle) {
            res.send(foundArticle);
        }
        else {
            res.send("No Article matching that title was found");
        }
    } catch(err) {
        res.send(err);
    }
})

.put(async (req, res) => {
    try {
        await Article.updateOne(
            {title: req.params.articleTitle},
            {title: req.body.title, content: req.body.content},
            {overwrite: true},
        );
        res.send("Successfully updated");
    } catch (err) {
        res.send(err);
    }
})

.patch(async (req, res) => {
    try {
        await Article.updateOne(
            {title: req.params.articleTitle},
            {$set: req.body}
        )
        res.send("Successfully updated article")
    } catch (err) {
        res.send(err);
    }
})

.delete(async (req, res) => {
    try{
        const foundArticle = await Article.deleteOne({title: req.params.articleTitle});
        res.send("Successfully deleted article");
    } catch (err){
        console.log(err);
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server started at port " + PORT);
});