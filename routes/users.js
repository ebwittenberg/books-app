var express = require('express');
var router = express.Router();
// const User = require('../models/users');

const {
  getUser,
  createUser,
  ownedBooks,
  buyBook,
  sellBook
} = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with resource');
});

router.get('/:userid', getUser);


router.get('/:userid/owned', ownedBooks);


router.post('/:userid/buy/:bookid', buyBook);


router.post('/newuser', createUser);


router.delete('/:userid/sell/:bookid', sellBook);



module.exports = router;
