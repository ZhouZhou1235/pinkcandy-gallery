@echo off
chcp 65001 >nul
title 幻想动物画廊开发环境运行

cd backend
start "后端" cmd /k "composer install && php -S localhost:8082"
cd ..

cd frontend
start "前端" cmd /k "npm install && npm run dev"
cd ..

echo "==="
echo "幻想动物画廊开发环境运行"
echo "开发者 小蓝狗周周"
echo "==="
echo "若运行失败，检查环境是否安装，数据库及数据表是否配置完成。"
echo "关掉所有命令行窗口来结束运行"
echo "完毕"

timeout /t 10
