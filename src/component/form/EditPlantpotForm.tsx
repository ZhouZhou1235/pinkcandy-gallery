import { Button, Card, CardContent, CardMedia, FormControl, FormLabel, Snackbar, Typography } from "@mui/material";
import { Textarea,Input } from '@mui/joy';
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";
import { Select, SelectProps } from "antd";
import { DefaultObj, GArea } from "../../vars/ConstVars";
import { selectPropsTagsToArray } from "../../utils/tools";

export function EditPlantpotForm({gardenid=''}){
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    const [plantpotdata,setPlantpotdata] = useState(DefaultObj.plantpotdata)
    const [tagselectElement,setTagselectElement] = useState(<></>)
    const [editPlantpotForm,setEditPlantpotForm] = useState({
        id: gardenid,
        title: '',
        content: '',
        tags: '',
    })
    const selectTag = (tags:string[])=>{
        editPlantpotForm.tags = JSON.stringify(tags)
        console.log(editPlantpotForm)
        setEditPlantpotForm(editPlantpotForm)
    }
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    function editPlantpot(){
        postRequest(urls.editPlantpot,editPlantpotForm).then(res=>{
            if(res!=0){
                setSnackbarMessage('已完成盆栽修改')
                setSnackbarOpen(true)
            }
        })
    }
    async function loadData(){
        let theEditPlantpotForm = editPlantpotForm
        await getRequest(urls.getPlantpot+'?id='+gardenid).then(data=>{
            if(data!=0){
                setPlantpotdata(data)
                theEditPlantpotForm.id = data.id
                theEditPlantpotForm.title = data.title
                theEditPlantpotForm.content = data.content
                setTagselectElement(<></>)
            }
        })
        await getRequest(urls.getTagsPlantpot+'/'+gardenid).then(data=>{
            if(data!=0){
                let tagArray :any[] = data
                let options: SelectProps['options'] = []
                for(let i=0;i<tagArray.length;i++){
                    let obj = tagArray[i];
                    options.push({
                        label: obj.tag,
                        value: obj.tag,
                    })
                }
                theEditPlantpotForm.tags = JSON.stringify(selectPropsTagsToArray(options))
                setTagselectElement(
                    <Select
                        mode="tags"
                        placeholder="输入标签"
                        onChange={selectTag}
                        options={options}
                        defaultValue={selectPropsTagsToArray(options)}
                    />
                )
            }
            else{
                setTagselectElement(
                    <Select
                        mode="tags"
                        placeholder="输入标签"
                        onChange={selectTag}
                    />
                )
            }
        })
        console.log(theEditPlantpotForm)
        setEditPlantpotForm(theEditPlantpotForm)
    }
    useEffect(()=>{
        loadData()
    },[gardenid])
    return(
        <>
            <span>
                <Snackbar
                    anchorOrigin={{ vertical:'top',horizontal:'center'}}
                    open={snackbarOpen}
                    message={snackbarMessage}
                    action={(<Button onClick={closeSnackbar}>关闭</Button>)}
                />
            </span>
            <Card>
                {
                    plantpotdata.filename
                    ?
                    <CardMedia
                        sx={{ height: 300 }}
                        image={ GArea.plantpotimageURL+plantpotdata.filename }
                        title="artworkimage"
                    />
                    :
                    null
                }
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className="OnelineTextBox">
                        { plantpotdata.title }
                    </Typography>
                    <p style={{whiteSpace:'pre-line'}}>{plantpotdata.content}</p>
                </CardContent>
            </Card>
            <FormControl fullWidth>
                <FormLabel>标题</FormLabel>
                <Input
                    placeholder={editPlantpotForm.title}
                    onChange={(e)=>{
                        editPlantpotForm.title = e.target.value
                        setEditPlantpotForm(editPlantpotForm)
                    }}
                />
                <FormLabel>内容</FormLabel>
                <Textarea placeholder={editPlantpotForm.content} minRows={6} onChange={(e)=>{
                    editPlantpotForm.content = e.target.value
                    setEditPlantpotForm(editPlantpotForm)
                }} />
                <FormLabel>标签</FormLabel>
                {tagselectElement}
                <Button sx={{mt:2}} onClick={editPlantpot} variant="outlined" color="warning">修改</Button>
            </FormControl>
        </>
    )
}
