import { faShieldDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";

export function UserWatchButton({username=''}){
    const [haveWatch,setHaveWatch] = useState(false)
    async function watchUser(){return postRequest(urls.watchUser,{towatch:username})}
    useEffect(()=>{
        postRequest(urls.haveWatch,{towatch:username}).then(res=>{
            if(res==0){setHaveWatch(false)}
            else{setHaveWatch(true)}
        })
    },[username])
    return(
        <Button
            color='secondary'
            onClick={()=>{watchUser().then(res=>{if(res==1){setHaveWatch(!haveWatch)}})}}
            variant={haveWatch?'contained':'text'}
            startIcon={<FontAwesomeIcon icon={faShieldDog} />}
        >
            {!haveWatch?'关注':'已关注'}
        </Button>
    )
}
