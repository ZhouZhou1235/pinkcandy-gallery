import { Textarea } from "@mui/joy";
import { Accordion, AccordionSummary, Button, Typography } from "@mui/material";
import { DefaultObj } from "../../vars/ConstVars";
import { sendDataToWebSocketServer } from "../../utils/WebSocket";
import { useState } from "react";

export function SendMessageForm({connection=null as WebSocket|null,sessionId='',room_id=''}){
    const [messageContent,setMessageContent] = useState('')
    const handleSendMessage = ()=>{
        if (messageContent.trim()=='') return
        let messageForm = DefaultObj.socketSendData
        messageForm = {
            action: 'send_message',
            cookie: sessionId,
            data: {
                id: room_id,
                content: messageContent
            }
        }
        if(connection){
            sendDataToWebSocketServer(connection,messageForm)
        }
        setMessageContent('')
    }
    return(
        <div className="container p-2">
            <Accordion style={{background:'rgba(50,150,200,0.25)'}}>
                <AccordionSummary
                    aria-controls="sendMessageFrom-content"
                    id="sendMessageFrom-header"
                >
                    <Typography component="span" fontWeight="medium">
                        发送消息
                    </Typography>
                </AccordionSummary>
                <Textarea
                    value={messageContent}
                    onChange={e=>setMessageContent(e.target.value)}
                    minRows={5}
                    maxRows={10}
                    variant="outlined"
                    endDecorator={
                        <Button 
                            variant="contained" 
                            size="small"
                            onClick={handleSendMessage}
                            disabled={messageContent.trim()==''}
                            sx={{ borderRadius: 1 }}
                        >
                            发送
                        </Button>
                    }
                />
            </Accordion>
        </div>
    )
}
