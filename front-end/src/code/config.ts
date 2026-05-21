// 开发环境后端API地址
// 需要与 vite.config.ts proxy 一致
export const dev_backend_api = 'http://localhost:8082'

// 生产环境后端API地址
export const prod_backend_api = 'https://gallery-system.pinkcandy.top'

// 后端代理路径
export const config_backend_proxy_string = '/api'

// 根据Vite环境变量自动选择API地址
export const config_backend_api = import.meta.env.PROD ? prod_backend_api : dev_backend_api
