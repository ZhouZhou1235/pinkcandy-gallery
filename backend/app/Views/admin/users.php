<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>幻想动物画廊管理系统 - 用户管理</title>
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
            <h1 class="mb-0 h3">用户管理</h1>
            <div class="d-flex gap-2">
                <a href="/admin/dashboard" class="btn btn-secondary btn-sm">返回控制台</a>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>粉糖账号</th>
                        <th>名称</th>
                        <th>邮箱</th>
                        <th>性别</th>
                        <th>物种</th>
                        <th>注册时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($users as $user): ?>
                        <tr>
                            <td><?php echo $user->username; ?></td>
                            <td><?php echo $user->name; ?></td>
                            <td><?php echo $user->email; ?></td>
                            <td><?php echo $user->sex; ?></td>
                            <td><?php echo $user->species; ?></td>
                            <td><?php echo $user->jointime; ?></td>
                            <td>
                                <a href="/admin/users/delete/<?php echo $user->username; ?>" 
                                   class="btn btn-sm btn-danger" 
                                   onclick="return confirm('确定要删除这个用户吗？');">
                                    删除
                                </a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
