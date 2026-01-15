@echo off
chcp 65001 >nul
title 幻想动物画廊开发环境运行

echo "启动后端"
cd back-end
start "后端" cmd /k "npm install && node main.js"
cd ..

echo "启动前端"
cd front-end
start "前端" cmd /k "npm install && npm run dev"
cd ..

echo "==="
echo "幻想动物画廊开发环境运行"
echo "开发者 小蓝狗周周"
echo "==="
echo "若运行失败，检查环境是否安装，数据库是否启动等。"
echo "要关闭服务，关掉所有的命令行窗口即可。"
echo "执行完毕"
pause >nul
