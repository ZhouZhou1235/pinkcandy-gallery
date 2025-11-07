<?php
// 业务函数集


use Workerman\Connection\TcpConnection;
use Workerman\Protocols\Http\Request;
use ZhouZhou\PinkCandyChat\WebSocketManager;
use ZhouZhou\PinkCandyChat\DataBaseConnection;


// 客户端连接动作
function onConnectFunction(TcpConnection $connection){
    WebSocketManager::addConnection($connection);
    WebSocketManager::broadcast('join connection '.$connection->getRemoteAddress());
}

// 客户端关闭动作
function onCloseFunction(TcpConnection $connection){
    $userdataArray = WebSocketManager::$connectionDataMap[$connection->id];
    if($userdataArray){
        $username = $userdataArray['username'];
        $db_connection = new DataBaseConnection();
        $res = $db_connection->queryData("SELECT * FROM room_member WHERE username='$username'");
        foreach($res as $obj){
            $room_id = $obj['room_id'];
            $theMemberArray = $db_connection->queryData("SELECT * FROM room_member WHERE room_id='$room_id'");
            foreach($theMemberArray as $m){
                $member_username = $m['username'];
                $connectionId = WebSocketManager::getUsernameConnetionId($member_username);
                if($connectionId==-1) continue;
                WebSocketManager::sendToClient($connectionId,"$member_username leave",'close');
            }
        }
    }
    WebSocketManager::removeConnection($connection);
    WebSocketManager::broadcast('leave connection '.$connection->getRemoteAddress());
}

// 收到消息动作
function onMessageFunction(TcpConnection $connection,mixed $data){
    $clientSendData = new ClientSendData($data);
    handleWebSocketData($connection,$clientSendData);
}

// 获取用户信息
function getUser(string $sessionId):array|false{
    $userString = httpGetRequest($GLOBALS['config']['pinkcandy_gallery_server'].'/core/getSessionUser?sessionid='.$sessionId);
    if(!$userString){return false;}
    $user = json_decode($userString,true);
    return $user;
}

// 用粉糖账号获取用户信息
function getUserByUsername(string $username){
    $userString = httpGetRequest($GLOBALS['config']['pinkcandy_gallery_server'].'/core/getUser/'.$username);
    if(!$userString){return false;}
    $user = json_decode($userString,true);
    return $user;
}

// 是否符合有效用户动作请求
function accordUserAction(Request $request){
    return $request->method()=='POST' && !empty($request->post('sessionId'));
}
