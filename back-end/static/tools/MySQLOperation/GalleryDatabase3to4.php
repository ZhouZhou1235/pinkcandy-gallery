<?php
// 数据库数据第三代迁移至第四版

require_once 'MysqlOperation.php';

$db3 = new MysqlOperation(
    'localhost',
    'root',
    '123456',
    'pinkcandy_gallery',
);
$db4 = new MysqlOperation(
    'localhost',
    'root',
    '123456',
    'pinkcandy_gallery4',
);

$accountList = $db3->queryAndList('SELECT * FROM pc3_account;');
for($i=0;$i<count($accountList);$i++){
    $account = $accountList[$i];
    $username = $account['username'];
    $password = $account['password'];
    $name = $account['name'];
    $email = $account['email'];
    $jointime = $account['jointime'];
    $info = $account['info'];
    $headimage = $account['headimage'];
    $backimage = $account['backimage'];
    $sex = $account['sex'];
    $species = $account['species'];
    $db4->query("
        INSERT INTO user
        VALUES('$username','$password','$name','$email','$jointime','$info','$headimage','$backimage','$sex','$species')
    ");
}

$boardList = $db3->queryAndList('SELECT * FROM pc3_board');
for($i=0;$i<count($boardList);$i++){
    $board = $boardList[$i];
    $username = $board['username'];
    $content = $board['content'];
    $time = $board['time'];
    $db4->query("
        INSERT INTO board(username,content,time)
        VALUES('$username','$content','$time')
    ");
}

$comment_galleryList = $db3->queryAndList('SELECT * FROM pc3_comment_gallery');
for($i=0;$i<count($comment_galleryList);$i++){
    $arr = $comment_galleryList[$i];
    $id = $arr['commentid'];
    $galleryid = $arr['galleryid'];
    $username = $arr['username'];
    $content = $arr['content'];
    $time = $arr['time'];
    $db4->query("
        INSERT INTO gallery_comment
        VALUES('$id','$galleryid','$username','$content','$time')
    ");
}

$comment_gardenList = $db3->queryAndList('SELECT * FROM pc3_comment_garden');
for($i=0;$i<count($comment_gardenList);$i++){
    $arr = $comment_gardenList[$i];
    $id = $arr['commentid'];
    $gardenid = $arr['postid'];
    $username = $arr['username'];
    $content = $arr['content'];
    $filename = $arr['filename'];
    $time = $arr['time'];
    $db4->query("
        INSERT INTO garden_comment
        VALUES('$id','$gardenid','$username','$content','$filename','$time')
    ");
}

$galleryList = $db3->queryAndList('SELECT * FROM pc3_gallery');
for($i=0;$i<count($galleryList);$i++){
    $arr = $galleryList[$i];
    $id = $arr['galleryid'];
    $username = $arr['username'];
    $filename = $arr['filename'];
    $title = $arr['title'];
    $info = $arr['info'];
    $time = $arr['createdtime'];
    $db4->query("
        INSERT INTO gallery
        VALUES('$id','$username','$filename','$title','$info','$time')
    ");
}

$gardenList = $db3->queryAndList('SELECT * FROM pc3_garden');
for($i=0;$i<count($gardenList);$i++){
    $arr = $gardenList[$i];
    $id = $arr['postid'];
    $username = $arr['username'];
    $filename = $arr['filename'];
    $title = $arr['title'];
    $content = $arr['content'];
    $createtime = $arr['createdtime'];
    $updatetime = $arr['updatetime'];
    $db4->query("
        INSERT INTO garden
        VALUES('$id','$username','$filename','$title','$content','$createtime','$updatetime')
    ");
}

$paw_galleryList = $db3->queryAndList('SELECT * FROM pc3_paw_gallery');
for($i=0;$i<count($paw_galleryList);$i++){
    $arr = $paw_galleryList[$i];
    $id = $arr['Id'];
    $username = $arr['username'];
    $galleryid = $arr['galleryid'];
    $commentid = $arr['commentid']!='no'?$arr['commentid']:null;
    $time = $arr['time'];
    $db4->query("
        INSERT INTO gallery_paw
        VALUES('$id','$username','$galleryid','$commentid','$time')
    ");
}

$paw_gardenList = $db3->queryAndList('SELECT * FROM pc3_paw_garden');
for($i=0;$i<count($paw_gardenList);$i++){
    $arr = $paw_gardenList[$i];
    $id = $arr['Id'];
    $username = $arr['username'];
    $gardenid = $arr['postid'];
    $commentid = $arr['commentid']!='no'?$arr['commentid']:null;
    $time = $arr['time'];
    $db4->query("
        INSERT INTO garden_paw
        VALUES('$id','$username','$gardenid','$commentid','$time')
    ");
}

$reply_gardenList = $db3->queryAndList('SELECT * FROM pc3_reply_garden');
for($i=0;$i<count($reply_gardenList);$i++){
    $arr = $reply_gardenList[$i];
    $id = $arr['Id'];
    $commentid = $arr['commentid'];
    $username = $arr['username'];
    $content = $arr['content'];
    $time = $arr['time'];
    $db4->query("
        INSERT INTO garden_comment_reply
        VALUES('$id','$commentid','$username','$content','$time')
    ");
}

$star_galleryList = $db3->queryAndList('SELECT * FROM pc3_star_gallery');
for($i=0;$i<count($star_galleryList);$i++){
    $arr = $star_galleryList[$i];
    $id = $arr['Id'];
    $username = $arr['username'];
    $galleryid = $arr['galleryid'];
    $time = $arr['time'];
    $db4->query("
        INSERT INTO gallery_star
        VALUES('$id','$username','$galleryid','$time')
    ");
}

$star_gardenList = $db3->queryAndList('SELECT * FROM pc3_star_garden');
for($i=0;$i<count($star_gardenList);$i++){
    $arr = $star_gardenList[$i];
    $id = $arr['Id'];
    $username = $arr['username'];
    $gardenid = $arr['postid'];
    $time = $arr['time'];
    $db4->query("
        INSERT INTO garden_star
        VALUES('$id','$username','$gardenid','$time')
    ");    
}

$tagsList = $db3->queryAndList('SELECT * FROM pc3_tags');
for($i=0;$i<count($tagsList);$i++){
    $arr = $tagsList[$i];
    $id = $arr['tagid'];
    $tag = $arr['tag'];
    $type = $arr['type'];
    $info = $arr['info'];
    $time = date("Y-m-d H:i:s");
    $db4->query("
        INSERT INTO tag
        VALUES('$id','$tag','$type','$info','$time')
    ");
}

$tag_galleryList = $db3->queryAndList('SELECT * FROM pc3_tag_gallery');
for($i=0;$i<count($tag_galleryList);$i++){
    $arr = $tag_galleryList[$i];
    $id = $arr['Id'];
    $tagid = $arr['tagid'];
    $galleryid = $arr['galleryid'];
    $db4->query("
        INSERT INTO tag_gallery
        VALUES('$id','$tagid','$galleryid')
    ");
}

$tag_gardenList = $db3->queryAndList('SELECT * FROM pc3_tag_garden');
for($i=0;$i<count($tag_gardenList);$i++){
    $arr = $tag_gardenList[$i];
    $id = $arr['Id'];
    $tagid = $arr['tagid'];
    $gardenid = $arr['postid'];
    $db4->query("
        INSERT INTO tag_garden
        VALUES('$id','$tagid','$gardenid')
    ");
}

$watch_accountList = $db3->queryAndList('SELECT * FROM pc3_watch_account');
for($i=0;$i<count($watch_accountList);$i++){
    $arr = $watch_accountList[$i];
    $id = $arr['Id'];
    $username = $arr['username'];
    $watcher = $arr['watcher'];
    $time = $arr['time'];
    $db4->query("
        INSERT INTO user_watch
        VALUES('$id','$username','$watcher','$time')
    ");
}

$db4->query("UPDATE gallery_paw SET commentid=NULL WHERE commentid=''");
$db4->query("UPDATE garden_paw SET commentid=NULL WHERE commentid=''");
