const mongoose = require('mongoose')    //放模型


// Schema
const Schema = mongoose.Schema;


const ProductsSchema = new Schema({
    id : String,
    name : String,
    image: String,
    tags : String,
    price : String,
    status : String,
    createdAt : String
});
//Model   -->從數據庫中的數據創建和搜索事物





const ProductsPost = mongoose.model('ProductsPost', ProductsSchema);  //建立模型 ->collections
module.exports = ProductsPost;