import { Box, Grid, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { Spin } from "antd";
import { GArea, PageTitle } from "../vars/ConstVars";
import { ArtworkPreview } from "../component/ArtworkPreview";
import { Footer } from "../component/Footer";

export function Gallery(){
    const [galleryPage,setGalleryPage] = useState(1)
    const [loading,setLoading] = useState(true)
    const [artworkItems,setArtworkItems] = useState([<span key={1}></span>])
    function updateGalleryPage(_event:any,value:number){
        getRequest(urls.getArtworks+`?num=${GArea.defaultShowNum}&begin=${(value-1)*GArea.defaultShowNum}`).then(data=>{
            if(data!=0){
                let artworks :any[] = data
                let theArtworkItems = artworks.map(item=>
                    <div className="col-sm-3" key={item.id}>
                        <ArtworkPreview artworkdata={item}/>
                    </div>
                )
                setArtworkItems(theArtworkItems)
            }
        })
    }
    async function loadData(){
        let theArtworkItems = [<span key={1}></span>]
        await getRequest(urls.getArtworks+'?num='+GArea.defaultShowNum).then(x=>{
            if(typeof x=='object'){
                let artworks :any[] = x
                theArtworkItems = artworks.map(item=>
                    <div className="col-sm-3" key={item.id}>
                        <ArtworkPreview artworkdata={item}/>
                    </div>
                )
            }
        })
        await getRequest(urls.getDBRecordCount+'?table=gallery').then(count=>{
            let pageNum = Math.floor(count/GArea.defaultShowNum)+1
            setGalleryPage(pageNum)
        })
        setArtworkItems(theArtworkItems)
        setLoading(false)
    }
    useEffect(()=>{
        document.title = PageTitle.gallery
        loadData()
    },[])
    return(
        <>
            <Box sx={{mt:2}}>
                <Spin spinning={loading} fullscreen />
                <div className="container text-center">
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
