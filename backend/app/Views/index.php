<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>幻想动物画廊管理系统</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container py-5">
        <h1 class="mb-4">幻想动物画廊管理系统</h1>
        
        <div class="text-center mb-4">
            <a href="/admin/login" class="btn w-100 btn-outline-primary">管理员</a>
        </div>

        <div class="row">
            <div class="col-md-3 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">用户</h5>
                        <p class="card-text display-4"><?php echo $stats['users']; ?></p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">作品</h5>
                        <p class="card-text display-4"><?php echo $stats['artworks']; ?></p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">标签</h5>
                        <p class="card-text display-4"><?php echo $stats['tags']; ?></p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">留言</h5>
                        <p class="card-text display-4"><?php echo $stats['boards']; ?></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
