const User = require('../models/users');


// function that handles post request to login

async function checkLogin(req, res) {

    console.log(req.body.username);
    console.log(req.body.password);
    // let's just assume they typed in the correct password
    // to do: check password for real

    
    const theUser = await User.getByUsername(req.body.username);
    
    if (theUser.checkPassword(req.body.password)) {
        // make note that the password is correct and store it on the session, check for it on the dashboard route

        // save the user's id to the session
        req.session.user = theUser.id
        // Make sure the session is saved before we redirect
        req.session.save(() => {
            res.redirect('/dashboard');
        });

    } else {

        res.render('login', {
            locals: {
                username: req.body.username,
                message: 'Password incorrect, please try again'
            }
        })
    }


}

function showLogin(req, res) {

        // clear any stored session
        req.session.destroy();
        // send them the login form
        res.render('login', {
            locals: {
                username: '',
                message: ''
            }
        });

}

module.exports = {
    checkLogin,
    showLogin
}
    