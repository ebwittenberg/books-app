const pgp = require('pg-promise')({
    query: e => {
        console.log('Query: ', e.query)
    }


});
const options = {
    host: 'localhost',
    database: 'reading-app'
}

const db = pgp(options);

module.exports = db;