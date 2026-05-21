import { SyntheticEvent, useState } from "react";
import { EditUserForm } from "./../form/EditUserForm";
import { EditUserImportantForm } from "./../form/EditUserImportantForm";
import { EditUserImageForm } from "./../form/EditUserImageForm";
import { useNavigate } from "react-router";
import { postRequest, urls } from "../../code/api";

export function UserEditDialog(){
    const navigate = useNavigate()
    const [tabvalue,setTabvalue] = useState('editUser')
    const tabHandleChange = (_event:SyntheticEvent,newTabvalue:string)=>{setTabvalue(newTabvalue)}
    const [open,setOpen] = useState(false)
    function openDialog(){setOpen(true)}
    function closeDialog(){setOpen(false)}
    function logout(){
        postRequest(urls.logout).then(res=>{
            if(typeof res=='number'){if(res==1){navigate('/');location.reload()}}
        })
    }
    return(
        <>
            <button className="btn btn-sm btn-warning" onClick={openDialog}>设置</button>
            {open && (
                <div className="modal show d-block" tabIndex={-1} style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">设置</h5>
                                <button type="button" className="btn-close" onClick={closeDialog}></button>
                            </div>
                            <div className="modal-body">
                                <ul className="nav nav-tabs mb-3">
                                    <li className="nav-item">
                                        <button className={`nav-link ${tabvalue === 'editUser' ? 'active' : ''}`} onClick={()=>tabHandleChange(null as any,'editUser')}>修改信息</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className={`nav-link ${tabvalue === 'editUserImportant' ? 'active' : ''}`} onClick={()=>tabHandleChange(null as any,'editUserImportant')}>修改关键信息</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className={`nav-link ${tabvalue === 'editUserImage' ? 'active' : ''}`} onClick={()=>tabHandleChange(null as any,'editUserImage')}>更换图片</button>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    {tabvalue === 'editUser' && <EditUserForm />}
                                    {tabvalue === 'editUserImportant' && <EditUserImportantForm />}
                                    {tabvalue === 'editUserImage' && <EditUserImageForm />}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-warning" onClick={logout}>退出登录</button>
                                <button className="btn btn-secondary" onClick={closeDialog}>关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
