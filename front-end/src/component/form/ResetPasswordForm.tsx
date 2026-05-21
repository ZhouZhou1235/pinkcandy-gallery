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
        <div>
            <small>输入绑定的邮箱获取验证码，然后设置新的密码。</small>
            <div className="mb-3">
                <input type="email" className="form-control" placeholder="邮箱" disabled={ emailFieldDisabled } onChange={e=>{
                    let theEmail = e.target.value
                    resetPasswordForm.email = theEmail
                    setResetPasswordForm(resetPasswordForm)
                    if(isEmailString(theEmail)){setGetCodeBtnDisabled(false)}
                    else{setGetCodeBtnDisabled(true)}
                }} />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="验证码" disabled={ resetFieldDisabled } onChange={e=>{
                    resetPasswordForm.code = e.target.value
                    setResetPasswordForm(resetPasswordForm)
                    if(checkObjHaveEmpty(resetPasswordForm)){setResetBtnDisabled(true)}else{setResetBtnDisabled(false)}
                }} />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" placeholder="设置新密码" disabled={ resetFieldDisabled } onChange={e=>{
                    resetPasswordForm.password = e.target.value
                    setResetPasswordForm(resetPasswordForm)
                    if(checkObjHaveEmpty(resetPasswordForm)){setResetBtnDisabled(true)}else{setResetBtnDisabled(false)}
                }} />
            </div>
            <div className="d-flex gap-2">
                <button className="btn btn-outline-primary" onClick={getResetPasswordCode} disabled={getCodeBtnDisabled}>获取验证码</button>
                <button className="btn btn-outline-primary" onClick={resetPassword} disabled={resetBtnDisabled}>重设密码</button>
            </div>
        </div>
    )
}
