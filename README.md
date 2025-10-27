<p align="center">
    <img src="/fantasyfurrygallery.png" alt="logo" width="50%">
</p>


# 幻想动物画廊
**https://gallery.pinkcandy.top**


### 描述
欢迎访问粉糖画廊代码仓库，这是本网站站长小蓝狗周周创建的开源项目。<br>
幻想动物画廊是一个非商业性质中文艺术图站，用户可以浏览、发布分享有关毛绒绒的绘画作品。<br>
本项目由小蓝狗周周长期维护，与周的技术水平共同发展，如有兴趣欢迎提交分支！<br>


### 结构
**前端 React**<br>
- public 静态资源
- src React源代码与资源
- index.html 入口
- tsconfig.js TS配置
- vite.config.js vite配置

**后端 Node.js Express**<br>
- core 系统代码
- static 静态资源
- config.js 网站配置文件
- main.js 启动


### 运行
本项目前后端分离，分别启动两个服务才能运行。<br>

front-end<br>
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

back-end<br>
安装模块
```
npm install
```
启动
```
node main.js
```


### 公开接口
**https://gallery-system.pinkcandy.top**
| 方法 | URL                          | 参数                     | 返回数据               | 说明                     |
|------|------------------------------|--------------------------|------------------------|--------------------------|
| GET  | /core/searchPinkCandy        | searchtext: 关键词       | {artworks,plantpots,users} | 全站搜索               |
| GET  | /files/gallery/:filename     | filename: 文件名         | 图片文件               | 获取作品原图             |
| GET  | /files/headimage/:filename   | filename: 文件名         | 图片文件               | 获取用户头像             |
| GET  | /core/getUser/:username      | username: 用户名         | 用户公开信息对象       | 获取用户资料             |
| GET  | /core/getArtworks            | [begin, num, username]   | 作品数组               | 分页获取作品列表         |
| GET  | /core/getArtwork             | id: 作品ID               | 作品详情对象           | 获取单个作品完整信息     |
| GET  | /core/getTagsArtwork/:id     | id: 作品ID               | 标签数组               | 获取作品关联标签         |
