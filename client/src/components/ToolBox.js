import React from 'react';
//import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import { toast } from 'react-toastify';


class ToolBox extends React.Component{
    
    state = {
        searchText: ''
    };
    
    handleChange = e => {
        const value = e.target.value;
        this.setState({
            searchText: value
        });
        this.props.search(value)
    };

    clearSearchText = () => {
        this.setState({
            searchText: ''
        });
        this.props.search('')
    };

    // goCart = () => {
    //     //const navigate = useNavigate();
    //     if (!global.auth.isLogin()) {   //查看是否登入 
    //         //navigate('/login');
    //         toast.info('Please Login First')
    //         return;
    //     }
    //     //navigate('/cart');
    // };
    

    
    render(){
        return(
            <div className="tool-box">
                <div className="logo-text">二  拾  衣  世  紀</div>
                <div className="search-box">
                    <div className="field has-addons">
                        <div className="control">
                            <input type="text" className="input search-input" placeholder="Search Product" value={this.state.searchText} onChange={this.handleChange} />
                        </div>
                        <div className="control">
                            <button className="button" onClick={this.clearSearchText}>X</button>
                        </div>
                    </div>
                </div>
                <div className="cart-box" onClick={this.goCart}>
                    <Link to="/cart"><i className="fa-solid fa-cart-shopping"></i></Link>
                    <span className="cart-num">({this.props.cartNum})</span>
                </div >
            </div>
        );
    }

}

export default ToolBox;