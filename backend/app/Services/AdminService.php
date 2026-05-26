<?php

namespace App\Services;

use Illuminate\Database\Capsule\Manager as DB;

class AdminService
{
    private $adminsFile;

    public function __construct()
    {
        $this->adminsFile = dirname(__DIR__, 2) . '/storage/admins.json';
        if (!file_exists($this->adminsFile)) {
            file_put_contents($this->adminsFile, json_encode(['admins' => []], JSON_UNESCAPED_UNICODE));
        }
    }

    private function getAdminsData()
    {
        return json_decode(file_get_contents($this->adminsFile), true);
    }

    private function saveAdminsData($data)
    {
        file_put_contents($this->adminsFile, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    }

    public function isAdmin($username)
    {
        $data = $this->getAdminsData();
        return in_array($username, $data['admins']);
    }

    public function addAdmin($username)
    {
        $data = $this->getAdminsData();
        if (!in_array($username, $data['admins'])) {
            $data['admins'][] = $username;
            $this->saveAdminsData($data);
        }
    }

    public function removeAdmin($username)
    {
        $data = $this->getAdminsData();
        $index = array_search($username, $data['admins']);
        if ($index !== false) {
            array_splice($data['admins'], $index, 1);
            $this->saveAdminsData($data);
        }
    }

    public function getAllAdmins()
    {
        $data = $this->getAdminsData();
        return $data['admins'];
    }

    public function login($username, $password)
    {
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

    public function getAllUsers()
    {
        return DB::table('user')
            ->select('username', 'name', 'email', 'headimage', 'sex', 'species', 'jointime')
            ->orderBy('jointime', 'desc')
            ->get();
    }

    public function getAllArtworks()
    {
        return DB::table('gallery as g')
            ->join('user as u', 'g.username', '=', 'u.username')
            ->select('g.id', 'g.username', 'g.title', 'g.filename', 'g.time', 'u.name as user_name')
            ->orderBy('g.time', 'desc')
            ->get();
    }

    public function getAllComments()
    {
        return DB::table('gallery_comment as c')
            ->join('gallery as g', 'c.galleryid', '=', 'g.id')
            ->join('user as u', 'c.username', '=', 'u.username')
            ->select('c.id', 'c.galleryid', 'c.username', 'c.content', 'c.time', 'g.title as artwork_title', 'u.name as user_name')
            ->orderBy('c.time', 'desc')
            ->get();
    }

    public function deleteUser($username)
    {
        DB::table('user')->where('username', $username)->delete();
    }

    public function deleteArtwork($artworkId)
    {
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

    public function deleteComment($commentId)
    {
        DB::table('gallery_comment')->where('id', $commentId)->delete();
    }

    public function regenerateThumbnails()
    {
        $galleryPath = dirname(__DIR__, 2) . '/storage/gallery/';
        $previewPath = dirname(__DIR__, 2) . '/storage/GalleryPreview/';
        
        if (!is_dir($previewPath)) {
            mkdir($previewPath, 0777, true);
        }
        
        $artworks = DB::table('gallery')->get();
        $count = 0;
        
        foreach ($artworks as $artwork) {
            $originalPath = $galleryPath . $artwork->filename;
            if (file_exists($originalPath)) {
                $info = getimagesize($originalPath);
                if ($info) {
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
                    
                    if ($image) {
                        $width = imagesx($image);
                        $height = imagesy($image);
                        $newWidth = 370;
                        $newHeight = intval($height * ($newWidth / $width));
                        
                        $thumbnail = imagecreatetruecolor($newWidth, $newHeight);
                        imagecopyresampled($thumbnail, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
                        
                        imagejpeg($thumbnail, $previewPath . $artwork->filename, 80);
                        
                        imagedestroy($image);
                        imagedestroy($thumbnail);
                        $count++;
                    }
                }
            }
        }
        
        return $count;
    }

    public function clearSessions()
    {
        $sessionPath = session_save_path();
        if (!$sessionPath) {
            $sessionPath = dirname(__DIR__, 2) . '/storage/sessions';
        }
        
        $count = 0;
        if (is_dir($sessionPath)) {
            $files = glob($sessionPath . '/sess_*');
            foreach ($files as $file) {
                if (is_file($file) && filemtime($file) < time() - 86400 * 7) {
                    unlink($file);
                    $count++;
                }
            }
        }
        
        return $count;
    }
}
