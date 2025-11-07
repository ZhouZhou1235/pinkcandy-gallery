import { TabContext, TabPanel } from "@mui/lab";
import { Box, Button, Stack, Tab, Tabs } from "@mui/material";
import { JSX, SyntheticEvent, useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { GArea, PageTitle } from "../vars/ConstVars";
import { Link } from "react-router";
import { ArtworkPreview } from "../component/artwork/ArtworkPreview";
import { UserPreview } from "../component/user/UserPreview";

function UserTrend(username=''){
    const [artworkItems,setArtworkItems] = useState([] as JSX.Element[])
    const [tabvalue,setTabvalue] = useState('artwork')
    const tabHandleChange = (_event:SyntheticEvent,newTabvalue:string)=>{setTabvalue(newTabvalue)}
    function loadData(){
        getRequest(urls.getUserTrendArtworks+'?username='+username).then(data=>{
            if(data!=0){
                let theArray :any[] = data
                let theItems = theArray.map(item=>
                    <div className="col-sm-4 p-2" key={item.id}>
                        <ArtworkPreview artworkdata={item}/>
                    </div>
                )
                setArtworkItems(theItems)
            }
            else{setArtworkItems([] as JSX.Element[])}
        })
    }
    useEffect(()=>{
        loadData()
    },[username])
    return(
        username
        ?
        <>
            <div>
                <UserPreview username={username}/>
            </div>
            <TabContext value={tabvalue}>
                <Tabs
                    value={tabvalue}
                    onChange={tabHandleChange}
                >
                    <Tab value="artwork" label="发布作品" />
                </Tabs>
                <TabPanel value={'artwork'}>
                    <div className="row">
                        {artworkItems}
                    </div>
                </TabPanel>
            </TabContext>
        </>
        :
        null
    )
}

export function Trends(){
    const [selectedUsername,setSelectedUsername] = useState('')
    const [trenduserItems,setTrenduserItems] = useState([] as JSX.Element[])
    function renderTrenduserItems(data:any[]){
        let theTrenduserItems = data.map(item=>
            <div key={item.username} className="row p-2">
                <div className="col-3">
                    <Link to={'/user/'+item.username}>
                        <img
                            className="rounded"
                            src={
                                item.headimage
                                ?
                                urls.headimageURL+item.headimage
                                :
                                GArea.defaultHeadimage
                            }
                            alt='headimage'
                            width={64}
                            height={64}
                        />
                    </Link>
                </div>
                <div className="col-9">
                    <Button onClick={()=>{setSelectedUsername(item.username)}}>
                        {item.name}
                    </Button>
                    <br />
                    {Number(item.sex)==1?'雄':Number(item.sex)==2?'雌':''} {item.species}
                </div>
            </div>
        )
        setTrenduserItems(theTrenduserItems)
    }
    function getUserTrendUsers(){
        getRequest(urls.getUserTrendUsers).then(data=>{
            if(data!=0){
                renderTrenduserItems(data)
            }
        })
    }
    function trendFinishRead(){
        postRequest(urls.trendFinishRead).then(res=>{
            if(res!=0){
                setTrenduserItems([] as JSX.Element[])
                setSelectedUsername('')
            }
        })
    }
    function trendNotRead(){
        postRequest(urls.trendNotRead).then(res=>{
            if(res!=0){
                getUserTrendUsers()
                setSelectedUsername('')
            }
        })
    }
    useEffect(()=>{
        document.title = PageTitle.trends
        getUserTrendUsers()
    },[])
    return(
        <Box>
            <div className="container p-2">
                <div className="row">
                    <div className="col-sm-3">
                        <h2>动态</h2>
                        <Box sx={{mt:2,mb:2}}>
                            <Button color="inherit" onClick={trendFinishRead}>完成浏览</Button>
                            <Button color="inherit" onClick={trendNotRead}>回看动态</Button>
                        </Box>
                        <Stack>
                            {trenduserItems}
                        </Stack>
                    </div>
                    <div className="col-sm-9">
                        {UserTrend(selectedUsername)}
                    </div>
                </div>
            </div>
        </Box>
    )
}
