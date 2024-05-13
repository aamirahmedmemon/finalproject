var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/employee', function(req, res, next) {
  res.render('employee');
});


module.exports = router;
