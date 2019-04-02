const db = require('./conn');
const Book = require('../models/books');


class Owned {

    constructor(id, userid, bookid) {
        this.id = id;
        this.userid = userid;
        this.bookid = bookid;
    }

    static getAll() {
        return db.any(`
        select * from owned
        `)
        .then(async ownedBooks => {

            // use map on owned books, need to create book instances for all owned books
            const arrayOfPromises = ownedBooks.map(book => Book.getById(book.book_id));
            console.log(arrayOfPromises);

            const arrayofInstances = await Promise.all(arrayOfPromises);

            return arrayofInstances;

        })
    }

}

module.exports = Owned;