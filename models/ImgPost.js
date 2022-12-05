const mongoose = require('mongoose')    //放模型


// Schema
const Schema = mongoose.Schema;
const ImgPostSchema = new Schema({
    path: String,
    originalname: String
});


//Model   -->從數據庫中的數據創建和搜索事物
const ImgPost = mongoose.model('ImgPost', ImgPostSchema);  //建立模型 ->collections

module.exports = ImgPost;

