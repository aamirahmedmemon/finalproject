var express = require('express');
const AdminModel = require('../model/admin');
var router = express.Router();

/* GET home page. */
/*/router.get('/', function(req, res, next) {
 res.render('admin/admin-display')
});*/
router.get('/adminadd', function(req, res, next) {
    res.render('admin/adminadd')
   });