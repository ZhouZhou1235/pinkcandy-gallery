import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { EditUserForm } from "./form/EditUserForm";
import { TabContext, TabPanel } from "@mui/lab";
import { EditUserImportantForm } from "./form/EditUserImportantForm";
import { EditUserImageForm } from "./form/EditUserImageForm";
import { useNavigate } from "react-router";
import { postRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";

export function EditUserDialog(){
    const navigate = useNavigate()
    const [tabvalue,setTabvalue] = useState('editUser')
    const tabHandleChange = (_event:SyntheticEvent,newTabvalue:string)=>{setTabvalue(newTabvalue)}
    const [open,setOpen] = useState(false)
    function openDialog(){setOpen(true)}
    function closeDialog(){setOpen(false)}
    function logout(){
        postRequest(urls.logout).then(res=>{
            if(typeof res=='number'){if(res==1){
                navigate('/')
                location.reload()
            }}
        })
    }
    return(
        <>
            <Button onClick={openDialog} color="warning">设置</Button>
            <Dialog open={open} fullWidth>
                <DialogTitle>设置</DialogTitle>
                <DialogContent>
                    <TabContext value={tabvalue}>
                        <Tabs
                            value={tabvalue}
                            onChange={tabHandleChange}
                        >
                            <Tab value="editUser" label="修改信息" />
                            <Tab value="editUserImportant" label="修改关键信息" />
                            <Tab value="editUserImage" label="更换图片" />
                        </Tabs>
                        <TabPanel value={'editUser'}><EditUserForm /></TabPanel>
                        <TabPanel value={'editUserImportant'}><EditUserImportantForm /></TabPanel>
                        <TabPanel value={'editUserImage'}><EditUserImageForm /></TabPanel>
                    </TabContext>
                </DialogContent>
                <DialogActions>
                    <Button onClick={logout} color="warning">退出登录</Button>
                    <Button onClick={closeDialog}>关闭</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
