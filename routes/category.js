var express = require('express');
const CategoryModel = require('../model/category');
var router = express.Router();

/* GET home page. */
/*router.get('/categorydisplay', function(req, res, next) {
 res.render('category/categorydisplay')
});*/
router.get('/categoryadd', function(req, res, next) {
    res.render('category/categoryadd')
   });
  
   router.post('/categoryprocess', function(req, res, next) {
   var mydata = {
    categoryname:req.body.name,
   
   }
   CategoryModel.create(mydata)
   .then(() => console.log("Recorded added"))
   .catch ((err) => console.log(err));
   res.redirect('categorydisplay')
  // res.send("Recorded added")
   });
   router.get('/categorydisplay', function(req, res, next) {
    CategoryModel.find()
    .then(data => {
        console.log(data);
        res.render('category/categorydisplay',{mydata:data});
    })
    .catch(err => console.log(err))
   });


   router.get('/delete/:id',function(req,res,next){
    var id = req.params.id;
    CategoryModel.findByIdAndDelete(id)
    .then(data => {
        res.redirect('/category/categorydisplay')
    })
    .catch(err =>console.log(err))
   });
   /** Edit data */

   router.get('/edit/:id', function (req, res) {
    console.log(req.params.id);
    CategoryModel.findById(req.params.id).then(function (db_users_array) {
    //  console.log(db_users_array);
      res.render('category/categoryedit', { user_array : db_users_array });
    });
  });
  router.post('/edit/:id', function (req, res) {
    // console.log("Edit ID is" + req.params.id);
     const mybodydata = {
     categoryname:req.body.name,
   
      
     }
     CategoryModel.findByIdAndUpdate(req.params.id, mybodydata).then(function (db_users_array) {
        console.log(db_users_array);
        res.redirect('/category/categorydisplay');
       });
       
     });
 
  
   //show
 router.get('/show/:id', function (req, res) {
    console.log(req.params.id);
    CategoryModel.findById(req.params.id).then(function (db_users_array) {
      console.log(db_users_array);
      res.render('category/categoryshow', { user_array: db_users_array });
    });
  });
  
module.exports = router;
