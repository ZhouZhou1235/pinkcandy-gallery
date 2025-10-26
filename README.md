# 幻想动物画廊
**https://gallery.pinkcandy.top**

### 描述
欢迎访问粉糖画廊代码仓库，这是本网站站长小蓝狗周周创建的开源项目。<br>
幻想动物画廊是一个非商业性质中文艺术图站，用户可以浏览、发布分享有关毛绒绒的绘画作品。<br>
本项目由小蓝狗周周长期维护，与周的技术水平共同发展，如有兴趣欢迎提交分支！<br>

### 结构
粉糖画廊前后端分离，前端使用React，后端使用Node.js Express。<br>
部署方案为 宝塔面板管理 Linux+Nginx+MySQL+本地文件库+HTTPS<br>

### 公开接口
**https://gallery-system.pinkcandy.top**
| 方法 | URL                          | 参数                     | 返回数据               | 说明                     |
|------|------------------------------|--------------------------|------------------------|--------------------------|
| GET  | /files/gallery/:filename     | filename: 文件名         | 图片文件               | 获取作品原图             |
| GET  | /files/headimage/:filename   | filename: 文件名         | 图片文件               | 获取用户头像             |
| GET  | /files/garden/:filename      | filename: 文件名         | 图片文件               | 获取盆栽图片             |
| GET  | /core/getUser/:username      | username: 用户名         | 用户公开信息对象       | 获取用户资料             |
| GET  | /core/getArtworks            | [begin, num, username]   | 作品数组               | 分页获取作品列表         |
| GET  | /core/getArtwork             | id: 作品ID               | 作品详情对象           | 获取单个作品完整信息     |
| GET  | /core/getTagsArtwork/:id     | id: 作品ID               | 标签数组               | 获取作品关联标签         |
| GET  | /core/getPlantpots           | [begin, num, username]   | 盆栽数组               | 分页获取盆栽列表         |
| GET  | /core/getPlantpot            | id: 盆栽ID               | 盆栽详情对象           | 获取单个盆栽完整信息     |
| GET  | /core/getUserWatch           | username                 | {watchers, following}  | 获取用户社交关系         |
| GET  | /core/searchPinkCandy        | searchtext: 关键词       | {artworks,plantpots,users} | 全站搜索               |
| GET  | /core/getNoticenum           | username                | 未读通知数            | 获取消息提醒数量         |
| GET  | /core/getTrendnum            | username                | 未读动态数            | 获取动态更新数量         |
