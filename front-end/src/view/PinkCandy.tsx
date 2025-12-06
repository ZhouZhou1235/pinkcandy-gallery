import { Box } from "@mui/material";
import { JSX, useEffect, useState } from "react";
import { DefaultObj, GArea, PageTitle } from "../vars/ConstVars";
import { getRequest, postRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { TagList } from "../component/TagList";
import { objSortBy } from "../utils/tools";
import { PinkcandyResultShow } from "../component/PinkcandyResultShow";
import { Footer } from "../component/Footer";
import { ArtworkPreview } from "../component/artwork/ArtworkPreview";
import { Link } from "react-router";

export function PinkCandy(){
    const [searchtext,setSearchtext] = useState('')
    const [toptagdata,setToptagdata] = useState(DefaultObj.tagArray)
    const [searchTagArray,setSearchTagArray] = useState(DefaultObj.tagArray)
    const [pinkcandyResultShowElement,setPinkcandyResultShowElement] = useState(<></>)
    const [artworkItems,setArtworkItems] = useState([] as JSX.Element[])
    const [havelogin,setHavelogin] = useState(false)
    const [randomImageObject,setRandomImageObject] = useState({} as any)
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
    function loadLuckyImage(){
        let objs = Object.values(GArea.lucky)
        let index = Math.floor(Math.random()*objs.length)
        let imageObj = objs[index]
        setRandomImageObject(imageObj)
    }
    async function loadArtworkItems(){
        await getRequest(urls.getArtworks+`?num=${GArea.defaultShowNum}`).then(data=>{
            if(data!=0){
                let artworks :any[] = data
                let theArtworkItems = artworks.map(item=>
                    <div className="col-sm-3 p-2" key={item.id}>
                        <ArtworkPreview artworkdata={item}/>
                    </div>
                )
                setArtworkItems(theArtworkItems)
            }
        })
    }
    useEffect(()=>{
        document.title = PageTitle.pinkcandy
        getTopTagsAndView()
        loadArtworkItems()
        loadLuckyImage()
        postRequest(urls.checkLogin).then(res=>{if(res){setHavelogin(true)}})
    },[])
    return(
        <Box>
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
                        <div className="p-2">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="搜索作品/用户......"
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
                        </div>
                        <div className="p-2">
                            {
                                havelogin
                                ?
                                <Link to={'/gallery'} className="d-grid">
                                    <button type="button" className="btn btn-outline-secondary">浏览画廊</button>
                                </Link>
                                :
                                <Link to={'/login'} className="d-grid">
                                    <button type="button" className="btn btn-outline-primary">登录账号</button>
                                </Link>
                            }
                        </div>
                        <div className="p-2 text-center">
                            <div>
                                <img src={randomImageObject.src} className="img-fluid rounded" alt="luckyimage" width={'75%'} />
                            </div>
                            <small>{randomImageObject.info}</small>
                        </div>
                    </div>
                    <div className="col-sm-8 p-2">
                        {pinkcandyResultShowElement.type !== Symbol.for('react.fragment')?(
                            <div>
                                <p>搜索 {searchtext} ......</p>
                                {pinkcandyResultShowElement}
                            </div>
                        )
                        :
                        (
                            <div className="row">
                                {artworkItems}
                            </div>
                        )
                        }
                    </div>
                </div>
                <Footer />
            </div>
        </Box>
    )
}
