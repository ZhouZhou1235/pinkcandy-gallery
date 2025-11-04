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
            if(empty($username) || empty($name)){return 0;}
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
            $ok = $db_connection->executeData("
                INSERT INTO room_member(username,room_id,type)
                VALUES('$username','$id','owner')
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
                    WHERE username='$username' AND room_id='$room_id' AND type='member'
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
    '/core/getMessages'=>function(Request $request){
        if($room_id=$request->get('id')){
            $num = 1000;
            if(is_numeric($request->get('num'))){$num=(int)$request->get('num');}
            if($num>10000){$num==10000;}
            $db_connection = new DataBaseConnection();
            $res = $db_connection->queryData("
                SELECT * FROM message
                WHERE room_id='$room_id'
                ORDER BY time DESC
                LIMIT $num
            ");
            return $res;
        }
        return 0;
    },
    '/core/getRoomMembers'=>function(Request $request){
        if($room_id=$request->get('id')){
            $db_connection = new DataBaseConnection();
            $res = $db_connection->queryData("
                SELECT * FROM room_member
                WHERE room_id='$room_id'
                ORDER BY join_time DESC
            ");
            return $res;
        }
        return 0;
    },
    '/core/getRooms'=>function(Request $request){
        $db_connection = new DataBaseConnection();
        if($username=$request->get('username')){
            $res = $db_connection->queryData("
                SELECT * FROM room
                WHERE owner_username='$username'
                ORDER BY create_time DESC
            ");
            return $res;
        }
        else{
            $num = $request->get('num');
            if(!is_numeric($num)){$num=50;}
            if($num>1000){$num=1000;}
            $res = $db_connection->queryData("
                SELECT * FROM room
                ORDER BY create_time DESC
                LIMIT $num
            ");
            return $res;
        }
    },
    '/core/editRoom'=>function(Request $request){
        if(accordUserAction($request)){
            $postobj = $request->post();
            $sessionId = $postobj['sessionId'];
            $user = getUser($sessionId);if(!$user){return 0;}
            $username = $user['username'];
            $room_id = $postobj['id'];
            $name = $postobj['name'];
            $info = $postobj['info'];
            $db_connection = new DataBaseConnection();
            $res = $db_connection->queryData("SELECT * FROM room WHERE owner_username='$username' AND id='$room_id'");
            if(count($res)==0 || empty($name)){return 0;}
            return $db_connection->executeData("
                UPDATE room
                SET name='$name',info='$info'
                WHERE id='$room_id'
            ")>0?1:0;
        }
        return 0;
    },
    '/core/deleteRoom'=>function(Request $request){
        if(accordUserAction($request)){
            $postobj = $request->post();
            $sessionId = $postobj['sessionId'];
            $user = getUser($sessionId);if(!$user){return 0;}
            $username = $user['username'];
            $room_id = $postobj['id'];
            $db_connection = new DataBaseConnection();
            $res = $db_connection->queryData("SELECT * FROM room WHERE owner_username='$username' AND id='$room_id'");
            if(count($res)==0){return 0;}
            return $db_connection->multiExecuteData("
                DELETE FROM room
                WHERE owner_username='$username' AND id='$room_id';
                DELETE FROM room_member
                WHERE room_id='$room_id';
                DELETE FROM message
                WHERE room_id='$room_id';
            ")>0?1:0;
        }
        return 0;
    },
    '/core/searchRooms'=>function(Request $request){
        if($text=$request->get('text')){
            $db_connection = new DataBaseConnection();
            return $db_connection->queryData("
                SELECT * FROM room
                WHERE name LIKE '%$text%' OR id LIKE '%$text%'
            ");
        }
        return 0;
    }
]+scanStaticAssets('assets');
