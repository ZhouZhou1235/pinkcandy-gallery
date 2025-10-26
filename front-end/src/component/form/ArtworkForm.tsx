import { Button, FormControl, FormLabel } from "@mui/material";
import { DefaultObj, GArea } from "../../vars/ConstVars";
import { Textarea,Input } from '@mui/joy';
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";
import { objSortBy, objToFormdata } from "../../utils/tools";
import { useNavigate } from "react-router";
import { Select, SelectProps } from "antd";
import { TagList } from "../TagList";

export function ArtworkForm(){
    let options: SelectProps['options'] = []
    const navigate = useNavigate()
    const [tagPreview,setTagPreview] = useState(options)
    const [btnDisabled,setBtnDisabled] = useState(false)
    const [artworkForm,setArtworkForm] = useState({
        title: '',
        info: '',
        tags: '', // 数组的json表示
        file: '' as any, // File类
    })
    const [searchTagArray,setSearchTagArray] = useState(DefaultObj.tagArray)
    async function loadTagOptions(){
        let options: SelectProps['options'] = []
        await getRequest(urls.getTags+`?num=${GArea.defaultShowNum*10}`).then(data=>{
            if(data!=0){
                let tagList :any[] = data
                tagList.sort(objSortBy('usenum',true))
                tagList.splice(Math.floor(GArea.defaultShowNum/2))
                for(let i=0;i<tagList.length;i++){
                    options.push({
                        label: '热门：'+tagList[i].tag,
                        value: tagList[i].tag,
                    })
                }
            }
        })
        await getRequest(urls.getTags+`?num=${Math.floor(GArea.defaultShowNum/2)}`).then(data=>{
            if(data!=0){
                let tagList :any[] = data
                for(let i=0;i<tagList.length;i++){
                    options.push({
                        label: '最新：'+tagList[i].tag,
                        value: tagList[i].tag,
                    })
                }
            }
        })
        setTagPreview(options)
    }
    async function searchToShowTags(tags:string[]){
        let theTagText = '';for(let i=0;i<tags.length;i++){theTagText += tags[i]+' '}
        await getRequest(urls.searchTags+`?tagtext=${theTagText}`).then(data=>{
            console.log(theTagText)
            if(data!=0){
                let tagList :any[] = data
                tagList.sort(objSortBy('usenum',true))
                tagList.splice(GArea.defaultShowNum)
                setSearchTagArray(tagList)
            }
        })
    }
    useEffect(()=>{
        loadTagOptions()
    },[])
    // 更新标签列表
    const selectTag = (tags:string[])=>{
        searchToShowTags(tags)
        artworkForm.tags = JSON.stringify(tags)
        setArtworkForm(artworkForm)
    }
    // 图片预览
    function showImagePreview(inputid:string,showid:string){
        let inputLabel:any = document.getElementById(inputid)
        let fileObj = inputLabel.files[0]
        let reads = new FileReader();
        if(fileObj){
            reads.readAsDataURL(fileObj);
            reads.onload=(args)=>{
                let showLabel:any = document.getElementById(showid)
                if(args.target?.result){showLabel.src=args.target?.result}
            }
        }
    }
    function uploadArtwork(){
        setBtnDisabled(true)
        postRequest(urls.uploadArtwork,objToFormdata(artworkForm),{'Content-Type':'mutipart/form-data'}).then(res=>{
            if(typeof res=='number'){
                if(res==1){navigate('/')}
                else{setBtnDisabled(false)}
            }
        })
    }
    return(
        <>
            <div className="row">
                <div className="col-sm-6 p-2">
                    <small>
                        只能由作者或作者授权的代发者上传。
                        至少上传图片和填写标题，
                        图片仅支持png、jpg、gif格式，
                        超过5M的图片可能导致失败。
                        输入标签有利于搜索。
                    </small>
                    <div className="input-group">
                        <label className="input-group-text">上传作品</label>
                        <input type="file" className="form-control" name="file" id="arkworkFile" onChange={(e)=>{
                            showImagePreview('arkworkFile','arkworkpreview')
                            let list:FileList|null = e.target.files
                            if(list){artworkForm.file = list[0]}
                            setArtworkForm(artworkForm)
                        }} />
                    </div>
                    <FormControl fullWidth>
                        <FormLabel>标题</FormLabel>
                        <Input placeholder="标题......" onChange={(e)=>{
                            artworkForm.title = e.target.value
                            setArtworkForm(artworkForm)
                        }} />
                        <FormLabel>说明</FormLabel>
                        <Textarea placeholder="描述此作品......" minRows={4} onChange={(e)=>{
                            artworkForm.info = e.target.value
                            setArtworkForm(artworkForm)
                        }} />
                        <FormLabel>标签</FormLabel>
                        <Select
                            mode="tags"
                            placeholder="输入标签"
                            onChange={selectTag}
                            options={tagPreview}
                        />
                        <TagList tagArray={searchTagArray}/>
                        <small>标签建议</small>
                        <Button variant="outlined" sx={{mt:2}} onClick={uploadArtwork} disabled={btnDisabled}>上传</Button>
                    </FormControl>
                </div>
                <div className="col-sm-6 p-2">
                    <img src={ GArea.defaultBackimage } alt="artwork" id="arkworkpreview" width={'100%'} />
                </div>
            </div>
        </>
    )
}
