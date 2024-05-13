const mongoose = require('mongoose');
var mySchema = new mongoose.Schema({
    categoryname:String,
})
const CategoryModel = mongoose.model('category',mySchema);
module.exports = CategoryModel;