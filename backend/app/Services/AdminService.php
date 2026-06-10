<?php
// 管理系统服务
namespace App\Services;

use Illuminate\Database\Capsule\Manager as DB;

class AdminService{
    private $adminsFile;

    public function __construct(){
        $this->adminsFile = dirname(__DIR__, 2) . '/storage/admins.json';
        if (!file_exists($this->adminsFile)) {
            file_put_contents($this->adminsFile, json_encode(['admins' => []], JSON_UNESCAPED_UNICODE));
        }
    }

    // 读取管理员数据
    private function getAdminsData(){
        return json_decode(file_get_contents($this->adminsFile), true);
    }

    // 保存管理员数据
    private function saveAdminsData($data){
        file_put_contents($this->adminsFile, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    }

    // 检查是否为管理员
    public function isAdmin($username){
        $data = $this->getAdminsData();
        return in_array($username, $data['admins']);
    }

    // 添加管理员
    public function addAdmin($username){
        $data = $this->getAdminsData();
        if (!in_array($username, $data['admins'])) {
            $data['admins'][] = $username;
            $this->saveAdminsData($data);
        }
    }

    // 移除管理员
    public function removeAdmin($username){
        $data = $this->getAdminsData();
        $index = array_search($username, $data['admins']);
        if ($index !== false) {
            array_splice($data['admins'], $index, 1);
            $this->saveAdminsData($data);
        }
    }

    // 获取所有管理员
    public function getAllAdmins(){
        $data = $this->getAdminsData();
        return $data['admins'];
    }

    // 管理员登录验证
    public function login($username, $password){
        $user = DB::table('user')->where('username', $username)->first();
        if (!$user) {
            $user = DB::table('user')->where('email', $username)->first();
        }
        if ($user) {
            if (password_verify($password, $user->password)) {
                if ($this->isAdmin($user->username)) {
                    return $user;
                }
            }
        }
        return false;
    }

    // 获取所有用户
    public function getAllUsers(){
        return DB::table('user')
            ->select('username', 'name', 'email', 'headimage', 'sex', 'species', 'jointime')
            ->orderBy('jointime', 'desc')
            ->get();
    }

    // 获取所有作品
    public function getAllArtworks(){
        return DB::table('gallery as g')
            ->join('user as u', 'g.username', '=', 'u.username')
            ->select('g.id', 'g.username', 'g.title', 'g.filename', 'g.time', 'u.name as user_name')
            ->orderBy('g.time', 'desc')
            ->get();
    }

    // 获取所有评论
    public function getAllComments(){
        return DB::table('gallery_comment as c')
            ->join('gallery as g', 'c.galleryid', '=', 'g.id')
            ->join('user as u', 'c.username', '=', 'u.username')
            ->select('c.id', 'c.galleryid', 'c.username', 'c.content', 'c.time', 'g.title as artwork_title', 'u.name as user_name')
            ->orderBy('c.time', 'desc')
            ->get();
    }

    // 删除用户
    public function deleteUser($username){
        DB::table('user')->where('username', $username)->delete();
    }

    // 删除作品
    public function deleteArtwork($artworkId){
        $artwork = DB::table('gallery')->where('id', $artworkId)->first();
        if ($artwork) {
            $galleryPath = dirname(__DIR__, 2) . '/storage/gallery/';
            $previewPath = dirname(__DIR__, 2) . '/storage/GalleryPreview/';
            if (file_exists($galleryPath . $artwork->filename)) {
                unlink($galleryPath . $artwork->filename);
            }
            if (file_exists($previewPath . $artwork->filename)) {
                unlink($previewPath . $artwork->filename);
            }
            DB::table('gallery')->where('id', $artworkId)->delete();
        }
    }

    // 删除评论
    public function deleteComment($commentId){
        DB::table('gallery_comment')->where('id', $commentId)->delete();
    }

    // 生成缩略图
    public function generateThumbnail($filename){
        $galleryPath = dirname(__DIR__, 2) . '/storage/gallery/';
        $previewPath = dirname(__DIR__, 2) . '/storage/GalleryPreview/';
        if (!is_dir($previewPath)) {
            mkdir($previewPath, 0777, true);
        }
        $originalPath = $galleryPath . $filename;
        if (!file_exists($originalPath)) {
            return false;
        }
        $info = getimagesize($originalPath);
        if (!$info) {
            return false;
        }
        $mimeType = $info[2];
        $image = null;
        switch ($mimeType) {
            case IMAGETYPE_JPEG:
                $image = imagecreatefromjpeg($originalPath);
                break;
            case IMAGETYPE_PNG:
                $image = imagecreatefrompng($originalPath);
                break;
            case IMAGETYPE_GIF:
                $image = imagecreatefromgif($originalPath);
                break;
            case IMAGETYPE_WEBP:
                $image = imagecreatefromwebp($originalPath);
                break;
        }
        if (!$image) {
            return false;
        }
        $width = imagesx($image);
        $height = imagesy($image);
        $newWidth = 370;
        $newHeight = intval($height * ($newWidth / $width));
        $thumbnail = imagecreatetruecolor($newWidth, $newHeight);
        imagecopyresampled($thumbnail, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
        imagejpeg($thumbnail, $previewPath . $filename, 80);
        imagedestroy($image);
        imagedestroy($thumbnail);
        return true;
    }

    // 分页获取作品列表
    public function getArtworksPaginated($page = 1, $perPage = 20){
        $offset = ($page - 1) * $perPage;
        $total = DB::table('gallery')->count();
        $totalPages = ceil($total / $perPage);
        $artworks = DB::table('gallery as g')
            ->join('user as u', 'g.username', '=', 'u.username')
            ->select('g.id', 'g.username', 'g.title', 'g.filename', 'g.time', 'u.name as user_name')
            ->orderBy('g.time', 'desc')
            ->offset($offset)
            ->limit($perPage)
            ->get();
        return [
            'artworks' => $artworks,
            'currentPage' => $page,
            'perPage' => $perPage,
            'total' => $total,
            'totalPages' => $totalPages
        ];
    }

    // 分页获取用户列表
    public function getUsersPaginated($page = 1, $perPage = 20){
        $offset = ($page - 1) * $perPage;
        $total = DB::table('user')->count();
        $totalPages = ceil($total / $perPage);
        $users = DB::table('user')
            ->select('username', 'name', 'email', 'headimage', 'sex', 'species', 'jointime')
            ->orderBy('jointime', 'desc')
            ->offset($offset)
            ->limit($perPage)
            ->get();
        return [
            'users' => $users,
            'currentPage' => $page,
            'perPage' => $perPage,
            'total' => $total,
            'totalPages' => $totalPages
        ];
    }

    // 分页获取评论列表
    public function getCommentsPaginated($page = 1, $perPage = 20){
        $offset = ($page - 1) * $perPage;
        $total = DB::table('gallery_comment')->count();
        $totalPages = ceil($total / $perPage);
        $comments = DB::table('gallery_comment as c')
            ->join('gallery as g', 'c.galleryid', '=', 'g.id')
            ->join('user as u', 'c.username', '=', 'u.username')
            ->select('c.id', 'c.galleryid', 'c.username', 'c.content', 'c.time', 'g.title as artwork_title', 'u.name as user_name')
            ->orderBy('c.time', 'desc')
            ->offset($offset)
            ->limit($perPage)
            ->get();
        return [
            'comments' => $comments,
            'currentPage' => $page,
            'perPage' => $perPage,
            'total' => $total,
            'totalPages' => $totalPages
        ];
    }

    // 清理过期Session
    public function clearSessions(){
        $count = 0;
        $savePath = session_save_path();
        if ($savePath === '' || $savePath === '0;/tmp') {
            $savePath = sys_get_temp_dir();
        }
        if (is_dir($savePath)) {
            $maxLifetime = (int)ini_get('session.gc_maxlifetime');
            $files = glob($savePath . '/sess_*');
            if ($files === false) {
                $files = [];
            }
            foreach ($files as $file) {
                if (filemtime($file) < time() - $maxLifetime) {
                    @unlink($file);
                    $count++;
                }
            }
        }
        return $count;
    }
}
