import { Button, DialogActions, DialogContentText, FormControl, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { isEmailString } from "../../utils/tools";
import { postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";
import { useNavigate } from "react-router";

export function EditUserImportantForm(){
    const navigate = useNavigate()
    const [codeBtnDisabled,setCodeBtnDisabled] = useState(true)
    const [codeFieldDisabled,setCodeFieldDisabled] = useState(true)
    const [editBtnDisabled,setEditBtnDisabled] = useState(true)
    const [editUserImportantFormDisabled,setEditUserImportantFormDisabled] = useState(false)
    const [editUserImportantForm,setEditUserImportantForm] = useState({
        password: '',
        email: '',
        code: '',
    })
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    function checkGetCode(){
        let ok = false;
        let password = editUserImportantForm.password
        let email = editUserImportantForm.email
        if(email && isEmailString(email)){ok=true}
        else if(!email && password){ok=true}
        if(ok){setCodeBtnDisabled(false)}
        else{setCodeBtnDisabled(true)}
    }
    function getEditUserImportantCode(){
        setCodeBtnDisabled(true)
        postRequest(urls.getEditUserImportantCode,editUserImportantForm).then(res=>{
            if(res==1){
                setEditUserImportantFormDisabled(true)
                setCodeFieldDisabled(false)
            }
            else{setCodeBtnDisabled(false)}
        })
    }
    function editUserImportant(){
        setEditBtnDisabled(true)
        postRequest(urls.editUserImportant,editUserImportantForm).then(res=>{
            if(res==1){
                setSnackbarOpen(true)
                setSnackbarMessage('关键信息修改完成')
                navigate('/')
                location.reload()
            }
            else{setEditBtnDisabled(false)}
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
                提示：修改关键信息需要验证，留空表示不修改。
            </DialogContentText>
            <FormControl fullWidth>
                <TextField label="新密码" sx={{mt:2}} color="warning" disabled={editUserImportantFormDisabled} onChange={(e)=>{
                    editUserImportantForm.password = e.target.value
                    setEditUserImportantForm(editUserImportantForm)
                    checkGetCode()
                }}/>
                <TextField label="新邮箱" sx={{mt:2}} color="warning" disabled={editUserImportantFormDisabled} onChange={(e)=>{
                    editUserImportantForm.email = e.target.value
                    setEditUserImportantForm(editUserImportantForm)
                    checkGetCode()
                }}/>
                <TextField label="验证码" sx={{mt:2}} color="warning" disabled={codeFieldDisabled} onChange={(e)=>{
                    let code = e.target.value
                    editUserImportantForm.code = code
                    setEditUserImportantForm(editUserImportantForm)
                    if(code){setEditBtnDisabled(false)}else{setEditBtnDisabled(true)}
                }}/>
                <DialogActions>
                    <Button color="warning" disabled={codeBtnDisabled} onClick={getEditUserImportantCode}>获取</Button>
                    <Button color="warning" disabled={editBtnDisabled} onClick={editUserImportant}>修改</Button>
                </DialogActions>
            </FormControl>
        </>
    )
}
