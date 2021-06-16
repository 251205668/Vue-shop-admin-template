const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    proxy: 'http://localhost:8888'
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'admin',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
