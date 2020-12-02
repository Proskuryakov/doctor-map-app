module.exports = [
  {
    context: '/api',
    target: 'http://127.0.0.1:8080',
    secure: true,
    changeOrigin: true
  },
  {
    context: '/fias',
    target: 'https://kladr-api.ru/api.php',
    secure: true,
    changeOrigin: true,
    pathRewrite: {
      "^/fias": ""
    }
  }
];
