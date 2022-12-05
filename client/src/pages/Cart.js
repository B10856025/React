import CartItem from 'components/CartItem';
import Layout from 'Layout';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { formatPrice } from 'commons/helper';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Cart =  () => {   ///函式數組件 --用hook
    const [carts, setCarts] = useState([]);   //useState函數傳遞參數  >>用hook定義state狀態

    useEffect( () => {          //在第一次渲染會使用
        const user = global.auth.getUser() || {};   ///取得使用這用戶來獲取不同使用者的cart
        console.log('user', user);
        const cartsList = async () => {
            const res = await axios.put('/api/carts', {data: user});   //根據userId(user的email)來判斷
            //if(res.data.userId)
            console.log('cartsList:', res.data);
            setCarts(res.data);
        }
        cartsList()
            .catch(console.error);
    }, []);

    const totalPrice = useMemo(() => {   //useMemo性能優化 依賴值發生變化時才去執行 不會造成一些不必要的渲染
        const totalPrice = carts
            .map(cart => cart.mount * parseInt(cart.price))
            .reduce((a, value) => a + value, 0);
        return formatPrice(totalPrice);
    }, [carts]);

    const updateCart = cart => {
        const newCarts = [...carts];
        const _index = newCarts.findIndex(c => c.id === cart.id);
        newCarts.splice(_index, 1, cart);
        console.log('123456-----------');
        setCarts(newCarts);
    }

    const deleteCart = cart => {
        const _carts = carts.filter(c => c.id !== cart.id);
        console.log('hello', _carts);
        setCarts(_carts);
    }
    
    return(
        <Layout>
            <div className="cart-page">
                <span className="cart-title">Cart Page</span>
                <div className="cart-list">
                    <TransitionGroup component={null}>
                        {carts.map(cart => (
                            <CSSTransition classNames="cart-item" timeout={300} key={cart.id}>
                                <CartItem key={cart.id} cart={cart} updateCart={updateCart} deleteCart={deleteCart} />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>    
                </div>
                {carts.length === 0 ? <p className="no-cart">No Goods</p> : ''}  {/*判斷購物車長度是否為0*/ }
                
                <div className="cart-total">
                    Sum:
                    <span className="total-price">{totalPrice}</span>
                    
                </div>
                <br />
                <span className="cart-title">Checkout</span>
                <div className="cart-list">

                    <div className="cart-fare">
                        
                        <button className="button is-danger" type="button" >
                            物流選擇
                        </button>
                        <br />
                        <div className="fare-price">
                            $60.00
                        </div>
                    </div>

                    <br />
                    <br />
                    <div className="cart-pay">
                        
                        <button className="button is-danger" type="button" >
                            付費方式
                        </button>
                        <br />
                        <div className="pay-item">
                            貨到付款
                        </div>
                    </div>
                    
                </div>
                <br />
                <div className="cart-total">
                    Total:
                    <span className="total-price">510.00</span>
                        
                </div> 
                <br />
                <div className="go-pay">
                    <button className="button is-danger" type="button" >
                        確定結帳
                    </button>
                </div>
            </div>
    </Layout>
    );
};

export default Cart;