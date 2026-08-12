<?php
// 标签类型数字转颜色值
function tagtypeColor($type){
    switch ((int)$type) {
        case 1: return 'gray';
        case 2: return 'gold';
        case 3: return 'dodgerblue';
        case 4: return 'forestgreen';
        case 5: return 'brown';
        default: return '';
    }
}

// 标签类型数字转文字
function tagtypeName($type){
    switch ((int)$type) {
        case 1: return '描述';
        case 2: return '作者';
        case 3: return '系列';
        case 4: return '角色';
        case 5: return '兽种';
        default: return '未知';
    }
}

$searchtag = isset($_GET['search']) ? trim($_GET['search']) : '';
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>幻想动物画廊管理系统 - 标签管理</title>
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
            <h1 class="mb-0 h3">标签管理</h1>
            <div class="d-flex gap-2">
                <a href="/admin/dashboard" class="btn btn-secondary btn-sm">返回控制台</a>
            </div>
        </div>
        <?php if (isset($message)): ?>
            <div class="alert alert-info"><?php echo $message; ?></div>
        <?php endif; ?>

        <form method="GET" action="/admin/tags" class="mb-3">
            <div class="input-group">
                <input type="text" name="search" class="form-control" placeholder="输入标签关键字搜索" value="<?php echo htmlspecialchars($searchtag); ?>">
                <?php if ($searchtag !== ''): ?>
                    <a href="/admin/tags" class="btn btn-outline-secondary">清除搜索</a>
                <?php endif; ?>
                <button type="submit" class="btn btn-primary">搜索</button>
            </div>
        </form>

        <p class="text-muted mb-3">
            <?php if ($searchtag !== ''): ?>
                搜索 "<?php echo htmlspecialchars($searchtag); ?>" 共找到 <?php echo $total; ?> 个标签
            <?php else: ?>
                共 <?php echo $total; ?> 个标签，第 <?php echo $currentPage; ?> / <?php echo $totalPages; ?> 页
            <?php endif; ?>
        </p>

        <div class="table-responsive">
            <table class="table table-striped align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>标签</th>
                        <th>类型</th>
                        <th>使用数</th>
                        <th>描述</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($tags)): ?>
                        <tr>
                            <td colspan="6" class="text-center text-muted">暂无标签</td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($tags as $tag): ?>
                            <?php
                                $color = tagtypeColor($tag['type']);
                                $typeName = tagtypeName($tag['type']);
                                $editId = 'edit-form-' . htmlspecialchars($tag['id']);
                            ?>
                            <tr>
                                <td><?php echo htmlspecialchars($tag['id']); ?></td>
                                <td>
                                    <span style="color: <?php echo $color; ?>; font-weight: bold;">
                                        <?php echo htmlspecialchars($tag['tag']); ?>
                                    </span>
                                </td>
                                <td>
                                    <span class="badge" style="background-color: <?php echo $color; ?>; color: white;"><?php echo $typeName; ?></span>
                                </td>
                                <td><?php echo (int)$tag['usenum']; ?></td>
                                <td><?php echo htmlspecialchars($tag['info'] ?? '-'); ?></td>
                                <td>
                                    <div class="d-flex gap-1">
                                        <button type="button" class="btn btn-sm btn-outline-warning" onclick="document.getElementById('<?php echo $editId; ?>').classList.toggle('d-none')">修改</button>
                                        <a href="/admin/tags/delete/<?php echo urlencode($tag['id']); ?>"
                                           class="btn btn-sm btn-outline-danger"
                                           onclick="return confirm('确定要删除标签 <?php echo htmlspecialchars($tag['tag']); ?> 吗？所有作品上该标签的标记都会被移除。');">
                                            删除
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <tr id="<?php echo $editId; ?>" class="d-none">
                                <td colspan="6">
                                    <form method="POST" action="/admin/tags">
                                        <input type="hidden" name="tag_id" value="<?php echo htmlspecialchars($tag['id']); ?>">
                                        <div class="row g-2 align-items-end">
                                            <div class="col-md-3">
                                                <label class="form-label">标签名</label>
                                                <input type="text" name="tag" class="form-control form-control-sm" value="<?php echo htmlspecialchars($tag['tag']); ?>" required>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="form-label">类型</label>
                                                <select name="type" class="form-select form-select-sm">
                                                    <option value="1" <?php echo (int)$tag['type'] === 1 ? 'selected' : ''; ?>>描述</option>
                                                    <option value="2" <?php echo (int)$tag['type'] === 2 ? 'selected' : ''; ?>>作者</option>
                                                    <option value="3" <?php echo (int)$tag['type'] === 3 ? 'selected' : ''; ?>>系列</option>
                                                    <option value="4" <?php echo (int)$tag['type'] === 4 ? 'selected' : ''; ?>>角色</option>
                                                    <option value="5" <?php echo (int)$tag['type'] === 5 ? 'selected' : ''; ?>>兽种</option>
                                                </select>
                                            </div>
                                            <div class="col-md-5">
                                                <label class="form-label">描述</label>
                                                <input type="text" name="info" class="form-control form-control-sm" value="<?php echo htmlspecialchars($tag['info'] ?? ''); ?>">
                                            </div>
                                            <div class="col-md-2">
                                                <button type="submit" class="btn btn-sm btn-warning w-100">保存</button>
                                            </div>
                                        </div>
                                    </form>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>

        <?php if ($searchtag === '' && $totalPages > 1): ?>
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
