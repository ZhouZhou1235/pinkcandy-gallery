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
            <table class="table table-striped align-middle">
                <thead>
                    <tr>
                        <th>缩略图</th>
                        <th>ID</th>
                        <th>标题</th>
                        <th>作者</th>
                        <th>分级</th>
                        <th>审核</th>
                        <th>文件名</th>
                        <th>上传时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($artworks as $artwork): ?>
                        <?php
                            $grading = isset($artwork->grading) ? (int)$artwork->grading : 0;
                            $gradingBadge = '';
                            switch ($grading) {
                                case 0:
                                    $gradingBadge = '<span class="badge bg-success">普遍级</span>';
                                    break;
                                case 1:
                                    $gradingBadge = '<span class="badge bg-warning text-dark">辅导级</span>';
                                    break;
                                case 2:
                                    $gradingBadge = '<span class="badge bg-danger">限制级</span>';
                                    break;
                            }
                            $audit = isset($artwork->audit) ? (int)$artwork->audit : 0;
                            $auditBadge = $audit === 1
                                ? '<span class="badge bg-success">已审核</span>'
                                : '<span class="badge bg-warning text-dark">未审核</span>';
                        ?>
                        <tr>
                            <td>
                                <img src="/files/GalleryPreview/<?php echo $artwork->filename; ?>" alt="缩略图" style="width: 80px; height: auto; object-fit: cover; border-radius: 4px;">
                            </td>
                            <td><?php echo $artwork->id; ?></td>
                            <td><?php echo htmlspecialchars($artwork->title); ?></td>
                            <td><?php echo htmlspecialchars($artwork->username); ?> (<?php echo htmlspecialchars($artwork->user_name); ?>)</td>
                            <td>
                                <div class="d-flex flex-column gap-1">
                                    <?php echo $gradingBadge; ?>
                                    <form method="POST" action="/admin/artworks" class="d-inline-flex align-items-center gap-1">
                                        <input type="hidden" name="artwork_id" value="<?php echo $artwork->id; ?>">
                                        <select name="grading" class="form-select form-select-sm" style="width: auto;">
                                            <option value="0" <?php echo $grading === 0 ? 'selected' : ''; ?>>普遍</option>
                                            <option value="1" <?php echo $grading === 1 ? 'selected' : ''; ?>>辅导</option>
                                            <option value="2" <?php echo $grading === 2 ? 'selected' : ''; ?>>限制</option>
                                        </select>
                                        <input type="hidden" name="page" value="<?php echo $currentPage; ?>">
                                        <button type="submit" class="btn btn-sm btn-outline-primary">改</button>
                                    </form>
                                </div>
                            </td>
                            <td>
                                <div class="d-flex flex-column gap-1">
                                    <?php echo $auditBadge; ?>
                                    <?php if ($audit === 1): ?>
                                        <form method="POST" action="/admin/artworks" class="d-inline">
                                            <input type="hidden" name="artwork_id" value="<?php echo $artwork->id; ?>">
                                            <input type="hidden" name="audit" value="0">
                                            <input type="hidden" name="page" value="<?php echo $currentPage; ?>">
                                            <button type="submit" class="btn btn-sm btn-outline-secondary">取消审核</button>
                                        </form>
                                    <?php else: ?>
                                        <form method="POST" action="/admin/artworks" class="d-inline">
                                            <input type="hidden" name="artwork_id" value="<?php echo $artwork->id; ?>">
                                            <input type="hidden" name="audit" value="1">
                                            <input type="hidden" name="page" value="<?php echo $currentPage; ?>">
                                            <button type="submit" class="btn btn-sm btn-outline-success">通过审核</button>
                                        </form>
                                    <?php endif; ?>
                                </div>
                            </td>
                            <td><?php echo htmlspecialchars($artwork->filename); ?></td>
                            <td><?php echo $artwork->time; ?></td>
                            <td>
                                <div class="d-flex flex-column gap-2">
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
