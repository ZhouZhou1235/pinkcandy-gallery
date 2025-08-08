import { Box, Grid, Pagination } from "@mui/material";
import { JSX, useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { GArea, PageTitle } from "../vars/ConstVars";
import { toNormalDate } from "../utils/tools";
import { Link } from "react-router";

function Info(){
    return(
        <>
            <img src={GArea.GalleryPageview} alt="gallerypageview" width={'100%'}/>
            <h1>幻想动物画廊</h1>
            <p>
                粉糖 PINKCANDY<br />
                变成毛绒绒的形状！🐾<br />
                嘿！欢迎来到粉糖画廊！<br />
                幻想动物画廊🐾是一个非商业性质中文艺术图站，<br />
                用户可以浏览、发布分享有关毛绒绒的绘画作品。<br />
                小蓝狗周周想与伙伴们互相分享毛绒绒艺术~<br />
                <br />
                本项目已开源，欢迎兴趣同好访问学习或加入开发。<a href="https://github.com/ZhouZhou1235/pinkcandy-gallery">项目地址</a><br />
                <br />
                粉糖-幻想动物画廊 2023.10 创建<br />
            </p>
            <h2>粉糖画廊规则</h2>
            <p>
                1 遵守我国基本法律和道德规范<br />
                2 不要发限制级作品、猎奇恐怖、政治相关等敏感信息<br />
                3 不要一次性发送太多或无意义内容<br />
                4 由于是幻想动物主题网站，所以不要发布与毛绒绒无关的作品。<br />
                5 作品可以是原创、二创、改图等类型，由作者上传或取得作者授权后代上传，不能直接转载作品。<br />
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
                工作邮箱 <a href='mailto:pinkcandyzhou@qq.com'>pinkcandyzhou@qq.com</a><br />
                版权所有 粉糖周周 保留所有权利<br />
                Copyright © PinkCandyZhou. All rights reserved.<br /> 
            </small>
        </>
    )
}

export function About(){
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
            let pageNum = Math.round(count/GArea.defaultShowNum)+1
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
                        <Grid container spacing={2} minHeight={50}>
                            <Grid display="flex" justifyContent="center" alignItems="center">
                                <Pagination count={boardPage} onChange={ updateBoardPage } />    
                            </Grid>
                        </Grid>
                        <img src={GArea.BaiBaiAndZhouZhou} alt="baibaiandzhouzhou" width={'100%'}/>
                    </div>
                </div>
            </div>
        </Box>
    )
}
