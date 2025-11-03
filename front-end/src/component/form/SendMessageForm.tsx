import { Textarea } from "@mui/joy";
import { Accordion, AccordionSummary, Button, Typography } from "@mui/material";
import { DefaultObj, ws_system } from "../../vars/ConstVars";
import { sendDataToWebSocketServer } from "../../utils/WebSocket";
import { useState } from "react";

export function SendMessageForm({connection=new WebSocket(ws_system),sessionId='',room_id=''}){
    const [messageForm,setMessageForm] = useState(DefaultObj.socketSendData)
    return(
        <div className="container p-2">
            <Accordion style={{background: 'lavender'}}>
                <AccordionSummary
                    aria-controls="sendMessageFrom-content"
                    id="sendMessageFrom-header"
                >
                    <Typography component="span">发言</Typography>
                </AccordionSummary>
                <Textarea
                    onChange={e=>{
                        setMessageForm({
                            action:'send_message',
                            cookie:sessionId,
                            data:{
                                id:room_id,
                                content: e.target.value
                            }
                        })
                    }}
                    minRows={4}
                    maxRows={8}
                    endDecorator={
                        <Button variant="outlined" sx={{ ml: 'auto' }} onClick={()=>{
                            sendDataToWebSocketServer(connection,messageForm)
                            setMessageForm({
                                action:'send_message',
                                cookie:sessionId,
                                data:{
                                    id:room_id,
                                    content: ''
                                }
                            })
                        }}>
                            发送
                        </Button>
                    }
                    sx={{ mt: 2 }}
                />
            </Accordion>
        </div>
    )
}
