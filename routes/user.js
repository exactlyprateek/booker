var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'User Page' });
});

router.get('/profile', function(req, res, next) {
  res.render('index', { title: 'User Profile' });
});

router.get('/search-results', function(req, res, next) {
  res.render('index', { title: 'Search Results' });
});

router.get('/add-book', function(req, res, next) {
  res.render('index', { title: 'Add new Books' });
});

router.get('/borrow-books', function(req, res, next) {
  res.render('index', { title: 'Borrow Books' });
});

router.get('/checkout', function(req, res, next) {
  res.render('index', { title: 'Checkout Books' });
});

module.exports = router;
