import { Button, Textarea } from "@mui/joy";
import { useState } from "react";
import { postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";
import { Snackbar } from "@mui/material";
import { objToFormdata } from "../../utils/tools";

export function PlantpotCommentForm({gardenid=''}){
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    const [commentForm,setCommentForm] = useState({content: '',id:gardenid,file:'' as any})
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    function sendCommentPlantpot(){
        postRequest(urls.sendCommentPlantpot,objToFormdata(commentForm),{'Content-Type':'mutipart/form-data'}).then(res=>{
            if(res==1){
                commentForm.content = ''
                setCommentForm(commentForm)
                setSnackbarMessage('已生长叶子')
                setSnackbarOpen(true)
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
            <Textarea
                placeholder="生长叶子......"
                onChange={(e)=>{
                    commentForm.content = e.target.value
                    setCommentForm(commentForm)
                }}
                minRows={4}
                maxRows={8}
                startDecorator={
                    <div className="input-group input-group-sm">
                        <label className="input-group-text">附图</label>
                        <input type="file" className="form-control" name="file" id="arkworkFile" onChange={(e)=>{
                            let list:FileList|null = e.target.files
                            if(list){commentForm.file = list[0]}
                            setCommentForm(commentForm)
                        }} />
                    </div>
                }
                endDecorator={
                    <Button variant="outlined" sx={{ ml: 'auto' }} onClick={sendCommentPlantpot}>
                        生长
                    </Button>
                }
                sx={{ mt: 2 }}
            />
        </>
    )
}
