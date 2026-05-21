import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";
import { DefaultObj } from "../../vars/ConstVars";
import { selectPropsTagsToArray } from "../../utils/tools";

interface SelectOption {
    label?: string;
    value?: string | number;
}

export function EditArtworkForm({galleryid=''}){
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    const [artworkdata,setArtworkdata] = useState(DefaultObj.artworkdata)
    const [selectedTags,setSelectedTags] = useState([] as string[])
    const [editArtworkForm,setEditArtworkForm] = useState({
        id: galleryid,
        title: '',
        info: '',
        tags: '',
    })
    const selectTag = (tags:string[])=>{
        setSelectedTags(tags)
        editArtworkForm.tags = JSON.stringify(tags)
        setEditArtworkForm(editArtworkForm)
    }
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    function editArtwork(){
        postRequest(urls.editArtwork,editArtworkForm).then(res=>{
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
            }
        })
        await getRequest(urls.getTagsArtwork+'/'+galleryid).then(data=>{
            if(data!=0){
                let tagArray :any[] = data
                let options: SelectOption[] = []
                let currentTags: string[] = []
                for(let i=0;i<tagArray.length;i++){
                    let obj = tagArray[i];
                    options.push({
                        label: obj.tag,
                        value: obj.tag,
                    })
                    currentTags.push(obj.tag)
                }
                setSelectedTags(currentTags)
                theEditArtworkForm.tags = JSON.stringify(selectPropsTagsToArray(options))
            }
            else{
                setSelectedTags([])
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
                </div>
            </div>
            <div className="mt-3">
                <div className="mb-3">
                    <label className="form-label">标题</label>
                    <input type="text" className="form-control" placeholder={editArtworkForm.title} onChange={(e)=>{
                        editArtworkForm.title = e.target.value
                        setEditArtworkForm(editArtworkForm)
                    }}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">说明</label>
                    <textarea className="form-control" rows={4} placeholder={editArtworkForm.info} onChange={(e)=>{
                        editArtworkForm.info = e.target.value
                        setEditArtworkForm(editArtworkForm)
                    }}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">标签</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="输入标签，用逗号分隔"
                        value={selectedTags.join(',')}
                        onChange={(e)=>{
                            const tags = e.target.value.split(',').map(t=>t.trim()).filter(t=>t)
                            selectTag(tags)
                        }}
                    />
                    <div className="form-text">当前标签: {selectedTags.join(', ') || '无'}</div>
                </div>
                <button className="btn btn-warning mt-2 w-100" onClick={editArtwork}>修改</button>
            </div>
        </>
    )
}
