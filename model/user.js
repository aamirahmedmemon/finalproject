const mongoose = require('mongoose');
var mySchema = new mongoose.Schema({
    username:String,
    usergender:String,
    useremail:String,
    usermobile:Number,
    useraddress:String,
    userpassword:String,
})
const UserModel = mongoose.model('User',mySchema);
module.exports = UserModel;


