const express = require('express');
const {
    checkLogin,
    showLogin
} = require('../controllers/login');

const loginRouter = express.Router();

loginRouter.get('/',  showLogin);
loginRouter.post('/', checkLogin);



module.exports = loginRouter;

