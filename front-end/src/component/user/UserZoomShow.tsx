import { FormControl, Grid, Pagination, Tab, Tabs } from "@mui/material";
import { DefaultObj, GArea, PageTitle } from "../../vars/ConstVars";
import { JSX, SyntheticEvent, useEffect, useState } from "react";
import { getRequest } from "../../utils/HttpRequest";
import { socket_http_urls, urls } from "../../vars/urls";
import { Avatar, Spin } from "antd";
import { toNormalDate } from "../../utils/tools";
import { UserWatchButton } from "./UserWatchButton";
import { UserInfoCount } from "./UserInfoCount";
import { ArtworkPreview } from "../artwork/ArtworkPreview";
import { TabContext, TabPanel } from "@mui/lab";
import { UserWatchList } from "./UserWatchList";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { Link } from "react-router";

export function UserZoomShow({username=''}){
    const [loading,setLoading] = useState(true)
    const [userdata,setUserdata] = useState(DefaultObj.userdata)
    const [watchButton,setWatchButton] = useState(<></>)
    const [infocountElement,setInfocountElement] = useState(<></>)
    const [artworkitems,setArtworkitems] = useState([] as JSX.Element[])
    const [chatzoomitems,setChatzoomitems] = useState([] as JSX.Element[])
    const [tabvalue,setTabvalue] = useState('artworks')
    const [galleryPage,setGalleryPage] = useState(1)
    const tabHandleChange = (_event:SyntheticEvent,newTabvalue:string)=>{setTabvalue(newTabvalue)}
    async function updateGalleryPage(_event:any,value:number){
        await getRequest(urls.getArtworks+`?num=${GArea.defaultShowNum}&begin=${(value-1)*GArea.defaultShowNum}&username=${username}`).then(data=>{
            if(data!=0){
                let artworks :any[] = data
                let theArtworkItems = artworks.map(item=>
                    <div className="col-sm-4 p-2" key={item.id}>
                        <ArtworkPreview artworkdata={item}/>
                    </div>
                )
                setArtworkitems(theArtworkItems)
            }
            else{
                setArtworkitems([] as JSX.Element[])
            }
        })
    }
    function loadData(){
        (async ()=>{
            if(!username){setLoading(false);return}
            await getRequest(urls.getUser+'/'+username).then(res=>{
                if(typeof res=='object'){
                    let theUserdata = res
                    setUserdata(theUserdata)
                    document.title = PageTitle.zoom+theUserdata.name
                    getRequest(urls.getSessionUser).then(data=>{
                        if(data!=0){
                            if(username!=data.username){setWatchButton(<UserWatchButton username={username}/>)}
                        }
                    })
                }
            });
            await updateGalleryPage(null,1)
            await getRequest(urls.getUserInfoCount+'?username='+username).then(data=>{
                if(data!=0){
                    let artworkPageNum = Math.round(data.artworknum/GArea.defaultShowNum)+1
                    setGalleryPage(artworkPageNum)
                }
            })
            let rooms = await getRequest(socket_http_urls.getRooms+'?username='+username)
            if(rooms){
                let roomList :any[] = rooms
                let theChatroomitems = roomList.map(item=>
                    <li className="list-group-item" key={item.id} style={{
                        borderColor:item.owner_username==username?'pink':'none',
                        borderWidth:'3px',
                    }}>
                        <Link to={'/chatzoom/'+item.id}>
                            <h2>{item.name}</h2>
                        </Link>
                    </li>
                )
                setChatzoomitems(theChatroomitems)
            }
            setInfocountElement(<></>)
            setInfocountElement(<UserInfoCount username={username}/>)
            setLoading(false)
        })()
    }
    useEffect(()=>{
        loadData()
    },[username]);
    return(
        <>
            <Spin spinning={loading} fullscreen />
            <>
                {
                    userdata.backimage
                    ?
                    <LazyLoadComponent children={
                        <div className="backImageBox">
                            <img src={GArea.backimageURL+userdata.backimage} alt="backimage" />
                        </div>
                    } />
                    :
                    null
                }
                <div className="row">
                    <div className="col-sm-4">
                        <div className="row p-2">
                            <div className="col-3 d-flex align-items-center justify-content-center">
                                <Avatar
                                    shape="square"
                                    size={75}
                                    alt="headimage"
                                    src={
                                        userdata.headimage
                                        ?
                                        GArea.headimageURL+userdata.headimage
                                        :
                                        GArea.defaultHeadimage
                                    }
                                />
                            </div>
                            <div className="col-9">
                                <h1>{ userdata.name }</h1>
                                <h2>
                                    { Number(userdata.sex)==1?'雄':Number(userdata.sex)==2?'雌':'' }
                                    &nbsp;
                                    { userdata.species?userdata.species:'' }
                                </h2>
                            </div>
                        </div>
                        {infocountElement}
                        <FormControl fullWidth>{watchButton}</FormControl>
                        <div className="p-2" style={{ whiteSpace:'pre-line' }}>
                            { userdata.info }
                            <br />
                            <small>粉糖账号 { userdata.username }</small>
                            <br />
                            <small>{ toNormalDate(userdata.jointime) } 加入</small>
                        </div>
                        <UserWatchList username={username}/>
                    </div>
                    <div className="col-sm-8">
                        <TabContext value={tabvalue}>
                            <Tabs
                                value={tabvalue}
                                onChange={tabHandleChange}
                            >
                                <Tab value="artworks" label="作品集" />
                                <Tab value="chatzoom" label="加入房间" />
                            </Tabs>
                            <TabPanel value={'artworks'} sx={{p:0}}>
                                <div className="row">
                                    {artworkitems}
                                </div>
                                <Grid container spacing={2} minHeight={50}>
                                    <Grid display="flex" justifyContent="center" alignItems="center">
                                        <Pagination count={galleryPage} onChange={ updateGalleryPage } color="secondary" shape="rounded"/>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={'chatzoom'} sx={{p:0}}>
                                <ul className="list-group p-2">
                                    {chatzoomitems}
                                </ul>
                            </TabPanel>
                        </TabContext>
                    </div>
                </div>
            </>
        </>
    )
}
