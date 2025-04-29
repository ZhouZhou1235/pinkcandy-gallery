import { useState } from "react"
import { checkObjHaveEmpty, isEmailString, isUsername } from "../../utils/tools"
import { AccordionActions, AccordionDetails, Button, TextField } from "@mui/material"
import { postRequest } from "../../utils/HttpRequest"
import { urls } from "../../vars/urls"
import { useNavigate } from "react-router"

export function RegisterForm(){
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
                if(data==1){console.log(data)}
                else{
                    setRegisterCodeBtn(false)
                    setRegisterFieldDisabled(false)            
                }
            }
        })
    }
    function register(){
        setRegisterBtn(true)
        postRequest(urls.register,registerForm).then(data=>{
            if(typeof data=='number'){
                if(data==1){
                    navigate('/')
                    location.reload()
                }
                else{setRegisterBtn(false)}
            }
        })
    }
    return(
        <AccordionDetails>
            <TextField fullWidth label="设置粉糖账号" variant="standard" disabled={ registerFieldDisabled } onChange={e=>{
                registerForm.username = e.target.value
                setRegisterForm(registerForm)
                if(meetRegisterRequirement()){setRegisterCodeBtn(false)}else{setRegisterCodeBtn(true)}
            }} />
            <TextField fullWidth label="设置密码" variant="standard" disabled={ registerFieldDisabled } type="password" onChange={e=>{
                registerForm.password = e.target.value
                setRegisterForm(registerForm)
                if(meetRegisterRequirement()){setRegisterCodeBtn(false)}else{setRegisterCodeBtn(true)}
            }} />
            <TextField fullWidth label="名称" variant="standard" disabled={ registerFieldDisabled } onChange={e=>{
                registerForm.name = e.target.value
                setRegisterForm(registerForm)
                if(meetRegisterRequirement()){setRegisterCodeBtn(false)}else{setRegisterCodeBtn(true)}
            }} />
            <TextField fullWidth label="邮箱" variant="outlined" disabled={ registerFieldDisabled } sx={{mt:2}} onChange={e=>{
                registerForm.email = e.target.value
                setRegisterForm(registerForm)
                if(meetRegisterRequirement()){setRegisterCodeBtn(false)}else{setRegisterCodeBtn(true)}
            }} />
            <TextField fullWidth label="验证码" variant="outlined" sx={{mt:2}} onChange={e=>{
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
