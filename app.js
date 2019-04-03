var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const booksRouter = require('./routes/book');
const ownedRouter = require('./routes/owned');
const loginRouter = require('./routes/login');

const es6Renderer = require('express-es6-template-engine');

var app = express();

// view engine setup
// this is where I will replace with ES6 renderer

app.engine('html', es6Renderer); // introduce express app to es6renderer, saying that it speaks 'html'

app.set('views', './views'); // configure express further, tells express specific info about where views will be (it's in the views folder aka ./views, the second argument)


app.set('view engine', 'html'); // tell express to use as its view engine the thing that speaks html (es6renderer)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // baked into express already, can decode form data and put in req.body
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/owned', ownedRouter);
app.use('/login', loginRouter);

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
