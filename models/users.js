const db = require('./conn');
const Book = require('./books');

class User {

    constructor(id, email, username, password) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    static createUser(userObject) {
        return db.one(`
        INSERT into users (email, username, password) 
        values ($1, $2, $3)
        returning id
        `, [userObject.email, userObject.username, userObject.password])
        .then(data => {
            return data.id
        })
    }

    static getById(id) {
        return db.one(`
        select * from users
        WHERE id=${id};
        `)
        .then(userData => {
            const userInstance = new User(userData.id, userData.email, userData.username, userData.password);
            return userInstance;
        })
        .catch(err => console.log(`This is an error`));
    }

    buyBook(bookID) {
        // needs to create new item in owned table
        return db.one(`
        INSERT INTO owned (user_id, book_id)
        values ($1, $2)
        returning id
        `, [this.id, bookID])
        .then(ownedData => {
            return ownedData.id;
        })
    }

    removeBook(bookID) {

        return db.result(`
        DELETE FROM owned
        WHERE book_id=${bookID}
        `)
        .then(result => {
            return result;
        })
    }

    getOwnedBooks() {
        return db.any(`
        select * from owned
        WHERE user_id=${this.id}
        `)
        .then(async ownedData => {
            console.log(`This is owned data: ${ownedData}`);

            const promisesArray = ownedData.map(ownedBook => Book.getById(ownedBook.book_id));

            const array = await Promise.all(promisesArray);

            // for (const ownedBook of ownedData) {

            //     const ownedBookInstance = await Book.getById(ownedBook.book_id);
            //     // console.log(`This is owned book instance: ${ownedBookInstance.title}`);
            //     ownedBooksArray.push(ownedBookInstance);
            //     // console.log(`This is owned books array: ${ownedBooksArray}`);

            // }
            return array;
        });
    }

}

module.exports = User;
