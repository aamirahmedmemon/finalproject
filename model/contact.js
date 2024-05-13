const mongoose = require('mongoose');
var mySchema = new mongoose.Schema({
    Name:String,
    Email:String,
    Mobile:Number,
    Subject:String,
    Message:String,
})
const ContactModel = mongoose.model('Contact',mySchema);
module.exports = ContactModel;