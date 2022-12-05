import decode from 'jwt-decode';

const JWT = 'store_token_id';

const setToken = token => {
    localStorage.setItem(JWT, token);
};
const getToken = token => {   //取得token
    return localStorage.getItem(JWT);
};

const isLogin = () => {   //是否登入
    const jwToken = getToken();
    return !!jwToken && !isTokenExpired(jwToken);   //jwToken有值並且沒有超期
};

const isTokenExpired = token => {   ///token是否過期
    try {
        const _info = decode(token);   //decode 拿到用戶信息
        if (_info.exp < Date.now() / 1000) {   //判斷是否小於現在的時間
            return true;   //超期
        }  else return false;
    }catch (error) {
        return false;
    };
};

const getUser = () => {   //解碼token
    const jwToken = getToken();
    console.log('get: ',jwToken)
    if (isLogin()) {   //判斷當前是否已經登入
        const user = decode(jwToken)
        //console.log("User", user)
        return user;
    } else {
        return null;
    }
}

const logout = () => {
    localStorage.removeItem(JWT);
};


global.auth = {
    setToken,
    getUser,
    logout,
    isLogin,
    getToken
};
