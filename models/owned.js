const db = require('./conn');


class Owned {

    constructor(id, userid, bookid) {
        this.id = id;
        this.userid = userid;
        this.bookid = bookid;
    }

}

module.exports = Owned;