import { Accordion, AccordionSummary, Box, Typography } from "@mui/material";
import { Avatar } from "antd";
import { DefaultObj, GArea, ws_system } from "../vars/ConstVars";
import { JSX, useEffect, useState } from "react";
import { createEventManager, getMessageEventData } from "../utils/tools";
import { getRequest, postRequest } from "../utils/HttpRequest";
import { socket_http_urls, urls } from "../vars/urls";
import { useNavigate, useParams } from "react-router";
import { JoinRoomButton } from "../component/chat/JoinRoomButton";
import { SendMessageForm } from "../component/form/SendMessageForm";


const chatEventManager = createEventManager();

function createWebSocketConnection(){
    let connection = new WebSocket(ws_system)
    connection.onmessage = e=>{
        let echoData = DefaultObj.socketEchoData
        echoData = getMessageEventData(e)
        switch(echoData.type){
            case 'update':
                chatEventManager.emit('update');
                break
            default:
                console.log(echoData)
                break
        }
    }
    return connection
}

const connection = createWebSocketConnection()

function ChatZoom(){
    const navigate = useNavigate()
    const {id} = useParams<{id:string}>()
    const [roomData,setRoomData] = useState(DefaultObj.roomData)
    const [sessionId,setSessionId] = useState('')
    const [messageItems,setMessageItems] = useState([] as JSX.Element[])
    const [memberItems,setMemberItems] = useState([] as JSX.Element[])
    async function updateView(){
        let theRoomData :any[] = await getRequest(socket_http_urls.getRoom+'?id='+id)
        if(theRoomData.length==0){navigate('/notfound');return}
        setRoomData(theRoomData[0])
        let theMemberData :any[] = await getRequest(socket_http_urls.getRoomMembers+'?id='+id)
        let theMemberItems = theMemberData.map(item=>
            <li className="list-group-item" key={item.id}>
                <Avatar
                    shape="square"
                    size={50}
                    alt="headimage"
                    src={GArea.defaultHeadimage}
                />
                <strong>{item.username}</strong>
            </li>
        )
        setMemberItems(theMemberItems)
        let theMessageData :any[] = await getRequest(socket_http_urls.getMessages+'?id='+id)
        let theMessageItems = theMessageData.map(item=>
            <li className="list-group-item" key={item.id}>
                <Avatar
                    shape="square"
                    size={50}
                    alt="headimage"
                    src={GArea.defaultHeadimage}
                />
                <strong>{item.username}</strong>
                <br />
                <small>{item.time}</small>
                <br />
                <p className="p-2" style={{whiteSpace:'pre-line'}}>{item.content}</p>
            </li>
        )
        setMessageItems(theMessageItems)
    }
    useEffect(()=>{
        chatEventManager.on('update',updateView);
        (async()=>{
            let theUser = await getRequest(urls.getSessionUser)
            if(theUser){
                let theSessionId = await postRequest(urls.getSessionId)
                setSessionId(theSessionId)
                updateView()
            }
        })()
    },[])
    return(
        <Box>
            <div className="fixed-bottom">
                <SendMessageForm
                    connection={connection}
                    sessionId={sessionId}
                    room_id={roomData.id}
                />
            </div>
            <div className="container p-2">
                <div className="row">
                    <div className="col-sm-8">
                        <div className="text-center">
                            <h2>{roomData.name} <JoinRoomButton id={id}/></h2>
                            <Accordion>
                                <AccordionSummary
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                <Typography component="span">房主说明</Typography>
                                </AccordionSummary>
                                <p className="p-2" style={{whiteSpace:'pre-line'}}>{roomData.info}</p>
                            </Accordion>
                        </div>
                        <ul className="list-group list-group-flush p-2">
                            {messageItems}
                        </ul>
                    </div>
                    <div className="col-sm-4">
                        <ul className="list-group list-group-flush p-2">
                            {memberItems}
                        </ul>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default ChatZoom
