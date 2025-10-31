<?php
// websocket 处理


use ZhouZhou\PinkCandyChat\WebSocketManager;
use Workerman\Connection\TcpConnection;


$GLOBALS['websocket_events'] = [
    'hi'=>function(TcpConnection $connection,ClientSendData $clientSendData){
        $arr = print_r($clientSendData->getArrayData(),true);
        $m = "PINKCANDY: hi $arr";
        WebSocketManager::sendToClient($connection->id,$m,'info');
    },
    'send_message'=>function(TcpConnection $connection,ClientSendData $clientSendData){
        $user = getUser($clientSendData->getArrayData()['cookie']);
        // ...
        WebSocketManager::sendToClient($connection->id,"send_message ok",'info');
    }
];
