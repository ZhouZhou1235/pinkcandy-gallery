import { faComment, faPaw, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup } from "@mui/material";
import { getRequest, postRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { useEffect, useState } from "react";
import { DefaultObj } from "../vars/ConstVars";

export function ArtworkPawArea({galleryid=''}){
    const [havepaw,setHavepaw] = useState(false)
    const [havestar,setHavestar] = useState(false)
    const [pawAreaInfo,setPawAreaInfo] = useState(DefaultObj.pawAreaInfo)
    function pawMedia(){return postRequest(urls.pawArtworkMedia,{id:galleryid})}
    function starMedia(){return postRequest(urls.starArtworkMedia,{id:galleryid})}
    useEffect(()=>{
        getRequest(urls.getArtworkPawAreaInfo+'?id='+galleryid).then(data=>{
            if(data!=0){
                setPawAreaInfo(data)
                setHavepaw(data.user.havepaw)
                setHavestar(data.user.havestar)
            }
        })
    },[])
    return(
        <>
            <ButtonGroup size="small" color="secondary">
                <Button
                    onClick={()=>{pawMedia().then(res=>{if(res==1){setHavepaw(!havepaw)}})}}
                    variant={havepaw?'contained':'outlined'}
                >
                    印爪
                </Button>
                <Button
                    onClick={()=>{starMedia().then(res=>{if(res==1){setHavestar(!havestar)}})}}
                    variant={havestar?'contained':'outlined'}
                >
                    收藏
                </Button>
            </ButtonGroup>
            <br />
            <ButtonGroup size="small" variant="text">
                <Button startIcon={<FontAwesomeIcon icon={faPaw}/>}>{pawAreaInfo.pawnum}</Button>
                <Button startIcon={<FontAwesomeIcon icon={faStar}/>}>{pawAreaInfo.starnum}</Button>
                <Button startIcon={<FontAwesomeIcon icon={faComment}/>}>{pawAreaInfo.commentnum}</Button>
            </ButtonGroup>
        </>
    )
}
