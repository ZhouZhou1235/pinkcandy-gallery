<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>幻想动物画廊管理系统 - 作品管理</title>
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
            <h1 class="mb-0 h3">作品管理</h1>
            <div class="d-flex gap-2">
                <a href="/admin/dashboard" class="btn btn-secondary btn-sm">返回控制台</a>
            </div>
        </div>
        <?php if (isset($message)): ?>
            <div class="alert alert-info"><?php echo $message; ?></div>
        <?php endif; ?>
        <p class="text-muted mb-3">共 <?php echo $total; ?> 个作品，第 <?php echo $currentPage; ?> / <?php echo $totalPages; ?> 页</p>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>缩略图</th>
                        <th>ID</th>
                        <th>标题</th>
                        <th>作者</th>
                        <th>文件名</th>
                        <th>上传时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($artworks as $artwork): ?>
                        <tr>
                            <td>
                                <img src="/files/GalleryPreview/<?php echo $artwork->filename; ?>" alt="缩略图" style="width: 80px; height: auto; object-fit: cover; border-radius: 4px;">
                            </td>
                            <td><?php echo $artwork->id; ?></td>
                            <td><?php echo $artwork->title; ?></td>
                            <td><?php echo $artwork->username; ?> (<?php echo $artwork->user_name; ?>)</td>
                            <td><?php echo $artwork->filename; ?></td>
                            <td><?php echo $artwork->time; ?></td>
                            <td>
                                <div class="d-flex gap-2">
                                    <a href="/admin/artworks/regenerate-thumbnail/<?php echo $artwork->id; ?>?page=<?php echo $currentPage; ?>" 
                                       class="btn btn-sm btn-primary">
                                        重新生成缩略图
                                    </a>
                                    <a href="/admin/artworks/delete/<?php echo $artwork->id; ?>" 
                                       class="btn btn-sm btn-danger" 
                                       onclick="return confirm('确定要删除这个作品吗？');">
                                        删除
                                    </a>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php if ($totalPages > 1): ?>
            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center">
                    <li class="page-item <?php echo $currentPage <= 1 ? 'disabled' : ''; ?>">
                        <a class="page-link" href="?page=<?php echo $currentPage - 1; ?>">上一页</a>
                    </li>
                    <?php for ($i = 1; $i <= $totalPages; $i++): ?>
                        <li class="page-item <?php echo $i == $currentPage ? 'active' : ''; ?>">
                            <a class="page-link" href="?page=<?php echo $i; ?>"><?php echo $i; ?></a>
                        </li>
                    <?php endfor; ?>
                    <li class="page-item <?php echo $currentPage >= $totalPages ? 'disabled' : ''; ?>">
                        <a class="page-link" href="?page=<?php echo $currentPage + 1; ?>">下一页</a>
                    </li>
                </ul>
            </nav>
        <?php endif; ?>
    </div>
</body>
</html>
