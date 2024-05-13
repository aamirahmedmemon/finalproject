const mongoose = require('mongoose');
var mySchema = new mongoose.Schema({
    adminname:String,
    adminemail:String,
    adminmobile:Number,
    adminpassword:String,
})
const AdminModel = mongoose.model('Admin',mySchema);
module.exports = AdminModel;