/**
 * 配置数据代理
 */

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/static/elm' : '/',
  // 避免Eslint报错
  lintOnSave: false,
  css: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: true, //包含运行时编译器的 Vue 构建版本
  productionSourceMap: false,
  parallel: undefined,
  lintOnSave: true,
  // devServer: {
  //   disableHostCheck: true,
  //   proxy: {
  //     '/v1': {
  //       target: 'https://elm.cangdu.org', //代理接口
  //       changeOrigin: true,
  //       secure: false,
  //       headers: {
  //         Referer: 'https://elm.cangdu.org',
  //       },
  //     },
  //     '/v2': {
  //       target: 'https://elm.cangdu.org', //代理接口
  //       changeOrigin: true,
  //       secure: false,
  //       headers: {
  //         Referer: 'https://elm.cangdu.org',
  //       },
  //     },
  //     '/v4': {
  //       target: 'https://elm.cangdu.org', //代理接口
  //       changeOrigin: true,
  //     },
  //     '/shopping': {
  //       target: 'https://elm.cangdu.org', //代理接口
  //       changeOrigin: true,
  //       secure: false,
  //       headers: {
  //         Referer: 'https://elm.cangdu.org',
  //       },
  //     },
  //   },
  // },
};
