const User = require('../models/users');
const Book = require('../models/books');

async function getById(req, res, next) {

    const userID = req.session.user;
    const aUser = await User.getById(userID);
    // stores instance of User in the request, which is being passed along to buyBook
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

    // this is from the form
    const bookTitle = req.body.booktitle;

    console.log(`Book title is: ${bookTitle}`);

    // convert entered title into book instance with all information

    const bookInstance = await Book.getByTitle(bookTitle);

    // need to figure out how to get userID
    // this is in sessions somewhere
    // here it is
    // const aUser = await User.getById(req.session.user);
    console.log(`This is the book instance ${bookInstance}`);
    // req.user was passed along from getById
    const newOwnedId = await req.user.buyBook(bookInstance.id);
  
    res.render('dashboard', {
        locals: {
            message: `Bought book, purchase ID is ${newOwnedId}`,
            username: req.session.username,
            soldmessage: ''
        }
    });
}

async function sellBook(req, res) {

    const bookTitle = req.body.booktitle;
  
    // const aUser = await User.getById(userID);
    const bookInstance = await Book.getByTitle(bookTitle);
  
    await req.user.removeBook(bookInstance.id);
  
    res.render('dashboard', {
        locals: {
            message: '',
            username: req.session.username,
            soldmessage: 'You have sold the book'
        }
    })

}

module.exports = {
    getById,
    getUser,
    createUser,
    ownedBooks,
    buyBook,
    sellBook
};