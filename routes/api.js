const express = require('express')   //放路由
const router = express.Router();
const UserPost = require('../models/UserPost');
const ProductsPost = require('../models/ProductsPost');
const CartsPost = require('../models/CartsPost');
const ImgPost = require('../models/ImgPost');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');


const multer = require('multer');
const upload = multer({
	storage: multer.diskStorage({
		//设置文件存储位置
		destination: function(req, file, cb) {
			let date = new Date();
			let year = date.getFullYear();
			let month = (date.getMonth() + 1).toString().padStart(2, '0');
			let day = date.getDate();
			let dir = "./client/src/assets";

			//判断目录是否存在，没有则创建
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, {
					recursive: true
				});
			}

			//dir就是上传文件存放的目录
			cb(null, dir);
		},
		//设置文件名称
		filename: function(req, file, cb) {
			//console.log(file.originalname);
			// const filename = file.originalname.split('.');
			//console.log(filename);
            //console.log(file.fieldname);
            let fileName = file.originalname
			//let fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname).toLowerCase();
			//fileName就是上传文件的文件名
            //console.log(fileName)
			cb(null, fileName);
		}
	})
});
//const upload = multer({ dest: 'uploads/' })
router.post('/image', upload.single('image'), (req,res) => {
    console.log('西八:', req.file);
    const img = req.file;
    if (!req.file) {
        res.send({ code: 500, msg: 'err' })
    } else {
        res.send({ code: 200, msg: 'upload success '})
    }
    console.log(img);
    const {path, originalname} = img
    const newImgPost = new ImgPost({path, originalname});
    console.log('---------:', newImgPost)
    newImgPost.save()
        //newImgPost
        return res.json({
            msg: 'Your data has been saved!!!'
        });
    
})

// // ///傳圖片
// const mongodb = require('mongodb');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');
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
// // //-----------------------------------------------------
// // // // Get Posts  圖形
// router.post('/testImg', upload.single('file'), (req, res) => {
//     console.log('HELLO PHOTO');
// 	res.json({
// 		file: req.file
// 	})
//     console.log('HELLO PHOTO:', req.file);
// })

// router.use('/uploads', express.static(__dirname + '/uploads'))

// async function loadPostsCollection() {
//     const client = await mongodb.MongoClient.connect
//     ('mongodb://localhost:27017',{
//         // userNewUrlParser: true 更新後已不再被需要
//     });

//     return client.db('vue_express').collection('testImg');
// }
// //----------------------------------------------------------------

//Routes
//---顯示商品
router.get('/', (req, res) => {
    ProductsPost.find({ })   
        .then((data) => {     //發送實際數據
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('-------------: ');
            console.log('error: ', dataError);
        });

});
//---使用者
router.get('/user', (req, res) => {
    UserPost.find({ })   
        .then((data) => {     //發送實際數據
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', dataError);
        });
});
//---拿到購物車--user
router.put('/carts', async(req, res) => {
    // let  allCart= await CartsPost.find({  });
    // let userCart = await UserPost.find({ productId });
    // console.log('123' ,userCart)
    const userData = req.body;
    console.log('userData.email: ', userData.data.email);
    CartsPost.find({ })   
        .then((data) => {     //發送實際數據
            console.log('Data: ', data);
            let i = 0;
            const cartData =[];
            for(i=0;i<data.length;i++){
                console.log('res.data.userId:', data[i].userId);
                if(data[i].userId === userData.data.email){
                    console.log('res.data.userId && user.email:', data[i].userId , userData.data.email);
                    cartData.push(data[i]);
                }

            }
            console.log(cartData);
            res.json(cartData);
        })
        .catch((error) => {
            console.log('error: ', error);
        });

});
//---拿到購物車
router.get('/carts', async(req, res) => {
    // let  allCart= await CartsPost.find({  });
    // let userCart = await UserPost.find({ productId });
    // console.log('123' ,userCart)
    CartsPost.find({ })   
        .then((data) => {     //發送實際數據
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });

});
//---新增商品
//upload.single('image'),
router.post('/',  async(req, res) => {  //發布路由
    //console.log(req.file)
    const data = req.body;
    console.log(data);
    const {id, name, price, tags, image, status} = data;
    console.log('----------', {id, name, price, tags, image, status});
    let AllData = await ProductsPost.find({ });
    const idList = [0];
    for(var i in AllData){
        idList.push(parseInt(AllData[i].id));
    }
    const imgPath = "C:\\Users\\user\\Desktop\\second\\client\\src\\assets\\"+image.split('\\')[2]
    const newProductsPost = new ProductsPost({id:Math.max(...idList)+1, name, price, tags, image:imgPath, status});
    // .save
    newProductsPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        } 
        //UserPost
        return res.json({
            msg: 'Your data has been saved!!!'
        });
        
    });
});
//修改商品
router.put('/',async(req, res) => {  
    const newDate = req.body;
    console.log("newDate", newDate);
    const oldData = await ProductsPost.find({ id : newDate.id });
    console.log("oldData", oldData);

    // await ProductsPost.replaceOne({ id : newDate.id }, newDate);
    await ProductsPost.updateOne({ id : newDate.id }, { $set: newDate });
    
    return res.json({
        msg: 'Your data has been saved!!!'
    })
});
//修改商品
router.put('/image', upload.single('image'), async(req, res) => {  
    console.log('西八:', req.file);
    const img = req.file;
    const findImg = await ImgPost.find({ originalname : img.originalname });
    console.log("findImg:", findImg);

    // await ProductsPost.replaceOne({ id : newDate.id }, newDate);
    await ImgPost.updateMany({ originalname : img.originalname ,path: img.path}, { $set: img });
    
    return res.json({
        msg: 'Your data has been saved!!!'
    })
});
//修改購物車數量
router.put('/',async(req, res) => {  

})

//刪除商品
router.delete('/', async(req, res) => {  
    const data = req.body;
    const deleteData = await ProductsPost.find({ id : data.id });
    console.log("deleteData", deleteData);
    await ProductsPost.deleteOne(deleteData[0]);
    return res.json({
        msg: 'Your data has been delete!!!'
    });
});
//刪除購物車商品
router.delete('/carts', async(req, res) => {  
    const deleteId = req.body;
    console.log('hello:', deleteId);
    await CartsPost.deleteOne(deleteId);
    return res.json({
        msg: 'Your data has been delete!!!'
    });
    // const _allCarts = await CartsPost.find({  });
    // const _carts = await CartsPost.find({ id });
    // console.log('_allCarts:', _allCarts);
    // console.log('_carts:', _carts);
    // const deleteData = await ProductsPost.find({ id : data.id });
    // console.log("deleteData", deleteData);
    // await ProductsPost.deleteOne(deleteData[0]);
    // return res.json({
    //     msg: 'Your data has been delete!!!'
    });


//註冊jwt函數
const SECRET = '2d5f6e2set813sgr8';
const expiresIn = '1h'
const createToken = payload => {   //payload 服務端返回給客戶端的數據
    return jwt.sign(payload, SECRET, { expiresIn }  )   ///sign方法:傳遞三個參數 1.payload 2.SECRET簽名用的key 3.設置性的參數,例如時間
}
//---使用者登入
router.post('/user', async(req, res) => {  //發布路由
    
    const { email, password } = req.body;
    console.log({ email, password })
    // console.log('--------------------------')
    // console.log(isAuthenticated({ email, password }))
    let userInfo = await UserPost.find({ email, password });
    console.log('True or False', email, password , userInfo);
    if (userInfo.length === 1){   //校驗驗證await isAuthenticated({email, password})
        console.log('userInfo', userInfo[0].nickname);

        console.log(userInfo[0].nickname, userInfo[0].type )
        // //jwt
        const jwToken = createToken({nickname:userInfo[0].nickname, type:userInfo[0].type, email:userInfo[0].email});  //用{nickname, type, email}生成jwt
        console.log(13, {nickname:userInfo[0].nickname, type:userInfo[0].type, email:userInfo[0].email})
        // const jwToken = 'fjugbuirdge.45grwsdrewsg.edgjew45';
        return res.status(200).json(jwToken)
    } else {
        const status = 401;
        const message = 'Incorrect email or password';
        return res.status(status).json({ status, message })
    }
});

//--------------------------------------------------------------

router.post('/save/product', (req, res) => {  //發布路由
    const data = req.body;

    const newProductsPost = new ProductsPost(data);

    // .save
    newProductsPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        } 
        //UserPost
        return res.json({
            msg: 'Your data has been saved!!!'
        });
        
    });
});

router.get('/name', (req, res) => {
    const data = {
        username: 'zxc',
        age: 5
    };
    res.json(data);
});

//api新註冊使用者
router.post('/register', async(req, res) => {   
    const { nickname, email, password, type } = req.body;
    let AllData = await UserPost.find({});
    let userInfo = await UserPost.find({ email });
    //1.查詢是否註冊過
    if (userInfo.length === 1) {
        const status = 401;
        const message = 'Email and Password already exist';
        return res.status(status).json({ status, message });
    }
    const newUserPost = new UserPost({id:String(AllData.length+1), nickname, email, password, type });
    console.log('1', {id:String(AllData.length+1), nickname, email, password, type } , userInfo);
    console.log('2', AllData);
    console.log('3', userInfo);
        // const last_item_id = AllData.length.id;
        //新增用戶 一個id+1獲得新id  再將資料放到data裡
        // data.users.push({ id: last_item_id + 1, email, password, nickname, type });
        // AllData.push({ id: last_item_id + 1, email, password, nickname, type });
        // .save
    newUserPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        } 
        //UserPost
        return res.json({
            msg: 'Your data has been saved!!!'
        });
    
    });
    // console.log(13,{ nickname, type, email });
    // const jwToken = createToken({ nickname, type, email });
    // console.log(jwToken);
    // return res.status(200).json(jwToken);
        
});

//---添加購物車
router.post('/carts', async(req, res) => {  //發布路由
    
    const  cart  = req.body;
    console.log('AddCart:', cart)
    const {productId, name, image, price, mount, userId} = cart;
    let AllCart = await CartsPost.find({});
    console.log('AllCart:', {productId, name, image, price, mount, userId});

    const idList = [0];
    for(var i in AllCart){
        idList.push(parseInt(AllCart[i].id));
    }

    const newCartsPost = new CartsPost({id:Math.max(...idList)+1, productId, name, image, price, mount, userId});

    // .save
    newCartsPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        } 
        //UserPost
        return res.json({
            msg: 'Your data has been saved to Cart!!!'
        });
        
    });

});
// //通過jwt認證來獲取carts的資料保護顯示
router.use('/carts', (req, res, next) => {
    if (
        req.headers.authorization === undefined ||   //查看req的頭部資料是否有值，如果沒有值或是不是以Bearer為開頭(連接jwt)
        req.headers.authorization.split(' ')[0] !== 'Bearer'
    ) {
        const status = 401;   //失敗 401 顯示提示訊息
        const message = 'Error in authorization format';
        res.status(status).json({ status, message });
        return;
    }
    try {
        const verifyTokenResult = verifyToken(   //把jwt帶過來後看是否有效
            req.headers.authorization.split(' ')[1]
        );
        if (verifyTokenResult instanceof Error) {   //驗證錯誤
            const status = 401;
            const message = 'Access token not provided';
            res.status(status).json({ status, message });
            return;
        }
        next();   //驗證成功 調用next，處理原本的carts請求
    }   catch (err) {
        const status = 401;
        const message ='Error token is revoked';
        res.status(status).json({ status, message });
    }
});
///驗證的方法
const verifyToken = token => {
    return jwt.verify(token, SECRET, (err, decode) =>
        decode !== undefined ? decode : err
    );
};

module.exports = router;