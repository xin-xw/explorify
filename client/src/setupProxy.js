// Add our proxy so that we can easily request our backend to see if we are logged in
// const proxy = require("http-proxy-middleware").createProxyMiddleware;
const createProxyMiddleware = require("http-proxy-middleware");
// const proxy = require("http-proxy-middleware").createProxyMiddleware;

module.exports = function (app) {
  app.use(
    createProxyMiddleware(`/auth/**`, { target: "http://localhost:8080" })
  );
};
