const mongoose = require('mongoose');
var mySchema = new mongoose.Schema({

   workerid:String,
   userid:String,
   workerimage:String,   
   workername:String,
     
})
const BookingmarkModel = mongoose.model('bookingmark',mySchema);
module.exports = BookingmarkModel;