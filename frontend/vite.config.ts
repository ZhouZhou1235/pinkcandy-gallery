import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    // vite 代理服务器
    server: {
        host: '0.0.0.0',
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://localhost:8082',
                changeOrigin: true,
                rewrite: (path)=>path.replace(/^\/api/,''),
            },
        }
    },
    // vite 编译打包配置
    build: {
        chunkSizeWarningLimit:1000,
        rollupOptions: {
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
