# 幻想动物画廊
## 站长 pinkcandyzhou
项目地址 [幻想动物画廊](https://gallery.pinkcandy.top)

### 描述
欢迎访问粉糖画廊代码仓库，这是本网站站长小蓝狗❄️创建的开源项目；<br>
幻想动物画廊🐾是一个非商业性质中文艺术图站，用户可以浏览、发布分享有关毛绒绒的绘画作品，并且附带一个称为“花园”的论坛来交流；<br>
“来点粉糖”是小蓝狗的朋友白白为搜索功能起的名称，可以全站查询媒体内容（爬虫看这里👀）；<br>
煎饼找到了网站中的很多BUG，感谢煎饼！<br>
本项目由小蓝狗周周长期维护，与周的技术水平共同发展，欢迎有兴趣的同好pull request！💻<br>

### 结构
粉糖画廊前后端分离，前端使用React，后端使用Node.js Express。<br>
部署方案为 宝塔面板管理 Linux+Nginx+MySQL+本地文件库+HTTPS<br>
后端仓库地址 [幻想动物画廊系统](https://github.com/ZhouZhou1235/GallerySystem)<br>

**正在运行第四版**
第三版于第四版稳定后废弃，先前的版本已经废弃。

### 版本概览
- 第四版 React
- 第三版 Vue3
- 第二版 PHP 传统PHP嵌入HTML
- 第一版 HTML Hello World 旧名：周周的网络世界

------

以下是vite创建项目的初始提示

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
