import { useState } from "react";
import { postRequest, urls } from "../../code/api";

export function DeleteArtworkButton({galleryid=''}){
    const [open,setOpen] = useState(false)
    const [btnDisabled,setBtnDisabled] = useState(false)
    function deleteArtwork(){
        setOpen(false)
        postRequest(urls.deleteArtwork,{id:galleryid}).then(res=>{
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
                disabled={btnDisabled}
            >
                {!btnDisabled?'删除':'已删除'}
            </button>
            {open && (
                <div className="modal show d-block" tabIndex={-1} style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">删除作品</h5>
                                <button type="button" className="btn-close" onClick={closeDialog}></button>
                            </div>
                            <div className="modal-body">
                                <h2>即将删除该作品，操作不能撤回！</h2>
                                <p>包括印爪 评论等一切互动数据</p>
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
