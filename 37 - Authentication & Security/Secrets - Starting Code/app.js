//jshint esversion:6
require("dotenv").config();

// const bcrypt = require("bcrypt");
// const saltRounds = 10;
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");




const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  secret: "our little secret.",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

main().catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect("mongodb://localhost:27017/userDB");

  const userSchema = new mongoose.Schema({
    email: String,
    password: String,
  });

  userSchema.plugin(passportLocalMongoose);

  // const secret = 'thisisourlittlesecret'

  // userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']});

  const User = mongoose.model("User", userSchema);

  // CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  

  app.get("/", (req, res) => {
    res.render("home");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/register", (req, res) => {
    res.render("register");
  });


  // some comment
  app.get("/secrets", (req, res) => {
    if(req.isAuthenticated()) {
      res.render("secrets");
    } else {
      res.redirect("/login");
    }
    
  })

  app.get("/logout", (req, res) => {
    req.logout(function (err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect("/login");
      }
    });
  });




  app.post("/register", async (req, res) => {
    // const hash = await bcrypt.hash(req.body.password, saltRounds);

  //   const newUser = new User({
  //     email: req.body.username,
  //     password: hash,
  //   });

  //   await newUser.save();
  //   res.render("secrets");
    User.register({username: req.body.username}, req.body.password, function(err, user) {
      if(err) {
        console.log(err);
        res.redirect('/register');
      } else {
        passport.authenticate("local")(req, res, function() {
          res.redirect("/secrets");
        });
      }
    });
  });

  app.post("/login", async (req, res) => {
    // const username = req.body.username;
    // const password = req.body.password;

    // const foundUser = await User.findOne({ email: username });

    // if (foundUser) {
    //   const match = bcrypt.compare(password, foundUser.password);
    //   if (match) {
    //     res.render("secrets");
    //   } else {
    //     res.send("wrong password");
    //   }
    // } else {
    //   res.send("Can't find the user.");
    //   console.log();
    // }

    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    req.login(user, function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect("/secrets");
      }
    });
  });







  app.listen(3000, () => {
    console.log("Server started  on port 3000.");
  });

  

}


