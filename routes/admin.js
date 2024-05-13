var express = require('express');
const AdminModel = require('../model/admin');
const WorkerModel = require('../model/worker');
const FeedbackModel = require('../model/feedback');
const BookingModel = require('../model/booking');
const UserModel = require('../model/user');
var router = express.Router();

/* GET home page. */
/*/router.get('/', function(req, res, next) {
 res.render('admin/admin-display')
});*/
router.get('/adminadd', function(req, res, next) {
      res.render('admin/adminadd')
    });
   router.post('/adminprocess', function(req, res, next) {
   var mydata = {
    adminname:req.body.name,
    adminemail:req.body.email,
    adminmobile:req.body.mobile,
    adminpassword:req.body.password
   }
   AdminModel.create(mydata)
   .then(() => console.log("Recorded added"))
   .catch ((err) => console.log(err));
   res.redirect('adminlogin')
  // res.send("Recorded added")
   });
   router.get('/admindisplay', function(req, res, next) {
    if(!req.session.adminemail)
    {
      res.redirect('/login');
    }
    var uid = req.session.adminemail;
    console.log(req.session.adminemail);
    AdminModel.find({adminemail:uid})
    .then(data => {
        console.log(data);
        res.render('admin/admindisplay',{mydata:data});
    })
    .catch(err => console.log(err))
   });


  

   router.get('/delete/:id',function(req,res,next){
    var id = req.params.id;
    AdminModel.findByIdAndDelete(id)
    .then(data => {
        res.redirect('/admin/admindisplay')
    })
    .catch(err =>console.log(err))
   });
//login process
  
router.get('/adminlogin', function (req, res, next) {
  res.render('admin/adminlogin');
});

//Login Process  Method
router.post('/loginprocess', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  console.log(req.body);
  AdminModel.findOne({ "adminemail": email }).then(function (db_users_array) {
    console.log("Find One " + db_users_array);
    if (db_users_array) {
      var db_email = db_users_array.adminemail;
      var db_password = db_users_array.adminpassword;
    }
    console.log("db_users_array.adminemail " + db_email);
    console.log("db_users_array.adminpassword " + db_password);
    if (db_email == null) {
      console.log("If");
      res.redirect("/admin/adminlogin");
    }
    else if (db_email == email && db_password == password) {
      req.session.adminemail = db_email;
      req.session.adminid = db_users_array._id;
      res.redirect('/admin/dashboard');
    }
    else {
      console.log("Credentials wrong");
      res.redirect("/admin/adminlogin");
    }
  });
});


   //end login process


  

   //forgotpassword
   router.get('/forgotpassword', function(req, res, next) {
    res.render('admin/forgotpassword')
   });

   router.post('/forgotpassword', function (req, res, next) {
    var email = req.body.email;
    console.log(req.body);
    AdminModel.findOne({ "adminemail": email }). then(function(db_users_array) {
      //console.log("Find One " + db_users_array);
  
      if (db_users_array) {
        var db_email = db_users_array.adminemail;
        var db_password = db_users_array.adminpassword;
  
      }
  
    // console.log("db_users_array.adminemail " + db_email);
     // console.log("db_users_array.adminpassword " + db_password);
  
      if (db_email == null) {
        console.log("If");
        res.end("Email not Found");
      }
      else if (db_email == email) {
        "use strict";
        const nodemailer = require("nodemailer");
        
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            // TODO: replace user and pass values from <https://forwardemail.net>
            user: "",
            pass: "",
          },
        });
        
        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
          // send mail with defined transport object
          const info = await transporter.sendMail({
            from: '', // sender address
            to: email, // list of receivers
            subject: "Forgot Password", // Subject line
            text:  "Your Password is " + db_password ,
            html: "Your Password is " + db_password, // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
          //
          // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
          //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
          //       <https://github.com/forwardemail/preview-email>
          //
        }
        
        main().catch(console.error);
        res.redirect('/admin/adminlogin')
        res.end("Password sent on email");
      }
     })
});

  //change password 

 router.get('/changepassword', function(req, res, next) {
    res.render('admin/changepassword')
   });

  router.post('/change-password', function (req, res, next) {
    if (!req.session.email) {
      console.log("Email Session is Set");
      res.redirect('/login');
    }
    console.log("Home Called " + req.session.email);
    var myemail = req.session.email;
    var opass = req.body.opass;
    var npass = req.body.npass;
    var cpass = req.body.cpass;
    AdminModel.findOne({ "user_email": myemail }).then(function ( db_users_array) {
     
        console.log(db_users_array);
        if (opass == db_users_array.user_password) {
          if (opass == npass) {
            res.send("New Password Must be Different then Old password");
          } else {
            if (npass == cpass) {
              AdminModel.findOneAndUpdate({ "user_email": myemail }, { $set: { "user_password": npass } }).then(function () {
              
                  res.send("Password Changed");
          
              });
            } else {
              res.send("New Password and Confirm Password not match");
            }
          }
        } else {
          res.send("Old Password Not Match");
        }
      }
    );
  });
  
  //show
 router.get('/show/:id', function (req, res) {
    console.log(req.params.id);
    AdminModel.findById(req.params.id).then(function (db_users_array) {
      console.log(db_users_array);
      res.render('admin/adminshow', { user_array: db_users_array });
    });
  });

  //edit
  router.get('/edit/:id', function (req, res) {
    console.log(req.params.id);
    AdminModel.findById(req.params.id).then(function (db_users_array) {
     console.log(db_users_array);
      res.render('admin/adminedit', { user_array : db_users_array });
    });
  });

  router.post('/edit/:id', function (req, res) {
    // console.log("Edit ID is" + req.params.id);
     const mybodydata = {
     adminname:req.body.name,
     adminemail:req.body.email,
     adminmobile:req.body.mobile,
     adminpassword:req.body.password,
    // workerimage : filename,
      
     }
     AdminModel.findByIdAndUpdate(req.params.id, mybodydata).then(function (db_users_array) {
        console.log(db_users_array);
        res.redirect('/admin/admindisplay');
       });
       
     });
  
     router.get('/logout',function(req,res,next){
      req.session.destroy(function(err){
        res.redirect('/admin/adminlogin')
      })
    })
    router.get('/dashboard',function(req,res,next){
      FeedbackModel.find()
      .then(data => {
        AdminModel.find()
      .then(data1 => {
        console.log(data);
        WorkerModel.find()
      .then(data2 => {
        console.log(data);
        BookingModel.find()
      .then(data3 => {
        console.log(data);
        UserModel.find()
        .then(data4 => {
          console.log(data);
          
        
        res.render('admin/dashboard',{mydata:data,mydataa:data1,mydataw:data2,mydatab:data3,mydatau:data4});
      })
    })
  })
})
         
      })
      
      });
      
    
  
module.exports = router;
   