import { Box, Grid, Pagination } from "@mui/material";
import { JSX, useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { GArea, PageTitle } from "../vars/ConstVars";
import { toNormalDate } from "../utils/tools";
import { Link } from "react-router";

export function Board(){
    const [boardItems,setBoardItems] = useState([] as JSX.Element[])
    const [boardPage,setBoardPage] = useState(1)
    useEffect(()=>{
        document.title = PageTitle.about
        getRequest(urls.getBoradMessages+'?num='+GArea.defaultShowNum).then(data=>{
            if(typeof data=='object'){
                let boardMessages :any[] = data
                let theBoardItems = boardMessages.map(item=>
                    <div className="list-group-item" key={item.id}>
                        <Link to={'/user/'+item.username}>
                            <strong>{ item.user.name }</strong>
                        </Link>
                        &nbsp;
                        { item.content }
                        <br />
                        <small>{ toNormalDate(item.time) }</small>
                    </div>
                )
                setBoardItems(theBoardItems)
            }
        })
        getRequest(urls.getDBRecordCount+'?table=board').then(count=>{
            setBoardPage(Math.ceil(count/GArea.defaultShowNum))
        })
    },[])
    function updateBoardPage(_event:any,value:number){
        getRequest(urls.getBoradMessages+`?num=${GArea.defaultShowNum}&begin=${(value-1)*GArea.defaultShowNum}`).then(data=>{
            if(typeof data=='object'){
                let boardMessages :any[] = data
                let theBoardItems = boardMessages.map(item=>
                    <div className="list-group-item" key={item.id}>
                        <Link to={'/user/'+item.username}>
                            <strong>{ item.user.name }</strong>
                        </Link>
                        &nbsp;
                        { item.content }
                        <br />
                        <small>{ toNormalDate(item.time) }</small>
                    </div>
                )
                setBoardItems(theBoardItems)
            }
        })
    }
    function getDaysBetween(date1:Date,date2:Date){
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const timeDiff = d2.getTime()-d1.getTime();
        const daysDiff = timeDiff/(1000*60*60*24);
        const result = Math.floor(daysDiff);
        return result;
    }
    return(
        <Box>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 p-2">
                        <h2>留言</h2>
                        <img src={GArea.Board} alt="board" width={'100%'}/>
                        <p>
                            粉糖留言板是网站的第一个功能，作为开发学习纪念。
                            <div style={{color:'blue'}}>
                                幻想动物画廊已运行 {getDaysBetween(new Date('2023-10-1'),new Date())} 天
                            </div>
                        </p>
                    </div>
                    <div className="col-sm-8 p-2">
                        <ul className="list-group list-group-flush">
                            { boardItems }
                        </ul>
                        <Grid container spacing={2} minHeight={50}>
                            <Grid display="flex" justifyContent="center" alignItems="center">
                                <Pagination count={boardPage} onChange={ updateBoardPage } />    
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </Box>
    )
}
