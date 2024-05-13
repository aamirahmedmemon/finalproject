var express = require('express');
const WorkerModel = require('../model/worker');
const BookingModel = require('../model/booking');
const FeebackModel = require('../model/feedback');
const PaymentModel = require('../model/payment');
var router = express.Router();

/* GET home page. */
router.get('/workerregister', function(req, res, next) {
  res.render('workerside/workerregister');
});

router.get('/workerlogin', function(req, res, next) {
  res.render('workerside/workerlogin');
});
router.post('/workerloginprocess', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  console.log(req.body);
  WorkerModel.findOne({ "workeremail": email }).then(function (db_users_array) {
    console.log("Find One " + db_users_array);
    if (db_users_array) {
      var db_email = db_users_array.workeremail;
      var db_password = db_users_array.workerpassword;
    }
    console.log("db_users_array.workeremail " + db_email);
    console.log("db_users_array.workerpassword " + db_password);
    if (db_email == null) {
      console.log("If");
      res.redirect("/workerside/workerlogin");
    }
    else if (db_email == email && db_password == password) {
      req.session.workeremail = db_email;
     req.session.workersideworkerid = db_users_array._id;
     req.session.userid = db_users_array._userid;
      //console.log(req.session.workerid)
      res.redirect('/workerside/workersidedisplay');
    }
    else {
      console.log("Credentials wrong");
      res.redirect("/workerside/workerlogin");
    }
  });
});


//workerdisplay
router.get('/workersidedisplay', function(req, res, next) {
  if(!req.session.workeremail)
  {
    res.redirect('/workerside/workerlogin');
  }
  var uid = req.session.workeremail;
  console.log(req.session.workeremail);
  WorkerModel.find({workeremail:uid})
  .then(data => {
      console.log(data);
      res.render('workerside/workersidedisplay',{mydata:data});
  })
  .catch(err => console.log(err))
 });

 //forgotpassword
router.get('/workerforgotpassword', function(req, res, next) {
  res.render('workerside/workerforgotpassword');
});
router.post('/workerforgotpassword', function (req, res, next) {
  var email = req.body.email;
  console.log(req.body);
  WorkerModel.findOne({ "workeremail": email }). then(function(db_users_array) {
    //console.log("Find One " + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.workeremail;
      var db_password = db_users_array.workerpassword;

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
      res.redirect('/workerside/workerlogin')
      res.end("Password sent on email");
    }
   })
});
//changepassword
router.get('/workerchangepassword', function(req, res, next) {
  res.render('workerside/workerchangepassword');
});

//edit
router.get('/edit/:id', function (req, res) {
  console.log(req.params.id);
  WorkerModel.findById(req.params.id).then(function (db_users_array) {
  //  console.log(db_users_array);
    res.render('workerside/workersideedit', { user_array : db_users_array });
  });
});

//Update Record Using Post Method
router.post('/edit/:id', function (req, res) {
 // console.log("Edit ID is" + req.params.id);
  const mybodydata = {
  workername:req.body.name,
  workerdetails:req.body.detail,
  workeraddress:req.body.address,
  workersalary:req.body.salary,
  workercategory:req.body.category,
  workerexperience:req.body.experience,
  workeraddress:req.body.address,
  workernumber:req.body.number,
  workeremail :req.body.email,
  workerpassword :req.body.password


 // workerimage : filename,
   
  }
  WorkerModel.findByIdAndUpdate(req.params.id, mybodydata).then(function (db_users_array) {
     console.log(db_users_array);
     res.redirect('/workerside/workersidedisplay');
    });
    
  });

//Get Single User By ID
router.get('/show/:id', function (req, res) {
  console.log(req.params.id);
  WorkerModel.findById(req.params.id).then(function (db_users_array) {
    console.log(db_users_array);
    res.render('workerside/workershow', { user_array: db_users_array });
  });
});

//chnagepassword
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
  WorkerModel.findOne({ "user_email": myemail }).then(function ( db_users_array) {
   
      console.log(db_users_array);
      if (opass == db_users_array.user_password) {
        if (opass == npass) {
          res.send("New Password Must be Different then Old password");
        } else {
          if (npass == cpass) {
            WorkerModel.findOneAndUpdate({ "user_email": myemail }, { $set: { "user_password": npass } }).then(function () {
            
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

//view booking
router.get('/workerviewbooking', function(req, res, next) {
  if(!req.session.workersideworkerid)
  {
    res.redirect('/workerside/workerlogin');
  }

  var uid = req.session.workersideworkerid;
  console.log(req.session.workersideworkerid);
BookingModel.find({workerid:uid})
  .then(data => {
      console.log(data);
      res.render('workerside/workerviewbooking',{mydata:data});
  })
  .catch(err => console.log(err))
 });

 //delete booking
router.get('/deletev/:id',function(req,res,next){
  var id = req.params.id;
  BookingModel.findByIdAndDelete(id)
  .then(data => {
      res.redirect('/workerside/workerviewbooking')
  })
  .catch(err =>console.log(err))
 });


//delete of worker 
router.get('/delete/:id',function(req,res,next){
  var id = req.params.id;
  WorkerModel.findByIdAndDelete(id)
  .then(data => {
      res.redirect('/workerside/workersidedisplay')
  })
  .catch(err =>console.log(err))
 });

//feedback
router.get('/workerviewfeedback', function(req, res, next) {
  if(!req.session.workersideworkerid)
  {
    res.redirect('/workerside/workerlogin');
  }

  var uid = req.session.workersideworkerid;
  console.log(req.session.workersideworkerid);
  
  FeebackModel.find({workerid:uid})
  .then(data => {
      console.log(data);
      res.render('workerside/workerviewfeedback',{mydata:data});
  })
  .catch(err => console.log(err))
 });


 router.get('/editw/:id', function (req, res) {
  console.log(req.params.id);
  BookingModel.findById(req.params.id).then(function (db_users_array) {
  //  console.log(db_users_array);
    res.render('workerside/workersideeditbooking', { user_array : db_users_array });
  });
});

router.post('/editw/:id', function (req, res) {
  // console.log("Edit ID is" + req.params.id);
   const mybodydata = {
    bookingdate:req.body.date,
    bookingdetail:req.body.detail,
    userbookig:req.body.user,
    bookingstatus:req.body.status,
   
    
   }
   BookingModel.findByIdAndUpdate(req.params.id, mybodydata).then(function (db_users_array) {
      console.log(db_users_array);
      res.redirect('/workerside/workerviewbooking');
     });
     
   });


   router.get('/payment', function(req, res, next) {
    if(!req.session.workersideworkerid)
  {
    res.redirect('/workerside/workerlogin');
  }

  var uid = req.session.workersideworkerid;
  console.log(req.session.workersideworkerid);
    PaymentModel.find({workerid:uid})
    .then(data => {
        console.log(data);
        res.render('workerside/payment',{mydata:data});
    })
    .catch(err => console.log(err))
   });
   router.get('/logout',function(req,res,next){
    req.session.destroy(function(err){
      res.redirect('/workerside/workerlogin')
    })
  })


module.exports = router;
