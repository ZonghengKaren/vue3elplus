const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    hot: true,
    proxy: {
      //设置代理
      '/json': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        logLevel: 'debug',
        secure: false, //如果是http接口，需要配置该参数
        pathRewrite: {
          '^/json': ''
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        imports:['vue', 'vue-router', 'vuex', 'pinia'],
        eslintrc: {
          enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
          filepath: './.eslintrc-auto-import.json', // 生成json文件,eslintrc中引入
          globalsPropValue: true,
        }
      })
    ]
  },
  css: {
    
    // 默认加载全局样式
    loaderOptions: {
      less: {
        additionalData: `@import "@/assets/themes/index.less";`
      }
    }
  }
})
