import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { postRequest } from "../../utils/HttpRequest";
import { socket_http_urls, urls } from "../../vars/urls";

export function JoinRoomButton({id=''}){
    const [haveJoin,setHaveJoin] = useState(false)
    async function joinRoom(){
        let x = await postRequest(socket_http_urls.joinRoom,{
            sessionId: await postRequest(urls.getSessionId),
            id: id,
        })
        return x
    }
    useEffect(()=>{
        (async()=>{
            postRequest(socket_http_urls.haveJoin,{
                sessionId: await postRequest(urls.getSessionId),
                id: id,
            }).then(res=>{
                if(res==0){setHaveJoin(false)}
                else{setHaveJoin(true)}
            })
        })()
    },[id])
    return(
        <Button
            color='secondary'
            onClick={()=>{joinRoom().then(res=>{if(res==1){setHaveJoin(!haveJoin)}})}}
            variant={haveJoin?'contained':'text'}
            startIcon={<FontAwesomeIcon icon={faHome} />}
        >
            {!haveJoin?'加入':'已加入'}
        </Button>
    )
}
