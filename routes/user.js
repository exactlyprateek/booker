const userController = require("../controllers/user");
var fs = require("fs");
var express = require("express");
var router = express.Router();
var expressSession = require("express-session");
var mongoose = require("mongoose");
var mcentral = require("mongoose");
var User = require("../models/user");
var Book = require("../models/user");
var rawdata = fs.readFileSync("./data/books.json");
var data = JSON.parse(rawdata);
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
// var Bookorg=require("../models/bookorg")
router.use(
  expressSession({
    secret: "sab ladkiyan rajput ki behen hai",
    resave: true,
    saveUninitialized: true
  })
);

function isLoggedIn(req, res, next) {
  if (req.session.loggedin == true) next();
  else {
    res.render("error", { message: "loggin/register first" });
  }
}

mongoose.set("useFindAndModify", false);
var db = mcentral.connection;
var ObjectID = require("mongodb").ObjectID;

// function getUser(userId) {
//   User.findById(userId, (err, found) => {
//     if (err) {
//       console.log(err);
//     } else {
//       return found;
//     }
//   });
// }

/* GET home page. */

router.get("/", isLoggedIn, function(req, res, next) {
  User.findOne({ name: req.query.name }, (err, found) => {
    if (err || found === null) {
      console.log(err);
    } else {
      res.render("book-search", {
        title: "User Page",
        path: "/",
        isLoggedIn: req.session.loggedin,
        user: found,
        book1: found.matches,
        book2: data,
      });
    }
  });
});

router.get("/profile", isLoggedIn, (req, res, next) => {
  User.findOne({ name: req.query.name }, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.render("profile", {
        title: `Pofile Page`,
        path: "/user/profile",
        isLoggedIn: req.session.loggedin,
        user: found
      });
    }
  });
});

router.get("/search-results", userController.getSearchResult);

router.get("/books-listing", function(req, res, next) {
  Book.find({}, (err, found) => {
    found.forEach(item => {
      User.findOne({ name: item.seller }, (err, found1) => {
        User.findById({ name: req.query.name }, (err, found2) => {
          if (found2.college == found1.college) {
            found2.matches.push(found);
            found.save();
          }
        });
      });
    });
  });

  res.redirect("/");
});

// router.get("/books-by-college", function(req, res, next) {
//   User.findOne({ name: req.query.name }, (err, found) => {
//     res.render("book-search", {
//       title: "Borrow Books",
//       book1: found.matches,
//       book2: data, 
//       isLoggedIn: req.session.loggedin,
//       user: found
//     });
//   });
// });

router.get("/add-book", (req, res, next) => {
  User.findOne({ name: req.query.name }, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      db.collection("bookorgs").find({}, (err, foundbk) => {
        if (err) {
          console.log(err);
        } else {
          console.log(foundbk);

          res.render("addBook", {
            title: "Add new Books",
            path: "/user/add-books",
            isLoggedIn: req.session.loggedin,
            user: found,
            book: data
          });
        }
      });
    }
  });
});

router.get("/borrow-books", userController.getBorrowBooks);

router.get("/checkout", userController.getCheckout);

module.exports = router;
