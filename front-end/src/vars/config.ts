// 配置


// 是否生产环境
let isproduction = false
// 开发环境
export const dev_backend_api = 'http://localhost:8081' // 后端接口
export const dev_ws_server_http_api = 'http://localhost:8082' // socket服务器HTTP服务接口
export const dev_ws_server_websocket_api = 'ws://localhost:8083' // socket服务器WebSocket服务接口
// 生产环境
export const prod_backend_api = 'https://gallery-system.pinkcandy.top'
export const prod_ws_server_http_api = 'https://gallery-chat.pinkcandy.top'
export const prod_ws_server_websocket_api = 'wss://gallery.pinkcandy.top/chat_ws'
// 代理字符常量
export const config_backend_proxy_string = '/api' // 访问后端的代理字符
export const config_ws_server_http_proxy_string = '/chat_api' // 访问socket服务器http的代理字符
// 接口
export const config_backend_api = isproduction?prod_backend_api:dev_backend_api
export const config_ws_server_http_api = isproduction?prod_ws_server_http_api:dev_ws_server_http_api
export const config_ws_server_websocket_api = isproduction?prod_ws_server_websocket_api:dev_ws_server_websocket_api
