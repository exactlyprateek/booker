var User = require("../models/user");
var Book = require("../models/book");



// exports.getProfile = function

// };

exports.getSearchResult = function(req, res, next) {
  res.render("searchResults", {
    title: "Search Results",
    path: "/user/search-results"
  });
};

//exports.getAddBooks = function

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
