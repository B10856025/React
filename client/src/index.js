import React from 'react';
import ReactDOM from 'react-dom/client';
import 'css/app.scss';
import 'css/style.scss';
import Router from 'Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'commons/auth';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
      <Router />
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();