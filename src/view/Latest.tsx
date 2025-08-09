import { Box } from "@mui/material";
import { Footer } from "../component/Footer";
import { DefaultObj, GArea, PageTitle } from "../vars/ConstVars";
import { ArtworkPreview } from "../component/artwork/ArtworkPreview";
import { JSX, useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { toNormalDate } from "../utils/tools";
import { Spin } from "antd";
import { Link } from "react-router";
import { PlantpotPreview } from "../component/plantpot/PlantpotPreview";

export function Latest(){
    const [loading,setLoading] = useState(true)
    const [homedata,setHomedata] = useState(DefaultObj.homedata)
    const [boardItems,setBoardItems] = useState([] as JSX.Element[])
    const [artworkItems,setArtworkItems] = useState([] as JSX.Element[])
    const [plantpotItems,setPlantpotItems] = useState([] as JSX.Element[])
    async function loadHomeData(){
        let theBoardItems = [] as JSX.Element[]
        let theArtworkItems = [] as JSX.Element[]
        let thePlantpotItems = [] as JSX.Element[]
        await getRequest(urls.getBoradMessages+'?num='+GArea.defaultShowNum).then(x=>{
            if(typeof x=='object'){
                let boardMessages :any[] = x
                homedata.board = boardMessages
                theBoardItems = homedata.board.map(item=>
                    <div className="list-group-item" key={item.id}>
                        <Link to={'/user/'+item.username}>
                            <strong>{ item.user.name }</strong>
                        </Link>
                        &nbsp;
                        { item.content }
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
                    <div className="col-sm-3 p-2" key={item.id}>
                        <ArtworkPreview artworkdata={item}/>
                    </div>
                )
            }
        })
        await getRequest(urls.getPlantpots+'?num='+Math.floor(GArea.defaultShowNum/2)).then(x=>{
            if(typeof x=='object'){
                let plantpots :any[] = x
                homedata.plantpots = plantpots
                thePlantpotItems = homedata.plantpots.map(item=>
                    <div className="p-2" key={item.id}>
                        <PlantpotPreview plantpotdata={item}/>
                    </div>
                )
            }
        })
        setHomedata(homedata)
        setBoardItems(theBoardItems)
        setArtworkItems(theArtworkItems)
        setPlantpotItems(thePlantpotItems)
        setLoading(false)
    }
    useEffect(()=>{
        document.title = PageTitle.home
        loadHomeData()
    },[])
    return(
        <Box sx={{ mt: 2 }}>
            <Spin spinning={loading} fullscreen />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 p-2">
                        <div className="moblieHideBox">
                            <ul className="list-group list-group-flush">
                                { boardItems }
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="moblieHideBox">
                            { plantpotItems }
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="row">
                            { artworkItems }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Box>
    )
}
