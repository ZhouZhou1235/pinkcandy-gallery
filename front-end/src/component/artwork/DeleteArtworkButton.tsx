import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";

export function DeleteArtworkButton({galleryid=''}){
    const [open,setOpen] = useState(false)
    const [btnDisabled,setBtnDisabled] = useState(false)
    function deleteArtwork(){
        setOpen(false)
        postRequest(urls.deleteArtwork,{id:galleryid}).then(res=>{
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
                <DialogTitle>删除作品</DialogTitle>
                <DialogContent>
                    <h2>这将删除该作品，操作不能撤回！</h2>
                    <p>包括印爪 评论等一切互动数据</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>取消</Button>
                    <Button color="error" onClick={deleteArtwork}>确认删除</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
