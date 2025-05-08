import { Box, Button, Textarea } from "@mui/joy";
import { useState } from "react";
import { postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";
import { Snackbar } from "@mui/material";

export function PlantpotCommentForm({gardenid=''}){
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    const [commentForm,setCommentForm] = useState({content: '',id:gardenid})
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    function sendCommentPlantpot(){
        postRequest(urls.sendCommentPlantpot,commentForm).then(res=>{
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
                    <Box sx={{ display:'flex',gap:0.5,flex:1 }}>
                        叶子
                    </Box>
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
