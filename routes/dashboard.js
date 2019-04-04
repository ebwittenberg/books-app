const express = require('express');
const {
    buyBook
} = require('../controllers/users');

const dashboardRouter = express.Router();

dashboardRouter.post('/buy', buyBook);

dashboardRouter.get('/', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', {
            locals: {
                message: ''
            }
        });
      } else {
        // redirect to login page
        res.redirect('/login');
      }
})

module.exports = dashboardRouter;