<?php
// 初始化服务
namespace App\Services;

use App\Database\Database;
use Slim\Factory\AppFactory;
use Slim\Psr7\Response;

class InitService{
    private $app;
    private $config;

    public function __construct(array $config){
        $this->config = $config;
    }

    // 初始化应用
    public function initialize(): \Slim\App{
        $this->connectDatabase();
        $this->initializeSession();
        $this->app = AppFactory::create();
        $this->app->addBodyParsingMiddleware();
        $this->addCorsMiddleware();
        return $this->app;
    }

    // 连接数据库
    private function connectDatabase(): void{
        Database::connect($this->config);
    }

    // 初始化Session
    private function initializeSession(): void{
        $lifetime = (int)$this->config['session']['lifetime'];
        ini_set('session.gc_maxlifetime', (string)$lifetime);
        $sessionConfig = [
            'name' => $this->config['session']['name'],
            'cookie_lifetime' => $lifetime,
            'cookie_path' => $this->config['session']['path'],
            'cookie_secure' => $this->config['session']['secure'],
            'cookie_httponly' => $this->config['session']['httponly'],
            'cookie_samesite' => $this->config['session']['same_site'],
        ];
        if ($this->config['session']['domain'] !== null) {
            $sessionConfig['cookie_domain'] = $this->config['session']['domain'];
        }
        session_start($sessionConfig);
    }

    // 添加CORS中间件
    private function addCorsMiddleware(): void{
        $this->app->add(function ($request, $handler){
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
        $this->app->add(function ($request, $handler){
            $response = $handler->handle($request);
            $origin = $request->getHeaderLine('Origin');
            return $response
                ->withHeader('Access-Control-Allow-Origin', $origin ?: '*')
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
                ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
                ->withHeader('Access-Control-Allow-Credentials', 'true');
        });
    }

    // 注册路由
    public function registerRoutes(array $controllers, array $dependencies = []): void{
        $routesPath = __DIR__ . '/../Routes/';
        foreach (glob($routesPath . '*.php') as $routeFile) {
            $routeConfig = require $routeFile;
            $baseName = basename($routeFile, '.php');
            if (isset($dependencies[$baseName])) {
                $routeConfig($this->app, ...$dependencies[$baseName]);
            } else {
                $routeConfig($this->app, $controllers[$baseName] ?? null);
            }
        }
    }

    // 运行应用
    public function run(): void{
        $this->app->addErrorMiddleware(true, true, true);
        $this->app->run();
    }
}
