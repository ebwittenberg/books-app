const db = require('./conn');
const bcrypt = require('bcrypt');

class Book {
    constructor(id, title, author, genre) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
    }

    static createBook(bookObject) {

        return db.one(`
        INSERT INTO books (title, author, genre)
        VALUES ($1, $2, $3)    
        returning id
        `, [bookObject.title, bookObject.author, bookObject .genre])
        .then(newBookData => {
            return newBookData.id;
        })

    }

    static getByTitle(title) {
        return db.one(`
        select * from books
        WHERE title ILIKE '${title}'
        `)
        .then(bookData => {
            return new Book(bookData.id, bookData.title, bookData.author, bookData.genre);
        })
    }

    static getById(id) {
        return db.one(`
        select * from books
        WHERE id=${id}
        `)
        .then(bookData => {
            const bookInstance = new Book(bookData.id, bookData.title, bookData.author, bookData.genre);
            return bookInstance;
        })
        .catch(err => {
            return err;
        })
    }

    static sortBy(genre) {
        return db.any(`
        select * from books
        WHERE genre ILIKE '${genre}'
        `)
        .then(booksData => {
            const arrayOfInstances = [];
            booksData.forEach(book => {
                const bookInstance = new Book(book.id, book.title, book.author, book.genre);
                arrayOfInstances.push(bookInstance);
            })
            return arrayOfInstances;
        })
        .catch(err => {
            return err;
        })
    }
}

module.exports = Book;

