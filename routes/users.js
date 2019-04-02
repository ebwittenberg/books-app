var express = require('express');
var router = express.Router();
const User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with resource');
});

router.get('/:userid', async function(req, res, next) {
  const userID = req.params.userid;

  const aUser = await User.getById(userID);

  res.send(aUser); 

});

router.get('/:userid/owned', async function(req, res) {

  const userID = req.params.userid;

  const aUser = await User.getById(userID);

  const ownedBooks = await aUser.getOwnedBooks();

  res.send(ownedBooks);


})

router.post('/:userid/buy/:bookid', async function(req, res) {

  console.log('this route is working');

  const userID = req.params.userid;
  const bookID = req.params.bookid;

  const aUser = await User.getById(userID);

  const newOwnedId = await aUser.buyBook(bookID);

  res.send(`Your purchase ID: ${newOwnedId}`);

});

router.delete('/:userid/sell/:bookid', async function(req, res) {

  const userID = req.params.userid;
  const bookID = req.params.bookid;

  const aUser = await User.getById(userID);

  await aUser.removeBook(bookID);

  res.send('You no longer own this book.');
})



router.post('/', async function(req, res, next) {
  console.log('this is working');
  console.log(req.body);

  const newUserID = await User.createUser(req.body);
  console.log(newUserID);
  res.end(`New user ID: ${newUserID}`);
});

module.exports = router;
