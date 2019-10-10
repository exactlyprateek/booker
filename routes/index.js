var express = require("express");
var router = express.Router();
var crypto=require('crypto');
var mongoose=require("mongoose");
var mcentral=require('mongoose');
var User=require("../models/user");
var Book=require("../models/book");
/* GET home page. */
var expressSession=require('express-session');
router.use(expressSession({
  secret: 'sab ladkiyan rajput ki behen hai',
  resave: true,
  saveUninitialized: true
}));


router.get("/", function(req, res, next) {
  console.log(req.session.loggedin);
  res.render("index", { title: "The Booker's Club", path:'/', isLoggedIn: req.session.loggedin });
});

router.get("/books-list", function(req, res, next) {
  res.render("index", { title: "Books List" ,path:'/books-list', isLoggedIn: req.session.loggedin });
});

router.get('/delete', (req, res, next) => {
  Book.deleteMany({},(err,found) => {
    res.send("done");
  });
});

router.get("/login",(req,res)=>{
  res.render("loginPage", {path: '/login', isLoggedIn: false});
})
router.post("/login",(req,res)=>{
  console.log(req.body.user);
  User.findOne({email:req.body.user.email.toUpperCase()},(err,found)=>{
    if (err) {
      console.log(err);
      console.log(found +"error");
    } else {
      if(crypto.createHash('md5').update(req.body.user.password).digest("hex") == found.password){
        req.session.loggedin=true;
        console.log(found +"error no");
        res.redirect("/user/"+found.id+"/?name="+found.name)
      }
      else{
        res.render('error',{message:"Incorrect password"})
      }
    }
  })
})
router.get('/register',(req,res)=>{
  res.render("loginPage", {path: '/login'})
});
router.post("/register",(req,res)=>{
  var user1= req.body.user;
  console.log(user1)
  user1['email']=user1.email.toUpperCase();
  user1['password']=crypto.createHash('md5').update(user1.password).digest("hex");
  console.log(user1)
  User.create(user1,(err,found)=>{
    console.log('error not here')
    if (err) {
      console.log('err')
    } else {
      req.session.loggedin=true;
      var text="Hey "+found.name+", Thank you for signing up on Booker's club. Your can rent a book here and save money rather than buying expensive books . Happy reading!!! Regards, Team Booker's Club"; 
      var texthtm="Hey "+req.user.username+",<br> Thank you for signing up on Booker's club. Your can rent a book here and save money rather than buying expensive books .<br> <center><bold><h4>Happy reading!!!</h4></bold></center><br> Regards,<br> Team Booker's Club"; 
      console.log(text)
        const msg = {
          to:req.user.username,
          from: 'mayankkapur556@gmail.com',
          subject: 'Welcome to Bookers club',
          text: text,
          html:texthtm
          
        };
        sgMail.send(msg);
      res.redirect("/user/"+found.id);
    }
  })
})
router.get("/view",(req,res)=>{
  User.find({},(err,found)=>{
    if (err) {
      console.log(err)
    } else {
      res.send(found);
    }
    
  })
})
function isLoggedIn(req,res,next){
  if(req.session.loggedin==true)
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
