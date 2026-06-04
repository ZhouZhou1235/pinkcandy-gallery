<?php

use Slim\App;

return function (App $app, $systemController) {
    $app->get('/', [$systemController, 'index']);
    
    $app->get('/admin/login', [$systemController, 'loginPage']);
    $app->post('/admin/login', [$systemController, 'login']);
    $app->get('/admin/logout', [$systemController, 'logout']);
    $app->get('/admin/dashboard', [$systemController, 'dashboard']);
    $app->get('/admin/users', [$systemController, 'users']);
    $app->get('/admin/users/delete/{id}', [$systemController, 'deleteUser']);
    $app->get('/admin/artworks', [$systemController, 'artworks']);
    $app->get('/admin/artworks/delete/{id}', [$systemController, 'deleteArtwork']);
    $app->get('/admin/artworks/regenerate-thumbnail/{id}', [$systemController, 'regenerateSingleThumbnail']);
    $app->get('/admin/comments', [$systemController, 'comments']);
    $app->get('/admin/comments/delete/{id}', [$systemController, 'deleteComment']);
    $app->get('/admin/resources', [$systemController, 'resources']);
    $app->post('/admin/resources/clear-sessions', [$systemController, 'clearSessions']);
    $app->get('/admin/settings', [$systemController, 'settings']);
    $app->post('/admin/settings/add', [$systemController, 'addAdmin']);
    $app->get('/admin/settings/remove/{username}', [$systemController, 'removeAdmin']);

    $app->get('/favicon.ico', function ($request, $response) {
        return $response->withStatus(204);
    });
};
