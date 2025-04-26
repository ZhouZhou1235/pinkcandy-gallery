import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { GArea } from "../vars/ConstVars";

function Info(){
    return(
        <>
            <h1>幻想动物画廊</h1>
            <p>
                粉糖 PINKCANDY<br />
                变成毛绒绒的形状！🐾<br />
                嘿！欢迎来到粉糖画廊！<br />
                幻想动物画廊是站长蓝狗周周与伙伴们一同分享毛绒绒艺术作品的地方<br />
                无任何广告或商业活动，为非盈利兴趣站点。<br />
                <br />
                粉糖粒子-幻想动物画廊 2023.10 创建<br />
            </p>
            <h2>粉糖粒子画廊规则</h2>
            <p>
                1 遵守我国的基本法律和道德规范<br />
                2 不要发涩涩（18+）、猎奇恐怖、政治相关等敏感信息<br />
                3 不要网络暴力其他小兽<br />
                4 不要一次性发送太多或无意义内容<br />
                5 不要添加错误的标签<br />
                6 由于是幻想动物主题网站，所以不要发布与毛绒绒无关的图像。<br />
                7 画廊由作者上传，即原创、二创、改图等均可，但不能是转载作品。<br />
                免责声明：<br />
                幻想动物画廊提供的任何信息及产生的效应由其发布者负责，本网站不提供任何保证也不承担任何法律责任。<br />
            </p>
            <h2>什么是毛绒绒？</h2>
            <p>
                毛绒绒是指由各种除人类以外的动物为主要原型创作出来的角色形象。<br />
                喜爱毛绒绒的群体称为兽控，兽迷，“福瑞控”等。<br />
                毛绒绒的兽化程度可以细分为以下等级：<br />
                - 人类<br />
                1 仅有耳朵和尾巴作为装饰<br />
                2 更浓密的动物毛发<br />
                3 通常的兽人<br />
                4 以动物骨骼为基础<br />
                5 有思想的动物<br />
                - 动物<br />
            </p>
            <small>
                工作邮箱 pinkcandyzhou@qq.com<br />
                版权所有 粉糖粒子周周 保留所有权利<br />
                Copyright © PinkCandyZhou. All rights reserved.<br /> 
            </small>
        </>
    )
}

export function About(){
    const [boardItems,setBoardItems] = useState([<span key={1}></span>])
    const [boardPage,setBoardPage] = useState(1)
    useEffect(()=>{
        getRequest(urls.getBoradMessages+'?num='+GArea.defaultShowNum).then(data=>{
            if(typeof data=='object'){
                let boardMessages :any[] = data
                let theBoardItems = boardMessages.map(item=>
                    <div className="list-group-item" key={item.id}>
                        <strong>{ item.user.name }</strong> { item.content }
                    </div>
                )
                setBoardItems(theBoardItems)
            }
        })
        getRequest(urls.getDBRecordCount+'?table=board').then(count=>{
            let pageNum = Math.floor(count/GArea.defaultShowNum)+1
            setBoardPage(pageNum)
        })
    },[])
    // 更新留言板页
    function updateBoardPage(_event:any,value:number){
        getRequest(urls.getBoradMessages+`?num=${GArea.defaultShowNum}&begin=${(value-1)*GArea.defaultShowNum}`).then(data=>{
            if(typeof data=='object'){
                let boardMessages :any[] = data
                let theBoardItems = boardMessages.map(item=>
                    <div className="list-group-item" key={item.id}>
                        <strong>{ item.user.name }</strong> { item.content }
                    </div>
                )
                setBoardItems(theBoardItems)
            }
        })
    }
    return(
        <Box>
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        <Info />
                    </div>
                    <div className="col-sm-4">
                        <h1>粉糖留言板</h1>
                        <ul className="list-group list-group-flush">
                            { boardItems }
                        </ul>
                        <Pagination count={boardPage} onChange={ updateBoardPage } />    
                    </div>
                </div>
            </div>
        </Box>
    )
}
