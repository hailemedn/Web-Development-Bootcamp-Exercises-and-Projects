const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

main().catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/todolistDB2");

  const itemSchema = {
    name: String,
  };
  const Item = mongoose.model("Item", itemSchema);

  const listSchema = {
    name: String,
    items: [itemSchema],
  };

  const List = mongoose.model("List", listSchema);

  const item1 = new Item({
    name: "Welcome to 2Do",
  });
  const item2 = new Item({
    name: "Insert new items below",
  });
  const item3 = new Item({
    name: "<--- Click here to delete",
  });

  defaultItems = [item1, item2, item3];

  app.get("/", async (req, res) => {
    const foundCustomList = await List.find({});
    const foundList = await Item.find({});
    if (foundList.length === 0) {
      await Item.insertMany(defaultItems);
    }
    res.render("list", {
      listTitle: "Today",
      foundList: foundList,
      foundCustomList: foundCustomList,
    });
  });

  app.get("/:customList", async (req, res) => {
    const customList = _.capitalize(req.params.customList);
    const foundList = await List.findOne({ name: customList }).exec();
    const foundCustomList = await List.find({});
    if (foundList === null) {
      console.log("List doesn't exist");
      const list = new List({
        name: customList,
        items: defaultItems,
      });
      await list.save();
      res.redirect("/" + customList);
    } else {
      console.log("List Exists");
      console.log(foundList);
      res.render("list", {
        listTitle: customList,
        foundList: foundList.items,
        foundCustomList: foundCustomList,
      });
    }
  });

  app.post("/", async (req, res) => {
    const currentList = req.body.list;
    const newItem = new Item({
      name: req.body.newItem,
    });
    if (currentList === "Today") {
      await newItem.save();
      res.redirect("/");
    } else {
      const foundList = await List.findOne({ name: currentList });
      foundList.items.push(newItem);
      await foundList.save();
      res.redirect("/" + currentList);
    }
  });

  app.post("/delete", async (req, res) => {
    const currentList = req.body.list;
    const itemId = req.body.itemId;
    if (currentList === "Today") {
      await Item.deleteOne({ _id: req.body.itemId }).exec();
      res.redirect("/");
    } else {
      await List.findOneAndUpdate(
        { name: currentList },
        { $pull: { items: { _id: itemId } } }
      );
      res.redirect("/" + currentList);
    }
  });

  app.post("/newList", async (req, res) => {
    const newList = _.capitalize(req.body.newList);
    res.redirect("/" + newList);
  });

  app.post("/deleteList", async (req, res) => {
    const idOfListToDelete = req.body.listId;
    const currentList = req.body.currentList;
    await List.findByIdAndDelete(idOfListToDelete);
    if (currentList === "Today") {
      res.redirect("/");
    } else {
      res.redirect("/" + currentList);
    }
  });
}

app.listen("3000", () => {
  console.log("Server started at port 3000!");
});
