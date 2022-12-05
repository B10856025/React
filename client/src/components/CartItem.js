import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { formatPrice } from 'commons/helper';

const CartItem = props => {
    const [mount ]= useState(props.cart.mount);   //, setMount
    const {id, name, image, price } = props.cart || {};
    console.log('props cart:--------------', id, name);
    const sumPrice = useMemo(() => {
        return formatPrice(mount * parseInt(price));
    }, [mount, price]); 
    
    
    // const handleChange = e => {
    //     const _mount = parseInt(e.target.value);   //拿到字目串轉整數值
    //     setMount(_mount);
    //     const newCart = {   //將新數目存到數據庫
    //         ...props.cart,
    //         mount: _mount
    //     }
    //     axios.put(`/carts/${id}`, newCart).then(res => {
    //         props.updateCart(newCart);
    //     });
    // };

    const deleteCart = async () => {
        const resCarts = await axios.get('/api/carts') ;
        console.log('res1:',  resCarts.data);
        const delCart = {id, name, image, price};
        //
        //
        console.log('props cart:--------------delete', delCart);
        // await axios.delete('/api/carts', {"123":"456"});
        const res = await axios.delete('/api/carts',{data: {delCart}});
        props.deleteCart(props.cart);   //調用父組件的資料
        console.log('res:',  res.data);
    };

    return (
        <div className="columns is-vcentered">
                <div className="column is-narrow" onClick={deleteCart} >
                    <span className="close">X</span>
                </div>
                <div className="column is-narrow">
                    <img src={require('../assets/' + image.split('\\')[8])} alt={name} width="100" />
                </div>
                <div className="column cart-name is-narrow">{name}</div>
                <div className="column">
                    <span className="price">{price}</span>
                </div>
                <div className="column">
                    <input type="button" className="input num-input" min={1} max={1} defaultValue={mount}  /> {/*type="number"  value={mount}onChange={handleChange}*/}
                </div>
                <div className="column">
                    <span className="sum-price">{sumPrice}</span>
                </div>    
            
        </div>
    );
};

export default CartItem;