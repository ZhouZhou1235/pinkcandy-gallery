// 启动服务

import express from 'express';
import config from './config.js';
import { loadMachineController } from './core/controller.js';
import session from 'express-session';
import fileUpload from 'express-fileupload';
import { createFilesDir } from './core/work.js';
import cors from 'cors';

// 运行
function run(){
    const Machine = express();
    Machine.use(session({
        secret:config.SESSION_secret,
        name:config.SESSION_name,
        cookie:config.SESSION_cookie,
        resave:config.SESSION_resave,
        saveUninitialized:config.SESSION_saveUninitialized,
    }));
    Machine.use(express.json())
    Machine.use(express.urlencoded({
        extended:true,
        limit: config.FILE_uploadLimit,
    }));
    Machine.use(fileUpload({
        createParentPath: true,
        defParamCharset: config.TEXT_ENCODING,
        limits: config.FILE_uploadLimit,
    }));
    Machine.use(express.static(config.FILE_fileHub.root));
    Machine.use(cors(config.CORS_options));
    Machine.listen(config.LISTEN_PORT);
    loadMachineController(Machine);
    createFilesDir();
    console.log('PINKCANDY: init ok. machine running at http://localhost:'+config.LISTEN_PORT);
}

run();
