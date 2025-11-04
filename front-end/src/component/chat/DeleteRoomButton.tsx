import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { postRequest } from "../../utils/HttpRequest";
import { socket_http_urls, urls } from "../../vars/urls";

export function DeleteRoomButton({id=''}){
    const [open,setOpen] = useState(false)
    const [btnDisabled,setBtnDisabled] = useState(false)
    async function deleteRoom(){
        setOpen(false)
        let theSessionId = await postRequest(urls.getSessionId)
        postRequest(socket_http_urls.deleteRoom,{sessionId:theSessionId,id:id}).then(res=>{
            if(res!=0){setBtnDisabled(true)}
        })
    }
    function openDialog(){
        setOpen(true)
    }
    function closeDialog(){
        setOpen(false)
    }
    return(
        <>
            <Button
                color="error"
                onClick={openDialog}
                variant={btnDisabled?'contained':'text'}
                disabled={btnDisabled}
            >
                {!btnDisabled?'删除':'已删除'}
            </Button>
            <Dialog open={open} fullWidth>
                <DialogTitle>删除房间</DialogTitle>
                <DialogContent>
                    <h2>即将删除该房间，操作不能撤回！</h2>
                    <p>成员解散，消息清空。</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>取消</Button>
                    <Button color="error" onClick={deleteRoom}>确认删除</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
