import { Button, Stack } from "@mui/material";
import { DefaultObj, GArea } from "../vars/ConstVars";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";

export function Bar(){
    const [userdata,setUserdata] = useState(DefaultObj.userdata)
    useEffect(()=>{
        postRequest(urls.checkLogin).then(x=>{
            if(typeof x=='number'){if(x==1){
                getRequest(urls.getSessionUser).then(x=>{
                    if(typeof x=='object'){setUserdata(x)}
                })
            }}
        })
    },[])
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to={'/'}><img src={GArea.logoURL} alt="logo" height={50}/></Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav me-auto">
                        <Stack
                            direction={{ xs:'column',sm:'row' }}
                            spacing={1}
                            sx={{mx:2}}
                        >
                            <Link to={'/'}><Button variant="outlined">来点粉糖</Button></Link>
                            <Link to={'/'}><Button variant="outlined">画廊</Button></Link>
                            <Link to={'/'}><Button variant="outlined">花园</Button></Link>
                            <Link to={'/'}><Button variant="outlined">标签</Button></Link>
                            <Link to={'/about'}><Button variant="outlined">关于</Button></Link>
                            {
                                userdata.username!=''
                                ?
                                    <>
                                        <Link to={'/user'}><Button variant="outlined" sx={{ minWidth:100 }} color="secondary">{ userdata.name }</Button></Link>
                                        <Link to={'/add'}><Button variant="outlined" sx={{ minWidth:100 }} color="secondary">添加</Button></Link>
                                    </>
                                :
                                <Link to={'/login'}><Button variant="outlined" sx={{ minWidth:100 }} color="secondary">登录</Button></Link>
                            }
                        </Stack>
                    </div>
                </div>
            </div>
        </nav>
    )
}
