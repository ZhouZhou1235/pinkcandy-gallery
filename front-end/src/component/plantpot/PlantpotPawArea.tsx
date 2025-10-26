import { faLeaf, faPaw, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup } from "@mui/material";
import { getRequest, postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";
import { useEffect, useState } from "react";
import { DefaultObj } from "../../vars/ConstVars";

export function PlantpotPawArea({gardenid=''}){
    const [havepaw,setHavepaw] = useState(false)
    const [havestar,setHavestar] = useState(false)
    const [pawAreaInfo,setPawAreaInfo] = useState(DefaultObj.pawAreaInfo)
    function pawMedia(){return postRequest(urls.pawPlantpotMedia,{id:gardenid})}
    function starMedia(){return postRequest(urls.starPlantpotMedia,{id:gardenid})}
    useEffect(()=>{
        getRequest(urls.getPlantpotPawAreaInfo+'?id='+gardenid).then(data=>{
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
                    startIcon={<FontAwesomeIcon icon={faPaw}/>}
                    onClick={()=>{pawMedia().then(res=>{if(res==1){
                        havepaw?pawAreaInfo.pawnum--:pawAreaInfo.pawnum++
                        setHavepaw(!havepaw)
                        setPawAreaInfo(pawAreaInfo)
                    }})}}
                    variant={havepaw?'contained':'text'}
                >
                    {pawAreaInfo.pawnum}
                </Button>
                <Button
                    startIcon={<FontAwesomeIcon icon={faStar}/>}
                    onClick={()=>{starMedia().then(res=>{if(res==1){
                        havestar?pawAreaInfo.starnum--:pawAreaInfo.starnum++
                        setHavestar(!havestar)
                        setPawAreaInfo(pawAreaInfo)
                    }})}}
                    variant={havestar?'contained':'text'}
                >
                    {pawAreaInfo.starnum}
                </Button>
                <Button startIcon={<FontAwesomeIcon icon={faLeaf}/>} variant="outlined">{pawAreaInfo.commentnum}</Button>
            </ButtonGroup>
        </>
    )
}
