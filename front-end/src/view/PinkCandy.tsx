import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { DefaultObj, GArea, PageTitle } from "../vars/ConstVars";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { TagList } from "../component/TagList";
import { objSortBy } from "../utils/tools";
import { PinkcandyResultShow } from "../component/PinkcandyResultShow";
import { Footer } from "../component/Footer";

export function PinkCandy(){
    const [topInfo,setTopInfo] = useState('')
    const [searchtext,setSearchtext] = useState('')
    const [toptagdata,setToptagdata] = useState(DefaultObj.tagArray)
    const [searchTagArray,setSearchTagArray] = useState(DefaultObj.tagArray)
    const [pinkcandyResultShowElement,setPinkcandyResultShowElement] = useState(<></>)
    function getAndSetTopInfo(){
        getRequest(urls.getTopInfo).then(x=>{
            if(typeof x=='string'){
                setTopInfo(x)
            }
        })
    }
    function getTopTagsAndView(){
        getRequest(urls.getTags+`?num=${GArea.defaultShowNum*10}`).then(data=>{
            if(data!=0){
                let tagList :any[] = data
                tagList.sort(objSortBy('usenum',true))
                tagList.splice(GArea.defaultShowNum)
                setToptagdata(data)
                setSearchTagArray(data)
            }
        })
    }
    function searchTagsAndView(tagtext:string){
        if(!tagtext.trim()){
            setSearchTagArray(toptagdata)
            return
        }
        getRequest(urls.searchTags+`?tagtext=${tagtext}`).then(data=>{
            if(data!=0){
                setSearchTagArray(data)
            }
            else{
                setSearchTagArray(toptagdata)
            }
        })
    }
    function searchResultHaveData(data=DefaultObj.pinkcandyResult){
        if(
            data.artwork.length>0
            ||
            data.user.length>0
        ){return true}
        return false
    }
    function searchPinkCandy(){
        if(!searchtext.trim()){
            setPinkcandyResultShowElement(<></>)
            return
        }
        getRequest(urls.searchPinkCandy+`?searchtext=${searchtext}`).then(data=>{
            if(data!=0){
                if(searchResultHaveData(data)){
                    setPinkcandyResultShowElement(<PinkcandyResultShow pinkcandyResult={data}/>)
                }
                else{
                    setPinkcandyResultShowElement(
                        <div className="text-center p-4">
                            <p>没有找到相关结果</p>
                        </div>
                    )
                }
            }
            else{
                setPinkcandyResultShowElement(
                    <div className="text-center p-4">
                        <p>搜索失败</p>
                    </div>
                )
            }
        })
    }
    useEffect(()=>{
        document.title = PageTitle.pinkcandy
        getTopTagsAndView()
        getAndSetTopInfo()
    },[])
    return(
        <Box sx={{mt: 2}}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 p-2">
                        <div className="text-center mb-4">
                            <img 
                                src={GArea.titleURL} 
                                alt="logo" 
                                className="d-block mx-auto m-2" 
                                width={'100%'} 
                                style={{maxWidth:'300px'}} 
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="搜索作品、用户、标签......"
                                value={searchtext}
                                onChange={(e)=>{
                                    setSearchtext(e.target.value)
                                    searchTagsAndView(e.target.value)
                                }}
                            />
                            <button 
                                className="btn btn-outline-secondary" 
                                onClick={searchPinkCandy}
                            >
                                搜索
                            </button>
                        </div>
                        <TagList tagArray={searchTagArray}/>
                        <div className="card">
                            <div className="card-header">
                                <h4 className="mb-0">公告</h4>
                            </div>
                            <div className="card-body">
                                <div 
                                    dangerouslySetInnerHTML={{__html: topInfo}} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8 p-2">
                        {pinkcandyResultShowElement.type !== Symbol.for('react.fragment')?(
                            <div>
                                <p>搜索 {searchtext} ......</p>
                                {pinkcandyResultShowElement}
                            </div>
                        ):(
                            <>
                                <div className="card mt-4">
                                    <div className="card-body text-center">
                                        <h3>欢迎来到幻想动物画廊</h3>
                                        <p className="text-muted">
                                            输入关键词，探索小蓝狗与伙伴们的精彩作品！
                                        </p>
                                        <div className="row mt-4">
                                            <div className="col-sm-4">
                                                <div className="text-primary">
                                                    <i className="fas fa-palette fa-2x mb-2"></i>
                                                    <h5>毛绒绒</h5>
                                                    <p>发布和展示主题作品</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="text-success">
                                                    <i className="fas fa-users fa-2x mb-2"></i>
                                                    <h5>交流分享</h5>
                                                    <p>提供简易聊天社区</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="text-warning">
                                                    <i className="fas fa-tags fa-2x mb-2"></i>
                                                    <h5>开源免费</h5>
                                                    <p>项目代码公开学习使用</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center p-2">
                                    <img 
                                        src={GArea.SkyblueHound} 
                                        alt="小蓝狗"
                                        className="img-fluid rounded shadow" 
                                        style={{maxHeight: '400px', objectFit: 'contain'}}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </Box>
    )
}
