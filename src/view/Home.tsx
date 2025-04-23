import { Box } from "@mui/material";
import { Footer } from "../component/Footer";
import { DefaultObj, GArea } from "../vars/ConstVars";
import { ArtworkPreview } from "../component/ArtworkPreview";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { TagListItem } from "../component/TagListItem";

export function Home(){
    const [homedata,setHomedata] = useState(DefaultObj.homedata)
    const [artworkItems,setArtworkItems] = useState([<span key={1}></span>])
    const [tagItems,setTagItems] = useState([<span key={1}></span>])
    useEffect(()=>{
        // 获取作品后展示
        getRequest(urls.getArtworks+'?num='+GArea.defaultShowNum).then(x=>{
            if(typeof x=='object'){
                let artworks :any[] = x
                homedata.artworks = artworks
                let items = homedata.artworks.map(item=>
                    <div className="col-sm-3" key={item.id}>
                        <ArtworkPreview artworkdata={item}/>
                    </div>
                )
                setHomedata(homedata)
                setArtworkItems(items)
            }
        })
        // 获取标签后展示
        getRequest(urls.getTags+'?num='+GArea.defaultGetNum).then(x=>{
            if(typeof x=='object'){
                let tags :any[] = x
                homedata.tags = tags
                let items = homedata.tags.map(item=><TagListItem data={item} key={item.id} />)
                setHomedata(homedata)
                setTagItems(items)
            }
        })
    },[])
    return(
        <Box sx={{ mt: 2 }}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>画廊</h2>
                        <div className="row">
                            { artworkItems }
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <h2>花园</h2>
                        <div>
                            展示最新的盆栽以及最近叶子
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <h2>标签</h2>
                        <ul className="list-group list-group-flush">
                            { tagItems }
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </Box>
    )
}
