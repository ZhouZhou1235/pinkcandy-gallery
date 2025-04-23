import { Button, FormControl, FormLabel } from "@mui/material";
import { Textarea,Input } from '@mui/joy';
import { useEffect, useState } from "react";
import { postRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { objToFormdata } from "../utils/tools";
import { useNavigate } from "react-router";
import { Select, SelectProps } from "antd";

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
    useEffect(()=>{
        // ...
        // options.push({
        //     label: '最近：gallery4',
        //     value: 'gallery4',
        // })
        setTagPreview(options)
    },[])
    // 更新标签列表
    const selectTag = (tags:string[])=>{
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
        <>
            <div className="container">
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
                    <Button variant="outlined" sx={{mt:2}} onClick={createPlantpot} disabled={btnDisabled}>创建</Button>
                </FormControl>
            </div>
        </>
    )
}
