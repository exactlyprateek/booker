var express = require("express");
var router = express.Router();
var crypto=require('crypto');
var mongoose=require("mongoose");
var User=require("../models/user");

/* GET home page. */
var express1=require('express-sessions');


router.get("/", function(req, res, next) {
  res.render("index", { title: "The Booker's Club", path:'/' });
});

router.get("/books-list", function(req, res, next) {
  res.render("index", { title: "Books List" ,path:'/books-list' });
});

router.get("/book-details/:bookId", function(req, res, next) {
  res.render("index", { title: "Book details" ,path:'/book-details/book' });
});

router.get("/login",(req,res)=>{
  res.render("loginPage", {path: '/login'})
})
router.post("/login",(req,res)=>{
  User.findOne({email:req.body.user.email.toUpperCase()},(err,found)=>{
    if (err) {
      console.log(err);
    } else {
      if(crypto.createHash('md5').update(req.body.user.password).digest("hex") == hash){
        req.session.loggedin=true;
        res.redirect("/"+found.id)
      }
      else{
        res.render('error',{message:"Incorrect password"})
      }
    }
  })
})
router.get('/register',(req,res)=>{
res.render('register');
});
router.post("/register",(req,res)=>{
  var user1= req.body.user;
  user1['password']=crypto.createHash('md5').update(user1.password).digest("hex");
  User.create(user1,(err,found)=>{
    if (err) {
      console.log('err')
    } else {
      req.session.loggedin=true;
      res.redirect("/"+found.id);
    }
  })
})
function isLoggedIn(req,res,next){
  if(req.sessions.loggedin==true)
  next();
  else{
    res.render("error",{message:"loggin/register first"});
  }
}
router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login');
})

module.exports = router;
