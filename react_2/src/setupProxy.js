const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:20123/api",
    changeOrigin: true,
  })
  );
  app.use(
  "/files",
  createProxyMiddleware({
    target: "http://localhost:20123/files",
    changeOrigin: true,
  })
  );
};
