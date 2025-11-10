<p align="center">
    <img src="/docs/images/fantasyfurrygallery.png" alt="logo" width="50%">
</p>


# 幻想动物画廊
**网站 https://gallery.pinkcandy.top** <br />
**后端 https://gallery-system.pinkcandy.top** <br />
**通讯服务器 https://gallery-chat.pinkcandy.top** <br />


### 描述
幻想动物画廊是一个非商业性质的毛绒绒主题中文艺术网站，用户能发布分享有关毛绒绒的绘画作品，还可以交流聊天。<br />
欢迎访问粉糖画廊代码仓库，本项目由小蓝狗周周长期维护。<br />
技术栈：TypeScript, JavaScript, Node.js, Vite, PHP, Linux, Nginx, MySQL<br />


### 结构

环境准备：Node.js+npm, PHP+Composer
需要先完成环境搭建以及三个服务的配置文件
windows开发环境可直接点击start-dev.bat开始 <br />

前端 React<br />
- public 静态资源
- src 源代码与资源
- index.html 入口
- tsconfig.js TS配置
- vite.config.js vite配置
- **src/vars/config.ts 配置文件**
```
npm install
npm run dev
npm run build
```

后端 Node.js Express<br />
- core 源代码
- static 静态资源
- main.js 启动
- **config.js 配置文件**
```
npm install
node main.js
```

通讯服务器 PHP Workerman<br />
- src 源代码与资源
- composer.json Composer项目文件
- main.php 启动
- main_windows.php windows启动
- run.bat windows启动脚本
- **src/config.php 配置文件**
```
composer install
php main.php # linux启动
.\run.bat # windows启动
```


## 部署参考
1. 将三个服务的配置文件写好
2. 前端使用 npm run build 打包 接口对接生产环境
3. 准备三个服务的最终代码文件。前端为dist，后端和通讯服务均为脚本无需编译。
4. 为三个服务创建nginx服务器，分别完成nginx的配置以支持网路互相连通。配置示例见docs
5. 全部完成后，前端以nginx提供页面，后端和通讯服务常驻内存，分别启动即可。
6. 访问主页，完成部署。
