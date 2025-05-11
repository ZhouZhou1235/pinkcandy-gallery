import { Box, Button } from "@mui/material";
import { PageTitle } from "../vars/ConstVars";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { UserZoomShow } from "../component/user/UserZoomShow";
import { UserStar } from "../component/user/UserStar";
import { UserEditDialog } from "../component/user/UserEditDialog";
import { UserMediaControl } from "../component/user/UserMediaControl";

export function MyZoom(){
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
        getRequest(urls.getSessionUser).then(data=>{
            if(data!=0){
                let username = data.username
                setUserzoomElement(<UserZoomShow username={username}/>)
                setUsername(username)
            }
        })
    },[]);
    return(
        <Box>
            <div className="container">
                <div className="p-2">
                    <Button onClick={()=>{selectOption('zoom')}} variant={selectedOption=='zoom'?'contained':'text'}>空间</Button>
                    <Button onClick={()=>{selectOption('star')}} variant={selectedOption=='star'?'contained':'text'}>收藏</Button>
                    <Button onClick={()=>{selectOption('control')}} variant={selectedOption=='control'?'contained':'text'}>内容管理</Button>
                    <UserEditDialog />
                </div>
                {userzoomElement}
            </div>
        </Box>
    )
}
