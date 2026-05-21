import { useState } from "react";
import { postRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { DefaultObj } from "../vars/ConstVars";
import { tagtypeNumToColorString } from "../utils/tools";

export function DeleteTagButton({tagdata=DefaultObj.tagdata}){
    const [open,setOpen] = useState(false)
    const [btnDisabled,setBtnDisabled] = useState(false)
    function deleteArtwork(){
        setOpen(false)
        postRequest(urls.deleteTag,{id:tagdata.id}).then(res=>{
            if(res!=0){setBtnDisabled(true)}
        })
    }
    function openDialog(){
        setOpen(true)
    }
    function closeDialog(){
        setOpen(false)
    }
    return(
        <>
            <button
                className={`btn btn-sm ${btnDisabled?'btn-secondary':'btn-outline-danger'}`}
                onClick={openDialog}
                disabled={btnDisabled || tagdata.usenum>10}
            >
                {!btnDisabled?'删除':'已删除'}
            </button>
            {open && (
                <div className="modal show d-block" tabIndex={-1} style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">删除标签</h5>
                                <button type="button" className="btn-close" onClick={closeDialog}></button>
                            </div>
                            <div className="modal-body">
                                <h2>即将删除<span style={{color:tagtypeNumToColorString(Number(tagdata.type))}}>{tagdata.tag}</span></h2>
                                <p>包括所有媒体使用了此标签的标记</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeDialog}>取消</button>
                                <button className="btn btn-danger" onClick={deleteArtwork}>确认删除</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
