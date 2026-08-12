<?php
// 主业务路由
use Slim\App;

return function (App $app, $mainController, $config){
    $app->get('/core/getUser/{username}', [$mainController, 'getUser']);
    $app->get('/core/getSessionUser', [$mainController, 'getSessionUser']);
    $app->get('/core/getArtworks', [$mainController, 'getArtworks']);
    $app->get('/core/getTags', [$mainController, 'getTags']);
    $app->get('/core/getBoradMessages', [$mainController, 'getBoardMessages']);
    $app->get('/core/getDBRecordCount', [$mainController, 'getDBRecordCount']);
    $app->get('/core/getArtworkVisibleCount', [$mainController, 'getArtworkVisibleCount']);
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
    $app->post('/core/noticeFinishRead', [$mainController, 'noticeFinishRead']);
    $app->post('/core/noticeNotRead', [$mainController, 'noticeNotRead']);
    $app->post('/core/trendFinishRead', [$mainController, 'trendFinishRead']);
    $app->post('/core/trendNotRead', [$mainController, 'trendNotRead']);

    // 作品文件访问
    $app->get('/files/gallery/{filename}', function ($request, $response, $args) use ($config){
        $filename = $args['filename'];
        $filePath = $config['files']['gallery'] . $filename;
        if (!file_exists($filePath)) {
            return $response->withStatus(404);
        }
        $response = $response->withHeader('Content-Type', mime_content_type($filePath));
        $response->getBody()->write(file_get_contents($filePath));
        return $response;
    });

    // 头像文件访问
    $app->get('/files/headimage/{filename}', function ($request, $response, $args) use ($config){
        $filename = $args['filename'];
        $filePath = $config['files']['headimage'] . $filename;
        if (!file_exists($filePath)) {
            return $response->withStatus(404);
        }
        $response = $response->withHeader('Content-Type', mime_content_type($filePath));
        $response->getBody()->write(file_get_contents($filePath));
        return $response;
    });

    // 背景图文件访问
    $app->get('/files/backimage/{filename}', function ($request, $response, $args) use ($config){
        $filename = $args['filename'];
        $filePath = $config['files']['backimage'] . $filename;
        if (!file_exists($filePath)) {
            return $response->withStatus(404);
        }
        $response = $response->withHeader('Content-Type', mime_content_type($filePath));
        $response->getBody()->write(file_get_contents($filePath));
        return $response;
    });

    // 作品预览图访问
    $app->get('/files/GalleryPreview/{filename}', function ($request, $response, $args) use ($config){
        $filename = $args['filename'];
        $filePath = $config['files']['galleryPreview'] . $filename;
        if (!file_exists($filePath)) {
            return $response->withStatus(404);
        }
        $response = $response->withHeader('Content-Type', mime_content_type($filePath));
        $response->getBody()->write(file_get_contents($filePath));
        return $response;
    });
};
