// 函数集

import nodemailer from 'nodemailer'
import bcrypt from "bcryptjs";
import sharp from "sharp";
import fs from 'fs';
import moment from "moment";
import config  from "../config.js";
import { Board, Gallery, GalleryComment, tableName, Tag, TagGallery, User, sqllize } from "./models.js";

export const transporter = nodemailer.createTransport(config.MAILER_transport);

// 发送邮件
export async function sendAMail(who='',content='',subject='PINKCANDY MAILER'){
    try{
        let option = {
            from: config.MAILER_transport.auth.user,
            to: who,
            html: content,
            subject: subject,
        }
        return await transporter.sendMail(option);
    }
    catch(e){console.log(e);}
}

// bcrypt 密码哈希
export function createPasswordHash(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync());
}

// 验证bcrypt密码哈希
export function comparePasswordHash(password,hash){
    return bcrypt.compareSync(password,hash);
}

// 检查对象完整不为空
export function checkObjComplete(obj={}){
    let keys = Object.keys(obj);
    for(let i=0;i<keys.length;i++){
        let x = obj[keys[i]];
        if(!x){return false;}
    }
    return true;
}

// 获取文件后缀
export function getExtension(filename=''){return filename.split('.').pop();}

// 浅比较对象内容是否相等
export function isEqualObj(obj1={},obj2={}){
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    let keyLength = keys1.length;
    if(keys1.length!=keys2.length){return false;}
    for(let i=0;i<keyLength;i++){if(!keys2.includes(keys1[i])){return false;}}
    for(let i=0;i<keyLength;i++){let key=keys1[i];if(obj1[key]!=obj2[key]){return false;}}
    return true;
}

// 压缩图片
export function compressImage(filepath,savepath,resizeNum=config.FILE_imageResizeNum){
    return sharp(filepath).resize(resizeNum).toFile(savepath)
}

// sequelize数据模型转JS对象
export function modelToObj(model){return JSON.parse(JSON.stringify(model.toJSON()))}

// sequelize数据模型数组转JS对象数组
export function modelListToObjList(data=[]){
    let objList = []
    for(let i=0;i<data.length;i++){
        let model = data[i];
        let obj = modelToObj(model);
        objList.push(obj);
    }
    return objList;
}

// 生成随机数字号码
export function createRandomID(lengthnum=10){return Math.floor(Math.pow(10,lengthnum)*Math.random())}

// 获取一个指定时间的moment对象
export function createMomentByDate(date=new Date()){
    let time = moment();
    time.year(date.getFullYear());
    time.month(date.getMonth());
    time.date(date.getDate());
    time.hour(date.getHours());
    time.minutes(date.getMinutes());
    time.seconds(date.getSeconds());
    return time;
}

// 将字符串按指定字符分为数组
export function explodeText(text='',c=' '){
    let result = [];
    let indexA = 0;
    let indexB = 0;
    let getword = false;
    for(let i=0;i<text.length;i++){
        if(!getword){
            if(text[i]!=c){
                indexA = i;
                getword = true;
            }
        }
        else{
            if(text[i]==c){
                indexB = i;
                result.push(text.substring(indexA,indexB));
                indexA = indexB;
                getword = false;
            }
        }
    }
    if(getword){
        indexB = text.length;
        result.push(text.substring(indexA,indexB));
    }
    return result;
}

// 两数组的交集运算
export function arrayIntersect(array1=[],array2=[],compareObj=false){
    let intersection = []
    for(let i=0;i<array1.length;i++){
        if(
            compareObj
            ?
            array2.find(e=>isEqualObj(e,array1[i]))
            :
            array2.find(e=>e==array1[i])
        ){intersection.push(array1[i]);}
    }
    return intersection;
}

// 数组元素去重
export function uniqueElementArray(array=[]){
    let uniqueArray = [];
    for(let i=0;i<array.length;i++){
        if(!(uniqueArray.find(e=>e==array[i]))){uniqueArray.push(array[i]);}
    }
    return uniqueArray;
}

// 获取数据表记录数
export function getDBRecordCount(table=''){
    switch(table){
        case tableName.board: return Board.count();
        case tableName.gallery: return Gallery.count();
        case tableName.tag: return Tag.count();
        case tableName.tag_gallery: return TagGallery.count();
        case tableName.user: return User.count();
        case tableName.gallery_comment: return GalleryComment.count();
        default: return 0;
    }
}

// 创建文件库目录
export function createFilesDir(){
    let filehub = config.FILE_fileHub;
    let keys = Object.keys(filehub);
    for(let i=0;i<keys.length;i++){
        let path = filehub[keys[i]];
        if(!fs.existsSync(path)){fs.mkdirSync(path);}
    }
}

// 添加作品的标签
export async function addTagsForArtwork(id='',tagList=['']){
    for(let tag in tagList){
        Tag.findOne({where:{tag:tagList[tag]}}).then((data)=>{
            if(!data){
                let tagid = Math.floor(Math.pow(10,10)*Math.random());
                sqllize.transaction(async t=>{
                    await Tag.create({
                        id: tagid,
                        tag: tagList[tag],
                        type: 1,
                        time: Date(),
                    },{ transaction:t });
                    await TagGallery.create({
                        tagid: tagid,
                        galleryid: id,
                    },{ transaction:t });    
                });
            }
            else{
                sqllize.transaction(async t=>{
                    await TagGallery.create({
                        tagid: data.id,
                        galleryid: id,
                    },{ transaction:t });    
                });
            }
        });
    }
}

// express-fileupload 将图片保存到临时文件夹 然后压缩并保存
export async function imageCompressToSave(file,savepath='',resizeNum=config.FILE_imageResizeNum){
    if(!file || !savepath){return false;}
    try{
        let ext = getExtension(file.name);
        let tmpfilename = createRandomID()+'.'+ext;
        let tmpsavepath = config.FILE_fileHub.tmp+tmpfilename;
        if(ext=='gif' || ext=='GIF'){file.mv(savepath);}
        else{
            await file.mv(tmpsavepath);
            await compressImage(tmpsavepath,savepath,resizeNum);
            fs.unlinkSync(tmpsavepath);
        }
        return true;
    }
    catch(e){console.log(e);return false;}
}

// 为标签查询结果添加使用数
export async function addUsenumForTagdatas(data=[]){
    data = modelListToObjList(data);
    for(let i=0;i<data.length;i++){
        let usenum = await (async()=>{
            let num = 0;
            num += await TagGallery.count({where:{tagid:data[i]['id']}});
            return num;
        })()
        data[i]['usenum'] = usenum;
    }
    return data;
}
