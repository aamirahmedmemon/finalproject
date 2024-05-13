var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var categoryRouter = require('./routes/category');
var workerRouter = require('./routes/worker');
var bookingRouter = require('./routes/booking');
var usersideRouter = require('./routes/userside');
var feedbackRouter = require('./routes/feedback');
var workerSideRouter = require('./routes/workerside');
var paymentSideRouter = require('./routes/payment');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 }}));
app.use(fileUpload());

app.use(function(req,res,next) {
  res.locals.email = req.session.email;
  res.locals.id = req.session.userid;
  res.locals.adminemail = req.session.adminemail;
  res.locals.workeremail = req.session.workeremail;
 // res.locals.id = req.session.workerid;
  //res.locals.username=req.session.username;
  next();
  });

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/category', categoryRouter);
app.use('/worker', workerRouter);
app.use('/booking', bookingRouter);
app.use('/userside', usersideRouter);
app.use('/feedback', feedbackRouter);
app.use('/workerside', workerSideRouter);
app.use('/payment', paymentSideRouter);

//MongoDB Connection Start
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/finalproject')
.then(()=>console.log('Connection established'))
.catch((err)=>console.log("Error connecting to MongoDB"))
//MongoDB Connection End

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
module.exports = app;
