const mongoose = require('mongoose')    //放模型


// Schema
const Schema = mongoose.Schema;


const CartsSchema = new Schema({
    productId : String,
    name : String,
    image : String,
    price : String,
    mount : String,
    id : String,
    userId: String,
});
//Model   -->從數據庫中的數據創建和搜索事物





const CartsPost = mongoose.model('CartsPost', CartsSchema);  //建立模型 ->collections
module.exports = CartsPost;