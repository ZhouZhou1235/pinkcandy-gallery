import { Box, Grid, Pagination } from "@mui/material";
import { JSX, useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { DefaultObj, GArea, PageTitle } from "../vars/ConstVars";
import { ArtworkPreview } from "../component/artwork/ArtworkPreview";
import { objSortBy } from "../utils/tools";
import { TagList } from "../component/TagList";

export function Gallery(){
    const [galleryPage,setGalleryPage] = useState(1)
    const [artworkItems,setArtworkItems] = useState([] as JSX.Element[])
    const [searchText,setSearchText] = useState('')
    const [searchArtworkItems,setSearchArtworkItems] = useState([] as JSX.Element[])
    const [toptagdata,setToptagdata] = useState(DefaultObj.tagArray)
    async function searchArtworks(){
        if(!searchText.trim()){
            setSearchArtworkItems([])
            return
        }
        let searchResult :any = await getRequest(urls.searchPinkCandy+`?searchtext=${searchText}`)
        if(searchResult && searchResult.artwork){
            let theSearchArtworkItems = searchResult.artwork.map((item:any)=>
                <div className="col-sm-3 p-2" key={item.id}>
                    <ArtworkPreview artworkdata={item}/>
                </div>
            )
            setSearchArtworkItems(theSearchArtworkItems)
        } else {
            setSearchArtworkItems([])
        }
    }
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
        await getRequest(urls.getTags+`?num=${GArea.defaultShowNum*100}`).then(data=>{
            if(data!=0){
                let tagList :any[] = data
                tagList.sort(objSortBy('usenum',true))
                tagList.splice(GArea.defaultShowNum*5)
                setToptagdata(data)
            }
        })
    }
    useEffect(()=>{
        document.title = PageTitle.gallery
        loadData()
    },[])
    return(
        <>
            <Box>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 p-2">
                            <h2>画廊</h2>
                            <div className="input-group mt-2 mb-2">
                                <input
                                    className="form-control"
                                    placeholder="搜索作品....."
                                    value={searchText}
                                    onChange={e=>setSearchText(e.target.value)}
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={searchArtworks}
                                >
                                    搜索
                                </button>
                            </div>
                            <TagList tagArray={toptagdata}/>
                        </div>
                        <div className="col-sm-8 p-2">
                            {searchArtworkItems.length>0?(
                                <div>
                                    <p>搜索 {searchText} ......</p>
                                    <div className="row">
                                        {searchArtworkItems}
                                    </div>
                                </div>
                            ):(
                                <div>
                                    <div className="row">
                                        {artworkItems}
                                    </div>
                                    <Grid container spacing={2} minHeight={50} sx={{mt: 2}}>
                                        <Grid display="flex" justifyContent="center" alignItems="center" width="100%">
                                            <Pagination 
                                                count={galleryPage} 
                                                onChange={updateGalleryPage} 
                                                color="primary" 
                                                shape="rounded"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Box>
        </>
    )
}
