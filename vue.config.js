'use strict';
module.exports = {
  devServer: {
    port: 9991,
    open: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000/api',
        ws: true,
        pathRewrite: {'^/api' : ''},
        changeOrigin: true
      },
    }
  },
  lintOnSave:false,
  chainWebpack: (config) => {
    // config.resolve.alias
    //   .set('@', resolve('src')) 
    //   .end();
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};