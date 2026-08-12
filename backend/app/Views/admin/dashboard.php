<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>幻想动物画廊管理系统 - 控制台</title>
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
        <h1 class="mb-4">欢迎 管理员</h1>
        <div class="row">
            <div class="col-md-3 mb-3">
                <a href="/admin/users" class="text-decoration-none">
                    <div class="card text-center">
                        <div class="card-body">
                            <h5>用户管理</h5>
                            <p class="card-text">管理平台用户</p>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-md-3 mb-3">
                <a href="/admin/artworks" class="text-decoration-none">
                    <div class="card text-center">
                        <div class="card-body">
                            <h5>作品管理</h5>
                            <p class="card-text">管理上传的作品</p>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-md-3 mb-3">
                <a href="/admin/comments" class="text-decoration-none">
                    <div class="card text-center">
                        <div class="card-body">
                            <h5>评论管理</h5>
                            <p class="card-text">管理用户评论</p>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-md-3 mb-3">
                <a href="/admin/tags" class="text-decoration-none">
                    <div class="card text-center">
                        <div class="card-body">
                            <h5>标签管理</h5>
                            <p class="card-text">管理作品标签</p>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-md-3 mb-3">
                <a href="/admin/resources" class="text-decoration-none">
                    <div class="card text-center">
                        <div class="card-body">
                            <h5>资源管理</h5>
                            <p class="card-text">管理系统资源</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</body>
</html>
