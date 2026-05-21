import { useEffect, useState } from "react"
import { DefaultObj } from "../../vars/ConstVars"
import { getRequest, postRequest } from "../../utils/HttpRequest"
import { urls } from "../../vars/urls"

export function EditUserForm(){
    const [editUserForm,setEditUserForm] = useState(DefaultObj.userdata)
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    function getUserData(){
        getRequest(urls.getSessionUser).then(data=>{
            if(typeof data=='object'){
                setEditUserForm(data)
            }
        })
    }
    function editUser(){
        postRequest(urls.editUser,editUserForm).then(x=>{
            if(x==1){
                getUserData()
                setSnackbarOpen(true)
                setSnackbarMessage('修改完成')
            }
        })
    }
    useEffect(()=>{
        getUserData()
    },[])
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
            <p className="text-muted">提示：名称不能为空</p>
            <div className="mb-3">
                <label className="form-label">名称</label>
                <input type="text" className="form-control" placeholder={editUserForm.name} onChange={(e)=>{
                    editUserForm.name = e.target.value
                    setEditUserForm(editUserForm)
                }}/>
            </div>
            <div className="mb-3">
                <label className="form-label">介绍</label>
                <textarea className="form-control" rows={4} placeholder={editUserForm.info} onChange={(e)=>{
                    editUserForm.info = e.target.value
                    setEditUserForm(editUserForm)
                }}></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">选择性别</label>
                <select className="form-select" defaultValue={''} onChange={(event)=>{
                    editUserForm.sex = event.target.value
                    setEditUserForm(editUserForm)
                }}>
                    <option value={'1'}>雄</option>
                    <option value={'2'}>雌</option>
                    <option value={''}>无</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">兽种</label>
                <input type="text" className="form-control" placeholder={editUserForm.species?editUserForm.species:''} onChange={(e)=>{
                    editUserForm.species = e.target.value
                    setEditUserForm(editUserForm)
                }}/>
            </div>
            <button className="btn btn-primary" onClick={editUser}>修改</button>
        </>
    )
}
