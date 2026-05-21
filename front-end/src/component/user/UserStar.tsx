import { JSX, SyntheticEvent, useEffect, useState } from "react";
import { getRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";
import { GArea } from "../../vars/ConstVars";
import { ArtworkPreview } from "../artwork/ArtworkPreview";

export function UserStar({username=''}){
    const [artworkitems,setArtworkitems] = useState([] as JSX.Element[])
    const [galleryPage,setGalleryPage] = useState(1)
    const [tabvalue,setTabvalue] = useState('artworks')
    const tabHandleChange = (_event:SyntheticEvent,newTabvalue:string)=>{setTabvalue(newTabvalue)}
    function updateGalleryPage(value:number){
        getRequest(urls.getStarArtworks+`?num=${GArea.defaultShowNum}&begin=${(value-1)*GArea.defaultShowNum}&username=${username}`).then(data=>{
            if(data!=0){
                let artworks :any[] = data
                let theArtworkItems = artworks.map(item=>
                    <div className="col-sm-3 p-2" key={item.gallery.id}>
                        <ArtworkPreview artworkdata={item.gallery}/>
                    </div>
                )
                setArtworkitems(theArtworkItems)
            }
        })
    }
    useEffect(()=>{
        (async()=>{
            updateGalleryPage(1)
            await getRequest(urls.getUserStarInfoCount+'?username='+username).then(data=>{
                if(data!=0){
                    setGalleryPage(Math.ceil(data.artworknum/GArea.defaultShowNum))
                }
            })
        })()
    },[])
    return(
        <>
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
                                        <li key={i} className={`page-item ${galleryPage === i+1 ? 'active' : ''}`}>
                                            <button className="page-link" onClick={()=>updateGalleryPage(i+1)}>{i+1}</button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
