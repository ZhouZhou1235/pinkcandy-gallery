<?php

require_once 'MysqlOperation.php';

$db4 = new MysqlOperation(
    'localhost',
    'root',
    '123456',
    'pinkcandy_gallery4',
);

$userList = $db4->queryAndList("SELECT * FROM user;");
for($i=0;$i<count($userList);$i++){
    $user = $userList[$i];
    $username = $user['username'];
    $time = date('Y-m-d H:i:s',strtotime('2024-1-20 00:00:00'));
    $gallery = $db4->query("SELECT * FROM gallery WHERE username='$username' ORDER BY time DESC");
    if($row=$gallery->fetch_array()){
        $mediatime = $row['time'];
        $db4->query("INSERT INTO user_active VALUES('$username','$time','$time','$mediatime')");
    }
    else{
        $db4->query("INSERT INTO user_active VALUES('$username','$time','$time','$time')");
    }
}
