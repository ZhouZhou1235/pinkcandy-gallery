<?php
// 主业务服务
namespace App\Services;

use Illuminate\Database\Capsule\Manager as DB;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class MainService{
    private $config;

    public function __construct(array $config){
        $this->config = $config;
    }

    // 获取用户信息
    public function getUser(string $username){
        return DB::table('user')->where('username', $username)->first();
    }

    // 获取会话用户信息
    public function getSessionUser(string $username){
        return DB::table('user')->where('username', $username)->select(['username', 'name', 'email', 'info', 'headimage', 'backimage', 'sex', 'species', 'jointime'])->first();
    }

    // 获取作品列表
    public function getArtworks(int $begin = 0, int $num = 50, ?string $username = null, ?string $viewerUsername = null){
        $query = DB::table('gallery')->orderBy('time', 'desc')->offset($begin)->limit($num);
        if ($username) {
            $query->where('username', $username);
        }
        if ($viewerUsername) {
            $query->where(function ($q) use ($viewerUsername) {
                $q->where('grading', '<', 2)
                  ->orWhere(function ($q2) use ($viewerUsername) {
                      $q2->where('grading', '=', 2)->where('username', $viewerUsername);
                  });
            });
        } else {
            $query->where('grading', '<', 2);
        }
        return $query->get()->all();
    }

    // 获取标签列表
    public function getTags(int $begin = 0, int $num = 50){
        $tagsResult = DB::table('tag')->orderBy('time', 'desc')->offset($begin)->limit($num)->get()->all();
        $tags = [];
        foreach ($tagsResult as $tagObj) {
            $usenum = DB::table('tag_gallery')->where('tagid', $tagObj->id)->count();
            $tags[] = [
                'id' => $tagObj->id,
                'tag' => $tagObj->tag,
                'type' => $tagObj->type,
                'info' => $tagObj->info,
                'time' => $tagObj->time,
                'usenum' => $usenum
            ];
        }
        return $tags;
    }

    // 获取留言板消息
    public function getBoardMessages(int $begin = 0, int $num = 50){
        return DB::table('board')
            ->join('user', 'board.username', '=', 'user.username')
            ->select('board.*', 'user.name')
            ->orderBy('board.time', 'desc')
            ->offset($begin)
            ->limit($num)
            ->get()
            ->all();
    }

    // 获取数据库记录数
    public function getDBRecordCount(string $table){
        $validTables = ['user', 'gallery', 'tag', 'tag_gallery', 'board', 'gallery_comment', 'gallery_paw', 'gallery_star', 'user_watch', 'user_active'];
        if (!in_array($table, $validTables)) {
            return 0;
        }
        return DB::table($table)->count();
    }

    // 获取单个作品
    public function getArtwork(string $id, ?string $viewerUsername = null){
        $artwork = DB::table('gallery')->where('id', $id)->first();
        if (!$artwork) {
            return null;
        }
        if ($artwork->grading == 2 && $artwork->username != $viewerUsername) {
            return null;
        }
        return $artwork;
    }

    // 获取作品的标签
    public function getTagsArtwork(string $id){
        $tagsResult = DB::table('tag')
            ->join('tag_gallery', 'tag.id', '=', 'tag_gallery.tagid')
            ->where('tag_gallery.galleryid', $id)
            ->orderBy('tag.type', 'asc')
            ->select('tag.*')
            ->get()
            ->all();
        $tags = [];
        foreach ($tagsResult as $tagObj) {
            $usenum = DB::table('tag_gallery')->where('tagid', $tagObj->id)->count();
            $tags[] = [
                'id' => $tagObj->id,
                'tag' => $tagObj->tag,
                'type' => $tagObj->type,
                'info' => $tagObj->info,
                'time' => $tagObj->time,
                'usenum' => $usenum
            ];
        }
        return $tags;
    }

    // 获取作品评论
    public function getArtworkComments(string $id, int $begin = 0, int $num = 50, ?string $username = null){
        $comments = DB::table('gallery_comment')
            ->join('user', 'gallery_comment.username', '=', 'user.username')
            ->where('gallery_comment.galleryid', $id)
            ->select('gallery_comment.*', 'user.username as user_username', 'user.name', 'user.headimage', 'user.sex', 'user.species')
            ->orderBy('gallery_comment.time', 'desc')
            ->offset($begin)
            ->limit($num)
            ->get()
            ->all();
        $result = [];
        foreach ($comments as $comment) {
            $pawnum = DB::table('gallery_paw')->where('commentid', $comment->id)->count();
            $havepaw = $username ? (DB::table('gallery_paw')->where(['username' => $username, 'galleryid' => $id, 'commentid' => $comment->id])->exists() ? true : false) : false;
            $result[] = [
                'id' => $comment->id,
                'galleryid' => $comment->galleryid,
                'username' => $comment->username,
                'content' => $comment->content,
                'time' => $comment->time,
                'user' => [
                    'username' => $comment->user_username,
                    'name' => $comment->name,
                    'headimage' => $comment->headimage,
                    'sex' => $comment->sex,
                    'species' => $comment->species,
                ],
                'pawnum' => $pawnum,
                'havepaw' => $havepaw,
            ];
        }
        return $result;
    }

    // 获取作品评论数
    public function getCommentGalleryCount(string $id){
        return DB::table('gallery_comment')->where('galleryid', $id)->count();
    }

    // 获取作品爪印区域信息
    public function getArtworkPawAreaInfo(string $id, ?string $username = null){
        return [
            'pawnum' => DB::table('gallery_paw')->where(['galleryid' => $id, 'commentid' => null])->count(),
            'starnum' => DB::table('gallery_star')->where('galleryid', $id)->count(),
            'commentnum' => DB::table('gallery_comment')->where('galleryid', $id)->count(),
            'user' => [
                'havepaw' => $username ? (DB::table('gallery_paw')->where(['username' => $username, 'galleryid' => $id, 'commentid' => null])->exists() ? true : false) : false,
                'havestar' => $username ? (DB::table('gallery_star')->where(['username' => $username, 'galleryid' => $id])->exists() ? true : false) : false,
            ],
        ];
    }

    // 获取用户信息统计
    public function getUserInfoCount(string $username){
        $watcherNum = DB::table('user_watch')->where('username', $username)->count();
        $towatchNum = DB::table('user_watch')->where('watcher', $username)->count();
        $artworkNum = DB::table('gallery')->where('username', $username)->count();
        $gotPawnum = DB::table('gallery')
            ->join('gallery_paw', 'gallery.id', '=', 'gallery_paw.galleryid')
            ->where('gallery.username', $username)
            ->whereNull('gallery_paw.commentid')
            ->count();
        $gotPawnum += DB::table('gallery_comment')
            ->join('gallery_paw', 'gallery_comment.id', '=', 'gallery_paw.commentid')
            ->where('gallery_comment.username', $username)
            ->count();
        return [
            'watchernum' => $watcherNum,
            'towatchnum' => $towatchNum,
            'artworknum' => $artworkNum,
            'gotpawnum' => $gotPawnum,
        ];
    }

    // 获取用户关注列表
    public function getUserWatch(string $username, int $begin = 0, int $num = 50){
        $watchersResult = DB::table('user_watch')
            ->join('user', 'user_watch.watcher', '=', 'user.username')
            ->where('user_watch.username', $username)
            ->select('user_watch.id', 'user_watch.username', 'user_watch.watcher', 'user.name', 'user.headimage', 'user.sex', 'user.species', 'user_watch.time')
            ->orderBy('user_watch.time', 'desc')
            ->offset($begin)
            ->limit($num)
            ->get()
            ->all();
        $towatchResult = DB::table('user_watch')
            ->join('user', 'user_watch.username', '=', 'user.username')
            ->where('user_watch.watcher', $username)
            ->select('user_watch.id', 'user_watch.username', 'user_watch.watcher', 'user.name', 'user.headimage', 'user.sex', 'user.species', 'user_watch.time')
            ->orderBy('user_watch.time', 'desc')
            ->offset($begin)
            ->limit($num)
            ->get()
            ->all();
        $watchers = [];
        foreach ($watchersResult as $item) {
            $watchers[] = [
                'id' => $item->id,
                'username' => $item->username,
                'watcher' => $item->watcher,
                'time' => $item->time,
                'user' => [
                    'username' => $item->watcher,
                    'name' => $item->name,
                    'headimage' => $item->headimage,
                    'sex' => $item->sex,
                    'species' => $item->species
                ]
            ];
        }
        $towatch = [];
        foreach ($towatchResult as $item) {
            $towatch[] = [
                'id' => $item->id,
                'username' => $item->username,
                'watcher' => $item->watcher,
                'time' => $item->time,
                'user' => [
                    'username' => $item->username,
                    'name' => $item->name,
                    'headimage' => $item->headimage,
                    'sex' => $item->sex,
                    'species' => $item->species
                ]
            ];
        }
        return ['watcher' => $watchers, 'towatch' => $towatch];
    }

    // 获取收藏作品列表
    public function getStarArtworks(int $begin = 0, int $num = 50, ?string $username = null){
        if (!$username) return [];
        $starList = DB::table('gallery_star')
            ->where('gallery_star.username', $username)
            ->orderBy('gallery_star.time', 'desc')
            ->offset($begin)
            ->limit($num)
            ->get()
            ->all();
        $result = [];
        foreach ($starList as $star) {
            $gallery = DB::table('gallery')->where('id', $star->galleryid)->first();
            if (!$gallery) continue;
            if ($gallery->grading == 2 && $gallery->username != $username) {
                continue;
            }
            $item = $star;
            $item->gallery = $gallery;
            $result[] = $item;
        }
        return $result;
    }

    // 获取用户收藏统计
    public function getUserStarInfoCount(string $username){
        if (!$username) return ['artworknum' => 0];
        return ['artworknum' => DB::table('gallery_star')->where('username', $username)->count()];
    }

    // 搜索标签
    public function searchTags(string $tagtext){
        $tagList = explode(' ', trim($tagtext));
        $result = [];
        $tagIds = [];
        foreach ($tagList as $tag) {
            if (empty($tag)) continue;
            $tags = DB::table('tag')->where('tag', 'like', "%{$tag}%")->get()->all();
            foreach ($tags as $t) {
                if (!in_array($t->id, $tagIds)) {
                    $tagIds[] = $t->id;
                    $usenum = DB::table('tag_gallery')->where('tagid', $t->id)->count();
                    $result[] = [
                        'id' => $t->id,
                        'tag' => $t->tag,
                        'type' => $t->type,
                        'info' => $t->info,
                        'time' => $t->time,
                        'usenum' => $usenum
                    ];
                }
            }
        }
        return $result;
    }

    // 搜索粉糖内容
    public function searchPinkCandy(string $searchtext, ?string $viewerUsername = null){
        $tagList = explode(' ', trim($searchtext));
        $galleryIds = [];
        $usernames = [];
        foreach ($tagList as $tag) {
            if (empty($tag)) continue;
            $tagObj = DB::table('tag')->where('tag', $tag)->first();
            if ($tagObj) {
                $tagGalleryIds = DB::table('tag_gallery')->where('tagid', $tagObj->id)->pluck('galleryid')->all();
                if (empty($galleryIds)) {
                    $galleryIds = $tagGalleryIds;
                } else {
                    $galleryIds = array_intersect($galleryIds, $tagGalleryIds);
                }
            }
            $galleryByTitle = DB::table('gallery')->where('title', 'like', "%{$tag}%")->pluck('id')->all();
            $galleryIds = array_merge($galleryIds, $galleryByTitle);
            $users = DB::table('user')->where('name', 'like', "%{$tag}%")->orWhere('username', 'like', "%{$tag}%")->pluck('username')->all();
            $usernames = array_merge($usernames, $users);
        }
        $galleryIds = array_unique($galleryIds);
        $usernames = array_unique($usernames);
        $artworks = [];
        foreach ($galleryIds as $id) {
            $artwork = DB::table('gallery')->where('id', $id)->first();
            if (!$artwork) continue;
            // 分级过滤：限制级(grading=2)只有作者自己可见
            if ($artwork->grading == 2 && $artwork->username != $viewerUsername) {
                continue;
            }
            $artworks[] = $artwork;
        }
        $users = [];
        foreach ($usernames as $username) {
            $user = DB::table('user')->where('username', $username)->select(['username', 'name', 'headimage', 'sex', 'species'])->first();
            if ($user) $users[] = $user;
        }
        return ['artwork' => $artworks, 'user' => $users];
    }

    // 获取可注册的用户名
    public function getRegisterableUsername(){
        for ($i = 0; $i < 10; $i++) {
            $username = mt_rand(10000, 99999);
            if (!DB::table('user')->where('username', (string)$username)->exists()) {
                return $username;
            }
        }
        return 0;
    }

    // 用户登录
    public function login(string $username, string $password){
        $user = DB::table('user')->where('username', $username)->orWhere('email', $username)->first();
        if (!$user) return false;
        if (password_verify($password, $user->password)) {
            return $user;
        }
        return false;
    }

    // 上传作品
    public function uploadArtwork(string $username, string $title, string $info, array $tags, $file, int $grading = 0){
        $id = $this->createRandomID();
        $ext = pathinfo($file->getClientFilename(), PATHINFO_EXTENSION);
        if (!in_array(strtolower($ext), $this->config['upload']['allowed_extensions'])) {
            return false;
        }
        $saveFilename = $id . '.' . $ext;
        $savePath = $this->config['files']['gallery'] . $saveFilename;
        if (DB::table('gallery')->where('id', $id)->exists()) {
            return false;
        }
        $this->ensureDirectoryExists($this->config['files']['gallery']);
        $this->ensureDirectoryExists($this->config['files']['galleryPreview']);
        DB::beginTransaction();
        try {
            DB::table('gallery')->insert([
                'id' => $id,
                'username' => $username,
                'filename' => $saveFilename,
                'title' => $title,
                'info' => $info,
                'grading' => $grading,
                'time' => date('Y-m-d H:i:s'),
            ]);
            DB::table('user_active')->where('username', $username)->update(['mediatime' => date('Y-m-d H:i:s')]);
            $this->addTagsForArtwork($id, $tags);
            $file->moveTo($savePath);
            $this->compressImage($savePath, $this->config['files']['galleryPreview'] . $saveFilename);
            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }

    // 添加留言板消息
    public function addBoardMessage(string $username, string $content){
        DB::table('board')->insert([
            'username' => $username,
            'content' => $content,
            'time' => date('Y-m-d H:i:s'),
        ]);
        return true;
    }

    // 编辑用户信息
    public function editUser(string $username, string $name, ?string $info = null, ?string $sex = null, ?string $species = null){
        DB::table('user')->where('username', $username)->update([
            'name' => $name,
            'info' => $info,
            'sex' => $sex,
            'species' => $species,
        ]);
        return true;
    }

    // 编辑用户头像/背景
    public function editUserImage(string $username, $headimage = null, $backimage = null){
        $this->ensureDirectoryExists($this->config['files']['headimage']);
        $this->ensureDirectoryExists($this->config['files']['backimage']);
        if ($headimage) {
            $id = $this->createRandomID();
            $ext = pathinfo($headimage->getClientFilename(), PATHINFO_EXTENSION);
            if (!in_array(strtolower($ext), $this->config['upload']['allowed_extensions'])) {
                return false;
            }
            $saveFilename = $id . '.' . $ext;
            $savePath = $this->config['files']['headimage'] . $saveFilename;
            $oldImage = DB::table('user')->where('username', $username)->value('headimage');
            DB::table('user')->where('username', $username)->update(['headimage' => $saveFilename]);
            $headimage->moveTo($savePath);
            if ($oldImage) {
                @unlink($this->config['files']['headimage'] . $oldImage);
            }
        }
        if ($backimage) {
            $id = $this->createRandomID();
            $ext = pathinfo($backimage->getClientFilename(), PATHINFO_EXTENSION);
            if (!in_array(strtolower($ext), $this->config['upload']['allowed_extensions'])) {
                return false;
            }
            $saveFilename = $id . '.' . $ext;
            $savePath = $this->config['files']['backimage'] . $saveFilename;
            $oldImage = DB::table('user')->where('username', $username)->value('backimage');
            DB::table('user')->where('username', $username)->update(['backimage' => $saveFilename]);
            $backimage->moveTo($savePath);
            $this->compressImage($savePath, $savePath, $this->config['upload']['image_resize'] * 4);
            if ($oldImage) {
                @unlink($this->config['files']['backimage'] . $oldImage);
            }
        }
        return true;
    }

    // 清除用户头像/背景
    public function clearUserImage(string $username){
        $user = DB::table('user')->where('username', $username)->first();
        if ($user->headimage) {
            unlink($this->config['files']['headimage'] . $user->headimage);
        }
        if ($user->backimage) {
            unlink($this->config['files']['backimage'] . $user->backimage);
        }
        DB::table('user')->where('username', $username)->update(['headimage' => null, 'backimage' => null]);
        return true;
    }

    // 发送作品评论
    public function sendCommentArtwork(string $galleryid, string $username, string $content){
        $id = $this->createRandomID();
        if (DB::table('gallery_comment')->where('id', $id)->exists()) {
            return false;
        }
        DB::table('gallery_comment')->insert([
            'id' => $id,
            'galleryid' => $galleryid,
            'username' => $username,
            'content' => $content,
            'time' => date('Y-m-d H:i:s'),
        ]);
        return true;
    }

    // 爪印作品/评论
    public function pawArtworkMedia(string $username, string $galleryid, ?string $commentid = null){
        $exists = DB::table('gallery_paw')
            ->where(['username' => $username, 'galleryid' => $galleryid, 'commentid' => $commentid])
            ->exists();
        if ($exists) {
            DB::table('gallery_paw')->where(['username' => $username, 'galleryid' => $galleryid, 'commentid' => $commentid])->delete();
        } else {
            DB::table('gallery_paw')->insert([
                'username' => $username,
                'galleryid' => $galleryid,
                'commentid' => $commentid,
                'time' => date('Y-m-d H:i:s'),
            ]);
        }
        return true;
    }

    // 收藏/取消收藏作品
    public function starArtworkMedia(string $username, string $galleryid){
        $exists = DB::table('gallery_star')->where(['username' => $username, 'galleryid' => $galleryid])->exists();
        if ($exists) {
            DB::table('gallery_star')->where(['username' => $username, 'galleryid' => $galleryid])->delete();
        } else {
            DB::table('gallery_star')->insert([
                'username' => $username,
                'galleryid' => $galleryid,
                'time' => date('Y-m-d H:i:s'),
            ]);
        }
        return true;
    }

    // 检查是否已关注
    public function haveWatch(string $watcher, string $username){
        return DB::table('user_watch')->where(['username' => $username, 'watcher' => $watcher])->exists();
    }

    // 关注/取消关注用户
    public function watchUser(string $watcher, string $username){
        if ($watcher == $username) return false;
        $exists = DB::table('user_watch')->where(['username' => $username, 'watcher' => $watcher])->exists();
        if ($exists) {
            DB::table('user_watch')->where(['username' => $username, 'watcher' => $watcher])->delete();
        } else {
            DB::table('user_watch')->insert([
                'username' => $username,
                'watcher' => $watcher,
                'time' => date('Y-m-d H:i:s'),
            ]);
        }
        return true;
    }

    // 编辑作品
    public function editArtwork(string $id, string $title, string $info, array $tags, string $username, ?int $grading = null){
        $artwork = DB::table('gallery')->where('id', $id)->first();
        if (!$artwork || $artwork->username != $username) {
            return false;
        }
        DB::beginTransaction();
        try {
            $updateData = ['title' => $title, 'info' => $info];
            if ($grading !== null) {
                $updateData['grading'] = $grading;
            }
            DB::table('gallery')->where('id', $id)->update($updateData);
            DB::table('tag_gallery')->where('galleryid', $id)->delete();
            $this->addTagsForArtwork($id, $tags);
            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }

    // 删除作品
    public function deleteArtwork(string $id, string $username){
        $artwork = DB::table('gallery')->where('id', $id)->first();
        if (!$artwork || $artwork->username != $username) {
            return false;
        }
        DB::beginTransaction();
        try {
            DB::table('gallery')->where('id', $id)->delete();
            DB::table('gallery_comment')->where('galleryid', $id)->delete();
            DB::table('gallery_paw')->where('galleryid', $id)->delete();
            DB::table('gallery_star')->where('galleryid', $id)->delete();
            DB::table('tag_gallery')->where('galleryid', $id)->delete();
            unlink($this->config['files']['gallery'] . $artwork->filename);
            unlink($this->config['files']['galleryPreview'] . $artwork->filename);
            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }

    // 编辑标签
    public function editTag(string $id, string $tag, string $type, ?string $info = null){
        DB::table('tag')->where('id', $id)->update([
            'tag' => $tag,
            'type' => $type,
            'info' => $info,
        ]);
        return true;
    }

    // 删除标签
    public function deleteTag(string $id){
        DB::table('tag')->where('id', $id)->delete();
        DB::table('tag_gallery')->where('tagid', $id)->delete();
        return true;
    }

    // 发送邮件
    public function sendMail(string $to, string $content, string $subject = 'PINKCANDY MAILER'){
        try {
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = $this->config['mailer']['host'];
            $mail->SMTPAuth = true;
            $mail->Username = $this->config['mailer']['username'];
            $mail->Password = $this->config['mailer']['password'];
            $mail->SMTPSecure = $this->config['mailer']['secure'] ? 'ssl' : 'tls';
            $mail->Port = $this->config['mailer']['port'];
            $mail->setFrom($this->config['mailer']['from'], 'PinkCandy Gallery');
            $mail->addAddress($to);
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $content;
            $mail->send();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    // 用户注册
    public function register(string $username, string $password, string $name, string $email){
        $exists = DB::table('user')->where('username', $username)->orWhere('email', $email)->exists();
        if ($exists) {
            return false;
        }
        DB::beginTransaction();
        try {
            DB::table('user')->insert([
                'username' => $username,
                'password' => password_hash($password, PASSWORD_DEFAULT),
                'name' => $name,
                'email' => $email,
                'jointime' => date('Y-m-d H:i:s'),
            ]);
            DB::table('user_active')->insert([
                'username' => $username,
                'noticetime' => date('Y-m-d H:i:s'),
                'trendstime' => date('Y-m-d H:i:s'),
                'mediatime' => date('Y-m-d H:i:s'),
            ]);
            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }

    // 重置密码
    public function resetPassword(string $email, string $password){
        $user = DB::table('user')->where('email', $email)->first();
        if (!$user) return false;
        DB::table('user')->where('username', $user->username)->update(['password' => password_hash($password, PASSWORD_DEFAULT)]);
        return true;
    }

    // 修改用户关键信息
    public function editUserImportant(string $username, ?string $password = null, ?string $email = null){
        $data = [];
        if ($password) {
            $data['password'] = password_hash($password, PASSWORD_DEFAULT);
        }
        if ($email) {
            $data['email'] = $email;
        }
        if (!empty($data)) {
            DB::table('user')->where('username', $username)->update($data);
        }
        return true;
    }

    // 获取通知数量
    public function getNoticenum(string $username){
        $userActive = DB::table('user_active')->where('username', $username)->first();
        if (!$userActive) {
            return 0;
        }
        $noticetime = $userActive->noticetime;
        $count = DB::table('user_watch')->where('username', $username)->where('time', '>=', $noticetime)->count();
        $artworkList = DB::table('gallery')->where('username', $username)->get()->all();
        foreach ($artworkList as $artwork) {
            $count += DB::table('gallery_paw')
                ->where('galleryid', $artwork->id)
                ->whereNull('commentid')
                ->where('time', '>=', $noticetime)
                ->count();
            $count += DB::table('gallery_comment')
                ->where('galleryid', $artwork->id)
                ->where('time', '>=', $noticetime)
                ->count();
        }
        $commentList = DB::table('gallery_comment')->where('username', $username)->get()->all();
        foreach ($commentList as $comment) {
            $count += DB::table('gallery_paw')
                ->where('commentid', $comment->id)
                ->where('time', '>=', $noticetime)
                ->count();
        }
        return $count;
    }

    // 获取用户通知-爪印作品
    public function getUserNoticePawArtwork(string $username){
        $userActive = DB::table('user_active')->where('username', $username)->first();
        if (!$userActive) {
            return ['artwork' => [], 'artworkcomment' => []];
        }
        $noticetime = $userActive->noticetime;
        $result = ['artwork' => [], 'artworkcomment' => []];
        $artworkList = DB::table('gallery')->where('username', $username)->get()->all();
        foreach ($artworkList as $artwork) {
            $paws = DB::table('gallery_paw')
                ->join('user', 'gallery_paw.username', '=', 'user.username')
                ->where('gallery_paw.galleryid', $artwork->id)
                ->whereNull('gallery_paw.commentid')
                ->where('gallery_paw.username', '!=', $username)
                ->where('gallery_paw.time', '>=', $noticetime)
                ->orderBy('gallery_paw.time', 'desc')
                ->select(['gallery_paw.*', 'user.name', 'user.headimage', 'user.sex', 'user.species'])
                ->get()
                ->all();
            foreach ($paws as $paw) {
                $result['artwork'][] = [
                    'id' => $paw->id,
                    'user' => (object)[
                        'username' => $paw->username,
                        'name' => $paw->name,
                        'headimage' => $paw->headimage,
                        'sex' => $paw->sex,
                        'species' => $paw->species,
                    ],
                    'galleryid' => $artwork->id,
                    'filename' => $artwork->filename,
                    'title' => $artwork->title,
                    'time' => $paw->time,
                ];
            }
        }
        $commentList = DB::table('gallery_comment')->where('username', $username)->get()->all();
        foreach ($commentList as $comment) {
            $paws = DB::table('gallery_paw')
                ->join('user', 'gallery_paw.username', '=', 'user.username')
                ->where('gallery_paw.commentid', $comment->id)
                ->where('gallery_paw.username', '!=', $username)
                ->where('gallery_paw.time', '>=', $noticetime)
                ->orderBy('gallery_paw.time', 'desc')
                ->select(['gallery_paw.*', 'user.name', 'user.headimage', 'user.sex', 'user.species'])
                ->get()
                ->all();
            foreach ($paws as $paw) {
                $result['artworkcomment'][] = [
                    'id' => $paw->id,
                    'user' => (object)[
                        'username' => $paw->username,
                        'name' => $paw->name,
                        'headimage' => $paw->headimage,
                        'sex' => $paw->sex,
                        'species' => $paw->species,
                    ],
                    'galleryid' => $paw->galleryid,
                    'content' => $comment->content,
                    'time' => $paw->time,
                ];
            }
        }
        return $result;
    }

    // 获取用户通知-文字回复
    public function getUserNoticeTextEcho(string $username){
        $userActive = DB::table('user_active')->where('username', $username)->first();
        if (!$userActive) {
            return ['artworkcomment' => []];
        }
        $noticetime = $userActive->noticetime;
        $result = ['artworkcomment' => []];
        $artworkList = DB::table('gallery')->where('username', $username)->get()->all();
        foreach ($artworkList as $artwork) {
            $comments = DB::table('gallery_comment')
                ->join('user', 'gallery_comment.username', '=', 'user.username')
                ->where('gallery_comment.galleryid', $artwork->id)
                ->where('gallery_comment.username', '!=', $username)
                ->where('gallery_comment.time', '>=', $noticetime)
                ->orderBy('gallery_comment.time', 'desc')
                ->select(['gallery_comment.*', 'user.name', 'user.headimage', 'user.sex', 'user.species'])
                ->get()
                ->all();
            foreach ($comments as $comment) {
                $result['artworkcomment'][] = [
                    'id' => $comment->id,
                    'user' => (object)[
                        'username' => $comment->username,
                        'name' => $comment->name,
                        'headimage' => $comment->headimage,
                        'sex' => $comment->sex,
                        'species' => $comment->species,
                    ],
                    'galleryid' => $artwork->id,
                    'filename' => $artwork->filename,
                    'title' => $artwork->title,
                    'content' => $comment->content,
                    'time' => $comment->time,
                ];
            }
        }
        return $result;
    }

    // 获取用户通知-新粉丝
    public function getUserNoticeWatcher(string $username){
        $userActive = DB::table('user_active')->where('username', $username)->first();
        if (!$userActive) {
            return [];
        }
        $noticetime = $userActive->noticetime;
        $results = DB::table('user_watch')
            ->join('user', 'user_watch.watcher', '=', 'user.username')
            ->where('user_watch.username', $username)
            ->where('user_watch.watcher', '!=', $username)
            ->where('user_watch.time', '>=', $noticetime)
            ->orderBy('user_watch.time', 'desc')
            ->select(['user_watch.*', 'user.name', 'user.headimage', 'user.sex', 'user.species'])
            ->get()
            ->all();
        $result = [];
        foreach ($results as $item) {
            $result[] = [
                'id' => $item->id,
                'user' => (object)[
                    'username' => $item->watcher,
                    'name' => $item->name,
                    'headimage' => $item->headimage,
                    'sex' => $item->sex,
                    'species' => $item->species,
                ],
                'time' => $item->time,
            ];
        }
        return $result;
    }

    // 标记通知已读
    public function noticeFinishRead(string $username){
        DB::table('user_active')->where('username', $username)->update(['noticetime' => date('Y-m-d H:i:s')]);
        return true;
    }

    // 标记通知未读
    public function noticeNotRead(string $username){
        $userActive = DB::table('user_active')->where('username', $username)->first();
        if ($userActive) {
            $currentNoticetime = $userActive->noticetime;
            $newNoticetime = date('Y-m-d H:i:s', strtotime($currentNoticetime) - 30 * 24 * 60 * 60);
            DB::table('user_active')->where('username', $username)->update(['noticetime' => $newNoticetime]);
        }
        return true;
    }

    // 获取动态数量
    public function getTrendnum(string $username){
        $userActive = DB::table('user_active')->where('username', $username)->first();
        if (!$userActive) {
            return 0;
        }
        $trendstime = $userActive->trendstime;
        return DB::table('user_active')
            ->join('user_watch', 'user_active.username', '=', 'user_watch.username')
            ->where('user_watch.watcher', $username)
            ->where('user_active.mediatime', '>=', $trendstime)
            ->count();
    }

    // 获取用户动态-关注的用户
    public function getUserTrendUsers(string $username){
        $userActive = DB::table('user_active')->where('username', $username)->first();
        if (!$userActive) {
            return [];
        }
        $trendstime = $userActive->trendstime;
        $results = DB::table('user_active')
            ->join('user_watch', 'user_active.username', '=', 'user_watch.username')
            ->join('user', 'user_active.username', '=', 'user.username')
            ->where('user_watch.watcher', $username)
            ->where('user_active.mediatime', '>=', $trendstime)
            ->select([
                'user.username',
                'user.name',
                'user.sex',
                'user.species',
                'user.headimage',
                'user_active.mediatime',
            ])
            ->get()
            ->all();
        return $results;
    }

    // 获取用户动态-作品
    public function getUserTrendArtworks(string $username, string $myUsername){
        $userActive = DB::table('user_active')->where('username', $myUsername)->first();
        if (!$userActive) {
            return [];
        }
        $trendstime = $userActive->trendstime;
        $query = DB::table('gallery')
            ->where('username', $username)
            ->where('time', '>=', $trendstime)
            ->orderBy('time', 'desc');
        if ($myUsername != $username) {
            $query->where('grading', '<', 2);
        }
        return $query->get()->all();
    }

    // 标记动态已读
    public function trendFinishRead(string $username){
        DB::table('user_active')->where('username', $username)->update(['trendstime' => date('Y-m-d H:i:s')]);
        return true;
    }

    // 标记动态未读
    public function trendNotRead(string $username){
        $userActive = DB::table('user_active')->where('username', $username)->first();
        if ($userActive) {
            $currentTrendstime = $userActive->trendstime;
            $newTrendstime = date('Y-m-d H:i:s', strtotime($currentTrendstime) - 30 * 24 * 60 * 60);
            DB::table('user_active')->where('username', $username)->update(['trendstime' => $newTrendstime]);
        }
        return true;
    }

    // 为标签添加使用次数
    private function addUsenumForTags(array $tags){
        foreach ($tags as &$tag) {
            $tag->usenum = DB::table('tag_gallery')->where('tagid', $tag->id)->count();
        }
        return $tags;
    }

    // 为作品添加标签
    private function addTagsForArtwork(string $id, array $tags){
        foreach ($tags as $tag) {
            $tagObj = DB::table('tag')->where('tag', $tag)->first();
            if (!$tagObj) {
                $tagId = $this->createRandomID();
                DB::table('tag')->insert([
                    'id' => $tagId,
                    'tag' => $tag,
                    'type' => 1,
                    'time' => date('Y-m-d H:i:s'),
                ]);
                DB::table('tag_gallery')->insert(['tagid' => $tagId, 'galleryid' => $id]);
            } else {
                if (!DB::table('tag_gallery')->where(['tagid' => $tagObj->id, 'galleryid' => $id])->exists()) {
                    DB::table('tag_gallery')->insert(['tagid' => $tagObj->id, 'galleryid' => $id]);
                }
            }
        }
    }

    // 生成随机ID
    private function createRandomID(int $length = 10){
        return (string) mt_rand(pow(10, $length - 1), pow(10, $length) - 1);
    }

    // 确保目录存在
    private function ensureDirectoryExists(string $path): void{
        if (!is_dir($path)) {
            mkdir($path, 0777, true);
        }
    }

    // 压缩图片
    private function compressImage(string $source, string $destination, int $resizeNum = 256){
        if (!file_exists($source)) {
            return;
        }
        if (function_exists('gd_info')) {
            $info = getimagesize($source);
            if (!$info) {
                return;
            }
            $mime = $info['mime'];
            $image = null;
            switch ($mime) {
                case 'image/jpeg':
                    $image = imagecreatefromjpeg($source);
                    break;
                case 'image/png':
                    $image = imagecreatefrompng($source);
                    break;
                case 'image/gif':
                    $image = imagecreatefromgif($source);
                    break;
                default:
                    return;
            }
            if (!$image) {
                return;
            }
            $width = imagesx($image);
            $height = imagesy($image);
            if ($width > $resizeNum || $height > $resizeNum) {
                if ($width > $height) {
                    $newWidth = $resizeNum;
                    $newHeight = ($resizeNum / $width) * $height;
                } else {
                    $newHeight = $resizeNum;
                    $newWidth = ($resizeNum / $height) * $width;
                }
                $newImage = imagecreatetruecolor($newWidth, $newHeight);
                imagecopyresampled($newImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
                switch ($mime) {
                    case 'image/jpeg':
                        imagejpeg($newImage, $destination, 80);
                        break;
                    case 'image/png':
                        imagepng($newImage, $destination);
                        break;
                    case 'image/gif':
                        imagegif($newImage, $destination);
                        break;
                }
                imagedestroy($newImage);
            } else {
                copy($source, $destination);
            }
            imagedestroy($image);
        }
    }
}
