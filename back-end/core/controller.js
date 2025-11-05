// 控制器

import express from 'express';
import { Board, Gallery, GalleryComment, GalleryPaw, GalleryStar, Tag, TagGallery, User, UserActive, UserWatch } from './database/models.js';
import { arrayIntersect, checkObjComplete, comparePasswordHash, compressImage, createMomentByDate, createPasswordHash, createRandomID, explodeText, getExtension, isEqualObj, modelListToObjList, uniqueElementArray } from './utils.js';
import { addTagsForArtwork, addUsenumForTagdatas, getDBRecordCount, imageCompressToSave } from './work.js';
import config from '../config.js';
import sqllize from './database/orm_sequelize.js';
import { sendAMail } from './mailer.js';
import fs from 'fs';
import { console } from 'inspector';
import { Op } from 'sequelize';

// 访问规则表
const routeTable = {
    root: '/',
    files_gallery: '/files/gallery/:filename',
    files_headimage: '/files/headimage/:filename',
    files_backimage: '/files/backimage/:filename',
    files_galleryPreview: '/files/GalleryPreview/:filename',
    checkLogin: '/core/checkLogin',
    getSessionId: '/core/getSessionId',
    getUser: '/core/getUser/:username',
    getSessionUser: '/core/getSessionUser',
    login: '/core/login',
    logout: '/core/logout',
    uploadArtwork: '/core/uploadArtwork',
    getArtworks: '/core/getArtworks',
    getTags: '/core/getTags',
    getRegisterCode: '/core/getRegisterCode',
    register: '/core/register',
    getResetPasswordCode: '/core/getResetPasswordCode',
    resetPassword: '/core/resetPassword',
    addBoardMessage: '/core/addBoardMessage',
    getBoradMessages: '/core/getBoradMessages',
    getTopInfo: '/core/getTopInfo',
    getDBRecordCount: '/core/getDBRecordCount',
    getArtwork: '/core/getArtwork',
    editUser: '/core/editUser',
    editUserImage: '/core/editUserImage',
    getEditUserImportantCode: '/core/getEditUserImportantCode',
    editUserImportant: '/core/editUserImportant',
    clearUserImage: '/core/clearUserImage',
    getTagsArtwork: '/core/getTagsArtwork/:id',
    sendCommentArtwork: '/core/sendCommentArtwork',
    getArtworkComments: '/core/getArtworkComments',
    getCommentGalleryCount: '/core/getCommentGalleryCount',
    pawArtworkMedia: '/core/pawArtworkMedia',
    starArtworkMedia: '/core/starArtworkMedia',
    getArtworkPawAreaInfo: '/core/getArtworkPawAreaInfo',
    haveWatch: '/core/haveWatch',
    watchUser: '/core/watchUser',
    getUserInfoCount: '/core/getUserInfoCount',
    getUserWatch: '/core/getUserWatch',
    getStarArtworks: '/core/getStarArtworks',
    getUserStarInfoCount: '/core/getUserStarInfoCount',
    editArtwork: '/core/editArtwork',
    deleteArtwork: '/core/deleteArtwork',
    getUserNoticePawArtwork: '/core/getUserNoticePawArtwork',
    getUserNoticeTextEcho: '/core/getUserNoticeTextEcho',
    getUserNoticeWatcher: '/core/getUserNoticeWatcher',
    noticeFinishRead: '/core/noticeFinishRead',
    noticeNotRead: '/core/noticeNotRead',
    getNoticenum: '/core/getNoticenum',
    getUserTrendUsers: '/core/getUserTrendUsers',
    trendFinishRead: '/core/trendFinishRead',
    trendNotRead: '/core/trendNotRead',
    getTrendnum: '/core/getTrendnum',
    getUserTrendArtworks: '/core/getUserTrendArtworks',
    searchTags: '/core/searchTags',
    editTag: '/core/editTag',
    deleteTag: '/core/deleteTag',
    searchPinkCandy: '/core/searchPinkCandy',
    getRegisterableUsername: '/core/getRegisterableUsername',
};

// 加载控制器
export function loadMachineController(machine=express()){
    // 基本
    machine.get(routeTable.root,(req,res)=>{res.send('<h1>PINKCANDY: ok</h1>');});
    machine.post(routeTable.root,(req,res)=>{res.send('PINKCANDY: post ok');});
    machine.get(routeTable.files_gallery,(req,res)=>{
        let filename = req.params.filename;
        if(!filename){res.send(0);return;}
        let fileurl = config.FILE_fileHub.gallery+filename;
        res.sendFile(fileurl);
    });
    machine.get(routeTable.files_headimage,(req,res)=>{
        let filename = req.params.filename;
        if(!filename){res.send(0);return;}
        let fileurl = config.FILE_fileHub.headimage+filename;
        res.sendFile(fileurl);
    });
    machine.get(routeTable.files_backimage,(req,res)=>{
        let filename = req.params.filename;
        if(!filename){res.send(0);return;}
        let fileurl = config.FILE_fileHub.backimage+filename;
        res.sendFile(fileurl);
    });
    machine.get(routeTable.files_galleryPreview,(req,res)=>{
        let filename = req.params.filename;
        if(!filename){res.send(0);return;}
        let fileurl = config.FILE_fileHub.galleryPreview+filename;
        res.sendFile(fileurl);
    });
    // GET
    machine.get(routeTable.getUser,(req,res)=>{ // 获取用户
        let username = req.params.username;if(!username){return 0;}
        User.findOne({where:{username:username},attributes:{exclude:['password']}}).then(data=>{res.send(data);});
    });
    machine.get(routeTable.getSessionUser,(req,res)=>{ // 获取用户自己
        if(req.query.sessionid){
            req.sessionStore.get(req.query.sessionid,(error,sessionData)=>{
                if(error){return 0;}
                if(sessionData!=null){
                    try{
                        let username = sessionData.username;
                        if(!username){res.send(0);return 0;}
                        User.findOne({where:{username:username},attributes:{exclude:['password']}}).then(data=>{res.send(data);});
                    }
                    catch(e){console.log(e);res.send(0);return 0;}
                }
            });
        }
        else{
            let username = req.session.username;if(!username){res.send(0);return 0;}
            User.findOne({where:{username:username},attributes:{exclude:['password']}}).then(data=>{res.send(data);});
        }
    });
    machine.get(routeTable.getArtworks,(req,res)=>{ // 获取作品
        let begin = req.query.begin;
        let num = req.query.num;
        let username = req.query.username;
        let condition = {};
        if(!begin){begin=0;}
        if(!num){num=config.DATABASE_defaultLimit;}
        if(username){condition={username:username};}
        (async ()=>{
            let data = await Gallery.findAll({
                limit:Number(num),
                offset:Number(begin),
                order:[['time','DESC']],
                where:condition,
            });
            res.send(data);
        })()
    });
    machine.get(routeTable.getTags,(req,res)=>{ // 获取标签
        let queryObj = req.query
        let begin = queryObj.begin
        let num = queryObj.num
        if(!begin){begin=0;}
        if(!num){num=config.DATABASE_defaultLimit;}
        (async ()=>{
            let data = await Tag.findAll({
                limit: Number(num),
                offset: Number(begin),
                order: [['time','DESC']],
            });
            data = await addUsenumForTagdatas(data);
            res.send(data)
        })()
    });
    machine.get(routeTable.getBoradMessages,(req,res)=>{ // 获取留言板信息
        let begin = req.query.begin;
        let num = req.query.num;
        if(!begin){begin=0;}
        if(!num){num=config.DATABASE_defaultLimit;}
        (async ()=>{
            Board.belongsTo(User,{foreignKey:'username',targetKey:'username'});
            let data = await Board.findAll({
                limit:Number(num),
                offset:Number(begin),
                order:[['time','DESC']],
                include: [
                    {
                        model: User,
                        attributes: ['name'],
                    },
                ]
            });
            res.send(data);
        })();
    });
    machine.get(routeTable.getTopInfo,(req,res)=>{ // 获取首页置顶信息
        res.sendFile(config.FILE_staticURL+'/TopInfo.html');
    });
    machine.get(routeTable.getDBRecordCount,(req,res)=>{ // 获取数据库记录数
        let table = req.query.table;
        if(!table){res.send(0);return;}
        (async ()=>{
            let count = await getDBRecordCount(table);
            res.send(count);
        })()
    });
    machine.get(routeTable.getArtwork,(req,res)=>{ // 获取一个作品
        let id = req.query.id;
        if(!id){res.send(0);return;}
        (async ()=>{
            let data = await Gallery.findOne({where:{id:id}});
            res.send(data);
        })()
    });
    machine.get(routeTable.getTagsArtwork,(req,res)=>{ // 获取作品的标签
        let id = req.params.id;
        if(!id){res.send(0);return;}
        (async()=>{
            Tag.belongsTo(TagGallery,{foreignKey:'id',targetKey:'tagid'});
            try{
                let data = await Tag.findAll({
                    order:[['type','ASC']],
                    include: [
                        {
                            model: TagGallery,
                            attributes: ['galleryid'],
                            where:{galleryid:id},
                        },
                    ]
                });
                data = await addUsenumForTagdatas(data);
                res.send(data);
            }
            catch(e){console.log(e);res.send(0);}
        })()
    });
    machine.get(routeTable.getArtworkComments,(req,res)=>{ // 获取作品评论
        let id = req.query.id;
        let begin = req.query.begin
        let num = req.query.num
        let username = req.session.username;
        if(!id){res.send(0);return;}
        if(!begin){begin=0;}
        if(!num){num=config.DATABASE_defaultLimit;}
        (async ()=>{
            GalleryComment.belongsTo(User,{foreignKey:'username',targetKey:'username'});
            try{
                let data = await GalleryComment.findAll({
                    where:{galleryid:id},
                    limit:Number(num),
                    offset:Number(begin),    
                    order:[['time','DESC']],
                    include: [
                        {
                            model: User,
                            attributes: ['username','name','headimage','sex','species'],
                        },
                    ],
                });
                let result = modelListToObjList(data);
                for(let i=0;i<result.length;i++){
                    let obj = result[i];
                    obj['pawnum'] = await GalleryPaw.count({where:{commentid:obj.id}});
                    obj['havepaw'] = false;
                    if(username){
                        obj['havepaw'] = await GalleryPaw.findOne({where:{galleryid:id,username:username,commentid:obj.id}})?true:false;
                    }
                }
                res.send(result);
            }
            catch(e){console.log(e);res.send(0);}
        })()
    });
    machine.get(routeTable.getCommentGalleryCount,(req,res)=>{ // 获取有关作品评论的数量
        let id = req.query.id;
        GalleryComment.count({where:{galleryid:id}}).then(count=>{res.send(count);});
    });
    machine.get(routeTable.getArtworkPawAreaInfo,(req,res)=>{ // 获取作品印爪空间情况
        let id = req.query.id;
        let username = req.session.username;
        if(!id){res.send(0);return;}
        (async ()=>{
            let result = {
                pawnum: await GalleryPaw.count({where:{galleryid:id,commentid:null}}),
                starnum: await GalleryStar.count({where:{galleryid:id}}),
                commentnum: await GalleryComment.count({where:{galleryid:id}}),
                user: {
                    havepaw: false,
                    havestar: false,
                }
            };
            if(username){
                result.user.havepaw = await GalleryPaw.findOne({where:{username:username,galleryid:id,commentid:null}})?true:false;
                result.user.havestar = await GalleryStar.findOne({where:{username:username,galleryid:id}})?true:false;
            }
            res.send(result);
        })()
    });
    machine.get(routeTable.getUserInfoCount,(req,res)=>{ // 获取用户概况数
        let username = req.query.username;
        if(!username){res.send(0);return;}
        (async ()=>{
            let result = {
                watchernum: await UserWatch.count({where:{username:username}}),
                towatchnum: await UserWatch.count({where:{watcher:username}}),
                artworknum: await Gallery.count({where:{username:username}}),
                gotpawnum: await (async()=>{
                    let gotpawnum = 0;
                    let artworkList = await Gallery.findAll({where:{username:username}});
                    for(let i=0;i<artworkList.length;i++){
                        let galleryid = artworkList[i]['id'];
                        gotpawnum += await GalleryPaw.count({where:{galleryid:galleryid,commentid:null}});
                    }
                    let artworkCommentList = await GalleryComment.findAll({where:{username:username}});
                    for(let i=0;i<artworkCommentList.length;i++){
                        let gallerycommentid = artworkCommentList[i]['id'];
                        gotpawnum += await GalleryPaw.count({where:{commentid:gallerycommentid}});
                    }
                    return gotpawnum;
                })(),
            }
            res.send(result);
        })()
    });
    machine.get(routeTable.getUserWatch,(req,res)=>{ // 获取用户粉丝与关注
        let username = req.query.username;
        let begin = req.query.begin;
        let num = req.query.num;
        if(!username){res.send(0);return;}
        if(!begin){begin=0;}
        if(!num){num=config.DATABASE_defaultLimit;}
        (async()=>{
            UserWatch.belongsTo(User,{foreignKey:'watcher',targetKey:'username'});
            let watcher = await UserWatch.findAll({
                where:{username:username},
                limit:Number(num),
                offset:Number(begin),
                order:[['time','DESC']],
                include: [
                    {
                        model: User,
                        attributes: ['username','name','headimage','sex','species'],
                    },
                ],
            });
            UserWatch.belongsTo(User,{foreignKey:'username',targetKey:'username'});
            let towatch = await UserWatch.findAll({
                where:{watcher:username},
                limit:Number(num),
                offset:Number(begin),
                order:[['time','DESC']],
                include: [
                    {
                        model: User,
                        attributes: ['username','name','headimage','sex','species'],
                    },
                ],
            });
            let result = {
                watcher: watcher,
                towatch: towatch,
            };
            res.send(result);
        })()
    });
    machine.get(routeTable.getStarArtworks,(req,res)=>{ // 获取收藏的作品
        let begin = req.query.begin;
        let num = req.query.num;
        let username = req.query.username?req.query.username:req.session.username;
        if(!begin){begin=0;}
        if(!num){num=config.DATABASE_defaultLimit;}
        if(!username){res.send(0);return;}
        (async ()=>{
            GalleryStar.belongsTo(Gallery,{foreignKey:'galleryid',targetKey:'id'})
            let data = await GalleryStar.findAll({
                limit:Number(num),
                offset:Number(begin),
                order:[['time','DESC']],
                where:{username:username},
                include:[{model: Gallery}],
            });
            res.send(data);
        })();
    });
    machine.get(routeTable.getUserStarInfoCount,(req,res)=>{ // 获取用户收藏概况数
        let username = req.query.username?req.query.username:req.session.username;
        if(!username){res.send(0);return;}
        (async ()=>{
            let result = {
                artworknum: await GalleryStar.count({where:{username:username}}),
            }
            res.send(result);
        })()
    });
    machine.get(routeTable.getUserNoticePawArtwork,(req,res)=>{ // 获取用户通知 作品相关印爪
        let username = req.query.username;
        if(!username){res.send(0);return;}
        (async()=>{
            let useractive = await UserActive.findOne({where:{username:username}});
            let noticetime = useractive.noticetime;
            let result = {
                artwork: [],
                artworkcomment: [],
            };
            let artworkList = await Gallery.findAll({where:{username:username}});
            for(let i=0;i<artworkList.length;i++){
                let galleryid = artworkList[i]['id'];
                GalleryPaw.belongsTo(User,{foreignKey:'username',targetKey:'username'});
                let gallerypaw = await GalleryPaw.findAll({
                    where:{
                        galleryid:galleryid,
                        commentid:null,
                        time:{[Op.gte]:noticetime},
                    },
                    order:[['time','DESC']],
                    include:[{model: User,attributes:{exclude:['password']}}],
                });
                for(let j=0;j<gallerypaw.length;j++){
                    let obj = {
                        id: gallerypaw[j].id,
                        user: gallerypaw[j].user,
                        galleryid: galleryid,
                        filename: artworkList[i]['filename'],
                        title: artworkList[i]['title'],
                        time: gallerypaw[j].time,
                    }
                    result.artwork.push(obj);
                }
            }
            let artworkcommentList = await GalleryComment.findAll({where:{username:username}});
            for(let i=0;i<artworkcommentList.length;i++){
                let commentid = artworkcommentList[i]['id'];
                GalleryPaw.belongsTo(User,{foreignKey:'username',targetKey:'username'});
                let gallerypaw = await GalleryPaw.findAll({
                    where:{
                        commentid: commentid,
                        time:{[Op.gte]:noticetime},
                    },
                    order:[['time','DESC']],
                    include:[{model: User,attributes:{exclude:['password']}}],
                });
                for(let j=0;j<gallerypaw.length;j++){
                    let obj = {
                        id: gallerypaw[j].id,
                        user: gallerypaw[j].user,
                        galleryid: gallerypaw[j].galleryid,
                        content: artworkcommentList[i].content,
                        time: gallerypaw[j].time,
                    }
                    result.artworkcomment.push(obj);
                }
            }
            res.send(result);
        })();
    });
    machine.get(routeTable.getUserNoticeTextEcho,(req,res)=>{ // 获取用户通知 文字回应
        let username = req.query.username;
        if(!username){res.send(0);return;}
        (async()=>{
            let useractive = await UserActive.findOne({where:{username:username}});
            let noticetime = useractive.noticetime;
            let result = {
                artworkcomment: [],
            };
            let artworkList = await Gallery.findAll({where:{username:username}});
            for(let i=0;i<artworkList.length;i++){
                let galleryid = artworkList[i]['id'];
                GalleryComment.belongsTo(User,{foreignKey:'username',targetKey:'username'});
                let gallerycomment = await GalleryComment.findAll({
                    where:{
                        galleryid:galleryid,
                        time:{[Op.gte]:noticetime},
                    },
                    order:[['time','DESC']],
                    include:[{model: User,attributes:{exclude:['password']}}],
                });
                for(let j=0;j<gallerycomment.length;j++){
                    let obj = {
                        id: gallerycomment[j].id,
                        user: gallerycomment[j].user,
                        galleryid: galleryid,
                        filename: artworkList[i]['filename'],
                        title: artworkList[i]['title'],
                        content: gallerycomment[j].content,
                        time: gallerycomment[j].time,
                    }
                    result.artworkcomment.push(obj);
                }
            }
            res.send(result);
        })();
    });
    machine.get(routeTable.getUserNoticeWatcher,(req,res)=>{ // 获取用户通知 新增粉丝
        let username = req.query.username;
        if(!username){res.send(0);return;}
        (async()=>{
            let useractive = await UserActive.findOne({where:{username:username}});
            let noticetime = useractive.noticetime;
            UserWatch.belongsTo(User,{foreignKey:'watcher',targetKey:'username'});
            let userwatch = await UserWatch.findAll({
                where:{
                    username:username,
                    time:{[Op.gte]:noticetime},
                },
                order:[['time','DESC']],
                include: [{
                    model: User,
                    attributes: {exclude:['password']},
                }],
            });
            res.send(userwatch);
        })();
    });
    machine.get(routeTable.getNoticenum,(req,res)=>{ // 获取用户的消息通知数
        let username = req.query.username;
        if(!username){res.send(0);return;}
        (async()=>{
            let useractive = await UserActive.findOne({where:{username:username}});
            let noticetime = useractive.noticetime;
            let count = 0;
            count += await UserWatch.count({where:{username:username,time:{[Op.gte]:noticetime}}});
            count += await (async()=>{
                let gotnum = 0;
                let artworkList = await Gallery.findAll({where:{username:username}});
                for(let i=0;i<artworkList.length;i++){
                    let galleryid = artworkList[i]['id'];
                    gotnum += await GalleryPaw.count({where:{galleryid:galleryid,commentid:null,time:{[Op.gte]:noticetime}}});
                    gotnum += await GalleryComment.count({where:{galleryid:galleryid,time:{[Op.gte]:noticetime}}});
                }
                let artworkCommentList = await GalleryComment.findAll({where:{username:username}});
                for(let i=0;i<artworkCommentList.length;i++){
                    let gallerycommentid = artworkCommentList[i]['id'];
                    gotnum += await GalleryPaw.count({where:{commentid:gallerycommentid,time:{[Op.gte]:noticetime}}});
                }
                return gotnum;
            })()
            res.send(count);
        })();
    });
    machine.get(routeTable.getUserTrendUsers,(req,res)=>{ // 获取用户动态列表
        let username = req.session.username;
        if(!username){res.send(0);return;}
        (async()=>{
            let myuseractive = await UserActive.findOne({where:{username:username}});
            let trendstime = myuseractive.trendstime;
            UserActive.belongsTo(UserWatch,{foreignKey:'username',targetKey:'username'});
            UserActive.belongsTo(User,{foreignKey:'username',targetKey:'username'});
            let useractive = await UserActive.findAll({
                where: {mediatime:{[Op.gte]:trendstime}},
                include: [
                    {
                        model: UserWatch,
                        where: {watcher:username},
                    },
                    {
                        model: User,
                        attributes: {exclude:['password']}
                    },
                ]
            });
            let result = []
            for(let i=0;i<useractive.length;i++){
                let obj = {
                    username: useractive[i].user.username,
                    name: useractive[i].user.name,
                    sex: useractive[i].user.sex,
                    species: useractive[i].user.species,
                    headimage: useractive[i].user.headimage,
                    mediatime: useractive[i].mediatime,
                }
                result.push(obj)
            }
            res.send(result);
        })();
    });
    machine.get(routeTable.getTrendnum,(req,res)=>{ // 获取用户动态数
        let username = req.query.username;
        if(!username){res.send(0);return;}
        (async()=>{
            let myuseractive = await UserActive.findOne({where:{username:username}});
            let trendstime = myuseractive.trendstime;
            UserActive.belongsTo(UserWatch,{foreignKey:'username',targetKey:'username'});
            let count = await UserActive.count({
                where: {mediatime:{[Op.gte]:trendstime}},
                include: [{model: UserWatch,where: {watcher:username}}]
            });
            res.send(count);
        })();
    });
    machine.get(routeTable.getUserTrendArtworks,(req,res)=>{ // 获取用户动态提及用户的作品
        let username = req.query.username;
        let myUsername = req.session.username;
        if(!username || !myUsername){res.send(0);return;}
        (async ()=>{
            let myuseractive = await UserActive.findOne({where:{username:myUsername}});
            let trendstime = myuseractive.trendstime;
            let data = await Gallery.findAll({
                order:[['time','DESC']],
                where:{
                    username: username,
                    time: {[Op.gte]:trendstime},
                },
            });
            res.send(data);
        })()
    });
    machine.get(routeTable.searchTags,(req,res)=>{ // 搜索标签
        let tagtext = req.query.tagtext;
        if(!tagtext){res.send(0);return;}
        (async()=>{
            let result = [];
            let tagList = explodeText(tagtext);
            for(let i=0;i<tagList.length;i++){
                let tag = tagList[i];
                let theTags = await Tag.findAll({where:{tag:{[Op.like]:`%${tag}%`}}});
                if(theTags){
                    for(let j=0;j<theTags.length;j++){
                        result.push(theTags[j]);
                    }
                }
            }
            result = await addUsenumForTagdatas(result);
            // 过滤重复值
            let tagidList = [];
            let uniqueresult = [];
            for(let i=0;i<result.length;i++){
                if(!tagidList.find(id=>id==result[i]['id'])){
                    tagidList.push(result[i]['id']);
                    uniqueresult.push(result[i]);
                }
            }
            res.send(uniqueresult);
        })();
    });
    machine.get(routeTable.searchPinkCandy,(req,res)=>{ // 来点粉糖
        let searchtext = req.query.searchtext;
        if(!searchtext){res.send(0);return;}
        let tagList = explodeText(searchtext);
        let result = {
            artwork: [],
            user: [],
        };
        (async()=>{
            let galleryidList = [];
            let usernameList = [];
            for(let i=0;i<tagList.length;i++){
                let tag = tagList[i];
                let tagobj = await Tag.findOne({where:{tag:tag}});
                // 搜索作品 根据标签或内容模糊匹配
                // 作品
                if(tagobj){
                    let tagid = tagobj['id'];
                    let taggallery = await TagGallery.findAll({where:{tagid:tagid}});
                    let theList = []
                    for(let j=0;j<taggallery.length;j++){
                        theList.push(taggallery[j]['galleryid'])
                    }
                    if(galleryidList.length==0){galleryidList=theList;}
                    else{galleryidList=arrayIntersect(galleryidList,theList);}
                }
                let gallery = await Gallery.findAll({where:{title:{[Op.like]:`%${tag}%`}}});
                for(let j=0;j<gallery.length;j++){galleryidList.push(gallery[j]['id']);}
                // 搜索用户 根据名字或粉糖账号
                let user = await User.findAll({
                    where:{
                        [Op.or]: [
                            {name:{[Op.like]:`%${tag}%`}},
                            {username:{[Op.like]:`%${tag}%`}},
                        ],
                    }
                });
                for(let j=0;j<user.length;j++){usernameList.push(user[j]['username']);}
            }
            galleryidList = uniqueElementArray(galleryidList);
            usernameList = uniqueElementArray(usernameList);
            for(let i=0;i<galleryidList.length;i++){
                let data = await Gallery.findOne({where:{id:galleryidList[i]}})
                result.artwork.push(data);
            }
            for(let i=0;i<usernameList.length;i++){
                let data = await User.findOne({where:{username:usernameList[i]},attributes:{exclude:['password']}});
                result.user.push(data);
            }
            res.send(result);
        })();
    });
    machine.get(routeTable.getRegisterableUsername,(req,res)=>{
        (async()=>{
            for(let i=0;i<10;i++){
                let username = Math.floor(10000+Math.random()*90000);
                let have = await User.findOne({where:{username:username}})?true:false;
                if(!have){res.send(username);return;}
            }
            res.send(0);
        })()
    });
    // POST
    machine.post(routeTable.checkLogin,(req,res)=>{ // 检查登录
        let web_session_ok = req.session.username?true:false;
        if(web_session_ok){res.send(1);}else{res.send(0);}
    });
    machine.post(routeTable.getSessionId,(req,res)=>{ //获取sessionid
        if(req.session.username){res.send(req.sessionID);}else{res.send(0);}
    });
    machine.post(routeTable.login,(req,res)=>{ // 登录
        let loginForm = req.body;
        if(!checkObjComplete(loginForm)){res.send(0);return;}
        let username = loginForm.username;
        let password = loginForm.password;
        User.findOne({
            where:{
                [Op.or]:[
                    {username:username},
                    {email:username},
                ],
            }
        }).then(data=>{
            if(!data){res.send(0);return;}
            if(!comparePasswordHash(password,data.password)){res.send(0);return;}
            let session = req.session;
            session['username'] = data.username;
            res.send(1);
        });
    });
    machine.post(routeTable.logout,(req,res)=>{ // 退出登录
        req.session.destroy();
        res.send(1);
    });
    machine.post(routeTable.uploadArtwork,async(req,res)=>{ // 上传作品
        let artworkForm = req.body;
        let title = artworkForm.title;
        let info = artworkForm.info;
        let tags = artworkForm.tags;
        let file = req.files?.file;
        let id = createRandomID();
        let username = req.session.username;
        if(!title || !file || !username){res.send(0);return;}
        let ext = getExtension(file.name);
        if(!ext in config.FILE_imageAllowExtension){res.send(0);return;}
        let saveFilename = id+'.'+ext;
        let savepath = config.FILE_fileHub.gallery+saveFilename;
        try{
            (async()=>{
                let have = await Gallery.findOne({where:{id:id}})?true:false;
                if(!have){
                    let result = sqllize.transaction(async t=>{
                        await Gallery.create({
                            id: id,
                            username: username,
                            filename: saveFilename,
                            title: title,
                            info: info,
                            time: Date(),
                        },{ transaction:t });
                        await UserActive.update({mediatime:Date()},{where:{username:username}},{transaction:t});
                        if(tags){
                            let tagList = JSON.parse(tags);
                            addTagsForArtwork(id,tagList);
                        }
                    });
                    if(result){
                        await file.mv(savepath);
                        await compressImage(savepath,config.FILE_fileHub.galleryPreview+saveFilename);
                        res.send(1);
                    }
                }
                else{res.send(0);}
            })();
        }
        catch(e){console.log(e);res.send(0);}
    });
    machine.post(routeTable.getRegisterCode,(req,res)=>{ // 获取注册验证码
        let username = req.body.username;
        let password = req.body.password;
        let name = req.body.name;
        let email = req.body.email;
        let code = Math.floor(Math.pow(10,6)*Math.random());
        let content = `
            <h1>注册粉糖账号 ${ username }</h1>
            <p>验证码：${ code }</p>
        `
        sendAMail(email,content).then(x=>{
            if(x){
                req.session['registerForm'] = {
                    username: username,
                    password: password,
                    name: name,
                    email: email,
                    code: code,
                }
                req.session.cookie.maxAge = config.SESSION_effectiveTime;
                res.send(1);return;
            }
            else{res.send(0);}
        })
    });
    machine.post(routeTable.register,(req,res)=>{ // 注册
        let registerForm = req.body;
        if(isEqualObj(registerForm,req.session['registerForm'])){
            try{
                let username = registerForm.username;
                let passwordhash = createPasswordHash(registerForm.password);
                let name = registerForm.name;
                let email = registerForm.email;
                sqllize.transaction(async t=>{
                    let have = await User.findOne({
                        where:{
                            [Op.or]: [
                                {username: username},
                                {email: email},
                            ],
                        }
                    })?true:false;
                    if(!have){
                        await User.create({
                            username: username,
                            password: passwordhash,
                            name: name,
                            email: email,
                            jointime: Date(),
                        },{ transaction:t });
                        await UserActive.create({
                            username: username,
                            noticetime: Date(),
                            trendstime: Date(),
                            mediatime: Date(),
                        },{ transaction:t });
                    }
                    if(!have){
                        req.session['username'] = username;
                        res.send(1);
                    }
                    else{res.send(0);}
                });
            }
            catch(e){console.log(e);res.send(0);}
        }
        else{res.send(0);}
    });
    machine.post(routeTable.getResetPasswordCode,(req,res)=>{  // 获取重设密码验证码
        let resetPasswordForm = req.body;
        let email = resetPasswordForm.email;
        User.findOne({where:{email:email}}).then(data=>{
            if(data){
                let code = Math.floor(Math.pow(10,6)*Math.random());
                let username = data.username;
                let content = `
                    <h1>重设粉糖账号 ${ username } 的密码</h1>
                    <p>验证码：${ code }</p>
                `
                req.session['resetPasswordEmail'] = email;
                req.session['resetPasswordCode'] = code;
                req.session.cookie.maxAge = config.SESSION_effectiveTime;
                sendAMail(email,content).then(x=>{
                    if(x){res.send(1);}
                    else{res.send(0);}
                });
            }
        });
    });
    machine.post(routeTable.resetPassword,(req,res)=>{ // 重设密码
        let resetPasswordForm = req.body;
        let email = resetPasswordForm.email;
        let code = resetPasswordForm.code;
        let password = resetPasswordForm.password;
        if(email!=req.session.resetPasswordEmail || code!=req.session.resetPasswordCode){res.send(0);return;}
        User.findOne({where:{email:email}}).then(data=>{
            try{
                let username = data.username;
                let passwordhash = createPasswordHash(password);
                sqllize.transaction(async t=>{
                    await User.update(
                        {password:passwordhash},
                        {where:{username:username}},
                        { transaction:t },
                    );
                    req.session.destroy();
                    res.send(1);
                });
            }
            catch(e){console.log(e);res.send(0);}
        });
    });
    machine.post(routeTable.addBoardMessage,(req,res)=>{ // 留言
        let username = req.session.username;
        let content = req.body.content;
        if(!username || !content){res.send(0);return;}
        try{
            sqllize.transaction(async t=>{
                await Board.create({
                    username: username,
                    content: content,
                    time: Date(),
                },{ transaction: t });
                res.send(1);
            });
        }
        catch(e){console.log(e);res.send(0);}
    });
    machine.post(routeTable.editUser,(req,res)=>{ // 修改用户信息
        let editUserForm = req.body;
        let name = editUserForm.name;
        let info = editUserForm.info;
        let sex = editUserForm.sex;
        let species = editUserForm.species;
        let username = req.session.username;
        if(!name || !username){res.send(0);return;}
        try{
            sqllize.transaction(async t=>{
                await User.update(
                    {
                        name: name,
                        info: info,
                        sex: sex,
                        species: species,
                    },
                    {where:{username:username}},
                    { transaction:t },
                );
                res.send(1);
            });
        }
        catch(e){console.log(e);res.send(0);}
    });
    machine.post(routeTable.editUserImage,(req,res)=>{ // 修改用户图片
        let headimage = req.files?.headimage;
        let backimage = req.files?.backimage;
        let username = req.session.username;
        if(!username){res.send(0);return;}
        if(!headimage && !backimage){res.send(0);return;}
        if(headimage){
            let id = createRandomID();
            let ext = getExtension(headimage.name);
            if(!ext in config.FILE_imageAllowExtension){res.send(0);return;}
            let saveFilename = id+'.'+ext;
            let savepath = config.FILE_fileHub.headimage+saveFilename;
            try{
                sqllize.transaction(async t=>{
                    let oldFilename;
                    await User.findOne({where:{username:username}}).then(data=>{oldFilename = data.headimage;});
                    await User.update(
                        {headimage:saveFilename,},
                        {where:{username:username}},
                        { transaction:t },
                    );
                    await imageCompressToSave(headimage,savepath);
                    if(oldFilename){fs.unlinkSync(config.FILE_fileHub.headimage+oldFilename);}
                });
            }
            catch(e){console.log(e);res.send(0);}
        }
        if(backimage){
            let id = createRandomID();
            let ext = getExtension(backimage.name);
            if(!ext in config.FILE_imageAllowExtension){res.send(0);return;}
            let saveFilename = id+'.'+ext;
            let savepath = config.FILE_fileHub.backimage+saveFilename;
            try{
                sqllize.transaction(async t=>{
                    let oldFilename;
                    await User.findOne({where:{username:username}}).then(data=>{oldFilename=data.backimage;});
                    await User.update(
                        {backimage:saveFilename,},
                        {where:{username:username}},
                        { transaction:t },
                    );
                    await imageCompressToSave(backimage,savepath,config.FILE_imageResizeNum*4);
                    if(oldFilename){fs.unlinkSync(config.FILE_fileHub.backimage+oldFilename);}
                });
            }
            catch(e){console.log(e);res.send(0);}
        }
        res.send(1);
    });
    machine.post(routeTable.getEditUserImportantCode,(req,res)=>{ // 获取用户关键信息验证码
        let editUserImportantForm = req.body;
        let email = editUserImportantForm.email;
        let username = req.session.username;
        if(!username){res.send(0);return;}
        (async()=>{
            if(!email){
                await User.findOne({where:{username:username}}).then(data=>{
                    email = data.email;
                });
            }
            let code = Math.floor(Math.pow(10,6)*Math.random());
            let content = `
                <h1>修改粉糖账号 ${ username } 的关键内容</h1>
                <p>验证码：${ code }</p>
            `
            req.session['editUserImportantCode'] = code;
            req.session.cookie.maxAge = config.SESSION_effectiveTime;
            sendAMail(email,content);
            res.send(1);
        })()
    });
    machine.post(routeTable.editUserImportant,(req,res)=>{ // 修改用户关键信息
        let editUserImportantForm = req.body;
        let password = editUserImportantForm.password;
        let email = editUserImportantForm.email;
        let code = editUserImportantForm.code;
        let username = req.session.username;
        if(!username || code!=req.session['editUserImportantCode']){res.send(0);return;}
        if(password){
            try{
                let passwordhash = createPasswordHash(password);
                sqllize.transaction(async t=>{
                    await User.update(
                        {password:passwordhash},
                        {where:{username:username}},
                        { transaction:t },
                    );
                });
            }
            catch(e){console.log(e);res.send(0);}
        }
        if(email){
            try{
                sqllize.transaction(async t=>{
                    await User.update(
                        {email:email},
                        {where:{username:username}},
                        { transaction:t },
                    );
                });
            }
            catch(e){console.log(e);res.send(0);}
        }
        req.session.destroy();
        res.send(1);
    });
    machine.post(routeTable.clearUserImage,(req,res)=>{ // 清除用户图片
        let username = req.session.username;
        if(!username){res.send(0);return;}
        try{
            User.findOne({where:{username:username}}).then(data=>{
                let headimage = data.headimage;
                let backimage = data.backimage;
                sqllize.transaction(async t=>{
                    await User.update(
                        {headimage:null,backimage:null},
                        {where:{username:username}},
                        { transaction:t },
                    );
                    if(headimage){
                        let headimagepath = config.FILE_fileHub.headimage+headimage;
                        fs.unlinkSync(headimagepath);    
                    }
                    if(backimage){
                        let backimagepath = config.FILE_fileHub.backimage+backimage;
                        fs.unlinkSync(backimagepath);    
                    }
                    res.send(1);
                });
            });
        }
        catch(e){console.log(e);res.send(0);}
    });
    machine.post(routeTable.sendCommentArtwork,(req,res)=>{ // 发送作品评论
        let commentid = createRandomID()
        let galleryid = req.body.id;
        let username = req.session.username;
        let content = req.body.content;
        let time = Date();
        if(!galleryid || !username || !content){res.send(0);return;}
        (async()=>{
            let have = await GalleryComment.findOne({where:{id:commentid}})?true:false;
            if(!have){
                try{
                    sqllize.transaction(async (t)=>{
                        await GalleryComment.create({
                            id: commentid,
                            galleryid: galleryid,
                            username: username,
                            content: content,
                            time: time,
                        },{ transaction:t });
                        res.send(1);
                    });
                }
                catch(e){console.log(e);res.send(0);};
            }
            else{res.send(0);}
        })();
    });
    machine.post(routeTable.pawArtworkMedia,(req,res)=>{ // 作品印爪
        let username = req.session.username;
        let id = req.body.id;
        let commentid = req.body.commentid?req.body.commentid:null;
        if(!username || !id){res.send(0);return;}
        try{
            (async ()=>{
                let havePaw = await GalleryPaw.findOne({where:{username:username,galleryid:id,commentid:commentid}});
                if(!havePaw){
                    sqllize.transaction(async t=>{
                        await GalleryPaw.create({
                            username: username,
                            galleryid: id,
                            commentid: commentid,
                            time: Date(),
                        },{transaction: t});
                    });
                }
                else{
                    sqllize.transaction(async t=>{
                        await GalleryPaw.destroy({where:{
                            username: username,
                            galleryid: id,
                            commentid: commentid,
                        }},{transaction: t});
                    });
                }
                res.send(1);
            })()
        }
        catch(e){console.log(e);res.send(0);}
    });
    machine.post(routeTable.starArtworkMedia,(req,res)=>{ // 作品收藏
        let username = req.session.username;
        let id = req.body.id;
        if(!username || !id){res.send(0);return;}
        try{
            (async ()=>{
                let haveStar = await GalleryStar.findOne({where:{username:username,galleryid:id}});
                if(!haveStar){
                    sqllize.transaction(async t=>{
                        await GalleryStar.create({
                            username: username,
                            galleryid: id,
                            time: Date(),
                        },{transaction: t});
                    });
                }
                else{
                    sqllize.transaction(async t=>{
                        await GalleryStar.destroy({where:{
                            username: username,
                            galleryid: id,
                        }},{transaction: t});
                    });
                }
                res.send(1);
            })()
        }
        catch(e){console.log(e);res.send(0);}
    });
    machine.post(routeTable.haveWatch,(req,res)=>{ // 是否关注用户
        let watcher = req.session.username;
        let username = req.body.towatch;
        if(!watcher){res.send(0);return;}
        (async ()=>{
            let haveWatch = await UserWatch.findOne({where:{
                username: username,
                watcher: watcher,
            }});
            res.send(haveWatch?1:0);    
        })()
    });
    machine.post(routeTable.watchUser,(req,res)=>{ // 关注用户
        let watcher = req.session.username;
        let username = req.body.towatch;
        if(!watcher){res.send(0);return;}
        if(watcher==username){res.send(0);return;}
        try{
            (async ()=>{
                let haveWatch = await UserWatch.findOne({where:{
                    username: username,
                    watcher: watcher,
                }});
                if(!haveWatch){
                    sqllize.transaction(async t=>{
                        await UserWatch.create({
                            username: username,
                            watcher: watcher,
                            time: Date(),
                        },{transaction:t});
                    });
                }
                else{
                    sqllize.transaction(async t=>{
                        await UserWatch.destroy({where:{
                            username: username,
                            watcher: watcher,
                        }},{transaction:t});
                    });
                }
                res.send(1);
            })()
        }
        catch(e){console.log(e);res.send(0);}
    });
    machine.post(routeTable.editArtwork,(req,res)=>{ // 修改作品
        let id = req.body.id;
        let title = req.body.title;
        let info = req.body.info;
        let tags = req.body.tags;
        let username = req.session.username;
        if(!id || !title || !username){res.send(0);return;}
        (async()=>{
            let artwork = await Gallery.findOne({where:{id:id}});
            if(artwork.username!=username){res.send(0);return;}
            try{
                sqllize.transaction(async t=>{
                    await Gallery.update(
                        {
                            title: title,
                            info: info,
                        },
                        {where:{id:id}},
                        { transaction:t },
                    );
                    await TagGallery.destroy(
                        {where:{galleryid:id}},
                        { transaction:t },
                    );
                    if(tags){
                        let tagList = JSON.parse(tags);
                        await addTagsForArtwork(id,tagList);
                    }
                    res.send(1);
                });
            }
            catch(e){console.log(e);res.send(0);}
        })();
    });
    machine.post(routeTable.deleteArtwork,(req,res)=>{ // 删除作品
        let id = req.body.id;
        let username = req.session.username;
        if(!id || !username){res.send(0);return;}
        (async ()=>{
            let artwork = await Gallery.findOne({where:{id:id}});
            if(artwork.username!=username){res.send(0);return;}
            try{
                sqllize.transaction(async t=>{
                    await Gallery.destroy({where:{id:id}},{ transaction:t });
                    await GalleryComment.destroy({where:{galleryid:id}},{ transaction:t });
                    await GalleryPaw.destroy({where:{galleryid:id}},{ transaction:t });
                    await GalleryStar.destroy({where:{galleryid:id}},{ transaction:t });
                    await TagGallery.destroy({where:{galleryid:id}},{ transaction:t });
                });
                fs.unlinkSync(config.FILE_fileHub.gallery+artwork.filename);
                fs.unlinkSync(config.FILE_fileHub.galleryPreview+artwork.filename);
                res.send(1);
            }
            catch(e){console.log(e);res.send(0);}
        })();
    });
    machine.post(routeTable.noticeFinishRead,(req,res)=>{ // 完成消息阅读
        let username = req.session.username;
        if(!username){res.send(0);return;}
        (async()=>{
            try{
                sqllize.transaction(async t=>{
                    await UserActive.update(
                        {noticetime:Date()},
                        {where:{username:username}},
                        { transaction:t },
                    );
                });
                res.send(1);
            }
            catch(e){console.log(e);res.send(0);}
        })();
    });
    machine.post(routeTable.noticeNotRead,(req,res)=>{ // 回看之前的消息
        let username = req.session.username;
        if(!username){res.send(0);return;}
        (async()=>{
            try{
                let useractive = await UserActive.findOne({where:{username:username}});
                let theTime = createMomentByDate(new Date(useractive.noticetime)).subtract(1,'months').toDate();
                sqllize.transaction(async t=>{
                    await UserActive.update(
                        {noticetime:theTime},
                        {where:{username:username}},
                        { transaction:t },
                    );
                });
                res.send(1);
            }
            catch(e){console.log(e);res.send(0);}
        })();
    });
    machine.post(routeTable.trendFinishRead,(req,res)=>{ // 完成动态阅读
        let username = req.session.username;
        if(!username){res.send(0);return;}
        (async()=>{
            try{
                sqllize.transaction(async t=>{
                    await UserActive.update(
                        {trendstime:Date()},
                        {where:{username:username}},
                        { transaction:t },
                    );
                });
                res.send(1);
            }
            catch(e){console.log(e);res.send(0);}
        })();
    });
    machine.post(routeTable.trendNotRead,(req,res)=>{ // 回看之前的动态
        let username = req.session.username;
        if(!username){res.send(0);return;}
        (async()=>{
            try{
                let useractive = await UserActive.findOne({where:{username:username}});
                let theTime = createMomentByDate(new Date(useractive.trendstime)).subtract(1,'months').toDate();
                sqllize.transaction(async t=>{
                    await UserActive.update(
                        {trendstime:theTime},
                        {where:{username:username}},
                        { transaction:t },
                    );
                });
                res.send(1);
            }
            catch(e){console.log(e);res.send(0);}
        })();
    });
    machine.post(routeTable.editTag,(req,res)=>{ // 修改标签
        let id = req.body.id;
        let info = req.body.info;
        let type = req.body.type;
        let username = req.session.username;
        if(!id || !type || !username){res.send(0);return;}
        (async()=>{
            try{
                sqllize.transaction(async t=>{
                    await Tag.update(
                        {info:info,type:type},
                        {where:{id:id}},
                        { transaction:t },
                    );
                });
                res.send(1);
            }
            catch(e){console.log(e);res.send(0);}
        })();
    });
    machine.post(routeTable.deleteTag,(req,res)=>{ // 删除标签 标记有一定数量则拒绝删除
        let id = req.body.id;
        let username = req.session.username;
        if(!id || !username){res.send(0);return;}
        (async()=>{
            try{
                let usenum = await Tag.count({where:{id,id}});
                if(usenum<=10){
                    sqllize.transaction(async t=>{
                        await Tag.destroy({where:{id:id}},{transaction:t});
                        await TagGallery.destroy({where:{tagid:id}},{transaction:t});
                    });
                    res.send(1);
                }
                else{
                    res.send(0);
                }
            }
            catch(e){console.log(e);res.send(0);}
        })();
    });
}
