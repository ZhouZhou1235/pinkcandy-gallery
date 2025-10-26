import { DefaultObj, GArea } from "../../vars/ConstVars";
import { Link } from "react-router";
import { UserWatchButton } from "./UserWatchButton";
import { useEffect, useState } from "react";
import { getRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";

export function UserPreview({username=''}){
    const [watchButton,setWatchButton] = useState(<></>)
    const [userdata,setUserdata] = useState(DefaultObj.userdata)
    useEffect(()=>{
        getRequest(urls.getUser+'/'+username).then(data=>{
            if(data!=0){
                setUserdata(data)
                setWatchButton(<UserWatchButton username={data.username}/>)
            }
        })
    },[username])
    return(
        <div className="row text-center">
            <div className="col-sm-4">
                <Link to={'/user/'+userdata.username}>
                    <img
                        alt="headimage"
                        width={'75'}
                        className="rounded"
                        src={
                            userdata.headimage
                            ?
                            GArea.headimageURL+userdata.headimage
                            :
                            GArea.defaultHeadimage
                        }
                    />
                </Link>
            </div>
            <div className="col-sm-8">
                <div style={{fontSize:'1.5em'}}>
                    { userdata.name }
                </div>
                <div>
                    { Number(userdata.sex)==1?'雄':Number(userdata.sex)==2?'雌':'' }
                    &nbsp;
                    { userdata.species?userdata.species:'' }
                    {watchButton}
                </div>
            </div>
        </div>
    )
}
