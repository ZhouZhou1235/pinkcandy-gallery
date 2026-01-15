import { SyntheticEvent, useEffect, useState } from "react";
import { DefaultObj, GArea } from "../vars/ConstVars";
import { TabContext, TabPanel } from "@mui/lab";
import { Grid, Pagination, Tab, Tabs } from "@mui/material";
import { ArtworkPreview } from "./artwork/ArtworkPreview";
import { Link } from "react-router";
import { urls } from "../vars/urls";

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
    function updatePage(_event:any,value:number){setSelectedPage(value)}
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
            <Grid container spacing={2} minHeight={50}>
                <Grid display="flex" justifyContent="center" alignItems="center">
                    <Pagination count={pagenum} onChange={ updatePage } />
                </Grid>
            </Grid>
        </>
    )
}

function UserShow(dataArray=[DefaultObj.userdata]){
    const [showArray,setShowArray] = useState([DefaultObj.userdata])
    const [pagenum,setPagenum] = useState(0)
    const [selectedPage,setSelectedPage] = useState(1)
    function updatePage(_event:any,value:number){setSelectedPage(value)}
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
            <Grid container spacing={2} minHeight={50}>
                <Grid display="flex" justifyContent="center" alignItems="center">
                    <Pagination count={pagenum} onChange={ updatePage } />
                </Grid>
            </Grid>
        </>
    )
}

export function PinkcandyResultShow({pinkcandyResult=DefaultObj.pinkcandyResult}){
    const [tabvalue,setTabvalue] = useState('artwork')
    const tabHandleChange = (_event:SyntheticEvent,newTabvalue:string)=>{setTabvalue(newTabvalue)}
    return(
        <>
            <TabContext value={tabvalue}>
                <Tabs
                    value={tabvalue}
                    onChange={tabHandleChange}
                >
                    <Tab value="artwork" label="作品" />
                    <Tab value="user" label="用户" />
                </Tabs>
                <TabPanel value={'artwork'}>{ArtworkShow(pinkcandyResult.artwork)}</TabPanel>
                <TabPanel value={'user'}>{UserShow(pinkcandyResult.user)}</TabPanel>
            </TabContext>
        </>
    )
}
