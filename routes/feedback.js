var express = require('express');
const FeebackModel = require('../model/feedback');
const ContactModel = require('../model/contact');
const { name } = require('ejs');
var router = express.Router();

/* GET home page. */
router.get('/feedbackadd', function(req, res, next) {
    res.render('feedback/feedbackadd')
   });
   router.post('/feedbackprocess', function(req, res, next) {
   var mydata = {
    userid:req.body.email.uid,
    username:req.body.email,
    feedbackdate:req.body.date,
    feedbackdetail:req.body.detail
   }
   FeebackModel.create(mydata)
   .then(() => console.log("Recorded added"))
   .catch ((err) => console.log(err));
   res.redirect('feedbackdisplay')
  // res.send("Recorded added")
   });
    router.get('/feedbackdisplay', function(req, res, next) {
        FeebackModel.find()
        .then(data => {
            console.log(data);
            res.render('feedback/feedbackdisplay',{mydata:data});
        })
        .catch(err => console.log(err))
    });


  

   router.get('/delete/:id',function(req,res,next){
    var id = req.params.id;
    FeebackModel.findByIdAndDelete(id)
    .then(data => {
        res.redirect('/feedback/feedbackdisplay')
    })
    .catch(err =>console.log(err))
   });

  
   router.post('/contactprocess', function(req, res, next) {
    var mydata = {
     Name:req.body.name,
     Email:req.body.email,
     Mobile:req.body.mobile,
     Subject:req.body.subject,
     Message:req.body.message
    }
    "use strict";
      const nodemailer = require("nodemailer");
      
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace user and pass values from <https://forwardemail.net>
          user: "memonaamirahmed62@gmail.com",
          pass: "gxqz vwfd ejpc elgj",
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: 'memonaamirahmed62@gmail.com', // sender address
          to: req.body.email, // list of receivers
          subject: req.body.subject, // Subject line
          text: "" ,
          html:"user name:" + req.body.name + "<br>user email:"+ req.body.email  + "<br>user mobile:"+ req.body.mobile + "<br>user message:"+ req.body.message  , // html body
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

    ContactModel.create(mydata)
    .then(() => console.log("Recorded added"))
    .catch ((err) => console.log(err));
    res.redirect('../userside/home')
   // res.send("Recorded added")
    });
   router.get('/contactdisplay', function(req, res, next) {
    ContactModel.find()
    .then(data => {
        console.log(data);
        res.render('contact/contactdisplay',{mydata:data});
    })
    .catch(err => console.log(err))
});
router.get('/contact/delete/:id',function(req,res,next){
    var id = req.params.id;
    ContactModel.findByIdAndDelete(id)
    .then(data => {
        res.redirect('/feedback/contactdisplay')
    })
    .catch(err =>console.log(err))
   });

   
module.exports = router;
