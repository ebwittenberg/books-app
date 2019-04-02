var express = require('express');
var userRouter = express.Router();
// const User = require('../models/users');

const {
  getById,
  getUser,
  createUser,
  ownedBooks,
  buyBook,
  sellBook
} = require('../controllers/users');

/* GET users listing. */
userRouter.get('/', function(req, res, next) {
  res.send('respond with resource');
});

userRouter.get('/:userid', getById, getUser);


userRouter.get('/:userid/owned', getById, ownedBooks);


userRouter.post('/:userid/buy/:bookid', buyBook);


userRouter.post('/newuser', createUser);


userRouter.delete('/:userid/sell/:bookid', sellBook);



module.exports = userRouter;
