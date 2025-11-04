<p align="center">
    <img src="/docs/images/fantasyfurrygallery.png" alt="logo" width="50%">
</p>


# 幻想动物画廊
**网站 https://gallery.pinkcandy.top** <br />
**后端 https://gallery-system.pinkcandy.top** <br />
**通讯服务器（开发中） https://gallery-chat.pinkcandy.top** <br />


### 描述
欢迎访问粉糖画廊代码仓库<br />
幻想动物画廊是一个非商业性质的毛绒绒主题中文艺术网站，用户能发布分享有关毛绒绒的绘画作品，还可以交流聊天。<br />
本项目由小蓝狗周周长期维护，如有兴趣欢迎提交分支！<br />


### 结构与命令

windows开发环境可直接点击start-dev.bat开始 <br />

**前端 React**<br />
- public 静态资源
- src 源代码与资源
- index.html 入口
- tsconfig.js TS配置
- vite.config.js vite配置
```
npm install
npm run dev
npm run build
```

**后端 Node.js Express**<br />
- core 源代码
- static 静态资源
- config.js 配置文件
- main.js 启动
```
npm install
node main.js
```

**通讯服务器 PHP Workerman**<br />
- src 源代码与资源
- composer.json Composer项目文件
- main.php 启动
- main_windows.php windows启动
- run.bat windows启动脚本
```
composer install
php main.php # linux启动
.\run.bat # windows启动
```
