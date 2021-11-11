var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const connectionString = process.env.MONGO_CON;
mongoose = require("mongoose");
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var lampRouter = require('./routes/Lamp');
var addmodsRouter = require('./routes/addmods');
var selectRouter = require('./routes/selector');
var Lamp = require("./models/lamp");

// We can seed the collection if needed on
//server start
//server start
async function recreateDB() {
  // Delete everything
  await Lamp.deleteMany();
  let instance1 = new Lamp({
    lamp_type: "Arc Lamps",
    duration: 5,
    cost: 34,
  });
  let instance2 = new Lamp({
    lamp_type: "Tripod Lamps",
    duration: 6,
    cost: 35,
  });
  let instance3 = new Lamp({
    lamp_type: "Swing Arm Lamps",
    duration: 7,
    cost: 36,
  });
  instance1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First object saved");
  });
  instance2.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Second object saved");
  });
  instance3.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third object saved");
  });
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Lamp', lampRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectRouter);


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
