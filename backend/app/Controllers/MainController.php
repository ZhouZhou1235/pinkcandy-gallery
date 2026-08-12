<?php
// 主业务控制器
namespace App\Controllers;

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Services\MainService;

class MainController{
    private $service;

    public function __construct(MainService $service){
        $this->service = $service;
    }

    // 获取用户信息
    public function getUser(Request $request, Response $response, array $args){
        $username = $args['username'];
        $user = $this->service->getUser($username);
        $response->getBody()->write(json_encode($user));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取当前会话用户
    public function getSessionUser(Request $request, Response $response){
        if (!isset($_SESSION['username'])) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $user = $this->service->getSessionUser($_SESSION['username']);
        $response->getBody()->write(json_encode($user));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取作品列表
    public function getArtworks(Request $request, Response $response){
        $params = $request->getQueryParams();
        $begin = isset($params['begin']) ? (int)$params['begin'] : 0;
        $num = isset($params['num']) ? (int)$params['num'] : 50;
        $username = isset($params['username']) ? $params['username'] : null;
        $viewerUsername = $_SESSION['username'] ?? null;
        $includeUnaudited = false;
        if (isset($params['includeUnaudited']) && $params['includeUnaudited'] == 1 && $viewerUsername && $viewerUsername === $username) {
            $includeUnaudited = true;
        }
        $artworks = $this->service->getArtworks($begin, $num, $username, $viewerUsername, $includeUnaudited);
        $response->getBody()->write(json_encode($artworks));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取标签列表
    public function getTags(Request $request, Response $response){
        $params = $request->getQueryParams();
        $begin = isset($params['begin']) ? (int)$params['begin'] : 0;
        $num = isset($params['num']) ? (int)$params['num'] : 50;
        $tags = $this->service->getTags($begin, $num);
        $response->getBody()->write(json_encode($tags));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取留言板消息
    public function getBoardMessages(Request $request, Response $response){
        $params = $request->getQueryParams();
        $begin = isset($params['begin']) ? (int)$params['begin'] : 0;
        $num = isset($params['num']) ? (int)$params['num'] : 50;
        $messages = $this->service->getBoardMessages($begin, $num);
        $response->getBody()->write(json_encode($messages));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取数据库记录数
    public function getDBRecordCount(Request $request, Response $response){
        $params = $request->getQueryParams();
        $table = isset($params['table']) ? $params['table'] : '';
        $count = $this->service->getDBRecordCount($table);
        $response->getBody()->write(json_encode($count));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取单个作品
    public function getArtwork(Request $request, Response $response){
        $params = $request->getQueryParams();
        $id = isset($params['id']) ? $params['id'] : '';
        $viewerUsername = $_SESSION['username'] ?? null;
        $artwork = $this->service->getArtwork($id, $viewerUsername);
        $response->getBody()->write(json_encode($artwork ?: 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取作品的所有标签
    public function getTagsArtwork(Request $request, Response $response, array $args){
        $id = $args['id'];
        $tags = $this->service->getTagsArtwork($id);
        $response->getBody()->write(json_encode($tags));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取作品评论
    public function getArtworkComments(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        $params = $request->getQueryParams();
        $id = isset($params['id']) ? $params['id'] : '';
        $begin = isset($params['begin']) ? (int)$params['begin'] : 0;
        $num = isset($params['num']) ? (int)$params['num'] : 50;
        if (!$id) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $comments = $this->service->getArtworkComments($id, $begin, $num, $username);
        $response->getBody()->write(json_encode($comments));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取作品评论数
    public function getCommentGalleryCount(Request $request, Response $response){
        $params = $request->getQueryParams();
        $id = isset($params['id']) ? $params['id'] : '';
        $count = $this->service->getCommentGalleryCount($id);
        $response->getBody()->write(json_encode($count));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取作品爪印区域信息
    public function getArtworkPawAreaInfo(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        $params = $request->getQueryParams();
        $id = isset($params['id']) ? $params['id'] : '';
        if (!$id) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $info = $this->service->getArtworkPawAreaInfo($id, $username);
        $response->getBody()->write(json_encode($info));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取用户信息统计
    public function getUserInfoCount(Request $request, Response $response){
        $params = $request->getQueryParams();
        $username = isset($params['username']) ? $params['username'] : '';
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $auditedOnly = true;
        $viewerUsername = $_SESSION['username'] ?? null;
        if (isset($params['audited_only']) && $params['audited_only'] == 0 && $viewerUsername && $viewerUsername === $username) {
            $auditedOnly = false;
        }
        $info = $this->service->getUserInfoCount($username, $auditedOnly);
        $response->getBody()->write(json_encode($info));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取用户关注列表
    public function getUserWatch(Request $request, Response $response){
        $params = $request->getQueryParams();
        $username = isset($params['username']) ? $params['username'] : '';
        $begin = isset($params['begin']) ? (int)$params['begin'] : 0;
        $num = isset($params['num']) ? (int)$params['num'] : 50;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $watch = $this->service->getUserWatch($username, $begin, $num);
        $response->getBody()->write(json_encode($watch));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取用户收藏作品
    public function getStarArtworks(Request $request, Response $response){
        $username = isset($request->getQueryParams()['username']) ? $request->getQueryParams()['username'] : $_SESSION['username'] ?? null;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $params = $request->getQueryParams();
        $begin = isset($params['begin']) ? (int)$params['begin'] : 0;
        $num = isset($params['num']) ? (int)$params['num'] : 50;
        $artworks = $this->service->getStarArtworks($begin, $num, $username);
        $response->getBody()->write(json_encode($artworks));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取用户收藏统计
    public function getUserStarInfoCount(Request $request, Response $response){
        $username = isset($request->getQueryParams()['username']) ? $request->getQueryParams()['username'] : $_SESSION['username'] ?? null;
        $info = $this->service->getUserStarInfoCount($username);
        $response->getBody()->write(json_encode($info));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 搜索标签
    public function searchTags(Request $request, Response $response){
        $params = $request->getQueryParams();
        $tagtext = isset($params['tagtext']) ? $params['tagtext'] : '';
        $tags = $this->service->searchTags($tagtext);
        $response->getBody()->write(json_encode($tags));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 搜索粉糖内容
    public function searchPinkCandy(Request $request, Response $response){
        $params = $request->getQueryParams();
        $searchtext = isset($params['searchtext']) ? $params['searchtext'] : '';
        $viewerUsername = $_SESSION['username'] ?? null;
        $result = $this->service->searchPinkCandy($searchtext, $viewerUsername);
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取可注册的用户名
    public function getRegisterableUsername(Request $request, Response $response){
        $username = $this->service->getRegisterableUsername();
        $response->getBody()->write(json_encode($username ?: 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取通知数量
    public function getNoticenum(Request $request, Response $response){
        $params = $request->getQueryParams();
        $username = isset($params['username']) ? $params['username'] : '';
        $count = $this->service->getNoticenum($username);
        $response->getBody()->write(json_encode($count));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取用户通知-爪印作品
    public function getUserNoticePawArtwork(Request $request, Response $response){
        $params = $request->getQueryParams();
        $username = isset($params['username']) ? $params['username'] : '';
        $result = $this->service->getUserNoticePawArtwork($username);
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取用户通知-文字回复
    public function getUserNoticeTextEcho(Request $request, Response $response){
        $params = $request->getQueryParams();
        $username = isset($params['username']) ? $params['username'] : '';
        $result = $this->service->getUserNoticeTextEcho($username);
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取用户通知-新粉丝
    public function getUserNoticeWatcher(Request $request, Response $response){
        $params = $request->getQueryParams();
        $username = isset($params['username']) ? $params['username'] : '';
        $result = $this->service->getUserNoticeWatcher($username);
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 标记通知已读
    public function noticeFinishRead(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $result = $this->service->noticeFinishRead($username);
        $response->getBody()->write(json_encode($result ? 1 : 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 标记通知未读
    public function noticeNotRead(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $result = $this->service->noticeNotRead($username);
        $response->getBody()->write(json_encode($result ? 1 : 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取动态数量
    public function getTrendnum(Request $request, Response $response){
        $params = $request->getQueryParams();
        $username = isset($params['username']) ? $params['username'] : '';
        $count = $this->service->getTrendnum($username);
        $response->getBody()->write(json_encode($count));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取用户动态-关注的用户
    public function getUserTrendUsers(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $result = $this->service->getUserTrendUsers($username);
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取用户动态-作品
    public function getUserTrendArtworks(Request $request, Response $response){
        $myUsername = $_SESSION['username'] ?? null;
        $params = $request->getQueryParams();
        $username = isset($params['username']) ? $params['username'] : '';
        if (!$myUsername || !$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $result = $this->service->getUserTrendArtworks($username, $myUsername);
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 标记动态已读
    public function trendFinishRead(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $result = $this->service->trendFinishRead($username);
        $response->getBody()->write(json_encode($result ? 1 : 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 标记动态未读
    public function trendNotRead(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $result = $this->service->trendNotRead($username);
        $response->getBody()->write(json_encode($result ? 1 : 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 检查登录状态
    public function checkLogin(Request $request, Response $response){
        $response->getBody()->write(json_encode(isset($_SESSION['username']) ? 1 : 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取会话ID
    public function getSessionId(Request $request, Response $response){
        $response->getBody()->write(json_encode(isset($_SESSION['username']) ? session_id() : 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 用户登录
    public function login(Request $request, Response $response){
        $data = json_decode($request->getBody()->getContents(), true);
        if (!isset($data['username']) || !isset($data['password'])) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $user = $this->service->login($data['username'], $data['password']);
        if ($user) {
            $_SESSION['username'] = $user->username;
            $response->getBody()->write(json_encode(1));
        } else {
            $response->getBody()->write(json_encode(0));
        }
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 用户登出
    public function logout(Request $request, Response $response){
        session_destroy();
        $response->getBody()->write(json_encode(1));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 上传作品
    public function uploadArtwork(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $data = $request->getParsedBody();
        $files = $request->getUploadedFiles();
        $title = $data['title'] ?? '';
        $info = $data['info'] ?? '';
        $tags = isset($data['tags']) ? (json_decode($data['tags'], true) ?: []) : [];
        $grading = isset($data['grading']) ? (int)$data['grading'] : 0;
        if ($grading < 0 || $grading > 2) {
            $grading = 0;
        }
        $file = $files['file'] ?? null;
        if (!$title || !$file) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $result = $this->service->uploadArtwork($username, $title, $info, $tags, $file, $grading);
        $response->getBody()->write(json_encode($result ? 1 : 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取注册验证码
    public function getRegisterCode(Request $request, Response $response){
        $data = json_decode($request->getBody()->getContents(), true);
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';
        $name = $data['name'] ?? '';
        $email = $data['email'] ?? '';
        $code = mt_rand(100000, 999999);
        $content = "<h1>注册粉糖账号 {$username}</h1><p>验证码：{$code}</p>";
        if ($this->service->sendMail($email, $content)) {
            $_SESSION['registerForm'] = [
                'username' => $username,
                'password' => $password,
                'name' => $name,
                'email' => $email,
                'code' => $code,
            ];
            $_SESSION['registerCodeExpire'] = time() + 300;
            $response->getBody()->write(json_encode(1));
        } else {
            $response->getBody()->write(json_encode(0));
        }
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 用户注册
    public function register(Request $request, Response $response){
        $data = json_decode($request->getBody()->getContents(), true);
        $sessionForm = $_SESSION['registerForm'] ?? [];
        if (empty($sessionForm) ||
            $data['username'] !== $sessionForm['username'] ||
            $data['password'] !== $sessionForm['password'] ||
            $data['name'] !== $sessionForm['name'] ||
            $data['email'] !== $sessionForm['email'] ||
            $data['code'] != $sessionForm['code']) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        if ($this->service->register($data['username'], $data['password'], $data['name'], $data['email'])) {
            $_SESSION['username'] = $data['username'];
            unset($_SESSION['registerForm']);
            $response->getBody()->write(json_encode(1));
        } else {
            $response->getBody()->write(json_encode(0));
        }
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取重置密码验证码
    public function getResetPasswordCode(Request $request, Response $response){
        $data = json_decode($request->getBody()->getContents(), true);
        $email = $data['email'] ?? '';
        $code = mt_rand(100000, 999999);
        $content = "<h1>重设粉糖账号密码</h1><p>验证码：{$code}</p>";
        if ($this->service->sendMail($email, $content)) {
            $_SESSION['resetPasswordEmail'] = $email;
            $_SESSION['resetPasswordCode'] = $code;
            $_SESSION['resetPasswordExpire'] = time() + 300;
            $response->getBody()->write(json_encode(1));
        } else {
            $response->getBody()->write(json_encode(0));
        }
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 重置密码
    public function resetPassword(Request $request, Response $response){
        $data = json_decode($request->getBody()->getContents(), true);
        $email = $data['email'] ?? '';
        $code = $data['code'] ?? '';
        $password = $data['password'] ?? '';
        if ($email !== ($_SESSION['resetPasswordEmail'] ?? '') ||
            $code != ($_SESSION['resetPasswordCode'] ?? '')) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        if ($this->service->resetPassword($email, $password)) {
            session_destroy();
            $response->getBody()->write(json_encode(1));
        } else {
            $response->getBody()->write(json_encode(0));
        }
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 添加留言板消息
    public function addBoardMessage(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $data = json_decode($request->getBody()->getContents(), true);
        $content = $data['content'] ?? '';
        if (!$content) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $result = $this->service->addBoardMessage($username, $content);
        $response->getBody()->write(json_encode($result ? 1 : 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 编辑用户信息
    public function editUser(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $data = json_decode($request->getBody()->getContents(), true);
        $name = $data['name'] ?? '';
        $info = $data['info'] ?? '';
        $sex = $data['sex'] ?? '';
        $species = $data['species'] ?? '';
        if (!$name) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $result = $this->service->editUser($username, $name, $info, $sex, $species);
        $response->getBody()->write(json_encode($result ? 1 : 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 编辑用户头像/背景
    public function editUserImage(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $files = $request->getUploadedFiles();
        $headimage = $files['headimage'] ?? null;
        $backimage = $files['backimage'] ?? null;
        if (!$headimage && !$backimage) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $result = $this->service->editUserImage($username, $headimage, $backimage);
        $response->getBody()->write(json_encode($result ? 1 : 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 获取修改用户关键信息验证码
    public function getEditUserImportantCode(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $data = json_decode($request->getBody()->getContents(), true);
        $email = $data['email'] ?? '';
        if (!$email) {
            $user = $this->service->getUser($username);
            $email = $user->email ?? '';
        }
        $code = mt_rand(100000, 999999);
        $content = "<h1>修改粉糖账号 {$username} 的关键内容</h1><p>验证码：{$code}</p>";
        if ($this->service->sendMail($email, $content)) {
            $_SESSION['editUserImportantCode'] = $code;
            $_SESSION['editUserImportantExpire'] = time() + 300;
            $response->getBody()->write(json_encode(1));
        } else {
            $response->getBody()->write(json_encode(0));
        }
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 修改用户关键信息
    public function editUserImportant(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $data = json_decode($request->getBody()->getContents(), true);
        $password = $data['password'] ?? '';
        $email = $data['email'] ?? '';
        $code = $data['code'] ?? '';
        if ($code != ($_SESSION['editUserImportantCode'] ?? '')) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $this->service->editUserImportant($username, $password ?: null, $email ?: null);
        session_destroy();
        $response->getBody()->write(json_encode(1));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 清除用户头像/背景
    public function clearUserImage(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $result = $this->service->clearUserImage($username);
        $response->getBody()->write(json_encode($result ? 1 : 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 发送作品评论
    public function sendCommentArtwork(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $data = json_decode($request->getBody()->getContents(), true);
        $id = $data['id'] ?? '';
        $content = $data['content'] ?? '';
        if (!$id || !$content) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $result = $this->service->sendCommentArtwork($id, $username, $content);
        $response->getBody()->write(json_encode($result ? 1 : 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 爪印作品/评论
    public function pawArtworkMedia(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $data = json_decode($request->getBody()->getContents(), true);
        $id = $data['id'] ?? '';
        $commentid = $data['commentid'] ?? null;
        if (!$id) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $result = $this->service->pawArtworkMedia($username, $id, $commentid);
        $response->getBody()->write(json_encode($result ? 1 : 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 收藏/取消收藏作品
    public function starArtworkMedia(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $data = json_decode($request->getBody()->getContents(), true);
        $id = $data['id'] ?? '';
        if (!$id) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $result = $this->service->starArtworkMedia($username, $id);
        $response->getBody()->write(json_encode($result ? 1 : 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 检查是否已关注
    public function haveWatch(Request $request, Response $response){
        $watcher = $_SESSION['username'] ?? null;
        if (!$watcher) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $data = json_decode($request->getBody()->getContents(), true);
        $username = $data['towatch'] ?? '';
        $result = $this->service->haveWatch($watcher, $username);
        $response->getBody()->write(json_encode($result ? 1 : 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 关注/取消关注用户
    public function watchUser(Request $request, Response $response){
        $watcher = $_SESSION['username'] ?? null;
        if (!$watcher) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $data = json_decode($request->getBody()->getContents(), true);
        $username = $data['towatch'] ?? '';
        if ($watcher === $username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $result = $this->service->watchUser($watcher, $username);
        $response->getBody()->write(json_encode($result ? 1 : 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 编辑作品
    public function editArtwork(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $data = json_decode($request->getBody()->getContents(), true);
        $id = $data['id'] ?? '';
        $title = $data['title'] ?? '';
        $info = $data['info'] ?? '';
        $tags = isset($data['tags']) ? (json_decode($data['tags'], true) ?: []) : [];
        $grading = isset($data['grading']) ? (int)$data['grading'] : null;
        if ($grading !== null && ($grading < 0 || $grading > 2)) {
            $grading = 0;
        }
        if (!$id || !$title) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $result = $this->service->editArtwork($id, $title, $info, $tags, $username, $grading);
        $response->getBody()->write(json_encode($result ? 1 : 0));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // 删除作品
    public function deleteArtwork(Request $request, Response $response){
        $username = $_SESSION['username'] ?? null;
        if (!$username) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $data = json_decode($request->getBody()->getContents(), true);
        $id = $data['id'] ?? '';
        if (!$id) {
            $response->getBody()->write(json_encode(0));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $result = $this->service->deleteArtwork($id, $username);
        $response->getBody()->write(json_encode($result ? 1 : 0));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
