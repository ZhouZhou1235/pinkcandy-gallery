// 入口脚本

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import './assets/css/default.css'

createRoot(document.getElementById('root')!).render(<App />)
console.log('PINKCANDY GALLERY 幻想动物画廊')
