// Import npm packages

const express = require('express');
//const middleWares = jsonServer.defaults();
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

// ///傳圖片
// const mongodb = require('mongodb');
// const multer = require('multer');
// //-----------------------------------------------------
const app = express();
const PORT = process.env.PORT || 8080;  //step1

const routes = require('./routes/api');

//step2
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/react_base',{  //1.MongoDB在本地端上的位址 2.現在可以通過MongoDB傳遞的選項
    useNewUrlParser: true,
    useUnifiedTopology:true
});  


mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!');
});




//Data parsing
//app.use(middleWares);
app.use(express.json());   //連接express的中間鍵  解析每一個傳入或JSON
app.use(express.urlencoded({extended: false}));

//HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);

//step3
if (process.env.NODE_ENV === 'production') {  //創建一個字定義變量 來知道我們的應用程式是否在roku上
    app.use(express.static('client/build'));
}


app.listen(PORT, console.log(`Server is starting at ${PORT}`));

