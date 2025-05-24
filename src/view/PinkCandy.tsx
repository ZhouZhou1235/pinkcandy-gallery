import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { DefaultObj, GArea, PageTitle } from "../vars/ConstVars";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { TagList } from "../component/TagList";
import { objSortBy } from "../utils/tools";
import { PinkcandyResultShow } from "../component/PinkcandyResultShow";

export function PinkCandy(){
    const [searchtext,setSearchtext] = useState('')
    const [toptagdata,setToptagdata] = useState(DefaultObj.tagArray)
    const [searchTagArray,setSearchTagArray] = useState(DefaultObj.tagArray)
    const [pinkcandyResultShowElement,setPinkcandyResultShowElement] = useState(<></>)
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
            data.plantpot.length>0
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
    },[])
    return(
        <Box>
            <div className="container">
                <div className="text-center p-2 my-4 text-center">
                    <img src={GArea.logoURL} alt="logo" className="d-block mx-auto m-2" width={'100%'} style={{maxWidth:'200px'}} />
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
                    </div>
                </div>
                {pinkcandyResultShowElement}
            </div>
        </Box>
    )
}
