import { Box, Grid, Pagination } from "@mui/material";
import { JSX, useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { Spin } from "antd";
import { GArea, PageTitle } from "../vars/ConstVars";
import { ArtworkPreview } from "../component/artwork/ArtworkPreview";
import { Footer } from "../component/Footer";

export function Gallery(){
    const [galleryPage,setGalleryPage] = useState(1)
    const [loading,setLoading] = useState(true)
    const [artworkItems,setArtworkItems] = useState([] as JSX.Element[])
    async function updateGalleryPage(_event:any,value:number){
        await getRequest(urls.getArtworks+`?num=${GArea.defaultShowNum}&begin=${(value-1)*GArea.defaultShowNum}`).then(data=>{
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
    async function loadData(){
        await updateGalleryPage(null,1)
        await getRequest(urls.getDBRecordCount+'?table=gallery').then(count=>{
            let pageNum = Math.round(count/GArea.defaultShowNum)+1
            setGalleryPage(pageNum)
        })
        setLoading(false)
    }
    useEffect(()=>{
        document.title = PageTitle.gallery
        loadData()
    },[])
    return(
        <>
            <Spin spinning={loading} fullscreen />
            <Box sx={{mt:2}}>
                <div className="container">
                    <div className="row">
                        {artworkItems}
                    </div>
                    <Grid container spacing={2} minHeight={50}>
                        <Grid display="flex" justifyContent="center" alignItems="center">
                            <Pagination count={galleryPage} onChange={ updateGalleryPage } color="primary" shape="rounded"/>
                        </Grid>
                    </Grid>
                </div>
            </Box>
            <Footer />
        </>
    )
}
