// 配置


// 是否生产环境
let isproduction = false
// 开发环境
export const dev_backend_api = 'http://localhost:8081' // 后端接口
// 生产环境
export const prod_backend_api = 'https://gallery-system.pinkcandy.top'
// 代理字符常量
export const config_backend_proxy_string = '/api' // 访问后端的代理字符
// 接口
export const config_backend_api = isproduction?prod_backend_api:dev_backend_api
