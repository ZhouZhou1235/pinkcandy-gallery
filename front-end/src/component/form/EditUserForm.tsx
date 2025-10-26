import { useEffect, useState } from "react"
import { DefaultObj } from "../../vars/ConstVars"
import { getRequest, postRequest } from "../../utils/HttpRequest"
import { urls } from "../../vars/urls"
import { Textarea } from "@mui/joy";
import { Button, DialogActions, DialogContentText, FormControl, FormHelperText, MenuItem, Select, Snackbar, TextField } from "@mui/material";

export function EditUserForm(){
    const [editUserForm,setEditUserForm] = useState(DefaultObj.userdata)
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    function getUserData(){
        getRequest(urls.getSessionUser).then(data=>{
            if(typeof data=='object'){
                setEditUserForm(data)
            }
        })
    }
    function editUser(){
        postRequest(urls.editUser,editUserForm).then(x=>{
            if(x==1){
                getUserData()
                setSnackbarOpen(true)
                setSnackbarMessage('修改完成')
            }
        })
    }
    useEffect(()=>{
        getUserData()
    },[])
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
                提示：名称不能为空
            </DialogContentText>
            <FormControl fullWidth>
                <TextField label="名称" sx={{mt:2}} placeholder={editUserForm.name} onChange={(e)=>{
                    editUserForm.name = e.target.value
                    setEditUserForm(editUserForm)
                }}/>
                <Textarea sx={{mt:2}} minRows={4} placeholder={editUserForm.info} onChange={(e)=>{
                    editUserForm.info = e.target.value
                    setEditUserForm(editUserForm)
                }}/>
                <FormHelperText>介绍</FormHelperText>
                <Select
                    sx={{mt:2}}
                    defaultValue={'' as any}
                    onChange={(event)=>{
                        editUserForm.sex = event.target.value
                        setEditUserForm(editUserForm)
                    }}
                >
                    <MenuItem value={'1'}>雄</MenuItem>
                    <MenuItem value={'2'}>雌</MenuItem>
                    <MenuItem value={''}>无</MenuItem>
                </Select>
                <FormHelperText>选择性别</FormHelperText>
                <TextField label="兽种" sx={{mt:2}} placeholder={editUserForm.species?editUserForm.species:''} onChange={(e)=>{
                    editUserForm.species = e.target.value
                    setEditUserForm(editUserForm)
                }}/>
            </FormControl>
            <DialogActions>
                <Button onClick={editUser}>修改</Button>
            </DialogActions>
        </>
    )
}
