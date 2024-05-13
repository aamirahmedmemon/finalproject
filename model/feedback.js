const mongoose = require('mongoose');
var mySchema = new mongoose.Schema({
    userid:String,
    username:String,
    feedbackdate:Date,
    feedbackdetail:String,
})
const FeedbackModel = mongoose.model('Feedback',mySchema);
module.exports = FeedbackModel;
