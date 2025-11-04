import { Button, Card, CardContent, FormControl, FormLabel, Snackbar, Typography } from "@mui/material";
import { Textarea,Input } from '@mui/joy';
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../utils/HttpRequest";
import { socket_http_urls, urls } from "../../vars/urls";
import { DefaultObj } from "../../vars/ConstVars";

export function EditRoomForm({id=''}){
    const [snackbarMessage,setSnackbarMessage] = useState('')
    const [snackbarOpen,setSnackbarOpen] = useState(false)
    const [roomdata,setRoomdata] = useState(DefaultObj.roomData)
    const [editRoomForm,setEditRoomForm] = useState({
        sessionId: '',
        id: id,
        name: '',
        info: '',
    })
    function closeSnackbar(){setSnackbarOpen(false);setSnackbarMessage('')}
    function editRoom(){
        postRequest(socket_http_urls.editRoom,editRoomForm).then(res=>{
            if(res!=0){
                setSnackbarMessage('房间信息已修改')
                setSnackbarOpen(true)
            }
        })
    }
    async function loadData(){
        let theEditRoomForm = editRoomForm
        let roomdata :any = (await getRequest(socket_http_urls.getRoom+'?id='+id))[0]
        let sessionId = await postRequest(urls.getSessionId)
        theEditRoomForm.sessionId = sessionId
        theEditRoomForm.id = roomdata.id
        theEditRoomForm.name = roomdata.name
        theEditRoomForm.info = roomdata.info
        setRoomdata(roomdata)
        setEditRoomForm(theEditRoomForm)
    }
    useEffect(()=>{
        loadData()
    },[id])
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
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className="OnelineTextBox">
                        { roomdata.name }
                    </Typography>
                    <p style={{whiteSpace:'pre-line'}}>{roomdata.info}</p>
                </CardContent>
            </Card>
            <FormControl fullWidth>
                <FormLabel>房间名</FormLabel>
                <Input
                    placeholder={editRoomForm.name}
                    onChange={(e)=>{
                        editRoomForm.name = e.target.value
                        setEditRoomForm(editRoomForm)
                    }}
                />
                <FormLabel>房主说明</FormLabel>
                <Textarea placeholder={editRoomForm.info} minRows={4} onChange={(e)=>{
                    editRoomForm.info = e.target.value
                    setEditRoomForm(editRoomForm)
                }} />
                <Button sx={{mt:2}} onClick={editRoom} variant="outlined" color="warning">修改</Button>
            </FormControl>
        </>
    )
}
