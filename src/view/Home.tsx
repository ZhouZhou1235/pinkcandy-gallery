import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Footer } from "../component/Footer";
import { DefaultObj, GArea, PageTitle } from "../vars/ConstVars";
import { ArtworkPreview } from "../component/ArtworkPreview";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { toNormalDate } from "../utils/tools";
import { Spin } from "antd";
import { Link } from "react-router";
import { PlantpotPreview } from "../component/PlantpotPreview";
import { PlantpotCommentList } from "../component/PlantpotCommentList";

export function Home(){
    const [loading,setLoading] = useState(true)
    const [homedata,setHomedata] = useState(DefaultObj.homedata)
    const [boardItems,setBoardItems] = useState([<span key={1}></span>])
    const [artworkItems,setArtworkItems] = useState([<span key={1}></span>])
    const [firstPlantpot,setFirstPlantpot] = useState(<></>)
    async function loadHomeData(){
        let theBoardItems = [<span key={1}></span>]
        let theArtworkItems = [<span key={1}></span>]
        let theFirstPlantpot = <></>
        await getRequest(urls.getTopInfo).then(x=>{if(typeof x=='string'){homedata.topInfo=x}})
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
                    <div className="col-sm-3" key={item.id}>
                        <ArtworkPreview artworkdata={item}/>
                    </div>
                )
            }
        })
        await getRequest(urls.getPlantpots).then(async x=>{
            if(typeof x=='object'){
                let plantpots :any[] = x
                if(plantpots.length>0){
                    let plantpot = plantpots[0]
                    homedata.firstPlantpot = plantpot
                    let item = homedata.firstPlantpot
                    theFirstPlantpot = (
                        <>
                            <PlantpotPreview plantpotdata={item}/>
                            <PlantpotCommentList gardenid={item.id}/>
                        </>
                    )
                }
            }
        })
        setHomedata(homedata)
        setBoardItems(theBoardItems)
        setArtworkItems(theArtworkItems)
        setFirstPlantpot(theFirstPlantpot)
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
                    <div className="col-sm-3">
                        <div className="container" dangerouslySetInnerHTML={{__html:homedata.topInfo}} />
                        <div className="container moblieHideBox">
                            <ul className="list-group list-group-flush">
                                { boardItems }
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="container moblieHideBox">
                            { firstPlantpot }
                        </div>
                    </div>
                    <div className="col-sm-6">
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
