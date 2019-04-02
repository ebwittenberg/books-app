const Owned = require('../models/owned');

// gets all owned books, regardless of user
async function getAll(req, res) {

    const ownedBooks = await Owned.getAll();

    res.send(ownedBooks);
}

module.exports = {
    getAll
}