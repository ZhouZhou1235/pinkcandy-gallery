import { Box } from "@mui/material";
import { PageTitle } from "../vars/ConstVars";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserZoomShow } from "../component/user/UserZoomShow";

export function UserZoom(){
    const {username} = useParams<{username:string}>()
    const [userzoomElement,setUserzoomElement] = useState(<></>)
    useEffect(()=>{
        document.title = PageTitle.zoom
        setUserzoomElement(<UserZoomShow username={username}/>)
    },[username]);
    return(
        <Box>
            <div className="container">
                {userzoomElement}
            </div>
        </Box>
    )
}
