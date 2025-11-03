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
    'send_message'=>function(TcpConnection $connection,ClientSendData $clientSendData){
        $arr = $clientSendData->getArrayData();
        $user = getUser($arr['cookie']);
        $data = $arr['data'];
        if($user && !empty($data['content'])){
            $username = $user['username'];
            $room_id = $data['id'];
            $content = $data['content'];
            $db_connection = new DataBaseConnection();
            if(count($db_connection->queryData("SELECT username FROM room_member WHERE username='$username'"))==0){
                WebSocketManager::sendToClient($connection->id,"send message failed",'error');
            }
            $ok = $db_connection->executeData("
                INSERT INTO message(username,content,type,room_id)
                VALUES('$username','$content','text','$room_id')
            ");
            if($ok){
                WebSocketManager::sendToClient($connection->id,"send message done",'send_done');
                WebSocketManager::broadcast("$username send a message",'update');
            }
            else{
                WebSocketManager::sendToClient($connection->id,"send message failed",'error');
            }
        }
    }
];
