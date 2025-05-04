import { Avatar } from "antd";
import { DefaultObj, GArea } from "../vars/ConstVars";
import { Link } from "react-router";
import { UserWatchButton } from "./UserWatchButton";
import { useEffect, useState } from "react";

export function UserPreview({userdata=DefaultObj.userdata}){
    const [watchButton,setWatchButton] = useState(<></>)
    useEffect(()=>{
        if(userdata.username){setWatchButton(<UserWatchButton username={userdata.username}/>)}
    },[userdata])
    return(
        <>
            <Link to={'/user/'+userdata.username}>
                <Avatar shape="square" size={64} icon={
                    <img src={
                        userdata.headimage
                        ?
                        GArea.headimageURL+userdata.headimage
                        :
                        GArea.defaultHeadimage
                    } alt="headimage" />
                } />
            </Link>
            <div style={{fontSize:'2em'}}>
                { userdata.name }
                &nbsp;
                { Number(userdata.sex)==1?'雄':Number(userdata.sex)==2?'雌':'' }
                &nbsp;
                { userdata.species?userdata.species:'' }
            </div>
            {watchButton}
        </>
    )
}
