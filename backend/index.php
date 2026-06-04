<?php

use App\Controllers\MainController;
use App\Controllers\SystemController;
use App\Services\InitService;
use App\Services\MainService;

require __DIR__ . '/vendor/autoload.php';

$config = require __DIR__ . '/config/config.php';

$init = new InitService($config);
$app = $init->initialize();

$mainService = new MainService($config);
$mainController = new MainController($mainService);
$systemController = new SystemController();

(require __DIR__ . '/app/Routes/MainRoute.php')($app, $mainController, $config);
(require __DIR__ . '/app/Routes/SystemRoute.php')($app, $systemController);

$init->run();
