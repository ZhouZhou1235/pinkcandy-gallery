import { TabContext, TabPanel } from "@mui/lab";
import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { ArtworkForm } from "../component/ArtworkForm";
import { PlantpotForm } from "../component/PlantpotForm";

export function Add(){
    const [tabvalue,setTabvalue] = useState('gallery')
    const tabHandleChange = (_event:SyntheticEvent,newTabvalue:string)=>{setTabvalue(newTabvalue)}
    return(
        <Box>
            <div className="container">
                <TabContext value={tabvalue}>
                    <Tabs
                        value={tabvalue}
                        onChange={tabHandleChange}
                    >
                        <Tab value="gallery" label="上传作品" />
                        <Tab value="garden" label="种植盆栽" />
                        <Tab value="board" label="粉糖留言板" />
                    </Tabs>
                    <TabPanel value={'gallery'}><ArtworkForm /></TabPanel>
                    <TabPanel value={'garden'}><PlantpotForm /></TabPanel>
                    <TabPanel value={'board'}>3</TabPanel>
                </TabContext>
            </div>
        </Box>
    )
}
