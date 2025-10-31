<?php
// websocket服务器


use Workerman\Connection\TcpConnection;
use Workerman\Worker;
require_once __DIR__.'/vendor/autoload.php';


$socket_server = createServer(
    $GLOBALS['config']['websocket_server'],
    function(TcpConnection $connection,mixed $data){onMessageFunction($connection,$data);}
);
$socket_server->onConnect = function(TcpConnection $connection){onConnectFunction($connection);};
$socket_server->onClose = function(TcpConnection $connection){onCloseFunction($connection);};


Worker::runAll();
