import { Box } from "@mui/material";
import { PageTitle } from "../vars/ConstVars";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { UserOption } from "../component/UserOption";
import { UserZoomShow } from "../component/UserZoomShow";

export function MyZoom({optionName=''}){
    const [username,setUsername] = useState('')
    const [userzoomElement,setUserzoomElement] = useState(<></>)
    function selectOption(optionName:string){
        let theElement = <></>
        let ok = true
        switch(optionName){
            case 'zoom':
                theElement = <UserZoomShow username={username}/>
                break
            case 'message':
                theElement = <h1>消息</h1>
                break
            case 'star':
                theElement = <h1>收藏</h1>
                break
            case 'control':
                theElement = <h1>内容管理</h1>
                break
            default: ok=false
        }
        if(ok){setUserzoomElement(theElement)}
    }
    useEffect(()=>{
        document.title = PageTitle.myzoom
        getRequest(urls.getSessionUser).then(data=>{
            if(data!=0){
                let username = data.username
                setUserzoomElement(<UserZoomShow username={username}/>)
                setUsername(username)
                selectOption(optionName)
            }
        })
    },[optionName]);
    return(
        <Box>
            <div className="container">
                <UserOption selectOption={selectOption}/>
                {userzoomElement}
            </div>
        </Box>
    )
}
