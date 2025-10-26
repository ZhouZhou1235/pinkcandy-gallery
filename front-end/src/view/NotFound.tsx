import { Box } from "@mui/material";
import { GArea, PageTitle } from "../vars/ConstVars";
import { Link } from "react-router";
import { useEffect } from "react";

export function NotFound(){
    useEffect(()=>{
        document.title = PageTitle.notFound
    },[])
    return(
        <Box>
            <div
                className="
                    d-flex
                    align-items-center
                    justify-content-center
                    text-center
                "
                style={{height:'100vh'}}
            >
                <div>
                    <img src={GArea.image404URL} alt="not found" width={300} />
                    <br />
                    <span style={{fontSize:'2em'}}>粉糖：页面未找到</span>
                    <br />
                    <span>快叫周周修复异常！QAQ</span>
                    <br />
                    <Link to={'/'}>返回首页</Link>
                </div>
            </div>
        </Box>
    )
}
