// const express = require('express');
// const mongodb = require('mongodb');
// const multer = require('multer');

// const fs = require('fs');
// const path = require('path');

// const router = express.Router();

// const multer = require('multer');

// const upload = multer({
// 	storage: multer.diskStorage({
// 		//设置文件存储位置
// 		destination: function(req, file, cb) {
// 			let date = new Date();
// 			let year = date.getFullYear();
// 			let month = (date.getMonth() + 1).toString().padStart(2, '0');
// 			let day = date.getDate();
// 			let dir = "./client/src/assets";

// 			//判断目录是否存在，没有则创建
// 			if (!fs.existsSync(dir)) {
// 				fs.mkdirSync(dir, {
// 					recursive: true
// 				});
// 			}

// 			//dir就是上传文件存放的目录
// 			cb(null, dir);
// 		},
// 		//设置文件名称
// 		filename: function(req, file, cb) {
// 			// console.log(file.originalname);
// 			// const filename = file.originalname.split('.');
// 			// console.log(filename);
// 			let fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname).toLowerCase();
// 			//fileName就是上传文件的文件名
// 			cb(null, fileName);
// 		}
// 	})
// });

// // // Get Posts
// router.post('/', upload.single('file'), (req, res) => {
    
// 	res.json({
// 		file: req.file
// 	})
//     console.log(req.file);
// })

// router.use('/uploads', express.static(__dirname + '/uploads'))

// async function loadPostsCollection() {
//     const client = await mongodb.MongoClient.connect
//     ('mongodb://localhost:27017',{
//         // userNewUrlParser: true 更新後已不再被需要
//     });

//     return client.db('vue_express').collection('testImg');
// }

// module.exports = router;