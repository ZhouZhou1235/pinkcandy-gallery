import { useEffect, useState } from "react"
import { checkObjHaveEmpty, isEmailString, isUsername } from "../../code/utils"
import { getRequest, postRequest, urls } from "../../code/api"
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
        let updatedForm = {
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
        <div>
            {snackbarOpen && (
                <div className="toast show position-fixed top-0 start-50 translate-middle-x" style={{zIndex: 9999}}>
                    <div className="toast-body d-flex justify-content-between align-items-center">
                        <span>{snackbarMessage}</span>
                        <button className="btn-close" onClick={closeSnackbar}></button>
                    </div>
                </div>
            )}
            <small>使用邮箱注册，遇到问题请联系管理员。</small>
            <div className="mb-3">
                <small>粉糖账号</small>
                <input
                    type="text"
                    className="form-control"
                    placeholder={registerForm.username}
                    disabled={ registerFieldDisabled || !canSetUsername }
                    value={registerForm.username}
                    onChange={e=>handleInputChange('username', e.target.value)}
                />
            </div>
            <div className="mb-3">
                <small>邮箱</small>
                <input
                    type="email"
                    className="form-control"
                    placeholder="使用合法邮箱 如qq、gmail等"
                    disabled={ registerFieldDisabled }
                    value={registerForm.email}
                    onChange={e=>handleInputChange('email', e.target.value)}
                />
            </div>
            <div className="mb-3">
                <small>密码</small>
                <input
                    type="password"
                    className="form-control"
                    placeholder="设置密码"
                    disabled={ registerFieldDisabled }
                    value={registerForm.password}
                    onChange={e=>handleInputChange('password', e.target.value)}
                />
            </div>
            <div className="mb-3">
                <small>名称</small>
                <input
                    type="text"
                    className="form-control"
                    placeholder="名称"
                    disabled={ registerFieldDisabled }
                    value={registerForm.name}
                    onChange={e=>handleInputChange('name', e.target.value)}
                />
            </div>
            <div className="mb-3">
                <small>验证码</small>
                <input
                    type="text"
                    className="form-control"
                    placeholder="验证码"
                    disabled={ !registerFieldDisabled }
                    value={registerForm.code}
                    onChange={e=>handleInputChange('code', e.target.value)}
                />
            </div>
            <div className="d-flex gap-2">
                <button className="btn btn-outline-primary" onClick={getRegisterCode} disabled={registerCodeBtn}>获取验证码</button>
                <button className="btn btn-outline-primary" onClick={register} disabled={registerBtn}>注册</button>
            </div>
        </div>
    )
}
