import { TabContext, TabPanel } from "@mui/lab";
import { Grid, Pagination, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { GArea } from "../vars/ConstVars";
import { ArtworkPreview } from "./ArtworkPreview";
import { PlantpotPreview } from "./PlantpotPreview";

export function UserStar({username=''}){
    const [artworkitems,setArtworkitems] = useState([<span key={1}></span>])
    const [plantpotitems,setPlantpotitems] = useState([<span key={1}></span>])
    const [galleryPage,setGalleryPage] = useState(1)
    const [gardenPage,setGardenPage] = useState(1)
    const [tabvalue,setTabvalue] = useState('artworks')
    const tabHandleChange = (_event:SyntheticEvent,newTabvalue:string)=>{setTabvalue(newTabvalue)}
    function updateGalleryPage(_event:any,value:number){
        getRequest(urls.getStarArtworks+`?num=${GArea.defaultShowNum}&begin=${(value-1)*GArea.defaultShowNum}&username=${username}`).then(data=>{
            if(data!=0){
                let artworks :any[] = data
                let theArtworkItems = artworks.map(item=>
                    <div className="col-sm-3 p-2" key={item.gallery.id}>
                        <ArtworkPreview artworkdata={item.gallery}/>
                    </div>
                )
                setArtworkitems(theArtworkItems)
            }
        })
    }
    function updateGardenPage(_event:any,value:number){
        getRequest(urls.getStarPlantpots+`?num=${GArea.defaultShowNum}&begin=${(value-1)*GArea.defaultShowNum}&username=${username}`).then(data=>{
            if(data!=0){
                let plantpots :any[] = data
                let thePlantpotItems = plantpots.map(item=>
                    <div className="p-2" key={item.garden.id}>
                        <PlantpotPreview plantpotdata={item.garden}/>
                    </div>
                )
                setPlantpotitems(thePlantpotItems)
            }
        })
    }
    useEffect(()=>{
        (async()=>{
            updateGalleryPage(null,1)
            updateGardenPage(null,1)
            await getRequest(urls.getUserStarInfoCount+'?username='+username).then(data=>{
                if(data!=0){
                    let artworkPageNum = Math.round(data.artworknum/GArea.defaultShowNum)+1
                    let plantpotPageNum = Math.round(data.plantpotnum/GArea.defaultShowNum)+1
                    setGalleryPage(artworkPageNum)
                    setGardenPage(plantpotPageNum)
                }
            })
        })()
    },[])
    return(
        <>
            <TabContext value={tabvalue}>
                <Tabs
                    value={tabvalue}
                    onChange={tabHandleChange}
                >
                    <Tab value="artworks" label="作品集" />
                    <Tab value="plantpots" label="盆栽" />
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
                <TabPanel value={'plantpots'}>
                    {plantpotitems}
                    <Grid container spacing={2} minHeight={50}>
                        <Grid display="flex" justifyContent="center" alignItems="center">
                            <Pagination count={gardenPage} onChange={ updateGardenPage } color="secondary" shape="rounded"/>
                        </Grid>
                    </Grid>
                </TabPanel>
            </TabContext>
        </>
    )
}
