
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(App) {
    App.use(
    '/api',
    createProxyMiddleware({
        target: 'http://localhost:8080', 
        secure: false,
        changeOrigin: true
    })
    );
};
//解決跨域問題 