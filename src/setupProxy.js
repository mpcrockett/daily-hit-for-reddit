const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'dailyhit.herokuapp.com',
      changeOrigin: true,
    })
  );
};