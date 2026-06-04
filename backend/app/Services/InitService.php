<?php

namespace App\Services;

use App\Database\Database;
use App\Services\JsonSessionHandler;
use Slim\Factory\AppFactory;
use Slim\Psr7\Response;

class InitService
{
    private $app;
    private $config;

    public function __construct(array $config)
    {
        $this->config = $config;
    }

    public function initialize(): \Slim\App
    {
        $this->connectDatabase();
        $this->initializeSession();
        
        $this->app = AppFactory::create();
        $this->app->addBodyParsingMiddleware();
        $this->addCorsMiddleware();
        
        return $this->app;
    }

    private function connectDatabase(): void
    {
        Database::connect($this->config);
    }

    private function initializeSession(): void
    {
        $sessionSavePath = $this->config['files']['sessions'];
        if (!is_dir($sessionSavePath)) {
            mkdir($sessionSavePath, 0755, true);
        }

        $handler = new JsonSessionHandler($this->config);
        session_set_save_handler($handler, true);

        $sessionConfig = [
            'name' => $this->config['session']['name'],
            'cookie_lifetime' => $this->config['session']['lifetime'],
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

    private function addCorsMiddleware(): void
    {
        $this->app->add(function ($request, $handler) {
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

        $this->app->add(function ($request, $handler) {
            $response = $handler->handle($request);
            $origin = $request->getHeaderLine('Origin');
            return $response
                ->withHeader('Access-Control-Allow-Origin', $origin ?: '*')
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
                ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
                ->withHeader('Access-Control-Allow-Credentials', 'true');
        });
    }

    public function registerRoutes(array $controllers, array $dependencies = []): void
    {
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

    public function run(): void
    {
        $this->app->addErrorMiddleware(true, true, true);
        $this->app->run();
    }
}
