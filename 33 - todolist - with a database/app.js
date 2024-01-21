const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

main().catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB2');

    const itemSchema = {
        name: String
    }
    const Item = mongoose.model("Item", itemSchema);

    const item1 = new Item({
        name: "Welcome to 2Do"
    })
    const item2 = new Item({
        name: "Insert new items below"
    })
    const item3 = new Item({
        name: "<--- Click here to delete"
    })

    defaultItems = [item1, item2, item3];

    const foundList = await Item.find({});
    if(foundList.length === 0) {
        await Item.insertMany(defaultItems);
       }

    app.get("/" , async (req, res) => {
       const foundList = await Item.find({});
       res.render("list", {listTitle: "Today", foundList: foundList});
    });

    app.post("/", async (req, res) => {
        const newItem = new Item({
            name: req.body.newItem
        });
        await newItem.save();
        res.redirect("/");
    });

    app.post("/delete", async (req, res) => {
        await Item.deleteOne({_id: req.body.itemId});
        res.redirect("/");
    });

}



app.listen("3000", () => {
    console.log("Server started at port 3000!")
})