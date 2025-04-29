import { useNavigate } from "react-router-dom"
import { postRequest } from "../../utils/HttpRequest"
import { useState } from "react"
import { urls } from "../../vars/urls"
import { AccordionActions, AccordionDetails, Button, TextField } from "@mui/material"

export function LoginForm(){
    const navigate = useNavigate()
    const [loginForm,setLoginForm] = useState({
        username: '',
        password: '',
    })
    function login(){
        postRequest(urls.login,loginForm).then(x=>{
            if(typeof x=='number'){if(x==1){
                navigate('/')
                location.reload()
            }else{console.log('login failed')}}
        })
    }
    return(
        <AccordionDetails>
            <TextField fullWidth label="粉糖账号" variant="standard" onChange={e=>{
                loginForm.username = e.target.value
                setLoginForm(loginForm)
            }} />
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
