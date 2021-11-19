var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Costume = require("./models/costumes");

passport.use(new LocalStrategy(function(username, password, done) {
  Account.findOne({ username: username }, function (err, user) {
    if (err) { 
      return done(err); 
    }
    if (!user) {
      return done(null, false, { 
        message: 'Incorrect username.' 
      });
    }
    if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
}));
var mongoose = require('mongoose');
var Costumes = require("./models/costumes");

const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// server start
async function recreateDB() {
  // Delete everything
  await Costumes.deleteMany();
  let instance1 = new
  Costumes({
    costumes_type: "ghost",
    size: 'large',
    cost: 25.4
  });
  let instance2 = new
  Costumes({
    costumes_type: 'spiderman',
    size: 'medium',
    cost: 36.4
  });
  let instance3 = new
  Costumes({
    costumes_type: 'superman',
    size: 'small',
    cost: 42.6
  });  
  instance1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First object saved")
  });
  instance2.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Second object saved")
  });
  instance3.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third object saved")
  });
}

let reseed = true;
if (reseed) {
  recreateDB();
}


// We can seed the collection if needed on

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var costumesRouter = require('./routes/costumes');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');







app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/costumes', costumesRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectorRouter);
app.use('/', resourceRouter);

// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/costumes', costumesRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectorRouter);
app.use('/', resourceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;