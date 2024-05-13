const mongoose = require('mongoose');
var mySchema = new mongoose.Schema({
    bookingdate:String,
    bookingdetail:String,
    userid:String,
    //username:String,
    userbooking:String,
    bookingstatus:String,
    workerid:String,
   // workername:String,
    //bookingpayment:String
   
   
     
})
const BookingModel = mongoose.model('booking',mySchema);
module.exports = BookingModel;