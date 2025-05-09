import { useEffect, useState } from "react"
import { DefaultObj } from "../vars/ConstVars"
import { Stack, Button } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faPalette, faPaw, faShieldDog } from "@fortawesome/free-solid-svg-icons"
import { getRequest } from "../utils/HttpRequest"
import { urls } from "../vars/urls"

export function UserInfoCount({username=''}){
    const [infocount,setInfocount] = useState(DefaultObj.userInfoCount)
    useEffect(()=>{
        getRequest(urls.getUserInfoCount+'?username='+username).then(data=>{
            if(data!=0){setInfocount(data)}
        })
    },[])
    return(
        <>
            <Stack direction='row'>
                <Button startIcon={<FontAwesomeIcon icon={faShieldDog} />}>
                    {infocount.watchernum}
                </Button>
                <Button startIcon={<FontAwesomeIcon icon={faEye} />}>
                    {infocount.towatchnum}
                </Button>
                <Button startIcon={<FontAwesomeIcon icon={faPalette} />}>
                    {infocount.artworknum}
                </Button>
                <Button startIcon={<FontAwesomeIcon icon={faPaw} />}>
                    {infocount.gotpawnum}
                </Button>
            </Stack>
        </>
    )
}
