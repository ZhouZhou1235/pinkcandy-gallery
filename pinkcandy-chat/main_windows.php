<?php
// Windows 启动
// php main_windows.php http
// php main_windows.php websocket


use Workerman\Worker;
use Workerman\Connection\TcpConnection;
use Workerman\Protocols\Http\Request;
require_once __DIR__.'/vendor/autoload.php';


$serverType = $argv[1] ?? '';
if($serverType==='http'){
    $http_server = new Worker($GLOBALS['config']['http_server']);
    $http_server->count = 1;
    $http_server->onMessage = function(TcpConnection $connection, Request $request){
        $connection->send(handleRoute($request));
    };
}
else if($serverType==='websocket'){
    $socket_server = new Worker($GLOBALS['config']['websocket_server']);
    $socket_server->count = 1;
    $socket_server->onMessage = function(TcpConnection $connection, mixed $data){
        onMessageFunction($connection, $data);
    };
    $socket_server->onConnect = function(TcpConnection $connection){
        onConnectFunction($connection);
    };
    $socket_server->onClose = function(TcpConnection $connection){
        onCloseFunction($connection);
    };
}
else{
    echo "PINKCANDY: usage: php main_windows.php <http|websocket>\n";
    exit(1);
}

Worker::runAll();
