import { Box, Card, CardContent, Typography } from "@mui/material";
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
    const [artworkdata,setArtworkdata] = useState(DefaultObj.artworkdata)
    const [artworktagList,setArtworktagList] = useState(<></>)
    const [userpreviewElement,setUserpreviewElement] = useState(<></>)
    const [commentFormElement,setCommentFormElement] = useState(<></>)
    const [commentListElement,setCommentListElement] = useState(<></>)
    const [pawAreaElement,setPawAreaElement] = useState(<></>)
    const [updateNum,setUpdateNum] = useState(0)
    function onUpdate(){
        setUpdateNum(updateNum+1)
    }
    async function loadData(){
        document.title = PageTitle.artwork
        setCommentFormElement(<ArtworkCommentForm galleryid={id} onUpdate={onUpdate}/>)
        setCommentListElement(<ArtworkCommentList galleryid={id} randomNum={Math.floor(Math.random()*100)}/>)
        setPawAreaElement(<ArtworkPawArea galleryid={id}/>)
        await getRequest(urls.getArtwork+'?id='+id).then(data=>{
            if(data!=0){
                setArtworkdata(data)
                setUserpreviewElement(<UserPreview username={data.username}/>)
                document.title = PageTitle.artwork+data.title
            }
            else{
                navigate('/notfound')
                return
            }
        })
        await getRequest(urls.getTagsArtwork+'/'+id).then(data=>{
            if(data!=0){
                setArtworktagList(<TagList tagArray={data}/>)
            }
        })
    }
    useEffect(()=>{
        loadData()
    },[id,updateNum])
    return(
        <Box>
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        <Card sx={{ mt: 2 }}>
                            <div style={{ textAlign:'center' }} className="p-2">
                                <img
                                    src={urls.artworkimageURL + artworkdata.filename}
                                    className="img-fluid"
                                    style={{ maxHeight: '50vh', objectFit: 'contain' }}
                                    alt={artworkdata.title}
                                />
                            </div>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    { artworkdata.title }
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    { artworkdata.info }
                                </Typography>
                                <small>{ toNormalDate(artworkdata.time) }</small>
                                <Box sx={{mt: 2}}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            {userpreviewElement}
                                        </div>
                                        <div className="col-sm-6 text-center">
                                            {pawAreaElement}
                                            {artworktagList}
                                        </div>
                                    </div>
                                </Box>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-sm-4">
                        {commentFormElement}
                        {commentListElement}
                    </div>
                </div>
            </div>
        </Box>
    )
}
