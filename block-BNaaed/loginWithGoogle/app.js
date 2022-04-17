require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var express = require( "express" );
const mongoose = require( 'mongoose' );
const connectDB = require( './config/db' );
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var passport = require('passport');
const pass = require('./middlewares/passport')(passport);


connectDB();

// Load config
console.log( process.env.GOOGLE_CLIENT_ID,"app.js" )

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//session
app.use( 
  session ( {
  secret: 'any secret',
  resave: false,
  saveUnitialized: false,
  store: new MongoStore( { mongooseConnection: mongoose.connection } )
  } ) 
);

// passport middlewares
app.use( passport.initialize() );
app.use( passport.session() );

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

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
