<?php
// http 处理


use Workerman\Protocols\Http\Request;
use ZhouZhou\PinkCandyChat\DataBaseConnection;


$GLOBALS['routes'] = [
    '/'=>function(Request $request) {
        if($request->method()=='POST'){return 'PINKCANDY: post ok';}
        return file_get_contents(__DIR__.'/view/hi.html');
    },
    '/core/createRoom'=>function(Request $request){
        $ok = false;
        if(accordUserAction($request)){
            $user = getUser($request->post('sessionId'));
            $postobj = $request->post();
            $id = random_int(10000,99999);
            $username = $user['username'];
            $name = $postobj['name'];
            $info = $postobj['info'];
            $type = $postobj['type'];
            if(empty($username)){return 0;}
            $db_connection = new DataBaseConnection();
            for($i=0;$i<100;$i++){
                if(count($db_connection->queryData("SELECT id FROM room WHERE id='$id'"))==0){
                    break;
                }
            }
            $ok = $db_connection->executeData("
                INSERT INTO room(id,owner_username,name,info,type)
                VALUES('$id','$username','$name','$info','$type')
            ");
        }
        return $ok?1:0;
    },
    '/core/getRoom'=>function(Request $request){
        if($id=$request->get('id')){
            $db_connection = new DataBaseConnection();
            $res = $db_connection->queryData("SELECT * FROM room WHERE id='$id'");
            return $res;
        }
        return 0;
    },
    '/core/joinRoom'=>function(Request $request){
        if(accordUserAction($request)){
            $postobj = $request->post();
            $sessionId = $postobj['sessionId'];
            $user = getUser($sessionId);if(!$user){return 0;}
            $username = $user['username'];
            $room_id = $postobj['id'];
            $db_connection = new DataBaseConnection();
            if(count($db_connection->queryData("SELECT id FROM room_member WHERE username='$username' AND room_id='$room_id'"))==0){
                return $db_connection->executeData("
                    INSERT INTO room_member(username,room_id,type)
                    VALUES('$username','$room_id','member')
                ")?1:0;
            }
            else{
                return $db_connection->executeData("
                    DELETE FROM room_member
                    WHERE username='$username' AND room_id='$room_id'
                ")?1:0;
            }
        }
        return 0;
    },
    '/core/haveJoin'=>function(Request $request){
        if(accordUserAction($request)){
            $postobj = $request->post();
            $sessionId = $postobj['sessionId'];
            $user = getUser($sessionId);if(!$user){return 0;}
            $username = $user['username'];
            $room_id = $postobj['id'];
            $db_connection = new DataBaseConnection();
            return count($db_connection->queryData("
                SELECT id FROM room_member
                WHERE username='$username' AND room_id='$room_id'
            "))>0?1:0;
        }
        return 0;
    },
]+scanStaticAssets('assets');
