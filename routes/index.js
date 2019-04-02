var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    locals: {
        title: `Welcome to the reading app`
    }
  })
});

module.exports = router;