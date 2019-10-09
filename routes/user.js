var express = require('express');
var router = express.Router();
var expressSession=require('express-session');
var mongoose=require("mongoose");
var mcentral=require('mongoose');
var User=require("../models/user");
var Book=require("../models/user");
router.use(expressSession({
  secret: 'sab ladkiyan rajput ki behen hai',
  resave: true,
  saveUninitialized: true
}));
mongoose.connect("mongodb+srv://dev:jcb@booker-1idmc.mongodb.net/test?retryWrites=true&w=majority")
mcentral.connect("mongodb+srv://dev:jcb@bookdbfake-rbyfo.mongodb.net/test?retryWrites=true&w=majority")
mongoose.set('useFindAndModify', false);
var db = mcentral.connection;
var ObjectID = require('mongodb').ObjectID;
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
  res.render('addBook', { title: 'Add new Books' });
});
router.get("/books-listing", function(req, res, next) {
  Book.find({},(err,found)=>{
    found.forEach((item)=>{
      User.findById(item.seller,(err,found1)=>{
        User.findById(req.params.id,(err,found2)=>{
          if(found2.college==found1.college){
            found2.matches.push(found);
            found.save();
          }
        })
      })
    })
  })

 res.redirect("/books-by-college");
});
router.get("/books-by-college", function(req, res, next) {
  User.findById(req.params.id,(err,found)=>{


  res.render('index', { title: 'Borrow Books', books:found.matches});
})});
router.get('/borrow-books', function(req, res, next) {
  res.render('index', { title: 'Borrow Books' });
});

router.get('/checkout', function(req, res, next) {
  res.render('index', { title: 'Checkout Books' });
});
 
module.exports = router;
