import { useEffect, useState } from "react"
import { checkObjHaveEmpty, isEmailString, isUsername } from "../../utils/tools"
import { AccordionActions, AccordionDetails, Button, Snackbar, TextField } from "@mui/material"
import { getRequest, postRequest } from "../../utils/HttpRequest"
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
    const [canSetUsername,setCanSetUsername] = useState(false)
    const [registerForm,setRegisterForm] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        code: '',
    })
    function meetRegisterRequirement(){
        return(
            isUsername(registerForm.username)
            &&
            isEmailString(registerForm.email)
            &&
            !checkObjHaveEmpty(registerForm,['code'])
        )
    }
    function handleInputChange(field:string,value:string){
        const updatedForm = {
            ...registerForm,
            [field]:value
        }
        setRegisterForm(updatedForm)
        if(meetRegisterRequirement()){setRegisterCodeBtn(false)}
        else{setRegisterCodeBtn(true)}
        if(meetRegisterRequirement()&&!checkObjHaveEmpty(updatedForm)){setRegisterBtn(false)}
        else{setRegisterBtn(true)}
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
    useEffect(()=>{
        (async()=>{
            let registerableUsername = await getRequest(urls.getRegisterableUsername)
            if(registerableUsername){
                registerForm.username = registerableUsername
                setRegisterForm(registerForm)
            }
            else{
                setCanSetUsername(true)
            }
        })()
    },[])
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
            <small>使用邮箱注册，自动生成粉糖账号。</small>
            <br />
            <small>
                提示：<br />
                一般不再允许自定义粉糖账号<br />
                所有输入框都要填写<br />
                验证码在输入的邮箱中查看<br />
                格式或验证码错误将导致注册失败<br />
            </small>
            <TextField
                fullWidth
                label="粉糖账号"
                variant="standard"
                disabled={ registerFieldDisabled || !canSetUsername }
                placeholder="粉糖账号是五位数字 如10000"
                value={registerForm.username}
                onChange={e=>handleInputChange('username', e.target.value)}
            />
            <TextField
                fullWidth
                label="邮箱"
                variant="standard"
                disabled={ registerFieldDisabled }
                placeholder="使用合法邮箱 如qq、gmail等"
                value={registerForm.email}
                onChange={e=>handleInputChange('email', e.target.value)}
            />
            <TextField 
                fullWidth 
                label="设置密码" 
                variant="standard" 
                disabled={ registerFieldDisabled } 
                type="password" 
                value={registerForm.password}
                onChange={e=>handleInputChange('password', e.target.value)} 
            />
            <TextField
                fullWidth
                label="名称"
                variant="standard"
                disabled={ registerFieldDisabled }
                placeholder="显示的名字"
                value={registerForm.name}
                onChange={e=>handleInputChange('name', e.target.value)}
            />
            <TextField 
                fullWidth 
                label="验证码" 
                variant="standard" 
                disabled={ !registerFieldDisabled } 
                value={registerForm.code}
                onChange={e=>handleInputChange('code', e.target.value)} 
            />
            <AccordionActions>
                <Button variant="outlined" onClick={getRegisterCode} disabled={registerCodeBtn}>获取验证码</Button>
                <Button variant="outlined" onClick={register} disabled={registerBtn}>注册</Button>
            </AccordionActions>
        </AccordionDetails>
    )
}
