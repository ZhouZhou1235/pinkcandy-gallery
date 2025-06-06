import { Button, DialogActions, DialogContentText, FormControl, FormHelperText, Snackbar } from "@mui/material";
import { useState } from "react";
import { postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";
import { objToFormdata } from "../../utils/tools";

export function EditUserImageForm(){
    const [editUserImageForm,setEditUserImageForm] = useState({
        headimage: '' as any,
        backimage: '' as any,
    })
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    function editUserImage(){
        postRequest(urls.editUserImage,objToFormdata(editUserImageForm),{'Content-Type':'mutipart/form-data'}).then(res=>{
            if(res==1){
                setSnackbarOpen(true)
                setSnackbarMessage('图片上传完成')
                editUserImageForm.headimage = ''
                editUserImageForm.backimage = ''
                setEditUserImageForm(editUserImageForm)
            }
        })
    }
    function clearUserImage(){
        postRequest(urls.clearUserImage).then(res=>{
            if(res==1){
                setSnackbarOpen(true)
                setSnackbarMessage('图片已清除')
            }
        })
    }
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
            <DialogContentText>
                提示：上传图片文件，过大会导致失败。
            </DialogContentText>
            <FormControl fullWidth>
                <input type="file" className="form-control" name="file" onChange={(e)=>{
                    let list:FileList|null = e.target.files
                    if(list){editUserImageForm.headimage = list[0]}
                    setEditUserImageForm(editUserImageForm)
                }} />
                <FormHelperText>头像</FormHelperText>
                <input type="file" className="form-control" name="file" onChange={(e)=>{
                    let list:FileList|null = e.target.files
                    if(list){editUserImageForm.backimage = list[0]}
                    setEditUserImageForm(editUserImageForm)
                }} />
                <FormHelperText>背景墙</FormHelperText>
                <DialogActions>
                    <Button onClick={clearUserImage}>清除</Button>
                    <Button onClick={editUserImage}>上传</Button>
                </DialogActions>
            </FormControl>
        </>
    )
}
