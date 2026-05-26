import { useNavigate } from "react-router-dom"
import { postRequest, urls } from "../../code/api"
import { useState } from "react"

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
        <div>
            {snackbarOpen && (
                <div className="toast show position-fixed top-0 start-50 translate-middle-x" style={{zIndex: 9999}}>
                    <div className="toast-body d-flex justify-content-between align-items-center">
                        <span>{snackbarMessage}</span>
                        <button className="btn-close" onClick={closeSnackbar}></button>
                    </div>
                </div>
            )}
            <small>输入粉糖账号和密码登录</small>
            <div className="mb-3">
                <small>粉糖账号</small>
                <input
                    type="text"
                    className="form-control"
                    placeholder="粉糖账号/邮箱"
                    onChange={e=>{
                        loginForm.username = e.target.value
                        setLoginForm(loginForm)
                    }}
                />
            </div>
            <div className="mb-3">
                <small>密码</small>
                <input type="password" className="form-control" placeholder="密码" onChange={e=>{
                    loginForm.password = e.target.value
                    setLoginForm(loginForm)
                }} />
            </div>
            <div className="d-flex gap-2">
                <button className="btn btn-outline-primary" onClick={login}>登录</button>
            </div>
        </div>
    )
}
