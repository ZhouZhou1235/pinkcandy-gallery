import { Box, Button, Grid, Pagination } from "@mui/material";
import { JSX, useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { GArea, PageTitle } from "../vars/ConstVars";
import { toNormalDate } from "../utils/tools";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faSnowflake } from "@fortawesome/free-solid-svg-icons";

function Info(){
    return(
        <>
            <div className="text-center">
                <img src={GArea.titleURL} alt="title" width={'75%'}/>
            </div>
            <div className="text-center">
                <strong className="text-muted">
                    来点粉糖，探索小蓝狗与伙伴们的精彩作品！
                </strong>
            </div>
            <div className="card mt-4">
                <div className="card-body text-center">
                    <div className="row mt-4">
                        <div className="col-sm-4">
                            <div className="text-primary">
                                <i className="fas fa-palette fa-2x mb-2"></i>
                                <h5>绘画交流</h5>
                                <p>发布和展示毛绒主题作品</p>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="text-success">
                                <i className="fas fa-users fa-2x mb-2"></i>
                                <h5>兴趣驱动</h5>
                                <p>网站非营利开放使用</p>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="text-warning">
                                <i className="fas fa-tags fa-2x mb-2"></i>
                                <h5>代码开源</h5>
                                <p>项目代码完全公开</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-2">
                <h2>网站介绍</h2>
                <p>
                    幻想动物画廊是一个非商业性质的毛绒绒主题中文艺术网站，用户能发布分享有关毛绒绒的绘画作品。<br />
                    本网站是小蓝狗周周的个人项目，已获得国家软件著作权并长期维护，具体技术细节请参阅github仓库。<br />
                    <a href="https://pinkcandy.top">
                        <Button
                            startIcon={<FontAwesomeIcon icon={faSnowflake} />}
                            size="small"
                        >
                            粉糖
                        </Button>
                    </a>
                    &nbsp;
                    <a href="https://github.com/ZhouZhou1235/pinkcandy-gallery">
                        <Button
                            startIcon={<FontAwesomeIcon icon={faCode} />}
                            size="small"
                        >
                            github
                        </Button>
                    </a>
                </p>
                <h2>规则</h2>
                <p>
                    1 遵守基本的互联网规范<br />
                    2 不要在网站任何地方发限制级、猎奇恐怖、政治相关等敏感信息，否则会被删除。<br />
                    3 不要一次性发送太多或无意义的内容<br />
                    4 由于是主题网站，所以不要发布与毛绒绒无关的作品。<br />
                    5 作品可以是原创、二创、改图等类型，由作者上传或取得授权后上传，不能直接转载作品。<br />
                    免责声明：<br />
                    幻想动物画廊提供的任何信息及产生的效应由其发布者负责，本网站不提供任何保证也不承担任何法律责任。<br />
                </p>
                <h2>什么是毛绒？</h2>
                <p>
                    毛绒是指由各种除人类以外的动物为主要原型创作出来的角色形象，
                    喜爱毛绒绒的群体称为兽控，兽迷，“福瑞控”等。
                    毛绒绒的兽化程度可以细分为以下等级：<br />
                    - 人类<br />
                    1 仅有耳朵和尾巴作为装饰<br />
                    2 更浓密的动物毛发<br />
                    3 通常的兽人<br />
                    4 以动物骨骼为基础<br />
                    5 有思想的动物<br />
                    - 动物<br />
                </p>
            </div>
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
    return(
        <Box>
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 p-2">
                        <Info />
                    </div>
                    <div className="col-sm-4 p-2">
                        <h2>粉糖留言板</h2>
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
