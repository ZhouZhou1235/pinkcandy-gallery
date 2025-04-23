import { Breadcrumbs, Container, Link, Typography } from "@mui/material";
import { DefaultObj } from "../vars/ConstVars";
import { postRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { useNavigate } from "react-router";

export function UserMenu({userdata=DefaultObj.userdata}){
    let navigate = useNavigate()
    function logout(){
        postRequest(urls.logout).then(res=>{
            if(typeof res=='number'){if(res==1){
                navigate('/')
                location.reload()
            }}
        })
    }
    return(
        <Container sx={{p:1}}>
            <Breadcrumbs>
                <Typography>{userdata.name}</Typography>
                <Link underline="hover" onClick={logout}>退出登录</Link>
            </Breadcrumbs>
        </Container>
    )
}
