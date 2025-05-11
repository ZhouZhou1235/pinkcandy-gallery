import { Box, Grid, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { Spin } from "antd";
import { GArea, PageTitle } from "../vars/ConstVars";
import { Footer } from "../component/Footer";
import { PlantpotPreview } from "../component/plantpot/PlantpotPreview";
import { PlantpotFirst } from "../component/plantpot/PlantpotFirst";

export function Garden(){
    const [gardenPage,setGardenPage] = useState(1)
    const [loading,setLoading] = useState(true)
    const [plantpotItems,setPlantpotItems] = useState([<span key={1}></span>])
    const [firstplantpotItem,setFirstplantpotItem] = useState(<></>)
    function updateGardenPage(_event:any,value:number){
        getRequest(urls.getPlantpots+`?num=${GArea.defaultShowNum}&begin=${(value-1)*GArea.defaultShowNum}`).then(data=>{
            if(data!=0){
                let plantpots :any[] = data
                let thePlantpotItems = plantpots.map(item=>
                    <div className="p-2" key={item.id}>
                        <PlantpotPreview plantpotdata={item}/>
                    </div>
                )
                setPlantpotItems(thePlantpotItems)
                if(plantpots.length>0){
                    setFirstplantpotItem(<PlantpotFirst plantpotdata={plantpots[0]}/>)
                }
            }
        })
    }
    async function loadData(){
        let thePlantpotItems = [<span key={1}></span>]
        await getRequest(urls.getPlantpots+'?num='+GArea.defaultShowNum).then(x=>{
            if(typeof x=='object'){
                let plantpots :any[] = x
                thePlantpotItems = plantpots.map(item=>
                    <div className="p-2" key={item.id}>
                        <PlantpotPreview plantpotdata={item}/>
                    </div>
                )
                if(plantpots.length>0){
                    setFirstplantpotItem(<PlantpotFirst plantpotdata={plantpots[0]}/>)
                }
            }
        })
        await getRequest(urls.getDBRecordCount+'?table=garden').then(count=>{
            let pageNum = Math.round(count/GArea.defaultShowNum)+1
            setGardenPage(pageNum)
        })
        setPlantpotItems(thePlantpotItems)
        setLoading(false)
    }
    useEffect(()=>{
        document.title = PageTitle.garden
        loadData()
    },[])
    return(
        <>
            <Spin spinning={loading} fullscreen />
            <Box sx={{mt:2}}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 moblieHideBox">
                            {firstplantpotItem}
                        </div>
                        <div className="col-sm-4">
                            {plantpotItems}
                            <Grid container spacing={2} minHeight={50}>
                                <Grid display="flex" justifyContent="center" alignItems="center">
                                    <Pagination count={gardenPage} onChange={ updateGardenPage } color="primary" shape="rounded"/>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </Box>
            <Footer />
        </>
    )
}
