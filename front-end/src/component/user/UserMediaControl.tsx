import { TabContext, TabPanel } from "@mui/lab";
import { Grid, Pagination, Tab, Tabs, Button } from "@mui/material";
import { JSX, SyntheticEvent, useEffect, useState } from "react";
import { getRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";
import { GArea } from "../../vars/ConstVars";
import { ArtworkPreview } from "../artwork/ArtworkPreview";
import { EditArtworkForm } from "../form/EditArtworkForm";
import { DeleteArtworkButton } from "../artwork/DeleteArtworkButton";

export function UserMediaControl({username=''}){
    const [artworkitems,setArtworkitems] = useState([] as JSX.Element[])
    const [editformElement,setEditformElement] = useState(<></>)
    const [galleryPage,setGalleryPage] = useState(1)
    const [tabvalue,setTabvalue] = useState('artworks')
    const tabHandleChange = (_event:SyntheticEvent,newTabvalue:string)=>{setTabvalue(newTabvalue)}
    function closeForm(){
        setEditformElement(<></>)
    }
    function selecttoeditArtwork(id=''){
        setEditformElement(<EditArtworkForm galleryid={id}/>)
    }
    function updateGalleryPage(_event:any,value:number){
        getRequest(urls.getArtworks+`?num=${GArea.defaultShowNum}&begin=${(value-1)*GArea.defaultShowNum}&username=${username}`).then(data=>{
            if(data!=0){
                let artworks :any[] = data
                let theArtworkItems = artworks.map(item=>
                    <div className="col-sm-3 p-2 d-flex flex-column" key={item.id} style={{ height: '100%' }}>
                        <div className="flex-grow-1">
                            <ArtworkPreview artworkdata={item}/>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <Button color="warning" onClick={()=>{selecttoeditArtwork(item.id)}}>修改</Button>
                            <DeleteArtworkButton galleryid={item.id}/>
                        </div>
                    </div>
                )
                setArtworkitems(theArtworkItems)
            }
        })
    }
    useEffect(()=>{
        (async()=>{
            updateGalleryPage(null,1)
            await getRequest(urls.getUserInfoCount+'?username='+username).then(data=>{
                if(data!=0){
                    setGalleryPage(Math.ceil(data.artworknum/GArea.defaultShowNum))
                }
            })
        })()
    },[])
    return(
        <div className="row">
            <div className="col-sm-4">
                <span>点击修改按钮来编辑</span>
                <Button onClick={closeForm}>关闭</Button>
                {editformElement}
            </div>
            <div className="col-sm-8">
                <TabContext value={tabvalue}>
                    <Tabs
                        value={tabvalue}
                        onChange={tabHandleChange}
                    >
                        <Tab value="artworks" label="作品集" />
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
                </TabContext>
            </div>
        </div>
    )
}
