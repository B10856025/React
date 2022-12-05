const mongoose = require('mongoose')    //放模型


// Schema
const Schema = mongoose.Schema;
const UserPostSchema = new Schema({
    id: String,
    nickname: String,
    email: String,
    password: String,
    type: String
});


//Model   -->從數據庫中的數據創建和搜索事物
const UserPost = mongoose.model('UserPosts', UserPostSchema);  //建立模型 ->collections

module.exports = UserPost;


