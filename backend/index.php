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
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        ->withHeader('Access-Control-Allow-Credentials', 'true');
});

$app->map(['OPTIONS'], '{routes:.+}', function ($request, $response) {
    return $response;
});

$mainService = new MainService($config);
$mainController = new MainController($mainService);
$systemController = new SystemController();

$app->get('/', [$systemController, 'index']);

$app->get('/core/getUser/{username}', [$mainController, 'getUser']);
$app->get('/core/getSessionUser', [$mainController, 'getSessionUser']);
$app->get('/core/getArtworks', [$mainController, 'getArtworks']);
$app->get('/core/getTags', [$mainController, 'getTags']);
$app->get('/core/getBoradMessages', [$mainController, 'getBoardMessages']);
$app->get('/core/getDBRecordCount', [$mainController, 'getDBRecordCount']);
$app->get('/core/getArtwork', [$mainController, 'getArtwork']);
$app->get('/core/getTagsArtwork/{id}', [$mainController, 'getTagsArtwork']);
$app->get('/core/getArtworkComments', [$mainController, 'getArtworkComments']);
$app->get('/core/getCommentGalleryCount', [$mainController, 'getCommentGalleryCount']);
$app->get('/core/getArtworkPawAreaInfo', [$mainController, 'getArtworkPawAreaInfo']);
$app->get('/core/getUserInfoCount', [$mainController, 'getUserInfoCount']);
$app->get('/core/getUserWatch', [$mainController, 'getUserWatch']);
$app->get('/core/getStarArtworks', [$mainController, 'getStarArtworks']);
$app->get('/core/getUserStarInfoCount', [$mainController, 'getUserStarInfoCount']);
$app->get('/core/searchTags', [$mainController, 'searchTags']);
$app->get('/core/searchPinkCandy', [$mainController, 'searchPinkCandy']);
$app->get('/core/getRegisterableUsername', [$mainController, 'getRegisterableUsername']);
$app->get('/core/getNoticenum', [$mainController, 'getNoticenum']);
$app->get('/core/getUserNoticePawArtwork', [$mainController, 'getUserNoticePawArtwork']);
$app->get('/core/getUserNoticeTextEcho', [$mainController, 'getUserNoticeTextEcho']);
$app->get('/core/getUserNoticeWatcher', [$mainController, 'getUserNoticeWatcher']);
$app->get('/core/getTrendnum', [$mainController, 'getTrendnum']);
$app->get('/core/getUserTrendUsers', [$mainController, 'getUserTrendUsers']);
$app->get('/core/getUserTrendArtworks', [$mainController, 'getUserTrendArtworks']);

$app->post('/core/checkLogin', [$mainController, 'checkLogin']);
$app->post('/core/getSessionId', [$mainController, 'getSessionId']);
$app->post('/core/login', [$mainController, 'login']);
$app->post('/core/logout', [$mainController, 'logout']);
$app->post('/core/uploadArtwork', [$mainController, 'uploadArtwork']);
$app->post('/core/getRegisterCode', [$mainController, 'getRegisterCode']);
$app->post('/core/register', [$mainController, 'register']);
$app->post('/core/getResetPasswordCode', [$mainController, 'getResetPasswordCode']);
$app->post('/core/resetPassword', [$mainController, 'resetPassword']);
$app->post('/core/addBoardMessage', [$mainController, 'addBoardMessage']);
$app->post('/core/editUser', [$mainController, 'editUser']);
$app->post('/core/editUserImage', [$mainController, 'editUserImage']);
$app->post('/core/getEditUserImportantCode', [$mainController, 'getEditUserImportantCode']);
$app->post('/core/editUserImportant', [$mainController, 'editUserImportant']);
$app->post('/core/clearUserImage', [$mainController, 'clearUserImage']);
$app->post('/core/sendCommentArtwork', [$mainController, 'sendCommentArtwork']);
$app->post('/core/pawArtworkMedia', [$mainController, 'pawArtworkMedia']);
$app->post('/core/starArtworkMedia', [$mainController, 'starArtworkMedia']);
$app->post('/core/haveWatch', [$mainController, 'haveWatch']);
$app->post('/core/watchUser', [$mainController, 'watchUser']);
$app->post('/core/editArtwork', [$mainController, 'editArtwork']);
$app->post('/core/deleteArtwork', [$mainController, 'deleteArtwork']);
$app->post('/core/editTag', [$mainController, 'editTag']);
$app->post('/core/deleteTag', [$mainController, 'deleteTag']);
$app->post('/core/noticeFinishRead', [$mainController, 'noticeFinishRead']);
$app->post('/core/noticeNotRead', [$mainController, 'noticeNotRead']);
$app->post('/core/trendFinishRead', [$mainController, 'trendFinishRead']);
$app->post('/core/trendNotRead', [$mainController, 'trendNotRead']);

$app->get('/files/gallery/{filename}', function ($request, $response, $args) use ($config) {
    $filename = $args['filename'];
    $filePath = $config['files']['gallery'] . $filename;
    
    if (!file_exists($filePath)) {
        return $response->withStatus(404);
    }
    
    $response = $response->withHeader('Content-Type', mime_content_type($filePath));
    $response->getBody()->write(file_get_contents($filePath));
    return $response;
});

$app->get('/files/headimage/{filename}', function ($request, $response, $args) use ($config) {
    $filename = $args['filename'];
    $filePath = $config['files']['headimage'] . $filename;
    
    if (!file_exists($filePath)) {
        return $response->withStatus(404);
    }
    
    $response = $response->withHeader('Content-Type', mime_content_type($filePath));
    $response->getBody()->write(file_get_contents($filePath));
    return $response;
});

$app->get('/files/backimage/{filename}', function ($request, $response, $args) use ($config) {
    $filename = $args['filename'];
    $filePath = $config['files']['backimage'] . $filename;
    
    if (!file_exists($filePath)) {
        return $response->withStatus(404);
    }
    
    $response = $response->withHeader('Content-Type', mime_content_type($filePath));
    $response->getBody()->write(file_get_contents($filePath));
    return $response;
});

$app->get('/files/GalleryPreview/{filename}', function ($request, $response, $args) use ($config) {
    $filename = $args['filename'];
    $filePath = $config['files']['galleryPreview'] . $filename;
    
    if (!file_exists($filePath)) {
        return $response->withStatus(404);
    }
    
    $response = $response->withHeader('Content-Type', mime_content_type($filePath));
    $response->getBody()->write(file_get_contents($filePath));
    return $response;
});

$app->get('/admin/login', [$systemController, 'loginPage']);
$app->post('/admin/login', [$systemController, 'login']);
$app->get('/admin/logout', [$systemController, 'logout']);
$app->get('/admin/dashboard', [$systemController, 'dashboard']);
$app->get('/admin/users', [$systemController, 'users']);
$app->get('/admin/users/delete/{id}', [$systemController, 'deleteUser']);
$app->get('/admin/artworks', [$systemController, 'artworks']);
$app->get('/admin/artworks/delete/{id}', [$systemController, 'deleteArtwork']);
$app->get('/admin/comments', [$systemController, 'comments']);
$app->get('/admin/comments/delete/{id}', [$systemController, 'deleteComment']);
$app->get('/admin/resources', [$systemController, 'resources']);
$app->post('/admin/resources/regenerate-thumbnails', [$systemController, 'regenerateThumbnails']);
$app->post('/admin/resources/clear-sessions', [$systemController, 'clearSessions']);
$app->get('/admin/settings', [$systemController, 'settings']);
$app->post('/admin/settings/add', [$systemController, 'addAdmin']);
$app->get('/admin/settings/remove/{username}', [$systemController, 'removeAdmin']);

$errorMiddleware = $app->addErrorMiddleware(true, true, true);

$app->run();
