var express = require('express');
const PaymentModel = require('../model/payment');
var router = express.Router();


router.get('/paymentdisplay', function(req, res, next) {
    PaymentModel.find()
    .then(data => {
        console.log(data);
        res.render('payment/paymentdisplay',{mydata:data});
    })
    .catch(err => console.log(err))
   });

   router.get('/delete/:id',function(req,res,next){
    var id = req.params.id;
    PaymentModel.findByIdAndDelete(id)
    .then(data => {
        res.redirect('/payment/paymentdisplay')
    })
    .catch(err =>console.log(err))
   });
   
module.exports = router;
  