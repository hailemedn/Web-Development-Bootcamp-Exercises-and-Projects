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
const findOrCreate = require("mongoose-findorcreate");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const ObjectId = mongoose.Types.ObjectId;

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

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
    googleId: String,
    secret: String,
  });

  userSchema.plugin(passportLocalMongoose);
  userSchema.plugin(findOrCreate);

  // const secret = 'thisisourlittlesecret'

  // userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']});

  const User = mongoose.model("User", userSchema);

  // CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
  passport.use(User.createStrategy());

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/secrets",
      },
      function (accessToken, refreshToken, profile, cb) {
        console.log(profile)
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    )
  );

  app.get("/", (req, res) => {
    res.render("home");
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
  );

  app.get('/auth/google/secrets', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/secrets');
    });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/register", (req, res) => {
    res.render("register");
  });

  // some comment
  app.get("/secrets", async (req, res) => {
    if (req.isAuthenticated()) {
      const secrets = await User.find({"secret": {$ne: null}});
      console.log(secrets);
      res.render("secrets", {secrets});
    } else {
      res.redirect("/login");
    }
  });

  app.get("/submit", (req, res) => {
    if (req.isAuthenticated()) {
      res.render("submit");
    } else {
      res.redirect("/login");
    }
  });

  app.get("/logout", (req, res) => {
    req.logout(function (err) {
      if (err) {
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
    User.register(
      { username: req.body.username },
      req.body.password,
      function (err, user) {
        if (err) {
          console.log(err);
          res.redirect("/register");
        } else {
          passport.authenticate("local")(req, res, function () {
            res.redirect("/secrets");
          });
        }
      }
    );
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

    req.login(user, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/secrets");
      }
    });
  });


  // app.post("/submit", async (req, res) => {
  //   const submittedSecret = req.body.secret;
  //   const foundUser = await User.findById(req.user.id);
  //   if(foundUser) {
  //     foundUser.secret = submittedSecret;
  //     await foundUser.save();
  //     res.redirect("/secrets");
  //   } else {
  //     console.log("haven't found user dawg");
  //   }
  // });


  app.post("/submit", async (req, res) => {
    try {
        const submittedSecret = req.body.secret;
        console.log(req.user)
        // Ensure `req.user` exists and contains a valid ID
        if (!req.user || !mongoose.isValidObjectId(req.user.id)) {
            return res.status(400).json({ error: "Invalid or missing user ID" });
        }

        // Fetch the user from the database
        const foundUser = await User.findOne({_id: req.user.id});
        if (!foundUser) {
            console.log("User not found.");
            return res.status(404).json({ error: "User not found" });
        }

        // Update the user's secret
        foundUser.secret = submittedSecret;
        await foundUser.save();

        // Redirect after successful update
        res.redirect("/secrets");
    } catch (error) {
        console.error("Error updating user secret:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

  app.listen(3000, () => {
    console.log("Server started  on port 3000.");
  });
}
