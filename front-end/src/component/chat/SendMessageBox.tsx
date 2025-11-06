import { Textarea } from "@mui/joy";
import { Accordion, AccordionSummary, Button, Typography } from "@mui/material";
import { DefaultObj } from "../../vars/ConstVars";
import { sendDataToWebSocketServer } from "../../utils/WebSocket";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export function SendMessageForm({connection=null as WebSocket|null,sessionId='',roomdata=DefaultObj.roomData,disabled=false}){
    const [messageContent,setMessageContent] = useState('')
    const handleSendMessage = ()=>{
        if (messageContent.trim()=='') return
        let messageForm = DefaultObj.socketSendData
        messageForm = {
            action: 'send_message',
            cookie: sessionId,
            data: {
                id: roomdata.id,
                content: messageContent
            }
        }
        if(connection){
            sendDataToWebSocketServer(connection,messageForm)
        }
        setMessageContent('')
    }
    return(
        <div className="position-fixed bottom-0 start-0 end-0">
            <div className="container p-2">
                <Accordion 
                    sx={{ 
                        border: '1px solid rgba(0,0,0,0.1)',
                        borderRadius: 1,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        '&:before': { display: 'none' },
                        background: 'rgba(250,250,250,0.5)'
                    }}
                >
                    <AccordionSummary
                        aria-controls="sendMessageFrom-content"
                        id="sendMessageFrom-header"
                    >
                        <Typography component="span" fontWeight="500" color="text.primary" sx={{opacity: 0.75}}>
                            <FontAwesomeIcon icon={faPaperPlane}/> 发送消息
                        </Typography>
                    </AccordionSummary>
                    <Textarea
                        disabled={disabled}
                        value={messageContent}
                        onChange={e=>setMessageContent(e.target.value)}
                        minRows={5}
                        maxRows={10}
                        variant="outlined"
                        placeholder="......"
                        sx={{
                            border: 'none',
                            '& .MuiTextarea-textarea': {
                                padding: 1.5
                            }
                        }}
                        endDecorator={
                            <div className="d-flex justify-content-end p-1 bg-light">
                                <Button 
                                    variant="contained" 
                                    size="small"
                                    onClick={handleSendMessage}
                                    disabled={messageContent.trim()==''}
                                    sx={{ 
                                        borderRadius: 1.5,
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        px: 2,
                                        py: 0.5
                                    }}
                                >
                                    发送
                                </Button>
                            </div>
                        }
                    />
                </Accordion>
            </div>
        </div>
    )
}
