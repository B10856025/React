import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import App from 'pages/App';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import Products from 'components/Products';
import Register from 'pages/Register';
import Cart from 'pages/Cart';
import Images from 'pages/Images';
// import App2 from 'pages/App2'
// import Form from 'components/Form';
// import ProductPage from 'components/ProductPage';

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Images" element={<Images />} />
            {/* <Route path="/App2" element={<App2 />} /> */}
            {/* <Route path="/form" element={<Form />} />
            <Route path="/productPage" element={<ProductPage />} /> */}
        </Routes>
    </BrowserRouter>
)

export default Router;