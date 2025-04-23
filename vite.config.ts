import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { GArea } from './src/vars/ConstVars'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    // vite 代理服务器
    server: {
        proxy: {
            '/api': {
                target: GArea.connectURL,
                changeOrigin: true,
                rewrite: (path)=>path.replace(/^\/api/,''),
            }
        }
    },
})
