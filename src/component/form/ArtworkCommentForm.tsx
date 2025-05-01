import { Box, Button, Textarea } from "@mui/joy";
import { useState } from "react";
import { postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";
import { Snackbar } from "@mui/material";

export function ArtworkCommentForm({galleryid=''}){
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    const [commentForm,setCommentForm] = useState({content: '',id:galleryid})
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    function sendCommentArtwork(){
        postRequest(urls.sendCommentArtwork,commentForm).then(res=>{
            if(res==1){
                commentForm.content = ''
                setCommentForm(commentForm)
                setSnackbarMessage('已发送评论')
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
                placeholder="作品感觉如何......"
                onChange={(e)=>{
                    commentForm.content = e.target.value
                    setCommentForm(commentForm)
                }}
                minRows={4}
                maxRows={8}
                startDecorator={
                    <Box sx={{ display:'flex',gap:0.5,flex:1 }}>
                        评论
                    </Box>
                }
                endDecorator={
                    <Button variant="outlined" sx={{ ml: 'auto' }} onClick={sendCommentArtwork}>
                        发送
                    </Button>
                }
                sx={{ minWidth: 300,mt: 2 }}
            />
        </>
    )
}
