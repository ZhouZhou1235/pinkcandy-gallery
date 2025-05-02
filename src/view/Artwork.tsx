import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { useParams } from "react-router";
import { DefaultObj, GArea, PageTitle } from "../vars/ConstVars";
import { Image, Spin } from "antd";
import { toNormalDate } from "../utils/tools";
import { UserPreview } from "../component/UserPreview";
import { TagList } from "../component/TagList";
import { ArtworkCommentForm } from "../component/form/ArtworkCommentForm";
import { ArtworkCommentList } from "../component/ArtworkCommentList";
import { ArtworkPawArea } from "../component/ArtworkPawArea";

export function Artwork(){
    const params = useParams()
    const [loading,setLoading] = useState(true)
    const [artworkdata,setArtworkdata] = useState(DefaultObj.artworkdata)
    const [uploaderdata,setUploaderdata] = useState(DefaultObj.userdata)
    const [artworktagList,setArtworktagList] = useState(<></>)
    const [commentFormElement,setCommentFormElement] = useState(<></>)
    const [commentListElement,setCommentListElement] = useState(<></>)
    const [pawAreaElement,setPawAreaElement] = useState(<></>)
    useEffect(()=>{
        document.title = PageTitle.artwork
        let id = params.id
        setCommentFormElement(<ArtworkCommentForm galleryid={id}/>)
        setCommentListElement(<ArtworkCommentList galleryid={id}/>)
        setPawAreaElement(<ArtworkPawArea galleryid={id}/>)
        getRequest(urls.getArtwork+'?id='+id).then(data=>{
            if(typeof data=='object'){
                setArtworkdata(data)
                document.title = PageTitle.artwork+data.title
                getRequest(urls.getUser+'/'+data.username).then(data=>{
                    if(typeof data=='object'){
                        setUploaderdata(data)
                    }
                })
                getRequest(urls.getTagsArtwork+'/'+id).then(data=>{
                    if(data!=0){
                        setArtworktagList(<TagList tagArray={data}/>)
                    }
                })
            }
            setLoading(false)
        })
    },[])
    return(
        <Box>
            <Spin spinning={loading} fullscreen />
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        <Card sx={{ mt: 2 }}>
                            <div style={{ textAlign:'center' }} className="p-2">
                                <Image src={ GArea.artworkimageURL+artworkdata.filename } height={'50vh'}/>
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
                                        <div className="col-sm-4">
                                            <UserPreview userdata={uploaderdata}/>
                                        </div>
                                        <div className="col-sm-8 text-center">
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
