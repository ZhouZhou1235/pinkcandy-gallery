// 404

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
            <div className="p-2 text-center">
                <img src={GArea.image404URL} alt="not found" width={300} />
                <br />
                <Link to={'/'}>返回首页</Link>
            </div>
        </Box>
    )
}
