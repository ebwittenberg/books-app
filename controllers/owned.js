const Owned = require('../models/owned');

// gets all owned books, regardless of user
function getAll(req, res) {

    res.send(`All owned books goes here`);
}

module.exports = {
    getAll
}