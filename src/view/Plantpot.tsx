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
import { PlantpotCommentList } from "../component/PlantpotCommentList";
import { PlantpotCommentForm } from "../component/form/PlantpotCommentForm";
import { PlantpotPawArea } from "../component/PlantpotPawArea";

export function Plantpot(){
    const params = useParams()
    const [loading,setLoading] = useState(true)
    const [plantpotdata,setPlantpotdata] = useState(DefaultObj.plantpotdata)
    const [plantpotTagList,setPlantpotTagList] = useState(<></>)
    const [userpreviewElement,setUserpreviewElement] = useState(<></>)
    const [commentFormElement,setCommentFormElement] = useState(<></>)
    const [commentListElement,setCommentListElement] = useState(<></>)
    const [pawAreaElement,setPawAreaElement] = useState(<></>)
    useEffect(()=>{
        document.title = PageTitle.plantpot
        let id = params.id
        setCommentFormElement(<PlantpotCommentForm gardenid={id}/>)
        setCommentListElement(<PlantpotCommentList gardenid={id}/>)
        setPawAreaElement(<PlantpotPawArea gardenid={id}/>)
        getRequest(urls.getPlantpot+'?id='+id).then(data=>{
            if(typeof data=='object'){
                setPlantpotdata(data)
                setUserpreviewElement(<UserPreview username={data.username}/>)
                document.title = PageTitle.plantpot+data.title
                // getRequest(urls.getUser+'/'+data.username).then(data=>{
                //     if(typeof data=='object'){
                //         setMasterdata(data)
                //     }
                // })
                getRequest(urls.getTagsPlantpot+'/'+id).then(data=>{
                    if(data!=0){
                        setPlantpotTagList(<TagList tagArray={data}/>)
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
                    <div className="col-sm-6">
                        <Card sx={{ mt: 2 }}>
                            {
                                plantpotdata.filename
                                ?
                                <div style={{ textAlign:'center' }} className="p-2">
                                    <Image src={ GArea.plantpotimageURL+plantpotdata.filename } height={'50vh'}/>
                                </div>
                                :
                                null
                            }
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    { plantpotdata.title }
                                </Typography>
                                <p style={{whiteSpace:'pre-line'}}>
                                    { plantpotdata.content }
                                </p>
                                <small>{ toNormalDate(plantpotdata.createtime) } 创建</small>
                                <br />
                                <small>{ toNormalDate(plantpotdata.updatetime) } 更新</small>
                                <Box sx={{mt: 2}}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            {userpreviewElement}
                                        </div>
                                        <div className="col-sm-6 text-center">
                                            {pawAreaElement}
                                            {plantpotTagList}
                                        </div>
                                    </div>
                                </Box>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-sm-6">
                        {commentFormElement}
                        {commentListElement}
                    </div>
                </div>
            </div>
        </Box>
    )
}
