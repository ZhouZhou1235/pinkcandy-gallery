<?php
// 业务函数集


use Workerman\Connection\TcpConnection;
use Workerman\Protocols\Http\Request;
use ZhouZhou\PinkCandyChat\WebSocketManager;


// 客户端连接动作
function onConnectFunction(TcpConnection $connection){
    WebSocketManager::addConnection($connection);
    WebSocketManager::broadcast('join connection '.$connection->getRemoteAddress());
}

// 客户端关闭动作
function onCloseFunction(TcpConnection $connection){
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
    if(!json_validate($userString)){return false;}
    $user = json_decode($userString,true);
    return $user;
}

// 是否符合有效用户动作请求
function accordUserAction(Request $request){
    return $request->method()=='POST' && !empty($request->post('sessionId'));
}
