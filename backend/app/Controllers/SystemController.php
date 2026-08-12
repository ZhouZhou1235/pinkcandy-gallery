<?php
// 管理系统控制器
namespace App\Controllers;

use Illuminate\Database\Capsule\Manager as DB;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Services\AdminService;

class SystemController{
    private $viewPath;
    private $adminService;

    public function __construct(){
        $this->viewPath = __DIR__ . '/../Views/';
        $this->adminService = new AdminService();
    }

    // 首页
    public function index(Request $request, Response $response){
        $stats = $this->getStats();
        ob_start();
        include $this->viewPath . 'index.php';
        $html = ob_get_clean();
        $response->getBody()->write($html);
        return $response->withHeader('Content-Type', 'text/html; charset=utf-8');
    }

    // 获取统计信息
    private function getStats(){
        return [
            'users' => DB::table('user')->count(),
            'artworks' => DB::table('gallery')->count(),
            'tags' => DB::table('tag')->count(),
            'boards' => DB::table('board')->count(),
        ];
    }

    // 检查管理员登录状态
    private function isAdminLoggedIn(){
        return isset($_SESSION['admin_username']);
    }

    // 登录页面
    public function loginPage(Request $request, Response $response){
        if ($this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/dashboard')->withStatus(302);
        }
        ob_start();
        include $this->viewPath . 'admin/login.php';
        $html = ob_get_clean();
        $response->getBody()->write($html);
        return $response;
    }

    // 管理员登录
    public function login(Request $request, Response $response){
        $data = $request->getParsedBody();
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';
        $user = $this->adminService->login($username, $password);
        if ($user) {
            $_SESSION['admin_username'] = $user->username;
            return $response->withHeader('Location', '/admin/dashboard')->withStatus(302);
        } else {
            ob_start();
            $error = '登录失败，请检查粉糖账号或密码';
            include $this->viewPath . 'admin/login.php';
            $html = ob_get_clean();
            $response->getBody()->write($html);
            return $response;
        }
    }

    // 管理员登出
    public function logout(Request $request, Response $response){
        unset($_SESSION['admin_username']);
        session_destroy();
        return $response->withHeader('Location', '/admin/login')->withStatus(302);
    }

    // 管理后台首页
    public function dashboard(Request $request, Response $response){
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        ob_start();
        include $this->viewPath . 'admin/dashboard.php';
        $html = ob_get_clean();
        $response->getBody()->write($html);
        return $response;
    }

    // 用户管理页面
    public function users(Request $request, Response $response){
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
        $pagination = $this->adminService->getUsersPaginated($page);
        $users = $pagination['users'];
        $currentPage = $pagination['currentPage'];
        $totalPages = $pagination['totalPages'];
        $total = $pagination['total'];
        ob_start();
        include $this->viewPath . 'admin/users.php';
        $html = ob_get_clean();
        $response->getBody()->write($html);
        return $response;
    }

    // 删除用户
    public function deleteUser(Request $request, Response $response, $args){
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $this->adminService->deleteUser($args['id']);
        return $response->withHeader('Location', '/admin/users')->withStatus(302);
    }

    // 作品管理页面
    public function artworks(Request $request, Response $response){
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $message = null;
        if ($request->getMethod() === 'POST') {
            $data = $request->getParsedBody();
            $artworkId = $data['artwork_id'] ?? '';
            $grading = isset($data['grading']) ? (int)$data['grading'] : -1;
            if ($artworkId && $grading >= 0 && $grading <= 2) {
                if ($this->adminService->updateArtworkGrading($artworkId, $grading)) {
                    $message = "作品分级更新成功";
                } else {
                    $message = "作品分级更新失败";
                }
            }
            $audit = isset($data['audit']) ? (int)$data['audit'] : -1;
            if ($artworkId && $audit >= 0 && $audit <= 1) {
                if ($this->adminService->updateArtworkAudit($artworkId, $audit)) {
                    $message = $audit == 1 ? "作品审核通过" : "作品已取消审核";
                } else {
                    $message = "作品审核操作失败";
                }
            }
        }
        $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
        $pagination = $this->adminService->getArtworksPaginated($page);
        $artworks = $pagination['artworks'];
        $currentPage = $pagination['currentPage'];
        $totalPages = $pagination['totalPages'];
        $total = $pagination['total'];
        ob_start();
        include $this->viewPath . 'admin/artworks.php';
        $html = ob_get_clean();
        $response->getBody()->write($html);
        return $response;
    }

    // 重新生成单个缩略图
    public function regenerateSingleThumbnail(Request $request, Response $response, $args){
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $artworkId = $args['id'];
        $artwork = DB::table('gallery')->where('id', $artworkId)->first();
        $success = false;
        if ($artwork) {
            $success = $this->adminService->generateThumbnail($artwork->filename);
        }
        $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
        if ($success) {
            $message = "缩略图重新生成成功";
        } else {
            $message = "缩略图重新生成失败";
        }
        $pagination = $this->adminService->getArtworksPaginated($page);
        $artworks = $pagination['artworks'];
        $currentPage = $pagination['currentPage'];
        $totalPages = $pagination['totalPages'];
        $total = $pagination['total'];
        ob_start();
        include $this->viewPath . 'admin/artworks.php';
        $html = ob_get_clean();
        $response->getBody()->write($html);
        return $response;
    }

    // 删除作品
    public function deleteArtwork(Request $request, Response $response, $args){
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $this->adminService->deleteArtwork($args['id']);
        return $response->withHeader('Location', '/admin/artworks')->withStatus(302);
    }

    // 标签管理页面
    public function tags(Request $request, Response $response){
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $message = null;
        if ($request->getMethod() === 'POST') {
            $data = $request->getParsedBody();
            $tagId = $data['tag_id'] ?? '';
            $tag = $data['tag'] ?? '';
            $type = $data['type'] ?? '';
            $info = isset($data['info']) ? $data['info'] : null;
            if ($tagId && $tag && $type) {
                if ($this->adminService->updateTag($tagId, $tag, $type, $info)) {
                    $message = "标签更新成功";
                } else {
                    $message = "标签更新失败";
                }
            }
        }
        $searchtag = isset($_GET['search']) ? trim($_GET['search']) : '';
        if ($searchtag !== '') {
            $tags = $this->adminService->searchTags($searchtag);
            $total = count($tags);
            $totalPages = 1;
            $currentPage = 1;
        } else {
            $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
            $pagination = $this->adminService->getTagsPaginated($page);
            $tags = $pagination['tags'];
            $currentPage = $pagination['currentPage'];
            $totalPages = $pagination['totalPages'];
            $total = $pagination['total'];
        }
        ob_start();
        include $this->viewPath . 'admin/tags.php';
        $html = ob_get_clean();
        $response->getBody()->write($html);
        return $response;
    }

    // 删除标签
    public function deleteTag(Request $request, Response $response, $args){
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $this->adminService->deleteTag($args['id']);
        return $response->withHeader('Location', '/admin/tags')->withStatus(302);
    }

    // 评论管理页面
    public function comments(Request $request, Response $response){
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
        $pagination = $this->adminService->getCommentsPaginated($page);
        $comments = $pagination['comments'];
        $currentPage = $pagination['currentPage'];
        $totalPages = $pagination['totalPages'];
        $total = $pagination['total'];
        ob_start();
        include $this->viewPath . 'admin/comments.php';
        $html = ob_get_clean();
        $response->getBody()->write($html);
        return $response;
    }

    // 删除评论
    public function deleteComment(Request $request, Response $response, $args){
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $this->adminService->deleteComment($args['id']);
        return $response->withHeader('Location', '/admin/comments')->withStatus(302);
    }

    // 资源管理页面
    public function resources(Request $request, Response $response){
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        ob_start();
        include $this->viewPath . 'admin/resources.php';
        $html = ob_get_clean();
        $response->getBody()->write($html);
        return $response;
    }

    // 清理过期Session
    public function clearSessions(Request $request, Response $response){
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $count = $this->adminService->clearSessions();
        $message = "成功清理了 $count 个过期Session";
        ob_start();
        include $this->viewPath . 'admin/resources.php';
        $html = ob_get_clean();
        $response->getBody()->write($html);
        return $response;
    }

    // 设置页面
    public function settings(Request $request, Response $response){
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $admins = $this->adminService->getAllAdmins();
        ob_start();
        include $this->viewPath . 'admin/settings.php';
        $html = ob_get_clean();
        $response->getBody()->write($html);
        return $response;
    }

    // 添加管理员
    public function addAdmin(Request $request, Response $response){
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $data = $request->getParsedBody();
        $username = $data['username'] ?? '';
        if ($username) {
            $this->adminService->addAdmin($username);
        }
        return $response->withHeader('Location', '/admin/settings')->withStatus(302);
    }

    // 移除管理员
    public function removeAdmin(Request $request, Response $response, $args){
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $this->adminService->removeAdmin($args['username']);
        return $response->withHeader('Location', '/admin/settings')->withStatus(302);
    }
}
