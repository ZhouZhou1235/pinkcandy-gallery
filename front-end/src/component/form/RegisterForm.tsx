import { useState } from "react"
import { checkObjHaveEmpty, isEmailString, isUsername } from "../../utils/tools"
import { AccordionActions, AccordionDetails, Button, Snackbar, TextField } from "@mui/material"
import { postRequest } from "../../utils/HttpRequest"
import { urls } from "../../vars/urls"
import { useNavigate } from "react-router"

export function RegisterForm(){
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    const navigate = useNavigate()
    const [registerCodeBtn,setRegisterCodeBtn] = useState(true)
    const [registerBtn,setRegisterBtn] = useState(true)
    const [registerFieldDisabled,setRegisterFieldDisabled] = useState(false)
    const [registerForm,setRegisterForm] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        code: '',
    })
    // 输入符合注册要求
    function meetRegisterRequirement(){
        return(
            isUsername(registerForm.username)
            &&
            isEmailString(registerForm.email)
            &&
            !checkObjHaveEmpty(registerForm,['code'])
        )
    }
    function getRegisterCode(){
        setRegisterCodeBtn(true)
        setRegisterFieldDisabled(true)
        postRequest(urls.getRegisterCode,registerForm).then(data=>{
            if(typeof data=='number'){
                if(data==0){
                    setRegisterCodeBtn(false)
                    setRegisterFieldDisabled(false)            
                }
            }
        })
    }
    function register(){
        setRegisterBtn(true)
        postRequest(urls.register,registerForm).then(data=>{
            if(data!=0){navigate('/');location.reload()}
            else{
                setRegisterBtn(false)
                setSnackbarMessage('注册失败 请阅读规则');setSnackbarOpen(true)
            }
        })
    }
    return(
        <AccordionDetails>
            <span>
                <Snackbar
                    anchorOrigin={{ vertical:'top',horizontal:'center'}}
                    open={snackbarOpen}
                    message={snackbarMessage}
                    action={(<Button onClick={closeSnackbar}>关闭</Button>)}
                />
            </span>
            <small>输入必要的信息注册，需要邮箱验证。</small>
            <br />
            <small>
                注册失败可能的原因：<br />
                粉糖账号/邮箱已被使用<br />
                粉糖账号/邮箱格式不正确<br />
                存在未填项<br />
                验证码错误<br />
            </small>
            <TextField
                fullWidth
                label="设置粉糖账号"
                variant="standard"
                disabled={ registerFieldDisabled }
                placeholder="粉糖账号是五位数字 如10000"
                onChange={e=>{
                    registerForm.username = e.target.value
                    setRegisterForm(registerForm)
                    if(meetRegisterRequirement()){setRegisterCodeBtn(false)}else{setRegisterCodeBtn(true)}
                }}
            />
            <TextField fullWidth label="设置密码" variant="standard" disabled={ registerFieldDisabled } type="password" onChange={e=>{
                registerForm.password = e.target.value
                setRegisterForm(registerForm)
                if(meetRegisterRequirement()){setRegisterCodeBtn(false)}else{setRegisterCodeBtn(true)}
            }} />
            <TextField
                fullWidth
                label="名称"
                variant="standard"
                disabled={ registerFieldDisabled }
                placeholder="显示的名字"
                onChange={e=>{
                    registerForm.name = e.target.value
                    setRegisterForm(registerForm)
                    if(meetRegisterRequirement()){setRegisterCodeBtn(false)}else{setRegisterCodeBtn(true)}
                }}
            />
            <TextField
                fullWidth
                label="邮箱"
                variant="outlined"
                disabled={ registerFieldDisabled }
                sx={{mt:2}}
                placeholder="请使用通用合法的邮箱 如QQ/gmail等"
                onChange={e=>{
                    registerForm.email = e.target.value
                    setRegisterForm(registerForm)
                    if(meetRegisterRequirement()){setRegisterCodeBtn(false)}else{setRegisterCodeBtn(true)}
                }}
            />
            <TextField fullWidth label="验证码" variant="outlined" disabled={ !registerFieldDisabled } sx={{mt:2}} onChange={e=>{
                let theCode = e.target.value
                registerForm.code = theCode
                setRegisterForm(registerForm)
                if(
                    meetRegisterRequirement()
                    &&
                    !checkObjHaveEmpty(registerForm)
                ){setRegisterBtn(false)}
                else{setRegisterBtn(true)}
            }} />
            <AccordionActions>
                <Button variant="outlined" onClick={getRegisterCode} disabled={registerCodeBtn}>获取验证码</Button>
                <Button variant="outlined" onClick={register} disabled={registerBtn}>注册</Button>
            </AccordionActions>
        </AccordionDetails>
    )
}
