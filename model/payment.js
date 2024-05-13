const mongoose = require('mongoose');
var mySchema = new mongoose.Schema({
    paymentmode:String,
    username:String,
    userid:String,
    
})
const PaymentModel = mongoose.model('payment',mySchema);
module.exports = PaymentModel;