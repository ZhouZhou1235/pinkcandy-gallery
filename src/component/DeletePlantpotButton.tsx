import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { postRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";

export function DeletePlantpotButton({gardenid=''}){
    const [open,setOpen] = useState(false)
    const [btnDisabled,setBtnDisabled] = useState(false)
    function deletePlantpot(){
        setOpen(false)
        postRequest(urls.deletePlantpot,{id:gardenid}).then(res=>{
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
                <DialogTitle>删除盆栽</DialogTitle>
                <DialogContent>
                    <h2>这将删除该盆栽，操作不能撤回！</h2>
                    <h3>包括叶子 叶纸条等一切互动数据</h3>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>取消</Button>
                    <Button color="error" onClick={deletePlantpot}>确认删除</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
