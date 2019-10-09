const userController = require('../controllers/user')

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'User Page' });
});

router.get('/profile', userController.getProfile);

router.get('/search-results', userController.getSearchResult);

router.get('/add-book', userController.getAddBooks);

router.get('/borrow-books', userController.getBorrowBooks);

router.get('/checkout', userController.getCheckout);

module.exports = router;
