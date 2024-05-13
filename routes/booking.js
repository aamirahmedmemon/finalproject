var express = require('express');
const BookingModel = require('../model/booking');
const WorkerModel = require('../model/worker');
var router = express.Router();

/* GET home page. */
/*router.get('/categorydisplay', function(req, res, next) {
 res.render('category/categorydisplay')
});*/
router.get('/bookingadd', function(req, res, next) {
    res.render('booking/bookingadd')
   });
  
   router.post('/bookingprocess', function(req, res, next) {
    WorkerModel.findById({id :req.session.email }).then(function (db_user_array){
      res.render('userfolder/bookingform',{userdata : db_user_array})
      });
   var mydata = {
    bookingdate:req.body.date,
    bookingdetail:req.body.detail,
    userbooking:req.body.name,
    bookingstatus:req.body.status,
    bookingpayment:req.body.paymentoption
    
   }
    BookingModel.create(mydata)
   .then(() => console.log("Recorded added"))
   .catch ((err) => console.log(err));
   res.redirect('bookingdisplay')
  // res.send("Recorded added")
   });
   router.get('/bookingdisplay', function(req, res, next) {
    BookingModel.find()
    .then(data => {
        console.log(data);
        res.render('booking/bookingdisplay',{mydata:data});
    })
    .catch(err => console.log(err))
   });

   router.get('/bookingedit', function(req, res, next) {
    res.render('booking/bookingedit')
   });
   router.get('/delete/:id',function(req,res,next){
    var id = req.params.id;
    BookingModel.findByIdAndDelete(id)
    .then(data => {
        res.redirect('/booking/bookingdisplay')
    })
    .catch(err =>console.log(err))
   });

   //show
 router.get('/show/:id', function (req, res) {
    console.log(req.params.id);
    BookingModel.findById(req.params.id).then(function (db_users_array) {
      console.log(db_users_array);
      res.render('booking/bookingshow', { user_array: db_users_array });
    });
  });

  router.get('/edit/:id', function (req, res) {
    console.log(req.params.id);
    BookingModel.findById(req.params.id).then(function (db_users_array) {
    //  console.log(db_users_array);
      res.render('booking/bookingedit', { user_array : db_users_array });
    });
  });

  router.post('/edit/:id', function (req, res) {
    // console.log("Edit ID is" + req.params.id);
     const mybodydata = {
      bookingdate:req.body.date,
      bookingdetail:req.body.detail,
      userbookig:req.body.user,
      bookingstatus:req.body.status,
     // bookingpayment:req.body.paymentoption
      
     
      
     }
     BookingModel.findByIdAndUpdate(req.params.id, mybodydata).then(function (db_users_array) {
        console.log(db_users_array);
        res.redirect('/booking/bookingdisplay');
       });
       
     });
 
  
module.exports = router;
