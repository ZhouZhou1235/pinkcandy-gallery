import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { postRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { DefaultObj } from "../vars/ConstVars";
import { tagtypeNumToColorString } from "../utils/tools";

export function DeleteTagButton({tagdata=DefaultObj.tagdata}){
    const [open,setOpen] = useState(false)
    const [btnDisabled,setBtnDisabled] = useState(false)
    function deleteArtwork(){
        setOpen(false)
        postRequest(urls.deleteTag,{id:tagdata.id}).then(res=>{
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
                disabled={btnDisabled || tagdata.usenum>10}
            >
                {!btnDisabled?'删除':'已删除'}
            </Button>
            <Dialog open={open} fullWidth>
                <DialogTitle>删除标签</DialogTitle>
                <DialogContent>
                    <h2>即将删除<span style={{color:tagtypeNumToColorString(Number(tagdata.type))}}>{tagdata.tag}</span></h2>
                    <p>包括所有媒体使用了此标签的标记</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>取消</Button>
                    <Button color="error" onClick={deleteArtwork}>确认删除</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
