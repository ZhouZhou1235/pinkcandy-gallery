import { TabContext, TabPanel } from "@mui/lab";
import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { ArtworkForm } from "../component/form/ArtworkForm";
import { BoardForm } from "../component/form/BoardForm";
import { PageTitle } from "../vars/ConstVars";
import { RoomForm } from "../component/form/RoomForm";

export function Add(){
    const [tabvalue,setTabvalue] = useState('gallery')
    const tabHandleChange = (_event:SyntheticEvent,newTabvalue:string)=>{setTabvalue(newTabvalue)}
    useEffect(()=>{
        document.title = PageTitle.add
    },[])
    return(
        <Box>
            <div className="container">
                <TabContext value={tabvalue}>
                    <Tabs
                        value={tabvalue}
                        onChange={tabHandleChange}
                    >
                        <Tab value="gallery" label="上传作品" />
                        <Tab value="chatzoom" label="创建房间" />
                        <Tab value="board" label="粉糖留言板" />
                    </Tabs>
                    <TabPanel value={'gallery'}><ArtworkForm /></TabPanel>
                    <TabPanel value={'chatzoom'}><RoomForm /></TabPanel>
                    <TabPanel value={'board'}><BoardForm /></TabPanel>
                </TabContext>
            </div>
        </Box>
    )
}
