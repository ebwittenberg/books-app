const express = require('express');
const {
    getById,
    buyBook,
    sellBook
} = require('../controllers/users');

const dashboardRouter = express.Router();

dashboardRouter.post('/buy', getById, buyBook);

dashboardRouter.post('/sell', getById, sellBook);

dashboardRouter.get('/', (req, res) => {
    // if there is a record of the user in the session (aka user is successfully logged in)
    if (req.session.user) {
        res.render('dashboard', {
            locals: {
                message: '',
                username: req.session.username,
                soldmessage: ''
            }
        });
      } else {
        // redirect to login page
        res.redirect('/login');
      }
})

module.exports = dashboardRouter;