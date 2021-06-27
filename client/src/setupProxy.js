// Add our proxy so that we can easily request our backend to see if we are logged in
const createProxyMiddleware = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(`/auth/**`, {
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};
