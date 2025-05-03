import { Box } from "@mui/material";
import { Footer } from "../component/Footer";
import { DefaultObj, GArea, PageTitle } from "../vars/ConstVars";
import { ArtworkPreview } from "../component/ArtworkPreview";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { toNormalDate } from "../utils/tools";
import { Spin } from "antd";

export function Home(){
    const [loading,setLoading] = useState(true)
    const [homedata,setHomedata] = useState(DefaultObj.homedata)
    const [boardItems,setBoardItems] = useState([<span key={1}></span>])
    const [artworkItems,setArtworkItems] = useState([<span key={1}></span>])
    useEffect(()=>{
        document.title = PageTitle.home
        loadHomeData()
    },[])
    async function loadHomeData(){
        let theBoardItems = [<span key={1}></span>]
        let theArtworkItems = [<span key={1}></span>]
        await getRequest(urls.getTopInfo).then(x=>{
            if(typeof x=='string'){homedata.topInfo=x}
        })
        await getRequest(urls.getBoradMessages+'?num='+GArea.defaultShowNum).then(x=>{
            if(typeof x=='object'){
                let boardMessages :any[] = x
                homedata.board = boardMessages
                theBoardItems = homedata.board.map(item=>
                    <div className="list-group-item" key={item.id}>
                        <strong>{ item.user.name }</strong> { item.content }
                        <br />
                        <small>{ toNormalDate(item.time) }</small>
                    </div>
                )
            }
        })
        await getRequest(urls.getArtworks+'?num='+GArea.defaultShowNum).then(x=>{
            if(typeof x=='object'){
                let artworks :any[] = x
                homedata.artworks = artworks
                theArtworkItems = homedata.artworks.map(item=>
                    <div className="col-sm-3" key={item.id}>
                        <ArtworkPreview artworkdata={item}/>
                    </div>
                )
            }
        })
        setHomedata(homedata)
        setBoardItems(theBoardItems)
        setArtworkItems(theArtworkItems)
        setLoading(false)
    }
    return(
        <Box sx={{ mt: 2 }}>
            <Spin spinning={loading} fullscreen />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="container" dangerouslySetInnerHTML={{__html:homedata.topInfo}} />
                        <div className="container moblieHideBox">
                            <ul className="list-group list-group-flush">
                                { boardItems }
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="row text-center">
                            { artworkItems }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Box>
    )
}
