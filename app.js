var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var bodyparser = require('body-parser');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookNowRouter = require('./routes/bookNow');
var pavementRouter = require('./routes/pavement');
var deleteRecordRouter = require('./routes/deleteRecord');
var createNewRecordrouter = require('./routes/createNewRecord');
var addUserDetailsRouter = require('./routes/addUserDetailsAdmin');
var adminAuthRouter = require('./routes/adminAuth');
var adminRouter = require('./routes/admin');
var registeruser = require('./routes/register');
var verifyuser = require('./routes/verify');
var error = require('./routes/error');
var logOut = require('./routes/logoutAdmin');
var editRoomeDetails = require('./routes/editRooms');
var viewOrder = require('./routes/viewOrder');
var deletedRecordes = require('./routes/deletedRooms');
var test = require('./routes/test');
var removetask = require('./Modules/removeRecords');
var reminder = require('./Modules/emailReminder');
var construction = require('./routes/construction');
var app = express();
removetask;  //execute removeRecords function
reminder;  //send reminder mail

require("firebase/firestore");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(express.json());

//session configuration
app.use(session(
  {
    name: 'sid',
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge: 1000*60*30,
      sameSite: true,
      secure:false
    }
  }
))



app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bookNow' , bookNowRouter);
app.use('/pavement' , pavementRouter);
app.use('/deleteRecord' , deleteRecordRouter);
app.use('/createNewRecord' , createNewRecordrouter);
app.use('/addUserDetails' , addUserDetailsRouter);
app.use('/adminAuth' , adminAuthRouter);
app.use('/admin' , adminRouter);
app.use('/register', registeruser);
app.use('/verify',verifyuser);
app.use('/error',error);
app.use('/logout',logOut);
app.use('/editRoomDetails',editRoomeDetails);
app.use('/viewOrder',viewOrder);
app.use('/test',test);
app.use('/pending',construction);
app.use('/deleted',deletedRecordes);
//Jwt configuration
app.use(bodyparser.json());



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
