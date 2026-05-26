<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>幻想动物画廊管理系统 - 评论管理</title>
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
            <h1 class="mb-0 h3">评论管理</h1>
            <div class="d-flex gap-2">
                <a href="/admin/dashboard" class="btn btn-secondary btn-sm">返回控制台</a>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>作品</th>
                        <th>评论者</th>
                        <th>内容</th>
                        <th>时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($comments as $comment): ?>
                        <tr>
                            <td><?php echo $comment->id; ?></td>
                            <td><?php echo $comment->artwork_title; ?></td>
                            <td><?php echo $comment->username; ?> (<?php echo $comment->user_name; ?>)</td>
                            <td><?php echo mb_substr($comment->content, 0, 50); ?>...</td>
                            <td><?php echo $comment->time; ?></td>
                            <td>
                                <a href="/admin/comments/delete/<?php echo $comment->id; ?>" 
                                   class="btn btn-sm btn-danger" 
                                   onclick="return confirm('确定要删除这条评论吗？');">
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
