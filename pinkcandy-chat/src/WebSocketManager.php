<?php


namespace ZhouZhou\PinkCandyChat;
use EchoData;
use UserData;
use Workerman\Connection\TcpConnection;


/**
 * WebSocket 连接管理器
 */
class WebSocketManager {
    /**
     * 连接实例列表
     * @var TcpConnection[]
     */
    public static array $connections = [];
    /**
     * 连接实例与数据映射表
     * 连接id => 用户数据
     */
    public static array $connectionDataMap = [];
    /**
     * 添加连接
     */
    public static function addConnection(TcpConnection $connection){
        self::$connections[$connection->id] = $connection;
    }
    /**
     * 添加连接与用户数据的映射 
     */
    public static function addConnectionData(int $connectionId,UserData $userData){
        self::$connectionDataMap[$connectionId] = $userData->getArrayData();
    }
    /**
     * 移除连接
     */
    public static function removeConnection(TcpConnection $connection){
        unset(self::$connections[$connection->id]);
        if(array_key_exists($connection->id,self::$connectionDataMap)){
            unset(self::$connectionDataMap[$connection->id]);
        }
    }
    /**
     * 广播消息
     */
    public static function broadcast(mixed $message,string $type='broadcast'){
        $data = new EchoData($message,$type)->getArrayData();
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
     * 获取用户的连接实例Id
     */
    public static function getUsernameConnetionId(string $username):int{
        $keys = array_keys(self::$connectionDataMap);        
        for($i=0;$i<count($keys);$i++){
            $key = $keys[$i];
            $userdata = self::$connectionDataMap[$key];            
            if($userdata['username']==$username){return $key;}
        }
        return -1;
    }
}
