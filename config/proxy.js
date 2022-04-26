/**
 * 在生产环境代理是无法生效的，所以这里没有生产环境的配置
 */
export default {
  dev: {
    '/api/': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    }
  },
  test: {
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    }
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    }
  }
}
