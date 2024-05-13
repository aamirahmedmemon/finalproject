var express = require('express');
const UserModel = require('../model/user');
const WorkerModel = require('../model/worker');
const BookingModel = require('../model/booking');
const FeebackModel = require('../model/feedback');
const BookingmarkModel = require('../model/bookmark');
const PaymentModel = require('../model/payment');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('userfolder/home');
});
router.get('/contact', function(req, res, next) {
    res.render('userfolder/contact');
  });

  router.get('/aboutus', function(req, res, next) {
    res.render('userfolder/aboutus');
  });
  //login start
router.get('/login1', function(req, res, next) {
    res.render('userfolder/login1');
});
router.post('/loginprocess', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  

  console.log(req.body);
  UserModel.findOne({ "useremail": email }).then(function (db_users_array) {
    console.log("Find One " + db_users_array);
    if (db_users_array) {
      var db_email = db_users_array.useremail;
      var db_password = db_users_array.userpassword;
    }
    console.log("db_users_array.useremail " + db_email);
    console.log("db_users_array.userpassword " + db_password);
    if (db_email == null) {
      console.log("If");
      res.end("Email not Found");
    }
    else if (db_email == email && db_password == password) {
      req.session.email = db_email;
      req.session.userid = db_users_array._id;
      //req.session.username = db_users_array._username;
      //console.log(req.session.username)
     // console.log(req.session.userid);
      //console.log('Session');
     res.redirect('/userside/home');
    }
    else {
      console.log("Credentials wrong");
      res.redirect("/userside/login1");
    }
  });
});

//login end
    router.get('/register', function(req, res, next) {
        res.render('userfolder/register');
});
//forgot password
router.get('/forgotpassword', function(req, res, next) {
  res.render('userfolder/forgotpassword');
});

router.post('/forgotpassword', function (req, res, next) {
  var email = req.body.email;
  console.log(req.body);
  UserModel.findOne({ "useremail": email }). then(function(db_users_array) {
    //console.log("Find One " + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.useremail;
      var db_password = db_users_array.userpassword;

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
      //res.end("Password sent on email");
      res.redirect('/userside/login1')
    }
   })
});
/*router.get('/changepassword', function(req, res, next) {
  res.render('userside/changepassword');
});*/
router.get('/changepassword', function (req, res, next) {
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('/login');
  }
  res.render('changepassword');
});

//Change Password Process Page
router.post('/changepassword', function (req, res, next) {
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('/login');
  }
  console.log("Home Called " + req.session.email);
  var myemail = req.session.email;
  var opass = req.body.oldpassword;
  var npass = req.body.npmewpasswordass;
  var cpass = req.body.comformpassword;
  UserModel.findOne({ "useremail": myemail }).then(function ( db_users_array) {
   
      console.log(db_users_array);
      if (opass == db_users_array.userpassword) {
        if (opass == npass) {
          res.send("New Password Must be Different then Old password");
        } else {
          if (npass == cpass) {
            UsersModel.findOneAndUpdate({ "useremail": myemail }, { $set: { "userpassword": npass } }).then(function () {
            
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
router.get('/employee', function(req, res, next) {
  WorkerModel.find().then(function(db_user){
  res.render('userfolder/employee',{mydata: db_user});
});
});
/*router.get('/show/:id',function(req,res,next){
  console.log("Show id get method working properly");
  console.log(req.params.id);
  WorkerModel.findById(req.params.id).then(function(db_user_array){
    console.log(db_user_array);
    res.render('userfolder/employeedetail',{mydata:db_user_array});
  });
});
*/
router.get('/bookingform', function(req, res, next) {
  if (req.session.email) {
    UserModel.findOne({useremail :req.session.email }).then(function (db_user_array){
    res.render('userfolder/bookingform',{userdata : db_user_array})
    });
    router.post('/bookingform', function(req, res, next) {
       var mydata = {
       bookingdate:req.body.date,
       bookingdetail:req.body.detail,
       userid:req.body.id,
       userbooking:req.body.name,
       workerid:req.session.workerid,
       //bookingpayment:req.body.paymentoption
       //workername:req.body.workername,
    
      }
      BookingModel.create(mydata)
      .then(() => console.log("Recorded added"))
      .catch ((err) => console.log(err));
      res.redirect('/userside/payment')
     // res.send("Recorded added")
      });
  } else {
    // Redirect to login if session is not active
    res.redirect('/userside/login1');
  }
  //res.render('userfolder/bookingform');
});
//feedback
router.get('/feedback', function(req, res, next) {
  if (req.session.email) {
    UserModel.findOne({useremail :req.session.email }).then(function (db_user_array){
    res.render('userfolder/feedback',{userdata : db_user_array})
    });
    router.post('/feedbackprocess', function(req, res, next) {
      var mydata = {
        userid:req.body.id,
        username:req.body.name,
        feedbackdate:req.body.date,
        feedbackdetail:req.body.detail,

      }
      FeebackModel.create(mydata)
      .then(() => console.log("Recorded added"))
      .catch ((err) => console.log(err));
      res.redirect('/userside/feedbackview')
     // res.send("Recorded added")
      });
  } else {
    // Redirect to login if session is not active
    res.redirect('/userside/login1');
  }
  //res.render('userfolder/bookingform');
});

router.get('/thankyou', function(req, res, next) {
  res.render('userfolder/thankyou');
});

router.get('/employeesdetails', function(req, res, next) {
  res.render('userfolder/employeesdetails');
});
router.get('/show/:id',function(req,res,next){
  console.log("Show id get method working properly");
  req.session.workerid = req.params.id;
  console.log(req.session.workerid);
  WorkerModel.findById(req.params.id).then(function(db_user_array){
    console.log(db_user_array);
    res.render('userfolder/employeesdetails',{mydata:db_user_array});
  });
});

//feedback

router.get('/feedbackview', function(req, res, next) {
  if(!req.session.userid)
  {
    res.redirect('/login1');
  }
  var uid = req.session.userid;
  FeebackModel.find({userid:uid})
  .then(data => {
      console.log(data);
      res.render('userfolder/feedbackview',{mydata:data});
  })
  .catch(err => console.log(err))
});
router.get('/userdeletef/:id',function(req,res,next){
  var id = req.params.id;
  console.log(req.session.userid);
  FeebackModel.findByIdAndDelete(id)
  .then(data => {
      res.redirect('/userside/feedbackview')
  })
  .catch(err =>console.log(err))
 });


 //booking view
router.get('/bookingview', function(req, res, next) {

  if(!req.session.userid)
  {
    res.redirect('/login1');
  }

  var uid = req.session.userid;
  console.log(req.session.userid);
  BookingModel.find({userid:uid})
  .then(data => {
      console.log(data);
      res.render('userfolder/bookingview',{mydata:data});
  })
  .catch(err => console.log(err))
});





router.get('/userdeletebv/:id',function(req,res,next){
  var id = req.params.id;
  BookingModel.findByIdAndDelete(id)
  .then(data => {
      res.redirect('/userside/bookingview')
  })
  .catch(err =>console.log(err))
 });
//end bookingview

 router.get('/userprofile', function(req, res, next) {
  res.render('userfolder/userprofile');
});


    router.get('/bookmarkdisplay',function(req,res,next){
      if(!req.session.userid)
  {
    res.redirect('/login1');
  }

  var uid = req.session.userid;
  console.log(req.session.userid);
    
      BookingmarkModel.find({userid:uid})
      .then((data)=>{
        console.log("book mark done")
        res.render('userfolder/bookmarkdisplay',{mydata : data});
      })
    })
    
    router.post('/bookmarkdisplay',function(req,res,next){
      
      BookingmarkModel.findById(req.body.id).then(function(data){
        
        var mydata = {
          workerid : req.body.id,
          workername : req.body.name,
          workerimage : req.body.image,
          userid : req.body.userid,
      }
      BookingmarkModel.create(mydata)
      .then(()=>console.log(""))
      .catch((err)=>console.log(err));
        res.redirect('/userside/bookmarkdisplay');
      });
    });
  router.get('/bookdelete/:id',function(req,res,next){
    var id = req.params.id;
    BookingmarkModel.findByIdAndDelete(id)
    .then(data => {
        res.redirect('/userside/bookmarkdisplay')
    })
    .catch(err =>console.log(err))
   });
  

//payment view start
   router.get('/payment', function(req, res, next) {
    if (req.session.email) {
      UserModel.findOne({useremail :req.session.email }).then(function (db_user_array){
      res.render('userfolder/payment',{userdata : db_user_array})
      });
      router.post('/paymentform', function(req, res, next) {
         var mydata = {
          userid:req.body.id,
          username:req.body.name,
          paymentmode:req.body.paymentoption
          
         
         
         }
        PaymentModel.create(mydata)
        .then(() => console.log("Recorded added"))
        .catch ((err) => console.log(err));
        res.redirect('/userside/thankyou')
       // res.send("Recorded added")
        });
    } else {
      // Redirect to login if session is not active
      res.redirect('/userside/login1');
    }
    //res.render('userfolder/bookingform');
  });

  //payment view
  router.get('/paymentview', function(req, res, next) {
    if(!req.session.userid)
  {
    res.redirect('/login1');
  }

  var uid = req.session.userid;
  console.log(req.session.userid);
    PaymentModel.find({userid:uid})
    .then(data => {
        console.log(data);
        res.render('userfolder/paymentview',{mydata:data});
    })
    .catch(err => console.log(err))
  });
//payment view end

  //delete payment
  router.get('/userdeletepv/:id',function(req,res,next){
    var id = req.params.id;
    PaymentModel.findByIdAndDelete(id)
    .then(data => {
        res.redirect('/userside/paymentview')
    })
    .catch(err =>console.log(err))
   });

  /* router.get('/edit/:id', function (req, res) {
   // console.log(req.params.id);
    //console.log("hii")
    UserModel.findById(req.session.id).then(function (db_users_array) {
    console.log(db_users_array);
      res.render('userfolder/useredit', { user_array : db_users_array });
    });
  });*/
  /*router.post('/edit/:id', function (req, res) {
    // console.log("Edit ID is" + req.params.id);
     const mybodydata = {
     username:req.body.name,
     usergender:req.body.gender,
     useremail:req.body.email,
     usermobile:req.body.mobile,
     useraddress:req.body.address,
     userpassword:req.body.password,
    // workerimage : filename,
      
     }
     UserModel.findByIdAndUpdate(req.params.id, mybodydata).then(function (db_users_array) {
        console.log(db_users_array);
        res.redirect('/userside/home');
       });
       
     });*/
router.get('/logout',function(req,res,next){
  req.session.destroy(function(err){
    res.redirect('/userside/login1')
  })
})
/*router.get('/useredit', function(req, res, next) {
  console.log(req.params.id);
  UserModel.findById(req.params.id).then(function (db_users_array) {
   console.log(db_users_array);
  res.render('userfolder/useredit');
  next();
  })
});*/
//router.get('/edit/:id', function (req, res) {
  router.get('/useredit', function(req, res, next) {
  UserModel.findById(req.params.id).then(function (db_users_array) {
   console.log(db_users_array);
    res.render('userfolder/useredit', {user_array : db_users_array });
  });
});


router.post('/edit/:id', function (req, res) {
  // console.log("Edit ID is" + req.params.id);
   const mybodydata = {
   username:req.body.name1,
   usergender:req.body.gender,
   useremail:req.body.email,
   usermobile:req.body.mobile,
   useraddress:req.body.address,
   userpassword:req.body.password,
  // workerimage : filename,
    
   }
   UserModel.findByIdAndUpdate(req.params.id, mybodydata).then(function (db_users_array) {
      console.log(db_users_array);
      res.redirect('/userside/home');
     });
     
   });

module.exports = router;
