import React from 'react';
import ToolBoxCopy from 'components/ToolBoxCopy';
import Product from 'components/Product';
import axios from 'axios';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import Panel from 'components/Panel';
import AddInventory from 'components/AddInventory';
import Layout from 'Layout';


class Products extends React.Component{
    
    state = {     //更新狀態
        id:'',
        name: '',
        image: '',
        tags: '',
        price: '',
        products: [],
        sourceProducts: [],
        cartNum: 0
    }
    componentDidMount = async() => {
        this.getProductPost();
        
    }
    getProductPost = async() => {   //從服務器取得資料
        axios.get('/api')
            .then((response) => {
                const data = response.data;
                this.setState({ products: data , sourceProducts: data });
                console.log('Data has been received!!');
                console.log(data);
            })
            .catch(() => {
                alert('Error retrieving data!');
            });
            this.updateCarNum();
    }
    // displayUserPost = (products) => {   //顯示
    //     if (!products.length) return null;

    //     return products.map((products, index) => (
    //         <div key={index} className="user-post_display">
    //             <h3>{products.name}</h3>
    //             <h3>{products.tags}</h3>
    //             <h3>{products.price}</h3>
    //         </div>
    //     ));
    // };
    //search
    search = text => {
        console.log(text);
        //1. get new array
        let _products = [...this.state.sourceProducts];
        
        //2. filter new array
        _products = _products.filter(p => {
            // name:Abcd   text:ab  ===>[''Ab]
            //text: ''   ==>["", "", "", ""]
            const matchArray = p.name.match(new RegExp(text, 'gi'));
            return !!matchArray;
        });
        console.log('--------------')
        //3. set state
        this.setState({
            products: _products
        });
    };
    toAdd = () =>{
        Panel.open({
            component: AddInventory,
            callback: data => {
                if (data) {
                    this.add(data);
                }
            }
        });
    };

    add = product => {
        const _products = [ ...this.state.products];
        _products.push(product);
        const _sProducts = [ ...this.state.sourceProducts];
        _sProducts.push(product);
    
        this.setState({
            products: _products,
            sourceProducts: _sProducts
        });
    };

    update = product => {
        const _products = [ ...this.state.products]
        console.log('_products', _products);
        const _index = _products.findIndex(p => p.id ===product.id);
        
        console.log('_index', _index);
        _products.splice(_index, 1, product);
        const _sProducts = [ ...this.state.sourceProducts];
        const _sIndex = _products.findIndex(p => p.id ===product.id);
        _sProducts.splice(_sIndex, 1, product);

        this.setState({
            products: _products,
            sourceProducts: _sProducts
        });
    };
    
    delete = id => {   //將delete傳到Product
        const _products = this.state.products.filter(p => p.id !==id);
        const _sProducts = this.state.sourceProducts.filter(p => p.id !==id);
        console.log("HIHI", _products);
        this.setState({   ///更新列表
            products: _products,
            sourceProducts: _sProducts
        });
    };

    updateCarNum = async () => {   //異步函數
        const user = global.auth.getUser() || {};   ///取得使用這用戶來獲取不同使用者的cart
        console.log('---user:', user.email);
        
        const cart = await axios.get('/api/carts');
        console.log(cart);
        let i = 0;
            const cartData =[];
            for(i=0;i<cart.data.length;i++){
                console.log('cart.data.userId:', cart.data[i].userId);
                if(cart.data[i].userId === user.email){
                    console.log('cart.data.userId && user.email:', cart.data[i].userId , user.email);
                    cartData.push(cart.data[i]);
                }

            }
            console.log(cartData);
        const cartNum = cartData.length;
        console.log(cartNum);
        this.setState({
            cartNum: cartNum 
        });
    };
    render(){
        return(
            <Layout>
                <div>
                    <ToolBoxCopy search={this.search}  cartNum={this.state.cartNum} />
                    <div className="products">
                        <div className="columns is-multiline is-mobile">
                            <TransitionGroup component={null}>
                                {this.state.products.map(p => {
                                    return(
                                        <CSSTransition classNames="product-fade" timeout={300} key={p.id}>
                                            <div className="column is-3" key={p.id}>
                                                <Product product={p} update={this.update} delete={this.delete} updateCarNum={this.updateCarNum}///{/**////} //傳遞update、delete、updateCarNum參數給Product
                                                /> 
                                            </div>
                                        </CSSTransition>
                                        
                                    );
                                })}
                            </TransitionGroup>
                    </div>
                    {(global.auth.getUser() || {}).type === "1" && (   //管理使用者權限的渲覽視圖
                            <button className="button is-primary add-btn" onClick={this.toAdd} >Add</button>
                    )}
                    </div>
                    
                    
                </div>
            </Layout>
        );
    }
}
export default Products;