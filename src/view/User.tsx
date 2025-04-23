import { Box, Container, Grid } from "@mui/material";
import { DefaultObj, GArea } from "../vars/ConstVars";
import { toNormalDate } from "../utils/tools";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { UserMenu } from "../component/UserMenu";

export function User({username=''}){
    const [userdata,setUserdata] = useState(DefaultObj.userdata)
    const [userMenu,setUserMenu] = useState(<></>)
    useEffect(()=>{
        if(username==''){
            getRequest(urls.getSessionUser).then(res=>{
                if(typeof res=='object'){
                    setUserdata(res)
                    setUserMenu(<UserMenu userdata={res}/>)
                }
            });
        }
        else{
            // ... 访问别兽的小兽空间
        }
    },[username]);
    return(
        <Box>
            <Container>
                { userMenu }
                <Grid container spacing={2}>
                    {
                        userdata.headimage?
                        <Grid size={12}>
                            <div className="backImageBox">
                                <img src={GArea.backimageURL+userdata.backimage} alt="backimage" />
                            </div>
                        </Grid>
                        :null
                    }
                    <Grid size={2}>
                        <div className="squareBox">
                            <img src={
                                userdata.headimage
                                ?
                                GArea.headimageURL+userdata.headimage
                                :
                                GArea.defaultHeadimage
                            } alt="headimage" />
                        </div>
                    </Grid>
                    <Grid size={10}>
                        <h1>{ userdata.name }</h1>
                        <h2>{ userdata.sex?userdata.sex:null+' '+userdata.species?userdata.species:null }</h2>
                        <div>{ userdata.info }</div>
                        <small>粉糖账号 { userdata.username }</small>
                        <br />
                        <small>{ toNormalDate(userdata.jointime) } 加入</small>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
