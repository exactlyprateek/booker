var User = require("../models/user");
var Book = require("../models/book");

function getUser(userId) {
  User.findById(userId, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      return found;
    }
  });
}

exports.getProfile = function(req, res, next) {
  var user = getUser(req.params.id);

  res.render("profile", {
    title: `Pofile Page`,
    path: "/user/profile"
    // user: user
  });
};

exports.getSearchResult = function(req, res, next) {
  res.render("searchResults", {
    title: "Search Results",
    path: "/user/search-results"
  });
};

exports.getAddBooks = function(req, res, next) {
  res.render("addBook", { title: "Add new Books", path: "/user/add-books" });
};

exports.postAddBooks = function(req, res, next) {
  
};

exports.getBorrowBooks = function(req, res, next) {
  res.render("borrowBooks", {
    title: "Borrow Books",
    path: "/user/borrow-books"
  });
};

exports.getCheckout = function(req, res, next) {
  res.render("checkout", { title: "Checkout Books", path: "/user/checkout" });
};
