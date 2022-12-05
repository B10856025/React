import React from 'react';
import axios from 'axios';
import { formatPrice } from 'commons/helper';
import Panel from 'components/Panel'
import EditInventory from 'components/EditInventory';
import { toast } from 'react-toastify';

class Product extends React.Component{
    // state = {     //更新狀態
    //     name: '',
    //     image: '',
    //     tags: '',
    //     price: '',
    //     posts: []
    // }
    state = {
        isLike: false
    };
    // componentDidMount = async() => {
    //     this.getProductPost();
    // }
    // getProductPost = async() => {   //從服務器取得資料
    //     axios.get('/api')
    //         .then((response) => {
    //             const data = response.data;
    //             this.setState({ posts: data });
    //             console.log('Data has been received!!');
    //             console.log(data);
    //             return data;
    //         })
    //         .catch(() => {
    //             alert('Error retrieving data!');
    //         });
    
    // }
    // displayUserPost = (posts) => {   //顯示
    //     if (!posts.length) return null;

    //     return posts
        
    // };
    toEdit = () => {
        Panel.open({
            component: EditInventory,
            props: {
                product: this.props.product,
                deleteProduct: this.props.delete   //在open的時候把函數組件傳遞給EditInventory
            },
            callback: data => {   //回調函數
                console.log('callback:', data);
                if (data) {
                    this.props.update(data);
                }
            }
        });
    };
       //新增/carts資料庫 cart內容
    addCart = async props => {
        if (!global.auth.isLogin()) {   //查看是否登入 
            toast.info('Please Login First')
            return;
        }

        try{   //異不含數出錯的話用異常處理
            const user = global.auth.getUser() || {};   ///取得使用這用戶來獲取不同使用者的cart
            const { id, name, image, price } = this.props.product;   //取得商品內容
            console.log('addCart:', { id, name, image, price });
            const res = await axios.get('/api/carts') ; //根據productId查詢carts裡面有無相同id 用異步函數等待她完成的一個responce對象
            console.log('res:',  res.data);
            //const i=0;
            var carts = [];
            for(var i=0;i<res.data.length;i++){
                console.log(res.data[i].productId);
                if (id === res.data[i].productId){
                    console.log('same');
                    carts = res.data;  //拿到全部數組放進carts
                    console.log('carts:', carts);
                    const cart = carts[i];     //將一組一樣的數組 放進cart
                    cart.mount = 1;          //更改mount數量
                    toast.warning('can only be added once');
                }
            }
            if (carts && carts.length===0){
                const cart = {
                    productId: id, 
                    name,
                    image,
                    price, 
                    mount: 1,
                    userId: user.email
                };
                console.log('cart.productId:',cart.productId);
                await axios.post('/api/carts', cart);
                toast.success('Add Cart Success');
            }
            this.props.updateCarNum();
        } catch (error) {
            toast.error('Add Cart Failed');
        }
    };

    renderMangerBtn = () => {   //管理使用者權限的渲覽視圖
        const user = global.auth.getUser() || {}   //如果為空給它空字串
        if (user.type === "1") {
            return(
                <div className="p-head has-text-right" onClick={this.toEdit}>
                    <span className="icon edit-btn">
                        <i className="fa-solid fa-sliders"></i>
                    </span>
                </div>
            )
        }
    }

    handleClick = () =>{
        this.setState({
            isLike: !this.state.isLike
        })
    }

    render(){
        const {id, name, image, tags, price, status} = this.props.product;
        console.log({id, name, image, tags, price });
        const _pClass = {
            available: 'product',
            unavailable: 'product out-stock'
        };
        const onePrice = formatPrice(1 * parseInt(price));
        console.log('HHHHHHHHHHHHHHHHHHHHHHH', image.split('\\')[8])
        
        return(
            <div className={_pClass[status]}>
                <div className="p-content">
                    {this.renderMangerBtn()}
                    <div className="img-wrapper" >
                        {status === 'unavailable' ? <p className="out-stock-text" >Out Of Stock</p> : ''}   
                        <figure className="img is-4by3" >
                            <img src={require('../assets/' + image.split('\\')[8])} alt={name} /> {/*//{require('../assets/A101.jpg')*/}
                        </figure>
                    </div>
                    <p className="p-tags">{tags}</p>
                    <p className="p-name">{name}</p>
                </div>
                <div className="p-footer">
                    <p className="price">{onePrice}</p>
                    <div>
                        <button className="add-cart" onClick={this.handleClick}>
                            {this.state.isLike ? '🖤'  : '🤍'}
                            {/* <i className="fa-regular fa-thumbs-up" />
                            <i className="fa-solid fa-thumbs-up" /> */}
                            
                        </button>
                        <button className="add-cart" disabled={status === 'unavailable'} onClick={this.addCart} >  
                            <i className="fa-solid fa-cart-shopping"></i>
                            <i className="fa-solid fa-cart-circle-plus"></i>
                        </button>
                    </div>
                </div>
                <div className="user-post">
                    {/* {this.displayUserPost(this.state.posts)} */}
                </div> 
                {/* {this.state.posts.map((post, index) => (
                    <div key={index} className="user-post_display">
                        <h3>{post.name}</h3>
                        <h3>{post.tags}</h3>
                        <h3>{post.price}</h3>
                    </div>))} */}
            </div>
            
        );
    }
}
export default Product;