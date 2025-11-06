<?php
// websocket 处理


use ZhouZhou\PinkCandyChat\DataBaseConnection;
use ZhouZhou\PinkCandyChat\WebSocketManager;
use Workerman\Connection\TcpConnection;


$GLOBALS['websocket_events'] = [
    'hi'=>function(TcpConnection $connection,ClientSendData $clientSendData){
        $arr = print_r($clientSendData->getArrayData(),true);
        $m = "PINKCANDY: hi $arr";
        WebSocketManager::sendToClient($connection->id,$m,'info');
    },
    'ping'=>function(TcpConnection $connection,ClientSendData $clientSendData){
        WebSocketManager::sendToClient($connection->id,'pong','pong');
    },
    'send_message'=>function(TcpConnection $connection,ClientSendData $clientSendData){
        $arr = $clientSendData->getArrayData();
        $user = getUser($arr['cookie']);
        $data = $arr['data'];
        if($user && !empty($data['content'])){
            $username = $user['username'];
            $room_id = $data['id'];
            $content = $data['content'];
            $db_connection = new DataBaseConnection();
            if(count($db_connection->queryData("SELECT username FROM room_member WHERE username='$username' AND room_id='$room_id'"))==0){
                WebSocketManager::sendToClient($connection->id,"send message failed",'error');
                return;
            }
            $ok = $db_connection->executeData("
                INSERT INTO message(username,content,type,room_id)
                VALUES('$username','$content','text','$room_id')
            ");
            if($ok){
                $res = $db_connection->queryData("SELECT * FROM room_member WHERE room_id='$room_id'");
                foreach($res as $obj){
                    $username = $obj['username'];
                    $connectionId = WebSocketManager::getUsernameConnetionId($username);
                    WebSocketManager::sendToClient($connectionId,"$username send a message: $content",'send_message');
                }
                WebSocketManager::sendToClient($connection->id,"send message done",'info');
            }
            else{
                WebSocketManager::sendToClient($connection->id,"send message failed",'error');
            }
        }
    },
    'connect'=>function(TcpConnection $connection,ClientSendData $clientSendData){
        $arr = $clientSendData->getArrayData();
        $room_id = $arr['data']['id']!=null?$arr['data']['id']:null;
        $user = getUser($arr['cookie']);
        if($user && $room_id){
            $db_connection = new DataBaseConnection();
            $userdata = new UserData(json_encode($user));
            WebSocketManager::addConnectionData($connection->id,$userdata);
            $res = $db_connection->queryData("SELECT * FROM room_member WHERE room_id='$room_id'");
            $current_username = $user['username']; // 获取当前连接用户的用户名
            foreach($res as $obj){
                $username = $obj['username'];
                if($username == $current_username) continue;
                $connectionId = WebSocketManager::getUsernameConnetionId($username);
                if($connectionId!=-1){
                    WebSocketManager::sendToClient($connectionId,$current_username.' join room','connect');
                }
            }
            WebSocketManager::sendToClient($connection->id,"connected successfully",'info');
        }
        else{
            WebSocketManager::sendToClient($connection->id,"connect failed",'error');
        }
    },
    'get_online_room_member'=>function(TcpConnection $connection,ClientSendData $clientSendData){
        $arr = $clientSendData->getArrayData();
        $data = $arr['data'];
        $onlineUsernameList = [];
        if($room_id=$data['id']){
            $db_connection = new DataBaseConnection();
            $res = $db_connection->queryData("SELECT * FROM room_member WHERE room_id='$room_id'");
            foreach($res as $obj){
                $username = $obj['username'];
                if(WebSocketManager::getUsernameConnetionId($username)!=-1){
                    array_push($onlineUsernameList,$username);
                }
            }
        }
        WebSocketManager::sendToClient($connection->id,$onlineUsernameList,'get_online_room_member');
    },
    'call_room_member_update'=>function(TcpConnection $connection,ClientSendData $clientSendData){
        $arr = $clientSendData->getArrayData();
        $data = $arr['data'];
        if($room_id=$data['id']){
            $db_connection = new DataBaseConnection();
            $res = $db_connection->queryData("SELECT * FROM room_member WHERE room_id='$room_id'");
            foreach($res as $obj){
                $username = $obj['username'];
                $connectionId = WebSocketManager::getUsernameConnetionId($username);
                if($connectionId!=-1){
                    $ip = $connection->getRemoteIp();
                    WebSocketManager::sendToClient($connectionId,"$ip call update",'call_room_member_update');
                }
            }
        }
    },
];
