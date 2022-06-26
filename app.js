var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
const mainRouter = require('./api/routes');
const dotenv = require('dotenv');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
  res.status(200).send({ msg: "Welcome to Soft It Care app." });
});
//Main Router 
app.use("/api/v2", mainRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// dotenv file import
dotenv.config({
  path: ".env",
});


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

//Database Connection
const uri =
  "mongodb+srv://masumhaque:169572274@cluster0.wnhig.mongodb.net/SoftItCareDatabase?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database did not connect.", err);
  });
module.exports = app;
