import { Button, FormControl, FormLabel } from "@mui/material";
import { GArea } from "../vars/ConstVars";
import { Textarea,Input } from '@mui/joy';
import { useState } from "react";
import { postRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { objToFormdata } from "../utils/tools";
import { useNavigate } from "react-router";
import { Select, SelectProps } from "antd";

export function ArtworkForm(){
    let options: SelectProps['options'] = []
    const navigate = useNavigate()
    const [tagPreview,setTagPreview] = useState(options)
    // test 标签建议 向后端查询最近的标签
    options.push({
        label: '热门：犬科',
        value: '犬科',
    })
    options.push({
        label: '最近：gallery4',
        value: 'gallery4',
    })
    const [btnDisabled,setBtnDisabled] = useState(false)
    const [artworkForm,setArtworkForm] = useState({
        title: '',
        info: '',
        tags: '', // 数组的json表示
        file: '' as any, // File类
    })
    // 更新标签列表
    const selectTag = (tags:string[])=>{
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
