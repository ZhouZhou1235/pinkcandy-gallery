import { Board, Gallery, GalleryComment, Garden, tableName, Tag, TagGallery, TagGarden, User } from "./database/models.js";
import fs from 'fs';
import config  from "../config.js";
import sqllize from './database/orm_sequelize.js';
import { GArea } from './ConstVars.js';
import { compressImage, createRandomID, getExtension, modelListToObjList } from "./utils.js";

// 获取数据表记录数
export function getDBRecordCount(table=''){
    switch(table){
        case tableName.board: return Board.count();
        case tableName.gallery: return Gallery.count();
        case tableName.garden: return Garden.count();
        case tableName.tag: return Tag.count();
        case tableName.tag_gallery: return TagGallery.count();
        case tableName.tag_garden: return TagGarden.count();
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
                        type: GArea.tagtype_info,
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

// 添加盆栽的标签
export async function addTagsForPlantpot(id='',tagList=['']){
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
                    await TagGarden.create({
                        tagid: tagid,
                        gardenid: id,
                    },{ transaction:t });
                });
            }
            else{
                sqllize.transaction(async t=>{
                    await TagGarden.create({
                        tagid: data.id,
                        gardenid: id,
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
            num += await TagGarden.count({where:{tagid:data[i]['id']}});
            return num;
        })()
        data[i]['usenum'] = usenum;
    }
    return data;
}
