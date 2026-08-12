import { useEffect, useState } from "react";
import { getRequest, postRequest, urls } from "../../code/api";
import { DefaultObj } from "../../code/vars";

export function EditArtworkForm({galleryid=''}){
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    const [artworkdata,setArtworkdata] = useState(DefaultObj.artworkdata)
    const [tagsText,setTagsText] = useState('')
    const [editArtworkForm,setEditArtworkForm] = useState({
        id: galleryid,
        title: '',
        info: '',
        tags: '',
        grading: 0,
    })
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    function editArtwork(){
        const tags = tagsText
            .split(/\s+/)
            .map(t=>t.trim())
            .filter(t=>t)
        const form = {
            ...editArtworkForm,
            tags: JSON.stringify(tags)
        }
        postRequest(urls.editArtwork,form).then(res=>{
            if(res!=0){
                setSnackbarMessage('已完成作品修改')
                setSnackbarOpen(true)
            }
        })
    }
    async function loadData(){
        let theEditArtworkForm = editArtworkForm
        await getRequest(urls.getArtwork+'?id='+galleryid).then(data=>{
            if(data!=0){
                setArtworkdata(data)
                theEditArtworkForm.id = data.id
                theEditArtworkForm.title = data.title
                theEditArtworkForm.info = data.info
                theEditArtworkForm.grading = typeof data.grading === 'number' ? data.grading : 0
            }
        })
        await getRequest(urls.getTagsArtwork+'/'+galleryid).then(data=>{
            if(data!=0){
                let tagArray :any[] = data
                let currentTags: string[] = []
                for(let i=0;i<tagArray.length;i++){
                    let obj = tagArray[i];
                    currentTags.push(obj.tag)
                }
                setTagsText(currentTags.join(' '))
                theEditArtworkForm.tags = JSON.stringify(currentTags)
            }
            else{
                setTagsText('')
            }
        })
        setEditArtworkForm(theEditArtworkForm)
    }
    useEffect(()=>{
        loadData()
    },[galleryid])
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
            <div className="card">
                <img
                    src={urls.artworkimagePreviewURL+artworkdata.filename}
                    className="card-img-top"
                    alt="artworkimage"
                    style={{height: '300px', objectFit: 'cover'}}
                />
                <div className="card-body">
                    <h5 className="card-title OnelineTextBox">{artworkdata.title}</h5>
                    <p className="card-text" style={{whiteSpace:'pre-line'}}>{artworkdata.info}</p>
                    <p className="card-text">
                        <small className="text-muted">
                            状态：
                            {
                                (artworkdata as any).audit==1 ? (
                                    <span className="badge bg-success">已审核</span>
                                ) : (
                                    <span className="badge bg-warning text-dark">未审核</span>
                                )
                            }
                        </small>
                    </p>
                </div>
            </div>
            <div className="mt-3">
                <div className="mb-3">
                    <label className="form-label">标题</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={editArtworkForm.title} 
                        onChange={(e)=>{
                            setEditArtworkForm(prev => ({
                                ...prev,
                                title: e.target.value
                            }))
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">说明</label>
                    <textarea 
                        className="form-control" 
                        rows={4} 
                        value={editArtworkForm.info} 
                        onChange={(e)=>{
                            setEditArtworkForm(prev => ({
                                ...prev,
                                info: e.target.value
                            }))
                        }}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">分级</label>
                    <p>分级修改暂不可用</p>
                    {/* <select
                        className="form-select"
                        value={editArtworkForm.grading}
                        onChange={(e)=>{
                            setEditArtworkForm(prev => ({
                                ...prev,
                                grading: Number(e.target.value)
                            }))
                        }}
                    >
                        <option value={0}>普遍级 - 公开可见</option>
                        <option value={1}>辅导级 - 点击进入可见</option>
                        <option value={2}>限制级 - 公开不可见</option>
                    </select> */}
                </div>
                <div className="mb-3">
                    <label className="form-label">标签</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="输入标签，用空格分隔：标签1 标签2 ......"
                        value={tagsText}
                        onChange={(e)=>setTagsText(e.target.value)}
                    />
                    <div className="form-text">当前标签: {tagsText.trim() ? tagsText.trim().split(/\s+/).join('、') : '无'}</div>
                </div>
                <button className="btn btn-warning mt-2 w-100" onClick={editArtwork}>修改</button>
            </div>
        </>
    )
}
