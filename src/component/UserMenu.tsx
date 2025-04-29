import { Breadcrumbs, Container, Link, Typography } from "@mui/material";
import { postRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { useNavigate } from "react-router";
import { EditUserDialog } from "./EditUserDialog";

export function UserMenu(){
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
                <Typography>小兽空间</Typography>
                <Link underline="hover" onClick={logout}>离开</Link>
                <EditUserDialog />
            </Breadcrumbs>
        </Container>
    )
}
