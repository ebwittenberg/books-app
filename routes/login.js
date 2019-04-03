const express = require('express');
const User = require('../models/users');

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => { // the req res part is normally in controller, move there later

    // send them the login form
    res.render('login', {
        locals: {
            username: '',
            message: ''
        }
    });

})

loginRouter.post('/', async (req, res) => {

    console.log(req.body.username);
    console.log(req.body.password);
    // let's just assume they typed in the correct password
    // to do: check password for real

    
    const theUser = await User.getByUsername(req.body.username);
    
    if (theUser.checkPassword(req.body.password)) {
        
        res.redirect('/dashboard');

    } else {

        res.render('login', {
            locals: {
                username: req.body.username,
                message: 'Password incorrect, please try again'
            }
        })
    }

});



module.exports = loginRouter;

