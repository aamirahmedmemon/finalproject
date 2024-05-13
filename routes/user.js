var express = require('express');
const UserModel = require('../model/user');
var router = express.Router();

/* GET home page. */
/*router.get('/categorydisplay', function(req, res, next) {
 res.render('category/categorydisplay')
});*/
router.get('/useradd', function(req, res, next) {
    res.render('user/useradd')
   });
  
   router.post('/userprocess', function(req, res, next) {
   var mydata = {
    username:req.body.name,
    usergender:req.body.gender,
    useremail:req.body.email,
    usermobile:req.body.mobile,
    useraddress:req.body.address,
    userpassword:req.body.password
   
   }
   UserModel.create(mydata)
   .then(() => console.log("Recorded added"))
   .catch ((err) => console.log(err));
   res.redirect('userdisplay')
  // res.send("Recorded added")
   });
   router.get('/userdisplay', function(req, res, next) {
    UserModel.find()
    .then(data => {
        console.log(data);
        res.render('user/userdisplay',{mydata:data});
    })
    .catch(err => console.log(err))
   });

   router.get('/useredit', function(req, res, next) {
    res.render('user/useredit')
   });
   router.get('/delete/:id',function(req,res,next){
    var id = req.params.id;
    UserModel.findByIdAndDelete(id)
    .then(data => {
        res.redirect('/user/userdisplay')
    })
    .catch(err =>console.log(err))
   });
   router.post('/register', function(req, res, next) {
    var mydata = {
     username:req.body.name,
     usergender:req.body.gender,
     useremail:req.body.email,
     usermobile:req.body.mobile,
     useraddress:req.body.address,
     userpassword:req.body.password
    
    }
    UserModel.create(mydata)
    .then(() => console.log("Recorded added"))
    .catch ((err) => console.log(err));
    res.redirect('/userside/login1')
   // res.send("Recorded added")
    });
//show
router.get('/show/:id', function (req, res) {
    console.log(req.params.id);
    UserModel.findById(req.params.id).then(function (db_users_array) {
      console.log(db_users_array);
      res.render('user/usershow', { user_array: db_users_array });
    });
  });

  router.get('/edit/:id', function (req, res) {
    console.log(req.params.id);
    UserModel.findById(req.params.id).then(function (db_users_array) {
    //  console.log(db_users_array);
      res.render('user/useredit', { user_array : db_users_array });
    });
  });
  router.post('/edit/:id', function (req, res) {
    // console.log("Edit ID is" + req.params.id);
     const mybodydata = {
      username:req.body.name,
      usergender:req.body.gender,
      useremail:req.body.email,
      usermobile:req.body.mobile,
      useraddress:req.body.address,
      userpassword:req.body.password
     
   
      
     }
     UserModel.findByIdAndUpdate(req.params.id, mybodydata).then(function (db_users_array) {
        console.log(db_users_array);
        res.redirect('/user/userdisplay');
       });
       
     });
  /*   router.get('/edit/:id', function (req, res) {
      console.log(req.params.id);
      UserModel.findById(req.params.id).then(function (db_users_array) {
      //  console.log(db_users_array);
        res.render('userfolder/useredit', { user_array : db_users_array });
      });
    });*/
module.exports = router;
