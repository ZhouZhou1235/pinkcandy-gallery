<?php
// 配置文件
return [
    'host' => '0.0.0.0',
    'port' => 8082,
    'encoding' => 'utf-8',

    'session' => [
        'secret' => 'pinkcandy gallery',
        'name' => 'PINKCANDYUSER',
        'lifetime' => 7 * 24 * 60 * 60,
        'path' => '/',
        'domain' => null,
        'secure' => false,
        'httponly' => true,
        'same_site' => 'Lax',
    ],

    'database' => [
        'mysql' => [
            'host' => 'localhost',
            'port' => 3306,
            'database' => 'pinkcandy_gallery',
            'username' => 'root',
            'password' => '123456',
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
        ],
    ],

    'files' => [
        'root' => __DIR__ . '/../storage',
        'gallery' => __DIR__ . '/../storage/gallery/',
        'galleryPreview' => __DIR__ . '/../storage/GalleryPreview/',
        'headimage' => __DIR__ . '/../storage/headimage/',
        'backimage' => __DIR__ . '/../storage/backimage/',
        'sessions' => __DIR__ . '/../storage/sessions/',
    ],

    'upload' => [
        'max_size' => 50 * 1024 * 1024,
        'allowed_extensions' => ['jpg', 'jpeg', 'png', 'gif', 'tif', 'tiff', 'JPG', 'JPEG', 'PNG'],
        'image_resize' => 256,
    ],

    'mailer' => [
        'host' => 'smtp.qq.com',
        'port' => 465,
        'secure' => true,
        'username' => '1479499289@qq.com',
        'password' => '',
        'from' => '1479499289@qq.com',
    ],

    'cors' => [
        'allowed_origins' => ['*'],
        'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        'allowed_headers' => ['Content-Type', 'Authorization'],
        'allow_credentials' => true,
        'max_age' => 86400,
    ],
];
