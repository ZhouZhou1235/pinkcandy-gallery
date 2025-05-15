import { Box, Button } from "@mui/material";
import { GArea } from "../vars/ConstVars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faSnowflake } from "@fortawesome/free-solid-svg-icons";

export function Footer(){
    return(
        <Box sx={{textAlign: "center",mt: 2}}>
            <img src={GArea.logoURL} alt="logo" height={50}/>
            <br />
            <a href="https://pinkcandy.top">
                <Button
                    startIcon={<FontAwesomeIcon icon={faSnowflake} />}
                >
                    粉糖粒子
                </Button>
            </a>
            &nbsp;
            <a href="https://github.com/ZhouZhou1235/pinkcandy-gallery">
                <Button
                    startIcon={<FontAwesomeIcon icon={faCode} />}
                >
                    github
                </Button>
            </a>
            <br />
            <small>站长小蓝狗🐾 1479499289@qq.com 保留所有权利 2023-2025 <a href="https://beian.miit.gov.cn">黔ICP备2024038291号</a></small>
        </Box>
    )
}
