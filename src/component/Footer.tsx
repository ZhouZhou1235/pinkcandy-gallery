import { Box } from "@mui/material";
import { GArea } from "../vars/ConstVars";

export function Footer(){
    return(
        <Box sx={{textAlign: "center",backgroundColor:'aliceblue',mt: 2}}>
            <img src={GArea.logoURL} alt="logo" height={50}/>
            <br />
            <a href="https://pinkcandy.top">粉糖粒子</a> 保留所有权利 2023-2025
            <br />
            {/* <a href="https://beian.miit.gov.cn">黔ICP备2024038291号</a>
            <br /> */}
            <small>站长小蓝狗🐾 1479499289@qq.com</small>
        </Box>
    )
}
