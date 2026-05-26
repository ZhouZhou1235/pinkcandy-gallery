<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>幻想动物画廊管理系统 - 设置</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-dark bg-primary mb-4">
        <div class="container">
            <a class="navbar-brand" href="/admin/dashboard">幻想动物画廊管理系统</a>
            <a class="btn btn-outline-light btn-sm" href="/admin/logout">退出登录</a>
        </div>
    </nav>
    
    <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <h1 class="mb-0 h3">设置 - 管理员列表</h1>
            <div class="d-flex gap-2">
                <a href="/admin/dashboard" class="btn btn-secondary btn-sm">返回控制台</a>
            </div>
        </div>
        
        <div class="card mb-4">
            <div class="card-body">
                <form method="POST" action="/admin/settings/add">
                    <div class="mb-3">
                        <label for="username" class="form-label">添加管理员</label>
                        <input type="text" class="form-control" id="username" name="username" placeholder="输入粉糖账号" required>
                    </div>
                    <button type="submit" class="btn btn-primary">添加</button>
                </form>
            </div>
        </div>
        
        <div class="card">
            <div class="card-body">
                <h5 class="card-title mb-3">当前管理员</h5>
                <ul class="list-group">
                    <?php foreach ($admins as $admin): ?>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <?php echo $admin; ?>
                            <a href="/admin/settings/remove/<?php echo urlencode($admin); ?>" 
                               class="btn btn-sm btn-danger" 
                               onclick="return confirm('确定要移除这个管理员吗？');">
                                移除
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>
