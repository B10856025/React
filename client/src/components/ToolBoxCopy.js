import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function ToolBoxCopy(props){ 
    const state = {
        searchText: ''
    };
    
    const handleChange = e => {
        const value = e.target.value;
        console.log(value)
        this.setState({
            searchText: value
        });
        this.props.search(value);
    };

    const clearSearchText = () => {
        this.setState({
            searchText: ''
        });
        this.props.search('')
    };
    const navigate = useNavigate();
    const goCart = () => {
        if (!global.auth.isLogin()) {   //查看是否登入 
            navigate('/login');
            toast.info('Please Login First')
            return;
        }
        navigate('/cart');
    };
    

    
    
        return(
            <div className="tool-box">
                <div className="logo-text">二  拾  衣  世  紀</div>
                <div className="search-box">
                    <div className="field has-addons">
                        <div className="control">
                            <input type="text" className="input search-input" placeholder="Search Product" value={state.searchText} onChange={handleChange} />
                        </div>
                        <div className="control">
                            <button className="button" onClick={clearSearchText}>X</button>
                        </div>
                    </div>
                </div>
                <div className="cart-box" onClick={goCart}>
                    <Link to="/cart"><i className="fa-solid fa-cart-shopping"></i></Link>
                    <span className="cart-num">({props.cartNum})</span>
                </div > 
            </div>
        );
    }
