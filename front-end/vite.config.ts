import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dev_backend_api } from './src/vars/config';


// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    // vite 代理服务器
    server: {
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '/api': {
                target: dev_backend_api,
                changeOrigin: true,
                rewrite: (path)=>path.replace(/^\/api/,''),
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
