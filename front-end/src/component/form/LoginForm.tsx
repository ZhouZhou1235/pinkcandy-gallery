import { useNavigate } from "react-router-dom"
import { postRequest } from "../../utils/HttpRequest"
import { useState } from "react"
import { urls } from "../../vars/urls"
import { AccordionActions, AccordionDetails, Button, Snackbar, TextField } from "@mui/material"

export function LoginForm(){
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    const navigate = useNavigate()
    const [loginForm,setLoginForm] = useState({
        username: '',
        password: '',
    })
    function login(){
        postRequest(urls.login,loginForm).then(x=>{
            if(x!=0){navigate('/');location.reload()}
            else{setSnackbarMessage('登录失败 检查账号或密码');setSnackbarOpen(true)}
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
            <small>输入粉糖账号（或邮箱）和密码登录</small>
            <TextField
                fullWidth
                label="粉糖账号"
                variant="standard"
                placeholder="粉糖账号/邮箱"
                onChange={e=>{
                    loginForm.username = e.target.value
                    setLoginForm(loginForm)
                }}
            />
            <TextField fullWidth label="密码" variant="standard" type="password" onChange={e=>{
                loginForm.password = e.target.value
                setLoginForm(loginForm)
            }} />
            <AccordionActions>
                <Button variant="outlined" onClick={login}>登录</Button>
            </AccordionActions>
        </AccordionDetails>
    )
}
