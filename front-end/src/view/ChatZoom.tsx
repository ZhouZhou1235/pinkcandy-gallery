import { Textarea } from "@mui/joy";
import { Accordion, AccordionSummary, Box, Button, Typography } from "@mui/material";
import { Avatar } from "antd";
import { DefaultObj, GArea, ws_system } from "../vars/ConstVars";
import { useEffect, useState } from "react";
import { sendDataToWebSocketServer } from "../utils/WebSocket";
import { getMessageEventData } from "../utils/tools";
import { getRequest, postRequest } from "../utils/HttpRequest";
import { socket_http_urls, urls } from "../vars/urls";
import { useParams } from "react-router";
import { JoinRoomButton } from "../component/chat/JoinRoomButton";

function createWebSocketConnection(){
    let connection = new WebSocket(ws_system)
    connection.onmessage = e=>{
        console.log(getMessageEventData(e))
    }
    return connection
}

const connection = createWebSocketConnection()

function ChatZoom(){
    const {id} = useParams<{id:string}>()
    const [sessionId,setSessionId] = useState('')
    const [enable,setEnable] = useState(false)
    const [messageForm,setMessageForm] = useState(DefaultObj.socketSendData)
    const [roomData,setRoomData] = useState(DefaultObj.roomData)
    useEffect(()=>{
        (async()=>{
            let theUser = await getRequest(urls.getSessionUser)
            if(theUser){
                let theSessionId = await postRequest(urls.getSessionId)
                let theRoomData = await getRequest(socket_http_urls.getRoom+'?id='+id)
                setSessionId(theSessionId)
                setRoomData(theRoomData[0])
                setMessageForm({
                    action:'send_message',
                    cookie:theSessionId,
                    data:''
                })
                setEnable(true)
            }
        })()
    },[])
    return(
        <Box>
            <div className="container p-2">
                <div className="row">
                    <div className="col-sm-8">
                        <div className="text-center">
                            <Accordion>
                                <AccordionSummary
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                <Typography component="span"><h2>{roomData.name} <JoinRoomButton id={id}/></h2></Typography>
                                </AccordionSummary>
                                <p className="p-2" style={{whiteSpace:'pre-line'}}>{roomData.info}</p>
                            </Accordion>
                        </div>
                        <ul className="list-group list-group-flush p-2">
                            <li className="list-group-item" style={{color:'blue'}}>
                                <Avatar
                                    shape="square"
                                    size={50}
                                    alt="headimage"
                                    src={GArea.defaultHeadimage}
                                />
                                <strong>用户A</strong>
                                <br />
                                <small>性别 兽种 发送时间</small>
                                <br />
                                有颜色表示自己的消息
                            </li>
                            <li className="list-group-item">
                                <Avatar
                                    shape="square"
                                    size={50}
                                    alt="headimage"
                                    src={GArea.defaultHeadimage}
                                />
                                <strong>用户B</strong>
                                <br />
                                <small>性别 兽种 发送时间</small>
                                <br />
                                列表消息使用SOCKET更新 不是HTTP
                            </li>
                            <li className="list-group-item">
                                <Avatar
                                    shape="square"
                                    size={50}
                                    alt="headimage"
                                    src={GArea.defaultHeadimage}
                                />
                                <strong>用户C</strong>
                                <br />
                                <small>性别 兽种 发送时间</small>
                                <br />
                                aaa bbb ccc <br /> 需支持换行显示
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-4">
                        <ul className="list-group list-group-flush p-2">
                            <li className="list-group-item" style={{color:'red'}}>
                                <Avatar
                                    shape="square"
                                    size={50}
                                    alt="headimage"
                                    src={GArea.defaultHeadimage}
                                />
                                <strong>房主</strong>
                            </li>
                            <li className="list-group-item" style={{color:'green'}}>
                                <Avatar
                                    shape="square"
                                    size={50}
                                    alt="headimage"
                                    src={GArea.defaultHeadimage}
                                />
                                <strong>用户A</strong>
                            </li>
                            <li className="list-group-item" style={{color:'green'}}>
                                <Avatar
                                    shape="square"
                                    size={50}
                                    alt="headimage"
                                    src={GArea.defaultHeadimage}
                                />
                                <strong>用户B</strong>
                            </li>
                            <li className="list-group-item" style={{color:'gray'}}>
                                <Avatar
                                    shape="square"
                                    size={50}
                                    alt="headimage"
                                    src={GArea.defaultHeadimage}
                                    
                                />
                                <strong>用户C</strong>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="fixed-bottom">
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
                                    data:e.target.value
                                })
                            }}
                            minRows={1}
                            maxRows={10}
                            endDecorator={
                                <Button variant="outlined" sx={{ ml: 'auto' }} disabled={!enable} onClick={()=>{
                                    sendDataToWebSocketServer(connection,messageForm)
                                    setMessageForm({
                                        action:'send_message',
                                        cookie:sessionId,
                                        data:''
                                    })
                                }}>
                                    发送
                                </Button>
                            }
                            sx={{ mt: 2 }}
                        />
                    </Accordion>
                </div>
            </div>
        </Box>
    )
}

export default ChatZoom
