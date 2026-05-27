<?php

use Slim\Factory\AppFactory;
use App\Database\Database;
use App\Controllers\MainController;
use App\Controllers\SystemController;
use App\Services\MainService;

require __DIR__ . '/vendor/autoload.php';

$config = require __DIR__ . '/config/config.php';

Database::connect($config);

$sessionSavePath = $config['files']['sessions'];
if (!is_dir($sessionSavePath)) {
    mkdir($sessionSavePath, 0755, true);
}

$sessionConfig = [
    'name' => $config['session']['name'],
    'save_path' => $sessionSavePath,
    'cookie_lifetime' => $config['session']['lifetime'],
    'cookie_path' => $config['session']['path'],
    'cookie_secure' => $config['session']['secure'],
    'cookie_httponly' => $config['session']['httponly'],
    'cookie_samesite' => $config['session']['same_site'],
];

if ($config['session']['domain'] !== null) {
    $sessionConfig['cookie_domain'] = $config['session']['domain'];
}

session_start($sessionConfig);

$app = AppFactory::create();

$app->addBodyParsingMiddleware();

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        ->withHeader('Access-Control-Allow-Credentials', 'true');
});

$mainService = new MainService($config);
$mainController = new MainController($mainService);
$systemController = new SystemController();

(require __DIR__ . '/app/Routes/MainRoute.php')($app, $mainController, $config);
(require __DIR__ . '/app/Routes/SystemRoute.php')($app, $systemController);

$errorMiddleware = $app->addErrorMiddleware(true, true, true);

$app->run();
