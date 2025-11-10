// 配置


import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';


// 系统目录 ES标准实现 CommonJS __dirname
export const workPath = dirname(fileURLToPath(import.meta.url));

const config = {
    HOST: '0.0.0.0', // 主机
    LISTEN_PORT: 8081, // 运行端口
    TEXT_ENCODING: 'utf8', // 文本编码
    // session
    SESSION_secret: 'pinkcandy gallery', // session会话密钥
    SESSION_name: 'PINKCANDY_USER',
    SESSION_cookie: {maxAge:1000*60*60*24*7},
    SESSION_resave: true,
    SESSION_saveUninitialized: true,
    SESSION_effectiveTime: 1000*60*5, // 有效时间
    SESSION_fileStore: {
        path: workPath+'/files/sessions',
        ttl: 1000*60*60*24*7, // session过期时间
        retries: 0 // 重试次数
    },
    // 数据库
    DATABASE_mysql: { // MySQL 配置
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'pinkcandy_gallery',
    },
    DATABASE_sequelize: { // ORM 数据模型映射
        host: 'localhost',
        post: 3306,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 3,
            idle: 10000,
        }
    },
    DATABASE_defaultLimit: 50,
    // 文件系统
    FILE_fileHub: {
        root: workPath+'/files',
        gallery: workPath+'/files/gallery/',
        galleryPreview: workPath+'/files/GalleryPreview/',
        headimage: workPath+'/files/headimage/',
        backimage: workPath+'/files/backimage/',
        tmp: workPath+'/files/tmp/',
        sessions: workPath+'/files/sessions', // 关联SESSION_fileStore
    },
    FILE_staticURL: workPath+'/static',
    FILE_imageAllowExtension: [
        'jpg','gif','jpeg','png',
        'PNG','JPG','GIF',
        'tif','tiff'
    ],
    FILE_uploadLimit: '50mb',
    FILE_imageResizeNum: 256,
    // 邮件模块
    MAILER_transport: {
        host: 'smtp.qq.com',
        service: 'qq',
        secure: true,
        auth: {
            user: '1479499289@qq.com',
            pass: '......',
        },
    },
    // 跨域设置
    CORS_options: {
        // origin: ['http://localhost:5173'], // 白名单
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: ['Content-Type','Authorization'],
        credentials: true, // 允许携带Cookie
        maxAge: 86400, // 预检请求缓存时间
    },
};

export default config;
