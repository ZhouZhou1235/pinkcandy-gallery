import { DefaultObj } from "../../vars/ConstVars";
import { useState } from "react";
import { tagtypeNumToColorString } from "../../utils/tools";
import { postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";

export function EditTagForm({tagdata=DefaultObj.tagdata}){
    const [open,setOpen] = useState(false)
    const [editTagForm,setEditTagForm] = useState(tagdata)
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    function openDialog(){setOpen(true)}
    function closeDialog(){setOpen(false)}
    function editTag(){
        postRequest(urls.editTag,editTagForm).then(res=>{
            if(res!=0){
                setOpen(false)
                setSnackbarOpen(true)
                setSnackbarMessage('已修改标签')
            }
        })
    }
    return(
        <>
            <button className="btn btn-sm btn-outline-warning" onClick={openDialog} disabled={tagdata.usenum>20?true:false}>修改</button>
            {open && (
                <div className="modal show d-block" tabIndex={-1} style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">修改标签</h5>
                                <button type="button" className="btn-close" onClick={closeDialog}></button>
                            </div>
                            <div className="modal-body">
                                <h3 style={{color:tagtypeNumToColorString(Number(tagdata.type))}}>{tagdata.tag}</h3>
                                <div className="mb-3">
                                    <label className="form-label">描述</label>
                                    <textarea className="form-control" rows={4} defaultValue={tagdata.info} onChange={(e)=>{
                                        editTagForm.info = e.target.value
                                        setEditTagForm(editTagForm)
                                    }}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">标签类型</label>
                                    <select className="form-select" defaultValue={tagdata.type} onChange={(event)=>{
                                        editTagForm.type = event.target.value
                                        setEditTagForm(editTagForm)
                                    }}>
                                        <option value={'1'}>描述</option>
                                        <option value={'2'}>作者</option>
                                        <option value={'3'}>系列</option>
                                        <option value={'4'}>角色</option>
                                        <option value={'5'}>兽种</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-warning" onClick={editTag}>确认修改</button>
                                <button className="btn btn-secondary" onClick={closeDialog}>关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {snackbarOpen && (
                <div className="toast show position-fixed top-0 start-50 translate-middle-x" style={{zIndex: 9999}}>
                    <div className="toast-body d-flex justify-content-between align-items-center">
                        <span>{snackbarMessage}</span>
                        <button className="btn-close" onClick={closeSnackbar}></button>
                    </div>
                </div>
            )}
        </>
    )
}
