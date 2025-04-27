import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { useParams } from "react-router";
import { DefaultObj, GArea } from "../vars/ConstVars";
import { Image } from "antd";
import { toNormalDate } from "../utils/tools";
import { IconButton, Textarea } from "@mui/joy";

export function Artwork(){
    const [artworkdata,setArtworkdata] = useState(DefaultObj.artworkdata)
    const [uploaderdata,setUploaderdata] = useState(DefaultObj.userdata)
    const params = useParams()
    useEffect(()=>{
        let id = params.id
        getRequest(urls.getArtwork+'?id='+id).then(data=>{
            if(typeof data=='object'){
                setArtworkdata(data)
                getRequest(urls.getUser+'/'+data.username).then(data=>{
                    if(typeof data=='object'){
                        setUploaderdata(data)
                    }
                })
            }
        })
    },[])
    return(
        <Box>
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
                            </CardContent>
                        </Card>

                        <h1>上传者</h1>
                        <h1>交互按钮</h1>

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
