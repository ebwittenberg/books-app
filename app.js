var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const booksRouter = require('./routes/book');
const ownedRouter = require('./routes/owned');
const loginRouter = require('./routes/login');

const es6Renderer = require('express-es6-template-engine');

var app = express();

// require session and session storage modules

// this module lets express remember users as they go from page to page
const session = require('express-session');

// immediately calls whatever comes back from the require, and passes it the session variable
const FileStore = require('session-file-store')(session);

app.use(session({
  store: new FileStore(), // no options for now
  secret: 'dlwifdslksdlkjwfeoisdlkoijfw'
}));

// tell express to use the sessions

// view engine setup
// this is where I will replace with ES6 renderer

app.engine('html', es6Renderer); // introduce express app to es6renderer, saying that it speaks 'html'

app.set('views', './views'); // configure express further, tells express specific info about where views will be (it's in the views folder aka ./views, the second argument)


app.set('view engine', 'html'); // tell express to use as its view engine the thing that speaks html (es6renderer)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // baked into express already, can decode form data and put in req.body
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/owned', ownedRouter);
app.use('/login', loginRouter);

app.get('/dashboard', (req, res) => {
  console.log(`The user's id is: ${req.session.user}`);

  // if user entered password correctly
  if (req.session.user) {
    res.send('This is the dashboard. You are now logged in');
  } else {
    // redirect to login page
    res.redirect('/login');
  }
})

module.exports = app;
