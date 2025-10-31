<?php


namespace ZhouZhou\PinkCandyChat;
use EchoData;
use Workerman\Connection\TcpConnection;


/**
 * WebSocket 连接管理
 */
class WebSocketManager {
    /**
     * @var TcpConnection[]
     */
    public static $connections = [];
    /**
     * 添加连接
     */
    public static function addConnection(TcpConnection $connection){
        self::$connections[$connection->id] = $connection;
    }
    /**
     * 移除连接
     */
    public static function removeConnection(TcpConnection $connection){
        unset(self::$connections[$connection->id]);
    }
    /**
     * 广播消息
     */
    public static function broadcast(mixed $message){
        $data = new EchoData($message,'broadcast')->getArrayData();
        foreach(self::$connections as $connection){
            $connection->send(json_encode($data));
        }
    }
    /**
     * 发送消息给客户端
     */
    public static function sendToClient(int $clientId,mixed $message,string $type='private'){
        if(isset(self::$connections[$clientId])){
            $data = new EchoData($message,$type)->getArrayData();
            self::$connections[$clientId]->send(json_encode($data));
            return true;
        }
        return false;
    }
    /**
     * 获取在线客户端列表
     */
    public static function getClientsList(){
        return array_keys(self::$connections);
    }
}
