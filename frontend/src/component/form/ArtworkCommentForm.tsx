import { useState } from "react";
import { postRequest, urls } from "../../code/api";

export function ArtworkCommentForm({galleryid='',onUpdate=function(){} as any}){
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    const [commentForm,setCommentForm] = useState({content: '',id:galleryid})
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    function sendCommentArtwork(){
        postRequest(urls.sendCommentArtwork,commentForm).then(res=>{
            if(res==1){
                commentForm.content = ''
                setCommentForm(commentForm)
                setSnackbarMessage('已发送评论')
                setSnackbarOpen(true)
                onUpdate()
            }
        })
    }
    return(
        <>
            <div className="input-group mb-3">
                <span className="input-group-text">评论</span>
                <textarea 
                    className="form-control" 
                    rows={4}
                    placeholder="输入评论......"
                    value={commentForm.content}
                    onChange={(e)=>{
                        setCommentForm({content:e.target.value,id:commentForm.id})
                    }}
                    style={{minHeight: '100px', maxHeight: '200px'}}
                ></textarea>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-outline-primary" onClick={sendCommentArtwork}>发送</button>
            </div>
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
