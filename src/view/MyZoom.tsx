import { Box, Button } from "@mui/material";
import { PageTitle } from "../vars/ConstVars";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { UserZoomShow } from "../component/UserZoomShow";
import { UserStar } from "../component/UserStar";
import { EditUserDialog } from "../component/EditUserDialog";
import { UserMediaControl } from "../component/UserMediaControl";

export function MyZoom({optionName=''}){
    const [username,setUsername] = useState('')
    const [userzoomElement,setUserzoomElement] = useState(<></>)
    const [selectedOption,setSelectedOption] = useState('zoom')
    function selectOption(optionName:string){
        let theElement = <></>
        let ok = true
        switch(optionName){
            case 'zoom':
                theElement = <UserZoomShow username={username}/>
                setSelectedOption('zoom')
                break
            case 'message':
                theElement = <h1>消息</h1>
                setSelectedOption('message')
                break
            case 'star':
                theElement = <UserStar username={username}/>
                setSelectedOption('star')
                break
            case 'control':
                theElement = <UserMediaControl username={username}/>
                setSelectedOption('control')
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
                <div className="p-2">
                    <Button onClick={()=>{selectOption('zoom')}} variant={selectedOption=='zoom'?'contained':'text'}>空间</Button>
                    <Button onClick={()=>{selectOption('message')}} variant={selectedOption=='message'?'contained':'text'}>消息</Button>
                    <Button onClick={()=>{selectOption('star')}} variant={selectedOption=='star'?'contained':'text'}>收藏</Button>
                    <Button onClick={()=>{selectOption('control')}} variant={selectedOption=='control'?'contained':'text'}>内容管理</Button>
                    <EditUserDialog />
                </div>
                {userzoomElement}
            </div>
        </Box>
    )
}
