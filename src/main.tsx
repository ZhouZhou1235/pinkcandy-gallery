// 入口脚本

// 创建React
// import { StrictMode } from 'react' // 重渲染 检查错误
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// 全局样式表与JS脚本
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './assets/css/default.css'

// 创建根DOM 渲染
createRoot(document.getElementById('root')!).render(<App />)

// 检查ECMAScript支持
if(eval("let x = 1; const y = 2; () => {}; `template`")){
    console.log('PINKCANDY: FantasyFurryGallery load ready!')
}
else{
    console.log('PINKCANDY: ECMAScript not support.')
    let root = document.getElementById('root')
    if(root){
        root.innerHTML = '<h1>PINKCANDY: ECMAScript not support.</h1>'
    }
}
