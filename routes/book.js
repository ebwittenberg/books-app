const express = require('express');
const router = express.Router();
const Books = require('../models/books');

router.post('/', async function(req, res, next) {

    console.log(req.body);
    const newBookID = await Books.createBook(req.body);
    res.send(`New book ID: ${newBookID}`);


})
// need to put two backslashes, first one escapes \ so it still is a string. Regex is looking for '\d+'
router.get('/:bookid([0-9]+)', async function(req, res, next) {

    const bookID = req.params.bookid;

    const bookInstance = await Books.getById(bookID);

    // if there is an error
    if (bookInstance.name) {

        res.send(`{"message": "Error: book not found"}`);

    } else {
        res.send(bookInstance);
    }

})

router.get('/:genre', async function (req, res, next) {
    const genre = req.params.genre;

    const genreBooks = await Books.sortBy(genre);

    // if no books are found
    if (genreBooks.length === 0) {
        res.send(`{"message": "Error: no books for this genre found."}`);
    } else {
        res.send(genreBooks);
    }

})


module.exports = router;
