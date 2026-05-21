import { useState } from "react";
import { postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";
import { objToFormdata } from "../../utils/tools";

export function EditUserImageForm(){
    const [editUserImageForm,setEditUserImageForm] = useState({
        headimage: '' as any,
        backimage: '' as any,
    })
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    function editUserImage(){
        postRequest(urls.editUserImage,objToFormdata(editUserImageForm),{'Content-Type':'mutipart/form-data'}).then(res=>{
            if(res==1){
                setSnackbarOpen(true)
                setSnackbarMessage('图片上传完成')
                editUserImageForm.headimage = ''
                editUserImageForm.backimage = ''
                setEditUserImageForm(editUserImageForm)
            }
        })
    }
    function clearUserImage(){
        postRequest(urls.clearUserImage).then(res=>{
            if(res==1){
                setSnackbarOpen(true)
                setSnackbarMessage('图片已清除')
            }
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
            <p className="text-muted">提示：上传图片文件，过大会导致失败。</p>
            <div className="mb-3">
                <input type="file" className="form-control" name="file" onChange={(e)=>{
                    let list:FileList|null = e.target.files
                    if(list){editUserImageForm.headimage = list[0]}
                    setEditUserImageForm(editUserImageForm)
                }} />
                <small className="form-text">头像</small>
            </div>
            <div className="mb-3">
                <input type="file" className="form-control" name="file" onChange={(e)=>{
                    let list:FileList|null = e.target.files
                    if(list){editUserImageForm.backimage = list[0]}
                    setEditUserImageForm(editUserImageForm)
                }} />
                <small className="form-text">背景墙</small>
            </div>
            <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary" onClick={clearUserImage}>清除</button>
                <button className="btn btn-primary" onClick={editUserImage}>上传</button>
            </div>
        </>
    )
}
