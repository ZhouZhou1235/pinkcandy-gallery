<?php
// http服务器


use Workerman\Connection\TcpConnection;
use Workerman\Worker;
use Workerman\Protocols\Http\Request;
require_once __DIR__.'/vendor/autoload.php';


$http_server = createServer(
    $GLOBALS['config']['http_server'],
    function(TcpConnection $connection,Request $request){
        $connection->send(handleRoute($request));
    }
);


Worker::runAll();
