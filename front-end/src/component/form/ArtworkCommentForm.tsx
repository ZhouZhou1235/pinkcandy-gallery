import { Box, Button, Textarea } from "@mui/joy";
import { useState } from "react";
import { postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";
import { Snackbar } from "@mui/material";

export function ArtworkCommentForm({galleryid='',onUpdate=function(){} as any}){
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
                onUpdate()
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
                placeholder="输入评论......"
                value={commentForm.content}
                onChange={(e)=>{
                    setCommentForm({content:e.target.value,id:commentForm.id})
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
                sx={{ mt: 2 }}
            />
        </>
    )
}
