import { Box } from "@mui/material";
import { DefaultObj, PageTitle, ws_system } from "../vars/ConstVars";
import { useEffect, useState } from "react";
import { getMessageEventData } from "../utils/tools";
import { getRequest, postRequest } from "../utils/HttpRequest";
import { socket_http_urls, urls } from "../vars/urls";
import { useNavigate, useParams } from "react-router";
import { JoinRoomButton } from "../component/chat/JoinRoomButton";
import { SendMessageForm } from "../component/form/SendMessageForm";
import { sendDataToWebSocketServer } from "../utils/WebSocket";
import { RoomMemberItem } from "../component/chat/RoomMemberItem";
import { RoomMessageItem } from "../component/chat/RoomMessageItem";


const socketActions = {
    connect: (connection: WebSocket, sessionId: string, id: string) => {
        const sendData = {
            ...DefaultObj.socketSendData,
            action: 'connect',
            cookie: sessionId,
            data: {id:id}
        };
        sendDataToWebSocketServer(connection, sendData);
    },
    sendMessage: (connection: WebSocket, sessionId: string, roomId: string, content: string) => {
        sendDataToWebSocketServer(connection, {
            action: 'send_message',
            cookie: sessionId,
            data: { id: roomId, content }
        });
    },
    getOnlineRoomMember: (connection: WebSocket, sessionId: string, roomId: string) => {
        sendDataToWebSocketServer(connection, {
            action: 'get_online_room_member',
            cookie: sessionId,
            data: { id: roomId }
        });
    }
};

const httpRequests = {
    getRoom: (id: string) => getRequest(socket_http_urls.getRoom + '?id=' + id),
    getRoomMembers: (id: string) => getRequest(socket_http_urls.getRoomMembers + '?id=' + id),
    getMessages: (id: string) => getRequest(socket_http_urls.getMessages + '?id=' + id),
    getUser: (username: string) => getRequest(urls.getUser + '/' + username),
    getSessionUser: () => getRequest(urls.getSessionUser),
    getSessionId: () => postRequest(urls.getSessionId),
    joinRoom: (sessionId: string, roomId: string) => postRequest(socket_http_urls.joinRoom, {
        sessionId,
        id: roomId
    }),
    haveJoin: (sessionId: string, roomId: string) => postRequest(socket_http_urls.haveJoin, {
        sessionId,
        id: roomId
    }),
};

function ChatZoom(){
    const navigate = useNavigate()
    const {id} = useParams<{id:string}>()
    const [roomData,setRoomData] = useState(DefaultObj.roomData)
    const [sessionId,setSessionId] = useState('')
    const [messageItem,setMessageItem] = useState(<></>)
    const [memberItem,setMemberItem] = useState(<></>)
    const [connection,setConnection] = useState<WebSocket|null>(null);
    async function updateMemberData(onlinelist=[]){
        let theMemberData :any[] = await httpRequests.getRoomMembers(id!)
        let theMemberDataObject = {} as any;
        for(let i=0;i<theMemberData.length;i++){
            let username = theMemberData[i].username
            let userdata = await getRequest(urls.getUser+'/'+username)
            theMemberDataObject[username] = userdata
        }
        setMemberItem(<RoomMemberItem
            memberdata={theMemberData}
            onlinelist={onlinelist}
            memberdataobj={theMemberDataObject}
        />)
        if(connection&&id){socketActions.getOnlineRoomMember(connection,sessionId,id)}
    }
    async function updateMessageData(){
        let theMemberData :any[] = await httpRequests.getRoomMembers(id!)
        let theMessageData :any[] = await httpRequests.getMessages(id!)
        let theMemberDataObject = {} as any;
        for(let i=0;i<theMemberData.length;i++){
            let username = theMemberData[i].username
            let userdata = await getRequest(urls.getUser+'/'+username)
            theMemberDataObject[username] = userdata
        }
        setMessageItem(<RoomMessageItem
            messagedata={theMessageData}
            memberdataobj={theMemberDataObject}
        />)
        if(connection&&id){socketActions.getOnlineRoomMember(connection,sessionId,id)}
    }
    function createWebSocketConnection(sessionId:string){
        let connection = new WebSocket(ws_system)
        connection.onmessage = e=>{
            let echoData = DefaultObj.socketEchoData
            echoData = getMessageEventData(e)
            switch(echoData.type){
                case 'send_message':
                    updateMessageData()
                    break
                case 'get_online_room_member':
                    updateMemberData(echoData.message||[])
                    break
                case 'connect':
                    if(connection&&id){socketActions.getOnlineRoomMember(connection,sessionId,id)}
                    break
                default:
                    break
            }
        }
        connection.onopen = ()=>{
            socketActions.connect(connection,sessionId,id!);
            socketActions.getOnlineRoomMember(connection,sessionId,id!);
        }
        return connection
    }
    useEffect(() => {
        document.title = PageTitle.chatzoom;
        (async () => {
            let theRoomData: any[] = await httpRequests.getRoom(id!)
            if (theRoomData.length == 0) { navigate('/notfound'); return }
            document.title = PageTitle.chatzoom + theRoomData[0].name
            setRoomData(theRoomData[0])
            let theUser = await httpRequests.getSessionUser()
            if (theUser) {
                let theSessionId = await httpRequests.getSessionId()
                setSessionId(theSessionId)
                await updateMemberData()
                await updateMessageData()
                setConnection(createWebSocketConnection(theSessionId));
            }
        })()
        return () => {
            if (connection) { connection.close() }
        }
    }, [])
    return(
        <Box>
            <div className="container p-3 flex-grow-1 d-flex flex-column">
                <div className="mb-3">
                    <h2 className="mb-0"><JoinRoomButton id={id}/> {roomData.name}</h2>
                </div>
                <div className="row flex-grow-1">
                    <div className="col-sm-8 d-flex flex-column" style={{height:'75vh',overflowY:'scroll'}}>
                        <div className="card flex-grow-1 d-flex flex-column">
                            <div className="card-body p-0 d-flex flex-column">
                                {messageItem}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 d-flex flex-column" style={{height:'75vh',overflowY:'scroll'}}>
                        <div className="card flex-grow-1 d-flex flex-column">
                            <div className="card-body d-flex flex-column">
                                <small className="text-muted">房主说明</small>
                                <p className="border rounded p-2 bg-light" style={{whiteSpace:'pre-line'}}>{roomData.info}</p>
                                {memberItem}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed-bottom">
                <SendMessageForm
                    connection={connection}
                    sessionId={sessionId}
                    room_id={roomData.id}
                />
            </div>
        </Box>
    )
}

export default ChatZoom
