import { DefaultObj } from "../../vars/ConstVars";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, MenuItem, Select, Snackbar } from "@mui/material";
import { useState } from "react";
import { tagtypeNumToColorString } from "../../utils/tools";
import { Textarea } from "@mui/joy";
import { postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";

export function EditTagForm({tagdata=DefaultObj.tagdata}){
    const [open,setOpen] = useState(false)
    const [editTagForm,setEditTagForm] = useState(tagdata)
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    function openDialog(){setOpen(true)}
    function closeDialog(){setOpen(false)}
    function editTag(){
        postRequest(urls.editTag,editTagForm).then(res=>{
            if(res!=0){
                setOpen(false)
                setSnackbarOpen(true)
                setSnackbarMessage('已修改标签')
            }
        })
    }
    return(
        <>
            <span>
                <Snackbar
                    anchorOrigin={{ vertical:'top',horizontal:'center'}}
                    open={snackbarOpen}
                    message={snackbarMessage}
                    action={(<Button onClick={closeSnackbar}>关闭</Button>)}
                />
            </span>
            <Button onClick={openDialog} color="warning" disabled={tagdata.usenum>20?true:false}>修改</Button>
            <Dialog open={open} fullWidth>
                <DialogTitle>修改标签</DialogTitle>
                <DialogContent>
                    <h3 style={{color:tagtypeNumToColorString(Number(tagdata.type))}}>{tagdata.tag}</h3>
                    <FormControl fullWidth>
                        <Textarea
                            sx={{mt:2}}
                            minRows={4}
                            defaultValue={tagdata.info}
                            onChange={(e)=>{
                                editTagForm.info = e.target.value
                                setEditTagForm(editTagForm)
                            }}
                        />
                        <FormHelperText>描述</FormHelperText>
                        <Select
                            sx={{mt:2}}
                            defaultValue={tagdata.type}
                            onChange={(event)=>{
                                editTagForm.type = event.target.value
                                setEditTagForm(editTagForm)
                            }}
                        >
                            <MenuItem value={'1'}>描述</MenuItem>
                            <MenuItem value={'2'}>作者</MenuItem>
                            <MenuItem value={'3'}>系列</MenuItem>
                            <MenuItem value={'4'}>角色</MenuItem>
                            <MenuItem value={'5'}>兽种</MenuItem>
                        </Select>
                        <FormHelperText>标签类型</FormHelperText>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={editTag} color="warning">确认修改</Button>
                    <Button onClick={closeDialog}>关闭</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
