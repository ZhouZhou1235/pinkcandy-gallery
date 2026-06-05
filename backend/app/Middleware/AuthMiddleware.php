<?php
// 认证中间件
namespace App\Middleware;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response;

class AuthMiddleware{
    public function __invoke(Request $request, RequestHandler $handler): Response{
        session_start();
        if (!isset($_SESSION['username'])) {
            $response = new Response();
            $response->getBody()->write(json_encode(['status' => 'error', 'message' => '未登录']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
        }
        return $handler->handle($request);
    }
}
