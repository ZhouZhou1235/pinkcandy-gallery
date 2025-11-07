import { Button, Card, CardContent, CardMedia, FormControl, FormLabel, Snackbar, Typography } from "@mui/material";
import { Textarea,Input } from '@mui/joy';
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";
import { Select, SelectProps } from "antd";
import { DefaultObj } from "../../vars/ConstVars";
import { selectPropsTagsToArray } from "../../utils/tools";

export function EditArtworkForm({galleryid=''}){
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    const [artworkdata,setArtworkdata] = useState(DefaultObj.artworkdata)
    const [tagselectElement,setTagselectElement] = useState(<></>)
    const [editArtworkForm,setEditArtworkForm] = useState({
        id: galleryid,
        title: '',
        info: '',
        tags: '',
    })
    const selectTag = (tags:string[])=>{
        editArtworkForm.tags = JSON.stringify(tags)
        setEditArtworkForm(editArtworkForm)
    }
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    function editArtwork(){
        postRequest(urls.editArtwork,editArtworkForm).then(res=>{
            if(res!=0){
                setSnackbarMessage('已完成作品修改')
                setSnackbarOpen(true)
            }
        })
    }
    async function loadData(){
        let theEditArtworkForm = editArtworkForm
        await getRequest(urls.getArtwork+'?id='+galleryid).then(data=>{
            if(data!=0){
                setArtworkdata(data)
                theEditArtworkForm.id = data.id
                theEditArtworkForm.title = data.title
                theEditArtworkForm.info = data.info
                setTagselectElement(<></>)
            }
        })
        await getRequest(urls.getTagsArtwork+'/'+galleryid).then(data=>{
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
                theEditArtworkForm.tags = JSON.stringify(selectPropsTagsToArray(options))
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
        setEditArtworkForm(theEditArtworkForm)
    }
    useEffect(()=>{
        loadData()
    },[galleryid])
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
                <CardMedia
                    sx={{ height: 300 }}
                    image={ urls.artworkimagePreviewURL+artworkdata.filename }
                    title="artworkimage"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className="OnelineTextBox">
                        { artworkdata.title }
                    </Typography>
                    <p style={{whiteSpace:'pre-line'}}>{artworkdata.info}</p>
                </CardContent>
            </Card>
            <FormControl fullWidth>
                <FormLabel>标题</FormLabel>
                <Input
                    placeholder={editArtworkForm.title}
                    onChange={(e)=>{
                        editArtworkForm.title = e.target.value
                        setEditArtworkForm(editArtworkForm)
                    }}
                />
                <FormLabel>说明</FormLabel>
                <Textarea placeholder={editArtworkForm.info} minRows={4} onChange={(e)=>{
                    editArtworkForm.info = e.target.value
                    setEditArtworkForm(editArtworkForm)
                }} />
                <FormLabel>标签</FormLabel>
                {tagselectElement}
                <Button sx={{mt:2}} onClick={editArtwork} variant="outlined" color="warning">修改</Button>
            </FormControl>
        </>
    )
}
