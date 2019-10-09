var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "The Booker's Club" });
});

router.get("/books-list", function(req, res, next) {
  res.render("index", { title: "Books List" });
});

router.get("/book-details/:bookId", function(req, res, next) {
  res.render("index", { title: "Book details" });
});

module.exports = router;
