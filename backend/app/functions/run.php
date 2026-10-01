<?php
// 运行
namespace App\functions;

use App\Controllers\MainController;
use App\Controllers\SystemController;
use App\Database\Database;
use Slim\Factory\AppFactory;
use Slim\Psr7\Response;

// 加载数据库
function load_database(Array $config){Database::connect($config);}

// 设置并启动session会话
function set_session(Array $config){
    $lifetime = (int)$config['session']['lifetime'];
    ini_set('session.gc_maxlifetime',(string)$lifetime);
    $sessionConfig = [
        'name' => $config['session']['name'],
        'cookie_lifetime' => $lifetime,
        'cookie_path' => $config['session']['path'],
        'cookie_secure' => $config['session']['secure'],
        'cookie_httponly' => $config['session']['httponly'],
        'cookie_samesite' => $config['session']['same_site'],
    ];
    if($config['session']['domain']!=null){
        $sessionConfig['cookie_domain'] = $config['session']['domain'];
    }
    session_start($sessionConfig);
}

// 创建Slim应用单例
function create_app():\Slim\App{
    $app = AppFactory::create();
    $app->add(function ($request, $handler){
        if ($request->getMethod() === 'OPTIONS') {
            $origin = $request->getHeaderLine('Origin');
            $response = new Response();
            return $response
                ->withHeader('Access-Control-Allow-Origin', $origin ?: '*')
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
                ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
                ->withHeader('Access-Control-Allow-Credentials', 'true')
                ->withStatus(200);
        }
        return $handler->handle($request);
    });
    $app->add(function ($request, $handler){
        $response = $handler->handle($request);
        $origin = $request->getHeaderLine('Origin');
        return $response
            ->withHeader('Access-Control-Allow-Origin', $origin ?: '*')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            ->withHeader('Access-Control-Allow-Credentials', 'true');
    });
    $app->addBodyParsingMiddleware();
    $app->addErrorMiddleware(true, true, true);
    return $app;
}

// 加载路由
function load_routes(\Slim\App $app,Array $config){
    (require __DIR__.'/../Routes/MainRoute.php')($app,new MainController($config),$config);
    (require __DIR__.'/../Routes/SystemRoute.php')($app,new SystemController());
}

// 运行应用
function run_app(Array $config){
    $app = create_app();
    load_database($config);
    set_session($config);
    load_routes($app,$config);
    $app->run();
}
