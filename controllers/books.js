const Book = require('../models/books');

async function retrieveBook(req, res) {

    const bookID = req.params.bookid;

    const bookInstance = await Book.getById(bookID);

    // if there is an error
    if (bookInstance.name) {

        res.send(`{"message": "Error: book not found"}`);

    } else {
        res.send(bookInstance);
    }

} 

async function addBook(req, res) {

    const newBookID = await Book.createBook(req.body);
    res.send(`New book ID: ${newBookID}`);

}

async function sortByGenre(req, res) {

    const genre = req.params.genre;

    const genreBooks = await Book.sortBy(genre);

    // if no books are found
    if (genreBooks.length === 0) {
        res.send(`{"message": "Error: no books for this genre found."}`);
    } else {
        res.send(genreBooks);
    }

}

module.exports = {
    retrieveBook,
    addBook,
    sortByGenre
}