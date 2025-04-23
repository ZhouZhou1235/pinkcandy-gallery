// 入口脚本

// 创建React
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// 全局样式表与JS脚本
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './assets/css/default.css'

// 创建根DOM 渲染
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
    // <App />
)
