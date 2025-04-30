import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { useParams } from "react-router";
import { DefaultObj, GArea, PageTitle } from "../vars/ConstVars";
import { Avatar, Image, Spin } from "antd";
import { toNormalDate } from "../utils/tools";
import { Textarea } from "@mui/joy";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faStar } from '@fortawesome/free-solid-svg-icons';

export function Artwork(){
    const params = useParams()
    const [loading,setLoading] = useState(true)
    const [artworkdata,setArtworkdata] = useState(DefaultObj.artworkdata)
    const [uploaderdata,setUploaderdata] = useState(DefaultObj.userdata)
    useEffect(()=>{
        document.title = PageTitle.artwork
        let id = params.id
        getRequest(urls.getArtwork+'?id='+id).then(data=>{
            if(typeof data=='object'){
                setArtworkdata(data)
                document.title = PageTitle.artwork+data.title
                getRequest(urls.getUser+'/'+data.username).then(data=>{
                    if(typeof data=='object'){
                        setUploaderdata(data)
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
                                            <Avatar shape="square" size={64} icon={
                                                <img src={
                                                    uploaderdata.headimage
                                                    ?
                                                    GArea.headimageURL+uploaderdata.headimage
                                                    :
                                                    GArea.defaultHeadimage
                                                } alt="headimage" />
                                            } />
                                            <br />
                                            <span style={{fontSize:'2em'}}>{ uploaderdata.name }</span>
                                            <br />
                                            <span>
                                                { Number(uploaderdata.sex)==1?'雄':Number(uploaderdata.sex)==2?'雌':'' }
                                                &nbsp;
                                                { uploaderdata.species?uploaderdata.species:'' }
                                            </span>
                                        </div>
                                        <div className="col-sm-8 text-center">
                                            <Button startIcon={<FontAwesomeIcon icon={faPaw}/>}>印爪</Button>
                                            <Button startIcon={<FontAwesomeIcon icon={faStar}/>}>收藏</Button>
                                        </div>
                                    </div>
                                </Box>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-sm-4">

                        <h1>标签</h1>
                        
                        <Textarea
                            placeholder="作品感觉如何......"
                            onChange={()=>{}}
                            minRows={4}
                            maxRows={8}
                            startDecorator={
                                <Box sx={{ display:'flex',gap:0.5,flex:1 }}>
                                    评论
                                </Box>
                            }
                            endDecorator={
                                <Button variant="outlined" sx={{ ml: 'auto' }}>
                                    发送
                                </Button>
                            }
                            sx={{ minWidth: 300 }}
                        />

                        <h1>评论区</h1>

                    </div>
                </div>
            </div>
        </Box>
    )
}
