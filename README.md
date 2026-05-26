<p align="center">
    <img src="/frontend/public/images/title.png" alt="logo" width="50%">
</p>


# 幻想动物画廊
**网站 https://gallery.pinkcandy.top** <br />
**后端 https://gallery-system.pinkcandy.top** <br />


## 描述
幻想动物画廊是一个非盈利毛绒绒主题中文艺术网站，用户能发布有关毛绒绒的绘画作品。<br />
欢迎访问粉糖画廊代码仓库，本项目由小蓝狗周周长期维护。<br />
技术栈：TypeScript, JavaScript, React, Vite, PHP, Slim, Eloquent ORM, MySQL<br />


## 开发

### 数据库
```bash
mysql -u username -p pinkcandy_gallery < pinkcandy_gallery.sql
```

### 后端
配置 `config/config.php`<br />
安装依赖<br />
```bash
composer install
```
启动<br />
```bash
php -S localhost:8082
```

### 前端
配置 `src/code/config.ts`<br />
安装依赖<br />
```bash
npm install
```
启动<br />
```bash
npm run dev
```


## 部署

### 前端
编译<br />
```bash
npm run build
```
将 `dist/` 目录部署到 Web 服务器<br />
以Nginx为例，完成以下配置。<br />
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8082/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 后端
使用 PHP-FPM 或启动内置服务器
