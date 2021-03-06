var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession=require('express-sessions');
var bodyParser=require('body-parser')
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var mongoose=require('mongoose')
var mcentral=require('mongoose')
var app = express();
mongoose.connect("mongodb+srv://nik:nik@cluster0-ney0t.mongodb.net/test?retryWrites=true&w=majority");
mcentral.connect("mongodb+srv://dev:jcb@bookdbfake-rbyfo.mongodb.net/test?retryWrites=true&w=majority")
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1); // trust first proxy

app.use('/', indexRouter)
app.use('/user/:id', userRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
var port=process.env.PORT||9000
app.listen(port)

module.exports = app;
