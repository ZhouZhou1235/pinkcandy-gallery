<p align="center">
    <img src="/docs/fantasyfurrygallery.png" alt="logo" width="50%">
</p>


# 幻想动物画廊
**网站 https://gallery.pinkcandy.top**
**后端 https://gallery-system.pinkcandy.top**
**通讯服务器（开发中） https://gallery-chat.pinkcandy.top**


### 描述
欢迎访问粉糖画廊代码仓库，这是本网站站长小蓝狗周周创建的开源项目。<br>
幻想动物画廊是一个非商业性质的毛绒绒主题中文艺术网站，用户可以发布分享有关毛绒绒的绘画作品，还可以交流聊天。<br>
本项目由小蓝狗周周长期维护，与周的技术水平共同发展，如有兴趣欢迎提交分支！<br>


### 结构
**前端 React**<br>
- public 静态资源
- src 源代码与资源
- index.html 入口
- tsconfig.js TS配置
- vite.config.js vite配置

**后端 Node.js Express**<br>
- core 源代码
- static 静态资源
- config.js 网站配置文件
- main.js 启动

**通讯服务器 PHP Workerman**<br>
- src 源代码与资源
- composer.json Composer项目文件
- server_http.php HTTP服务
- server_websocket WebSocket服务


### 运行
本项目分成多个服务，分别启动才能运行。<br>

- 前端 front-end
安装模块
```
npm install
```
vite启动
```
npm run dev
```
编译web产物
```
npm run build
```

- 后端 back-end
安装模块
```
npm install
```
启动
```
node main.js
```

- 通讯服务器 pinkcandy-chat
安装模块
```
composer install
```
启动
```
php server_http.php server_websocket.php
```
