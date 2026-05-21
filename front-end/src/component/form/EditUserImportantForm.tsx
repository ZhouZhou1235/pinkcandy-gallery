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
                setSnackbarMessage('关键信息修改完成 需要刷新以重新登录')
                navigate('/')
            }
            else{setEditBtnDisabled(false)}
        })
    }
    return(
        <>
            {snackbarOpen && (
                <div className="toast show position-fixed top-0 start-50 translate-middle-x" style={{zIndex: 9999}}>
                    <div className="toast-body d-flex justify-content-between align-items-center">
                        <span>{snackbarMessage}</span>
                        <button className="btn-close" onClick={closeSnackbar}></button>
                    </div>
                </div>
            )}
            <p className="text-muted">提示：修改关键信息需要验证，留空表示不修改。</p>
            <div className="mb-3">
                <label className="form-label">新密码</label>
                <input type="password" className="form-control" disabled={editUserImportantFormDisabled} onChange={(e)=>{
                    editUserImportantForm.password = e.target.value
                    setEditUserImportantForm(editUserImportantForm)
                    checkGetCode()
                }}/>
            </div>
            <div className="mb-3">
                <label className="form-label">新邮箱</label>
                <input type="email" className="form-control" disabled={editUserImportantFormDisabled} onChange={(e)=>{
                    editUserImportantForm.email = e.target.value
                    setEditUserImportantForm(editUserImportantForm)
                    checkGetCode()
                }}/>
            </div>
            <div className="mb-3">
                <label className="form-label">验证码</label>
                <input type="text" className="form-control" disabled={codeFieldDisabled} onChange={(e)=>{
                    let code = e.target.value
                    editUserImportantForm.code = code
                    setEditUserImportantForm(editUserImportantForm)
                    if(code){setEditBtnDisabled(false)}else{setEditBtnDisabled(true)}
                }}/>
            </div>
            <div className="d-flex gap-2">
                <button className="btn btn-warning" disabled={codeBtnDisabled} onClick={getEditUserImportantCode}>获取</button>
                <button className="btn btn-warning" disabled={editBtnDisabled} onClick={editUserImportant}>修改</button>
            </div>
        </>
    )
}
