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
        getRequest(urls.getTopInfo).then(x=>{if(typeof x=='string'){setTopInfo(x)}})
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
        getRequest(urls.searchPinkCandy+`?searchtext=${searchtext}`).then(data=>{
            if(data!=0){
                if(searchResultHaveData(data)){
                    setPinkcandyResultShowElement(<PinkcandyResultShow pinkcandyResult={data}/>)
                }
                else{setPinkcandyResultShowElement(<></>)}
            }
            else{setPinkcandyResultShowElement(<></>)}
        })
    }
    useEffect(()=>{
        document.title = PageTitle.pinkcandy
        getTopTagsAndView()
        getAndSetTopInfo()
    },[])
    return(
        <Box>
            <div className="container">
                <div className="text-center p-2 my-4 text-center">
                    <img src={GArea.titleURL} alt="logo" className="d-block mx-auto m-2" width={'100%'} style={{maxWidth:'600px'}} />
                    <div className="col-lg-6 mx-auto">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e)=>{
                                    console.log(e.target.value)
                                    setSearchtext(e.target.value)
                                    searchTagsAndView(e.target.value)
                                }}
                            />
                            <button className="btn btn-outline-secondary" onClick={searchPinkCandy}>来点粉糖</button>
                        </div>
                        <TagList tagArray={searchTagArray}/>
                        <div dangerouslySetInnerHTML={{__html:topInfo}} />
                    </div>
                </div>
                {pinkcandyResultShowElement}
                <Footer />
            </div>
        </Box>
    )
}
