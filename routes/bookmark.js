var express = require('express');

var router = express.Router();

/* GET home page. */
/*router.get('/categorydisplay', function(req, res, next) {
 res.render('category/categorydisplay')
});*/
router.get('/bookingadd', function(req, res, next) {
    res.render('booking/bookingadd')
   });
  
  
 
  
module.exports = router;
