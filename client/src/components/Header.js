import React from 'react';
import { Link , useNavigate} from 'react-router-dom';///
import UserProfile from 'components/UserProfile';
import Panel from 'components/Panel';
import Bars from 'components/Bars';

const Header = props => {
    const navigate = useNavigate()
    const toProfile = () => {
        
        Panel.open({
            component: UserProfile,
            props: {
                user: props.user   //傳遞user到 userProfile組件
            },
            callback: data => {
                if (data === 'logout') {   //如果關閉嘞就是典籍了一個logout 按鈕 回調
                    navigate(0);   //// 强制刷新当前页面并不加入路由历史
                }
            }
        });
    };
    const toBars = () => {
        Panel.open({
            component: Bars
        })
    }
    return(
        <div className="header">
            <div className="grid">
                <div className="bars">
                    <i className="fa-solid fa-bars" onClick={toBars}/>
                </div>
                <div className="left"> 
                    <Link to="/" i className="fa-solid fa-house" > 二 拾 衣 世 紀</Link>
                </div>
                <div className="right">
                    {props.user.nickname ? (
                        <span className="nickname"  onClick={toProfile}>
                            <i className="fa-solid fa-user" />
                            {props.user.nickname}
                        </span>
                    ):(
                        <React.Fragment>
                            <Link to="/login">Login </Link>
                            <Link to="/register">Register</Link>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Header;