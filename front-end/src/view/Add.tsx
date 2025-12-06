import { TabContext, TabPanel } from "@mui/lab";
import { Box, Tab, Tabs, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { ArtworkForm } from "../component/form/ArtworkForm";
import { BoardForm } from "../component/form/BoardForm";
import { PageTitle } from "../vars/ConstVars";
import { RoomForm } from "../component/form/RoomForm";

export function Add(){
    const [tabvalue, setTabvalue] = useState('gallery');
    const [pendingTabValue, setPendingTabValue] = useState<string|null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const tabHandleChange = (_event: SyntheticEvent, newTabvalue: string)=>{
        setPendingTabValue(newTabvalue)
        setOpenDialog(true)
    }
    const handleConfirmSwitch = ()=>{
        if(pendingTabValue){setTabvalue(pendingTabValue)}
        handleCloseDialog()
    }
    const handleCloseDialog = ()=>{
        setOpenDialog(false)
        setPendingTabValue(null)
    }
    useEffect(()=>{
        document.title = PageTitle.add
    }, []);
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
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        确认切换
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            确定切换到其他选项？
                            若有未完成的更改则会丢失
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>取消</Button>
                        <Button onClick={handleConfirmSwitch} autoFocus>
                            确定
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Box>
    );
}
