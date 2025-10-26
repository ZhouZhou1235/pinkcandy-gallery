// 工具

import bcrypt from "bcryptjs";
import sharp from "sharp";
import config  from "../config.js";
import moment from "moment";

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
