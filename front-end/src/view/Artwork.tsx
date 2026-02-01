import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { useNavigate, useParams } from "react-router";
import { DefaultObj, PageTitle } from "../vars/ConstVars";
import { toNormalDate } from "../utils/tools";
import { UserPreview } from "../component/user/UserPreview";
import { TagList } from "../component/TagList";
import { ArtworkCommentForm } from "../component/form/ArtworkCommentForm";
import { ArtworkCommentList } from "../component/artwork/ArtworkCommentList";
import { ArtworkPawArea } from "../component/artwork/ArtworkPawArea";

export function Artwork(){
    const navigate = useNavigate()
    const {id} = useParams<{id:string}>()
    const [artworkdata, setArtworkdata] = useState(DefaultObj.artworkdata)
    const [artworktagList, setArtworktagList] = useState(<></>)
    const [userpreviewElement, setUserpreviewElement] = useState(<></>)
    const [commentFormElement, setCommentFormElement] = useState(<></>)
    const [commentListElement, setCommentListElement] = useState(<></>)
    const [pawAreaElement, setPawAreaElement] = useState(<></>)
    const [updateNum, setUpdateNum] = useState(0)
    function onUpdate(){
        setUpdateNum(updateNum + 1)
    }
    async function loadData(){
        document.title = PageTitle.artwork
        setCommentFormElement(<ArtworkCommentForm galleryid={id} onUpdate={onUpdate}/>)
        setCommentListElement(<ArtworkCommentList galleryid={id} randomNum={Math.floor(Math.random()*100)}/>)
        setPawAreaElement(<ArtworkPawArea galleryid={id}/>)
        await getRequest(urls.getArtwork + '?id=' + id).then(data => {
            if(data != 0){
                setArtworkdata(data)
                setUserpreviewElement(<UserPreview username={data.username}/>)
                document.title = PageTitle.artwork + data.title
            } else {
                navigate('/notfound')
                return
            }
        })
        await getRequest(urls.getTagsArtwork + '/' + id).then(data => {
            if(data != 0){
                setArtworktagList(<TagList tagArray={data}/>)
            }
        })
    }
    useEffect(() => {
        loadData()
    }, [id, updateNum])
    return(
        <div className="container mt-3">
            <div className="row">
                <div className="col-lg-8 col-12 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body p-3">
                            <div className="text-center">
                                <img
                                    src={urls.artworkimageURL + artworkdata.filename}
                                    className="img-fluid rounded"
                                    style={{ 
                                        maxHeight: '70vh', 
                                        maxWidth: '100%',
                                        objectFit: 'contain' 
                                    }}
                                    alt={artworkdata.title}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-12">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            {userpreviewElement}
                        </div>
                    </div>
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h1 className="card-title h3 mb-3">{artworkdata.title}</h1>
                            <div className="mb-4">
                                <p className="card-text">{artworkdata.info}</p>
                                {toNormalDate(artworkdata.time)}
                            </div>
                            <div className="mb-4">
                                {pawAreaElement}
                            </div>
                            <div className="mb-4">
                                {artworktagList}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="mb-4">
                                {commentFormElement}
                            </div>
                            <div className="mt-4">
                                {commentListElement}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
