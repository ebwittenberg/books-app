const User = require('../models/users');

async function getById(req, res, next) {

    const userID = req.session.user;
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
    res.send(`New user ID: ${newUserID}`);

}

async function ownedBooks(req, res) {

    const ownedBooks = await req.user.getOwnedBooks();

    res.render('owned', {
        locals: {
            title: ownedBooks[0].title,
            author: ownedBooks[0].author
        }
    });
}

async function buyBook(req, res) {
    // need to change this so HTML form can buy book

    const bookID = req.body.bookid;
    console.log(`Book id is: ${bookID}`);

    // need to figure out how to get userID
    // this is in sessions somewhere
    // here it is
    // const aUser = await User.getById(req.session.user);
    const newOwnedId = await req.user.buyBook(bookID);
  
    res.render('dashboard', {
        locals: {
            message: `Bought book, purchase ID is ${newOwnedId}`
        }
    });
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