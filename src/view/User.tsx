import { Box } from "@mui/material";
import { DefaultObj, GArea, PageTitle } from "../vars/ConstVars";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { UserMenu } from "../component/UserMenu";
import { useParams } from "react-router-dom";
import { Avatar } from "antd";
import { toNormalDate } from "../utils/tools";

export function User(){
    const params = useParams()
    const [userdata,setUserdata] = useState(DefaultObj.userdata)
    const [userMenu,setUserMenu] = useState(<></>)
    useEffect(()=>{
        document.title = PageTitle.user
        let username = params.username
        if(!username){
            getRequest(urls.getSessionUser).then(res=>{
                if(typeof res=='object'){
                    setUserdata(res)
                    document.title = PageTitle.user+res.name
                    setUserMenu(<UserMenu />)
                }
            });
        }
        else{
            getRequest(urls.getUser+'/'+username).then(res=>{
                if(typeof res=='object'){
                    setUserdata(res)
                    document.title = PageTitle.user+res.name
                }
            });
        }
    },[]);
    return(
        <Box>
            <div className="container">
                {
                    userdata.backimage?
                    <div className="backImageBox">
                        <img src={GArea.backimageURL+userdata.backimage} alt="backimage" />
                    </div>
                    :null
                }
                { userMenu }
                <div className="row">
                    <div className="col-sm-4">
                        <div className="row p-2">
                            <div className="col-3 d-flex align-items-center justify-content-center">
                                <Avatar shape="square" size={75} icon={
                                    <img src={
                                        userdata.headimage
                                        ?
                                        GArea.headimageURL+userdata.headimage
                                        :
                                        GArea.defaultHeadimage
                                    } alt="headimage" />
                                } />
                            </div>
                            <div className="col-9">
                                <h1>{ userdata.name }</h1>
                                <h2>
                                    { Number(userdata.sex)==1?'雄':Number(userdata.sex)==2?'雌':'' }
                                    &nbsp;
                                    { userdata.species?userdata.species:'' }
                                </h2>
                            </div>
                        </div>
                        <div className="p-2" style={{ whiteSpace:'pre-line' }}>
                            { userdata.info }
                            <br />
                            <small>粉糖账号 { userdata.username }</small>
                            <br />
                            <small>{ toNormalDate(userdata.jointime) } 加入</small>
                        </div>
                    </div>
                    <div className="col-sm-8">

                    </div>
                </div>
            </div>
        </Box>
    )
}
