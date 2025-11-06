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
    const [randomImages, setRandomImages] = useState<string[]>([])
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
    function showRandomLuckyImages(){
        let luckyKeys = Object.keys(GArea.lucky)
        let shuffled = luckyKeys.sort(() => 0.5 - Math.random())
        let selected = shuffled.slice(0, 3)
        let randomLuckyImages = selected.map(key => GArea.lucky[key as keyof typeof GArea.lucky])
        setRandomImages(randomLuckyImages)
    }
    useEffect(()=>{
        document.title = PageTitle.pinkcandy
        getTopTagsAndView()
        getAndSetTopInfo()
        showRandomLuckyImages()
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
                        <div className="row">
                            <div className="col-md-8 p-2">
                                <div className="text-center">
                                    <img 
                                        src={randomImages[0]}
                                        alt="lucky main"
                                        className="img-fluid rounded"
                                        style={{maxHeight: '500px', objectFit: 'cover', width: '100%'}}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 p-2">
                                <div className="d-flex flex-column h-100">
                                    {randomImages.slice(1).map((image, index) => (
                                        <div key={index} className="mb-3 flex-fill">
                                            <div className="text-center h-100">
                                                <img 
                                                    src={image}
                                                    alt={`lucky ${index + 2}`}
                                                    className="img-fluid rounded h-100"
                                                    style={{objectFit: 'cover', width: '100%'}}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </Box>
    )
}
