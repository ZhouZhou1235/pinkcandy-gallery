<?php

namespace App\Controllers;

use Illuminate\Database\Capsule\Manager as DB;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Services\AdminService;

class SystemController
{
    private $viewPath;
    private $adminService;

    public function __construct()
    {
        $this->viewPath = __DIR__ . '/../Views/';
        $this->adminService = new AdminService();
    }
    
    public function index(Request $request, Response $response)
    {
        $stats = $this->getStats();
        
        ob_start();
        include $this->viewPath . 'index.php';
        $html = ob_get_clean();
        
        $response->getBody()->write($html);
        return $response->withHeader('Content-Type', 'text/html; charset=utf-8');
    }
    
    private function getStats()
    {
        return [
            'users' => DB::table('user')->count(),
            'artworks' => DB::table('gallery')->count(),
            'tags' => DB::table('tag')->count(),
            'boards' => DB::table('board')->count(),
        ];
    }

    private function isAdminLoggedIn()
    {
        return isset($_SESSION['admin_username']);
    }

    public function loginPage(Request $request, Response $response)
    {
        if ($this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/dashboard')->withStatus(302);
        }
        ob_start();
        include $this->viewPath . 'admin/login.php';
        $html = ob_get_clean();
        $response->getBody()->write($html);
        return $response;
    }

    public function login(Request $request, Response $response)
    {
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

    public function logout(Request $request, Response $response)
    {
        unset($_SESSION['admin_username']);
        session_destroy();
        return $response->withHeader('Location', '/admin/login')->withStatus(302);
    }

    public function dashboard(Request $request, Response $response)
    {
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        ob_start();
        include $this->viewPath . 'admin/dashboard.php';
        $html = ob_get_clean();
        $response->getBody()->write($html);
        return $response;
    }

    public function users(Request $request, Response $response)
    {
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $users = $this->adminService->getAllUsers();
        ob_start();
        include $this->viewPath . 'admin/users.php';
        $html = ob_get_clean();
        $response->getBody()->write($html);
        return $response;
    }

    public function deleteUser(Request $request, Response $response, $args)
    {
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $this->adminService->deleteUser($args['id']);
        return $response->withHeader('Location', '/admin/users')->withStatus(302);
    }

    public function artworks(Request $request, Response $response)
    {
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $artworks = $this->adminService->getAllArtworks();
        ob_start();
        include $this->viewPath . 'admin/artworks.php';
        $html = ob_get_clean();
        $response->getBody()->write($html);
        return $response;
    }

    public function deleteArtwork(Request $request, Response $response, $args)
    {
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $this->adminService->deleteArtwork($args['id']);
        return $response->withHeader('Location', '/admin/artworks')->withStatus(302);
    }

    public function comments(Request $request, Response $response)
    {
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $comments = $this->adminService->getAllComments();
        ob_start();
        include $this->viewPath . 'admin/comments.php';
        $html = ob_get_clean();
        $response->getBody()->write($html);
        return $response;
    }

    public function deleteComment(Request $request, Response $response, $args)
    {
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $this->adminService->deleteComment($args['id']);
        return $response->withHeader('Location', '/admin/comments')->withStatus(302);
    }

    public function resources(Request $request, Response $response)
    {
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        ob_start();
        include $this->viewPath . 'admin/resources.php';
        $html = ob_get_clean();
        $response->getBody()->write($html);
        return $response;
    }

    public function regenerateThumbnails(Request $request, Response $response)
    {
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $count = $this->adminService->regenerateThumbnails();
        $message = "成功重新生成了 $count 张缩略图";
        ob_start();
        include $this->viewPath . 'admin/resources.php';
        $html = ob_get_clean();
        $response->getBody()->write($html);
        return $response;
    }

    public function clearSessions(Request $request, Response $response)
    {
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

    public function settings(Request $request, Response $response)
    {
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

    public function addAdmin(Request $request, Response $response)
    {
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

    public function removeAdmin(Request $request, Response $response, $args)
    {
        if (!$this->isAdminLoggedIn()) {
            return $response->withHeader('Location', '/admin/login')->withStatus(302);
        }
        $this->adminService->removeAdmin($args['username']);
        return $response->withHeader('Location', '/admin/settings')->withStatus(302);
    }
}
