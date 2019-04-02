// require express module
const express = require('express');
// require owned controller functions
const {
    getAll
} = require('../controllers/owned');

// create the router for favorites
const ownedRouter = express.Router();

// route different URL params to controller
// owned/all
ownedRouter.get('/all', getAll);

module.exports = ownedRouter;