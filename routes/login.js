const express = require('express');

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => { // the req res part is normally in controller, move there later

    // send them the login form
    res.render('login');

})

loginRouter.post('/', (req, res) => {

    console.log(req.body.username);
    console.log(req.body.password);
    // let's just assume they typed in the correct password
    // to do: check password for real

    res.redirect('/dashboard');

});



module.exports = loginRouter;

