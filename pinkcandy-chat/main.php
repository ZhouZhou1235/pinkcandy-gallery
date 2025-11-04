<?php
// 启动


use Workerman\Worker;
use Workerman\Connection\TcpConnection;
use Workerman\Protocols\Http\Request;
require_once __DIR__.'/vendor/autoload.php';


// HTTP 服务
$http_server = new Worker($GLOBALS['config']['http_server']);
$http_server->count = 4;
$http_server->onMessage = function(TcpConnection $connection, Request $request) {
    $connection->send(handleRoute($request));
};

// WebSocket 服务
$socket_server = new Worker($GLOBALS['config']['websocket_server']);
$socket_server->count = 4;
$socket_server->onMessage = function(TcpConnection $connection, mixed $data) {
    onMessageFunction($connection, $data);
};
$socket_server->onConnect = function(TcpConnection $connection) {
    onConnectFunction($connection);
};
$socket_server->onClose = function(TcpConnection $connection) {
    onCloseFunction($connection);
};

Worker::runAll();
