const userController = require("../controllers/user");

var express = require("express");
var router = express.Router();
var expressSession = require("express-session");
var mongoose = require("mongoose");
var mcentral = require("mongoose");
var User = require("../models/user");
var Book = require("../models/user");
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
    console.log(req.params.id);
    if (err || found === null) {
      // console.log(err);
      console.log("In error at user router");
    } else {
      console.log(found);
      res.render("index", {
        title: "User Page",
        path: "/",
        isLoggedIn: req.session.loggedin,
        user: found
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
      User.findById(item.seller, (err, found1) => {
        User.findById(req.params.id, (err, found2) => {
          if (found2.college == found1.college) {
            found2.matches.push(found);
            found.save();
          }
        });
      });
    });
  });

  res.redirect("/books-by-college");
});
router.get("/books-by-college", function(req, res, next) {
  User.findById(req.params.id, (err, found) => {
    res.render("index", { title: "Borrow Books", books: found.matches });
  });
});

router.get("/add-book", (req, res, next) => {
  User.findOne({ name: req.query.name }, (err, found) => {
    if (err) {
      console.log(err);
    } else {

      db.collection('bookorgs').find({}, (err, foundbk) => {
        if(err){
          console.log(err);
        }else {

          res.render("addBook", {
            title: "Add new Books",
            path: "/user/add-books",
            isLoggedIn: req.session.loggedin,
            user: found,
            book: foodbk
          });
        }
      })

    }
  });


});

router.get("/borrow-books", userController.getBorrowBooks);

router.get("/checkout", userController.getCheckout);

module.exports = router;
