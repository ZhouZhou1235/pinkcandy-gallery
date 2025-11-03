import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { systemAPI, ws_http_system } from './src/vars/ConstVars'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    // vite 代理服务器
    // 同源请求 vite重写url转发到后端接口
    server: {
        host: 'localhost',
        // port: 5173,
        proxy: {
            '/api': {
                target: systemAPI,
                changeOrigin: true,
                rewrite: (path)=>path.replace(/^\/api/,''),
            },
            '/chat_api': {
                target: ws_http_system,
                changeOrigin: true,
                rewrite: (path)=>path.replace(/^\/chat_api/,''),
            },
        }
    },
    // vite 编译打包配置
    build: {
        chunkSizeWarningLimit:1000, // 模块过大警告
        rollupOptions: { // 根据模块拆分编译
            output:{
                manualChunks(id){
                    if(id.includes('node_modules')){
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        }
    }
})
