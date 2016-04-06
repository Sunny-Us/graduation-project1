var express = require('express');
var router = express.Router();
var swig = require('swig');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.render('test');
  // res.send("hello");
  
swig.renderFile("../views/test.html", {
    pagename: 'awesome people',
    authors: ['Paul', 'Jim', 'Jane']
});
});

module.exports = router;
