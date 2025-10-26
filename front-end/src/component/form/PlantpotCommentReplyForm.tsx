import { Button, Textarea } from "@mui/joy"
import { Box, Snackbar } from "@mui/material"
import { useState } from "react"
import { postRequest } from "../../utils/HttpRequest"
import { urls } from "../../vars/urls"

export function PlantpotCommentReplyForm({commentid=''}){
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    const [commentForm,setCommentForm] = useState({content: '',id:commentid})
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    function sendPlantpotCommentReply(){
        postRequest(urls.sendPlantpotCommentReply,commentForm).then(res=>{
            if(res==1){
                commentForm.content = ''
                setCommentForm(commentForm)
                setSnackbarMessage('已贴叶纸条')
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
                placeholder="贴叶纸条......"
                onChange={(e)=>{
                    commentForm.content = e.target.value
                    setCommentForm(commentForm)
                }}
                minRows={2}
                maxRows={4}
                startDecorator={
                    <Box sx={{ display:'flex',gap:0.5,flex:1 }}>
                        叶纸条
                    </Box>
                }
                endDecorator={
                    <Button variant="outlined" sx={{ ml: 'auto' }} onClick={sendPlantpotCommentReply}>
                        发送
                    </Button>
                }
                sx={{ mt: 2 }}
            />
        </>
    )
}
