import { SyntheticEvent, useEffect, useState } from "react";
import { DefaultObj, GArea } from "../code/vars";
import { ArtworkPreview } from "./artwork/ArtworkPreview";
import { Link } from "react-router";
import { urls } from "../code/api";

function copyArrayByPage(dataArray:any[],begin=0){
    let showArray = []
    for(let i=begin;i<begin+GArea.defaultShowNum;i++){
        if(i>dataArray.length-1){break}
        showArray.push(dataArray[i])
    }
    return showArray
}

function ArtworkShow(dataArray=[DefaultObj.artworkdata]){
    const [showArray,setShowArray] = useState([DefaultObj.artworkdata])
    const [pagenum,setPagenum] = useState(0)
    const [selectedPage,setSelectedPage] = useState(1)
    function updatePage(value:number){setSelectedPage(value)}
    useEffect(()=>{
        setPagenum(Math.ceil(dataArray.length/GArea.defaultShowNum))
        setShowArray(copyArrayByPage(dataArray,(selectedPage-1)*GArea.defaultShowNum))
    },[dataArray,selectedPage])
    return(
        <>
            <div className="row">
                {
                    showArray.length>0
                    ?
                    showArray.map(item=>
                        <div className="col-sm-3 p-2" key={item.id}>
                            <ArtworkPreview artworkdata={item}/>
                        </div>
                    )
                    :
                    null
                }
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: '50px'}}>
                <nav>
                    <ul className="pagination mb-0">
                        {Array.from({length: pagenum}, (_, i) => (
                            <li key={i} className={`page-item ${selectedPage === i+1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={()=>updatePage(i+1)}>{i+1}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )
}

function UserShow(dataArray=[DefaultObj.userdata]){
    const [showArray,setShowArray] = useState([DefaultObj.userdata])
    const [pagenum,setPagenum] = useState(0)
    const [selectedPage,setSelectedPage] = useState(1)
    function updatePage(value:number){setSelectedPage(value)}
    useEffect(()=>{
        setPagenum(Math.ceil(dataArray.length/GArea.defaultShowNum))
        setShowArray(copyArrayByPage(dataArray,(selectedPage-1)*GArea.defaultShowNum))
    },[dataArray,selectedPage])
    return(
        <>
            <div className="list-group">
                {
                    showArray.length>0
                    ?
                    showArray.map(item=>
                        <div key={item.username} className="list-group-item">
                            <Link to={'/user/'+item.username}>
                                <img
                                    src={
                                        item.headimage
                                        ?
                                        urls.headimageURL+item.headimage
                                        :
                                        GArea.defaultHeadimage
                                    }
                                    alt="headimage"
                                    width={50}
                                    height={50}
                                    className="rounded"
                                />
                            </Link>
                            {item.name} {Number(item.sex)==1?'雄':Number(item.sex)==2?'雌':''} {item.species}
                        </div>
                    )
                    :
                    null
                }
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: '50px'}}>
                <nav>
                    <ul className="pagination mb-0">
                        {Array.from({length: pagenum}, (_, i) => (
                            <li key={i} className={`page-item ${selectedPage === i+1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={()=>updatePage(i+1)}>{i+1}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )
}

export function PinkcandyResultShow({pinkcandyResult=DefaultObj.pinkcandyResult}){
    const [tabvalue,setTabvalue] = useState('artwork')
    const tabHandleChange = (_event:SyntheticEvent,newTabvalue:string)=>{setTabvalue(newTabvalue)}
    return(
        <>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button className={`nav-link ${tabvalue === 'artwork' ? 'active' : ''}`} onClick={()=>tabHandleChange(null as any,'artwork')}>作品</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${tabvalue === 'user' ? 'active' : ''}`} onClick={()=>tabHandleChange(null as any,'user')}>用户</button>
                </li>
            </ul>
            <div className="tab-content mt-3">
                {tabvalue === 'artwork' && <div>{ArtworkShow(pinkcandyResult.artwork)}</div>}
                {tabvalue === 'user' && <div>{UserShow(pinkcandyResult.user)}</div>}
            </div>
        </>
    )
}
