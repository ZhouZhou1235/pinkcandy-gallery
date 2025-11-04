@echo off
chcp 65001 >nul
title 幻想动物画廊开发环境运行

echo "启动后端"
cd back-end
start "后端" cmd /k "npm install && node main.js"
cd ..

echo "启动通讯服务器"
cd pinkcandy-chat
start "通讯服务器" cmd /k "composer install && .\run.bat"
cd ..

echo "启动前端"
cd front-end
start "前端" cmd /k "npm install && npm run dev"
cd ..

echo "执行完毕"

echo "==="
echo "幻想动物画廊开发环境运行"
echo "开发者 小蓝狗周周"
echo "==="
echo "下面是默认访问地址，以实际配置为准。"
echo "若运行失败，检查环境是否安装，数据库是否启动等。"
echo "要关闭服务，关掉所有的命令行窗口即可。"
echo "前端: http://localhost:8080"
echo "后端: http://localhost:8081"
echo "通讯服务器 HTTP: http://localhost:8082"
echo "通讯服务器 WebSocket: http://localhost:8083"
pause >nul
