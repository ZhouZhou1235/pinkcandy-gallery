import { Box, Button } from "@mui/material";
import { DefaultObj, PageTitle, ws_system } from "../vars/ConstVars";
import { useEffect, useState } from "react";
import { getMessageEventData } from "../utils/tools";
import { getRequest, postRequest } from "../utils/HttpRequest";
import { socket_http_urls, urls } from "../vars/urls";
import { useNavigate, useParams } from "react-router";
import { SendMessageForm } from "../component/chat/SendMessageBox";
import { sendDataToWebSocketServer } from "../utils/WebSocket";
import { RoomMemberItem } from "../component/chat/RoomMemberItem";
import { RoomMessageItem } from "../component/chat/RoomMessageItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faHome } from "@fortawesome/free-solid-svg-icons";
import { RoomManageDialog } from "../component/chat/RoomManageDialog";


function ChatZoom(){
    const navigate = useNavigate()
    const {id} = useParams<{id:string}>()
    const [haveJoin,setHaveJoin] = useState(false)
    const [roomData,setRoomData] = useState(DefaultObj.roomData)
    const [sessionId,setSessionId] = useState('')
    const [messageItem,setMessageItem] = useState(<></>)
    const [memberItem,setMemberItem] = useState(<></>)
    const [connection,setConnection] = useState<WebSocket|null>(null);
    const [username,setUsername] = useState('')
    const [manageDialogOpen, setManageDialogOpen] = useState(false)
    const [roomMembers, setRoomMembers] = useState<any[]>([])
    async function joinRoom(){
        let x = await postRequest(socket_http_urls.joinRoom,{
            sessionId: await postRequest(urls.getSessionId),
            id: id,
        })
        if(connection&&id){
            sendDataToWebSocketServer(connection,{
                action:'call_room_member_update',
                cookie:sessionId,
                data:{id:id}
            });
        }
        await updateMessageData()
        return x
    }
    async function updateMemberData(onlinelist=[]){
        let theMemberData:any[] = await getRequest(socket_http_urls.getRoomMembers+'?id='+id!)
        setRoomMembers(theMemberData)
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
        if(connection&&id){
            sendDataToWebSocketServer(connection,{
                action:'get_online_room_member',
                cookie:sessionId,
                data:{id:id}
            });
        }
    }
    async function updateMessageData(){
        let theMemberData:any[] = await getRequest(socket_http_urls.getRoomMembers+'?id='+id!)
        setRoomMembers(theMemberData)
        let theMessageData:any[] = await getRequest(socket_http_urls.getMessages+'?id='+id!)
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
        if(connection&&id){
            sendDataToWebSocketServer(connection,{
                action:'get_online_room_member',
                cookie:sessionId,
                data:{id:id}
            });
        }
    }
    function createWebSocketConnection(sessionId:string){
        let connection = new WebSocket(ws_system)
        let pingInterval :any = null;        
        connection.onmessage = e=>{
            let echoData = DefaultObj.socketEchoData
            echoData = getMessageEventData(e)
            switch(echoData.type){
                case 'pong':
                    console.log('pong');
                    break
                case 'send_message':
                    updateMessageData()
                    break
                case 'get_online_room_member':
                    updateMemberData(echoData.message||[])
                    break
                case 'connect':
                    if(connection&&id){
                        sendDataToWebSocketServer(connection,{
                            action:'get_online_room_member',
                            cookie:sessionId,
                            data:{id:id}
                        });
                    }
                    break
                case 'close':
                    if(connection&&id){
                        sendDataToWebSocketServer(connection,{
                            action:'get_online_room_member',
                            cookie:sessionId,
                            data:{id:id}
                        });
                    }
                    break
                case 'call_room_member_update':
                    updateMessageData()
                    if(connection&&id){
                        sendDataToWebSocketServer(connection,{
                            action:'get_online_room_member',
                            cookie:sessionId,
                            data:{id:id}
                        });
                    }
                    break
                default:
                    break
            }
        }
        connection.onopen = ()=>{
            pingInterval = setInterval(()=>{
                sendDataToWebSocketServer(connection,{
                    action:'ping',
                    cookie:sessionId,
                    data:{}
                });
            },30000);
            sendDataToWebSocketServer(connection,{
                ...DefaultObj.socketSendData,
                action:'connect',
                cookie:sessionId,
                data:{id:id!}
            })
            sendDataToWebSocketServer(connection,{
                action:'get_online_room_member',
                cookie:sessionId,
                data:{id:id!}
            })
        }
        connection.onclose = ()=>{
            if(pingInterval){
                clearInterval(pingInterval);
                pingInterval = null;
            }
        }
        return connection
    }
    useEffect(() => {
        document.title = PageTitle.chatzoom;
        (async () => {
            let theRoomData: any[] = await getRequest(socket_http_urls.getRoom+'?id='+id!)
            if (theRoomData.length == 0) { navigate('/notfound'); return }
            document.title = PageTitle.chatzoom + theRoomData[0].name
            setRoomData(theRoomData[0])
            let theUser = await getRequest(urls.getSessionUser)
            if(theUser){
                let theSessionId = await postRequest(urls.getSessionId)
                let theHaveJoin = await postRequest(socket_http_urls.haveJoin,{
                    sessionId: theSessionId,
                    id: id,
                })
                setUsername(theUser.username)
                setSessionId(theSessionId)
                setConnection(createWebSocketConnection(theSessionId));
                if(theHaveJoin!=0){
                    await updateMessageData()
                    setHaveJoin(true)
                }
                else{
                    setMessageItem(<p className="text-center">加入房间才能查看消息</p>)
                }
            }
        })()
        return () => {
            if (connection) { connection.close() }
        }
    }, [])
    return(
        <Box>
            <div className="container p-3 flex-grow-1 d-flex flex-column">
                <div className="mb-4">
                    <div className="d-flex align-items-center gap-3">
                        {
                            roomData.owner_username==username
                            ?
                            <Button
                                color='primary'
                                onClick={()=>{setManageDialogOpen(true)}}
                                variant='contained'
                                startIcon={<FontAwesomeIcon icon={faCrown} />}
                            >
                                管理
                            </Button>
                            :
                            <Button
                                disabled={(roomData.type!='public'&&!haveJoin)||username==''}
                                color='secondary'
                                onClick={()=>{joinRoom().then(res=>{if(res==1){setHaveJoin(!haveJoin)}})}}
                                variant={haveJoin?'contained':'outlined'}
                                startIcon={<FontAwesomeIcon icon={faHome} />}
                            >
                                {!haveJoin?'加入':'已加入'}
                            </Button>
                        }

                        <h2 className="mb-0 fs-3 fw-bold">
                            {roomData.name}
                        </h2>
                    </div>
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
                    roomdata={roomData}
                    disabled={!haveJoin}
                />
            </div>
            <RoomManageDialog
                open={manageDialogOpen}
                onClose={() => setManageDialogOpen(false)}
                roomId={id!}
                sessionId={sessionId}
                members={roomMembers}
                onMembersUpdate={()=>{
                    if(connection&&id){
                        sendDataToWebSocketServer(connection,{
                            action:'call_room_member_update',
                            cookie:sessionId,
                            data:{id:id}
                        });
                    }
                }}
            />
        </Box>
    )
}

export default ChatZoom
