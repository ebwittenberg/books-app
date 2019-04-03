const express = require('express');

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => { // the req res part is normally in controller, move there later

    // send them the login form
    res.render('login');

})

loginRouter.post('/', (req, res) => {

    console.log(req.body.username);
    console.log(req.body.password);
    res.send('you posted the form');

})



module.exports = loginRouter;

