const express = require('express');
const booksRouter = express.Router();
const {
    retrieveBook,
    addBook,
    sortByGenre
} = require('../controllers/books');

booksRouter.post('/', addBook);

booksRouter.get('/:bookid([0-9]+)', retrieveBook); 

booksRouter.get('/:genre', sortByGenre);


module.exports = booksRouter;
