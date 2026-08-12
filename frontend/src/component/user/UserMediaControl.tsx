import { JSX, SyntheticEvent, useEffect, useState } from "react";
import { getRequest, urls } from "../../code/api";
import { GArea } from "../../code/vars";
import { ArtworkPreview } from "../artwork/ArtworkPreview";
import { EditArtworkForm } from "../form/EditArtworkForm";
import { DeleteArtworkButton } from "../artwork/DeleteArtworkButton";

export function UserMediaControl({username=''}){
    const [artworkitems,setArtworkitems] = useState([] as JSX.Element[])
    const [editformElement,setEditformElement] = useState(<></>)
    const [galleryPage,setGalleryPage] = useState(1)
    const [currentPage,setCurrentPage] = useState(1)
    const [tabvalue,setTabvalue] = useState('artworks')
    const tabHandleChange = (_event:SyntheticEvent,newTabvalue:string)=>{setTabvalue(newTabvalue)}
    function closeForm(){
        setEditformElement(<></>)
    }
    function selecttoeditArtwork(id=''){
        setEditformElement(<EditArtworkForm galleryid={id}/>)
    }
    function updateGalleryPage(value:number){
        setCurrentPage(value)
        getRequest(urls.getArtworks+`?num=${GArea.defaultShowNum}&begin=${(value-1)*GArea.defaultShowNum}&username=${username}&includeUnaudited=1`).then(data=>{
            if(data!=0){
                let artworks :any[] = data
                let theArtworkItems = artworks.map(item=>
                    <div className="col-sm-3 p-2 d-flex flex-column" key={item.id} style={{ height: '100%' }}>
                        <div className="flex-grow-1">
                            <ArtworkPreview artworkdata={item}/>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <button className="btn btn-sm btn-outline-warning" onClick={()=>{selecttoeditArtwork(item.id)}}>修改</button>
                            <DeleteArtworkButton galleryid={item.id}/>
                        </div>
                    </div>
                )
                setArtworkitems(theArtworkItems)
            }
        })
    }
    useEffect(()=>{
        (async()=>{
            updateGalleryPage(1)
            await getRequest(urls.getUserInfoCount+'?username='+username+'&audited_only=0').then(data=>{
                if(data!=0){
                    setGalleryPage(Math.ceil(data.artworknum/GArea.defaultShowNum))
                }
            })
        })()
    },[])
    return(
        <div className="row">
            <div className="col-sm-4">
                <div className="m-2">
                    <span>点击修改按钮来编辑</span>
                    <button className="btn btn-sm btn-outline-secondary" onClick={closeForm}>关闭</button>
                </div>
                {editformElement}
            </div>
            <div className="col-sm-8">
                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                        <button className={`nav-link ${tabvalue === 'artworks' ? 'active' : ''}`} onClick={()=>tabHandleChange(null as any,'artworks')}>作品集</button>
                    </li>
                </ul>
                <div className="tab-content mt-3" style={{padding: 0}}>
                    {tabvalue === 'artworks' && (
                        <>
                            <div className="row">
                                {artworkitems}
                            </div>
                            <div className="d-flex justify-content-center align-items-center" style={{minHeight: '50px'}}>
                                <nav>
                                    <ul className="pagination mb-0">
                                        {Array.from({length: galleryPage}, (_, i) => (
                                            <li key={i} className={`page-item ${currentPage === i+1 ? 'active' : ''}`}>
                                                <button className="page-link" onClick={()=>updateGalleryPage(i+1)}>{i+1}</button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
