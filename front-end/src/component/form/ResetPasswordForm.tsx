import { AccordionActions, AccordionDetails, Button, TextField } from "@mui/material";
import { useState } from "react";
import { checkObjHaveEmpty, isEmailString } from "../../utils/tools";
import { postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";
import { useNavigate } from "react-router";

export function ResetPasswordForm(){
    const navigate = useNavigate()
    const [getCodeBtnDisabled,setGetCodeBtnDisabled] = useState(true)
    const [resetBtnDisabled,setResetBtnDisabled] = useState(true)
    const [emailFieldDisabled,setEmailFieldDisabled] = useState(false)
    const [resetFieldDisabled,setResetFieldDisabled] = useState(true)
    const [resetPasswordForm,setResetPasswordForm] = useState({
        email: '',
        code: '',
        password: '',
    })
    function getResetPasswordCode(){
        setGetCodeBtnDisabled(true)
        setEmailFieldDisabled(true)
        postRequest(urls.getResetPasswordCode,resetPasswordForm).then(data=>{
            if(typeof data=='number'){
                if(data==1){setResetFieldDisabled(false)}
                else{
                    setGetCodeBtnDisabled(false)
                    setEmailFieldDisabled(false)           
                }
            }
        })
    }
    function resetPassword(){
        setResetFieldDisabled(true)
        setResetBtnDisabled(true)
        postRequest(urls.resetPassword,resetPasswordForm).then(data=>{
            if(typeof data=='number'){
                if(data==1){navigate('/');location.reload()}
                else{
                    setResetFieldDisabled(false)
                    setResetBtnDisabled(false)
                }
            }
        })
    }
    return(
        <AccordionDetails>
            <small>输入绑定的邮箱获取验证码，然后设置新的密码。</small>
            <TextField fullWidth label="邮箱" variant="standard" disabled={ emailFieldDisabled } onChange={e=>{
                let theEmail = e.target.value
                resetPasswordForm.email = theEmail
                setResetPasswordForm(resetPasswordForm)
                if(isEmailString(theEmail)){setGetCodeBtnDisabled(false)}
                else{setGetCodeBtnDisabled(true)}
            }} />
            <TextField fullWidth label="验证码" variant="standard" disabled={ resetFieldDisabled } onChange={e=>{
                resetPasswordForm.code = e.target.value
                setResetPasswordForm(resetPasswordForm)
                if(checkObjHaveEmpty(resetPasswordForm)){setResetBtnDisabled(true)}else{setResetBtnDisabled(false)}
            }} />
            <TextField fullWidth label="设置新密码" variant="standard" type="password" disabled={ resetFieldDisabled } onChange={e=>{
                resetPasswordForm.password = e.target.value
                setResetPasswordForm(resetPasswordForm)
                if(checkObjHaveEmpty(resetPasswordForm)){setResetBtnDisabled(true)}else{setResetBtnDisabled(false)}
            }} />
            <AccordionActions>
                <Button variant="outlined" onClick={getResetPasswordCode} disabled={getCodeBtnDisabled}>获取验证码</Button>
                <Button variant="outlined" onClick={resetPassword} disabled={resetBtnDisabled}>重设密码</Button>
            </AccordionActions>
        </AccordionDetails>
    )
}
