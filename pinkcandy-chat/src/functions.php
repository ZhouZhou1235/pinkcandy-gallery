<?php
// 函数集


use Workerman\Worker;
use Workerman\Protocols\Http\Request;
use Workerman\Connection\TcpConnection;
use ZhouZhou\PinkCandyChat\WebSocketManager;


/**
 * 创建workerman的worker服务器
 */ 
function createServer(string $socketName,callable $onMessageFunction,int $count=4){
    $server = new Worker($socketName);
    $server->count = $count;
    $server->onMessage = $onMessageFunction;
    return $server;
}

/**
 * HTTP路由处理
 */
function handleRoute(Request $request){
    $path = $request->path();
    $routes = $GLOBALS['routes'];
    if(isset($routes[$path])){
        $res = $routes[$path]($request);
        if($res===null){
            return 'PINKCANDY: function return nothing';
        }
        if(is_array($res)||is_object($res)){
            return json_encode($res);
        }
        else{
            return print_r($res,true);
        }
    }
    return new \Workerman\Protocols\Http\Response(404,[],'PINKCANDY: action not found');
}

/**
 * 静态文件服务函数
 */
function serveStaticFile(string $file_path,string $content_type) {
    if(file_exists($file_path)){
        $content = file_get_contents($file_path);
        return new \Workerman\Protocols\Http\Response(
            200,
            [
                'Content-Type'=>$content_type,
                'Content-Length' =>strlen($content)
            ],
            $content
        );
    }
    return new \Workerman\Protocols\Http\Response(404,[],'PINKCANDY: File Not Found');
}

/**
 * 扫描静态文件夹并生成路由
 */
function scanStaticAssets(string $assetsDir) {
    $routes = [];
    $baseDir = __DIR__ . '/' . $assetsDir;
    if (!is_dir($baseDir)) {
        return $routes;
    }
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($baseDir, RecursiveDirectoryIterator::SKIP_DOTS),
        RecursiveIteratorIterator::SELF_FIRST
    );
    $mimeTypes = [
        'css' => 'text/css',
        'js' => 'application/javascript',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'svg' => 'image/svg+xml',
        'ico' => 'image/x-icon',
        'html' => 'text/html',
        'htm' => 'text/html',
        'json' => 'application/json',
        'txt' => 'text/plain',
        'pdf' => 'application/pdf',
    ];
    foreach ($iterator as $file) {
        if ($file->isFile()) {
            $relativePath = str_replace('\\', '/', substr($file->getPathname(), strlen($baseDir)));
            $routePath = '/assets' . $relativePath;
            
            $extension = strtolower(pathinfo($file->getFilename(), PATHINFO_EXTENSION));
            $contentType = $mimeTypes[$extension] ?? 'application/octet-stream';
            
            $routes[$routePath] = function(Request $request) use ($file,$contentType) {
                return serveStaticFile($file->getPathname(),$contentType);
            };
        }
    }
    return $routes;
}

// 处理客户端发来的websocket信息
function handleWebSocketData(TcpConnection $connection,ClientSendData $clientSendData){
    $websocket_events = $GLOBALS['websocket_events'];
    $action = $clientSendData->getArrayData()['action'];
    if(isset($websocket_events[$action])){
        $websocket_events[$action]($connection,$clientSendData);
    }
    else{
        WebSocketManager::sendToClient(
            $connection->id,
            'PINKCANDY: unknown action.',
            'error'
        );
    }
}

// HTTP GET 请求
function httpGetRequest(string $url){
    $result = '';
    $ch = curl_init();
    curl_setopt($ch,CURLOPT_URL, $url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch,CURLOPT_TIMEOUT,30);
    $result = curl_exec($ch);
    if(curl_error($ch)){
        $result=curl_error($ch);
    }
    curl_close($ch);
    return $result;
}

// HTTP POST 请求
function httpPostRequest(string $url,array $params=[],array $header=[]){
    $result = '';
    $ch = curl_init();
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($ch,CURLOPT_POST,true);
    curl_setopt($ch,CURLOPT_POSTFIELDS,$params);
    curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
    curl_setopt($ch,CURLOPT_TIMEOUT,30);
    if(!empty($header)){
        curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
    }
    $result = curl_exec($ch);
    if(curl_error($ch)){
        $result = curl_error($ch);
    }
    curl_close($ch);
    return $result;
}

/**
 * 检查SQL是否为查询语句
 */
function isSelectQuery(string $sql){
    $trimmedSql = trim($sql);
    $firstWord = strtoupper(strtok($trimmedSql, " "));
    return $firstWord === 'SELECT' || $firstWord === 'SHOW' || $firstWord === 'DESC' || $firstWord === 'DESCRIBE';
}
/**
 * 检查SQL是否为操作语句
 */
function isManipulationQuery(string $sql){
    $trimmedSql = trim($sql);
    $firstWord = strtoupper(strtok($trimmedSql, " "));
    return in_array($firstWord, ['INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'TRUNCATE']);
}
