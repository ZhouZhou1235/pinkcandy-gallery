import { Button, FormControl, FormLabel } from "@mui/material";
import { Textarea,Input } from '@mui/joy';
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";
import { objSortBy, objToFormdata } from "../../utils/tools";
import { useNavigate } from "react-router";
import { Select, SelectProps } from "antd";
import { DefaultObj, GArea } from "../../vars/ConstVars";
import { TagList } from "../TagList";

export function PlantpotForm(){
    let options: SelectProps['options'] = []
    const navigate = useNavigate()
    const [tagPreview,setTagPreview] = useState(options)
    const [btnDisabled,setBtnDisabled] = useState(false)
    const [plantpotForm,setPlantpotForm] = useState({
        title: '',
        content: '',
        tags: '',
        file: '' as any,
    })
    const [searchTagArray,setSearchTagArray] = useState(DefaultObj.tagArray)
    async function loadTagOptions(){
        let options: SelectProps['options'] = []
        await getRequest(urls.getTags+`?num=${GArea.defaultShowNum*10}`).then(data=>{
            if(data!=0){
                let tagList :any[] = data
                tagList.sort(objSortBy('usenum',true))
                tagList.splice(GArea.defaultShowNum)
                for(let i=0;i<tagList.length;i++){
                    options.push({
                        label: '热门：'+tagList[i].tag,
                        value: tagList[i].tag,
                    })
                }
            }
        })
        await getRequest(urls.getTags+`?num=${GArea.defaultShowNum}`).then(data=>{
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
        plantpotForm.tags = JSON.stringify(tags)
        setPlantpotForm(plantpotForm)
    }
    function createPlantpot(){
        setBtnDisabled(true)
        postRequest(urls.createPlantpot,objToFormdata(plantpotForm),{'Content-Type':'mutipart/form-data'}).then(res=>{
            if(typeof res=='number'){
                if(res==1){navigate('/')}
                else{setBtnDisabled(false)}
            }
        })
    }
    return(
        <div className="container">
            <small>
                至少填写标题和内容，
                图片仅支持png、jpg、gif格式，
                超过5M的图片可能导致失败。
                输入标签有利于搜索。
            </small>
            <div className="input-group">
                <label className="input-group-text">盆栽首图</label>
                <input type="file" className="form-control" name="file" id="arkworkFile" onChange={(e)=>{
                    let list:FileList|null = e.target.files
                    if(list){plantpotForm.file = list[0]}
                    setPlantpotForm(plantpotForm)
                }} />
            </div>
            <FormControl fullWidth>
                <FormLabel>盆栽标题</FormLabel>
                <Input placeholder="标题......" onChange={(e)=>{
                    plantpotForm.title = e.target.value
                    setPlantpotForm(plantpotForm)
                }} />
                <FormLabel>内容</FormLabel>
                <Textarea placeholder="内容......" minRows={8} onChange={(e)=>{
                    plantpotForm.content = e.target.value
                    setPlantpotForm(plantpotForm)
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
                <Button variant="outlined" sx={{mt:2}} onClick={createPlantpot} disabled={btnDisabled}>创建</Button>
            </FormControl>
        </div>
    )
}
