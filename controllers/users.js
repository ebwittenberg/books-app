const User = require('../models/users');

async function getById(req, res, next) {

    const userID = req.params.userid;
    const aUser = await User.getById(userID);
    req.user = aUser;

    next();
}

async function getUser(req, res) {

    if (req.session.user) {

        res.render('users', {
            locals: {
                username: req.user.username,
                email: req.user.email,
                id: req.user.id
            }
    
        })

    } else {
        res.redirect('/login')
    }
    
}

async function createUser(req, res) {

    const newUserID = await User.createUser(req.body);
    res.end(`New user ID: ${newUserID}`);

}

async function ownedBooks(req, res) {

    const ownedBooks = await req.user.getOwnedBooks();

    res.send(ownedBooks);
}

async function buyBook(req, res) {

    const userID = req.params.userid;
    const bookID = req.params.bookid;
  
    const aUser = await User.getById(userID);
    const newOwnedId = await aUser.buyBook(bookID);
  
    res.send(`Your purchase ID: ${newOwnedId}`);
}

async function sellBook(req, res) {

    const userID = req.params.userid;
    const bookID = req.params.bookid;
  
    const aUser = await User.getById(userID);
  
    await aUser.removeBook(bookID);
  
    res.send('You no longer own this book.');

}

module.exports = {
    getById,
    getUser,
    createUser,
    ownedBooks,
    buyBook,
    sellBook
};