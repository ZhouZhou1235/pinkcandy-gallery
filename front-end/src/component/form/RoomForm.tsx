import { Button, FormControl, FormLabel } from "@mui/material"
import { JSX, useEffect, useState } from "react"
import { getRequest, postRequest } from "../../utils/HttpRequest"
import { socket_http_urls, urls } from "../../vars/urls"
import { Link, useNavigate } from "react-router"
import Textarea from "@mui/joy/Textarea"
import { Checkbox, Input } from "@mui/joy"

export function RoomForm(){
    const navigate = useNavigate()
    const [roomForm,setRoomForm] = useState({sessionId:'',name:'',info:'',type:''})
    const [btnDisabled,setBtnDisabled] = useState(false)
    const [chatzoomitems,setChatzoomitems] = useState([] as JSX.Element[])
    function createRoom(){
        (async()=>{
            setBtnDisabled(true)
            postRequest(socket_http_urls.createRoom,roomForm).then(data=>{
                if(typeof data=='number'){
                    if(data==1){navigate('/')}
                    else{setBtnDisabled(false)}
                }
            })
        })()
    }
    useEffect(()=>{
        (async()=>{
            let theSessionId = await postRequest(urls.getSessionId);
            setRoomForm({sessionId:theSessionId,name:'',info:'',type:'public'})
            let rooms = await getRequest(socket_http_urls.getRooms)
            if(rooms){
                let roomList :any[] = rooms
                let theChatroomitems = roomList.map(item=>
                    <div className="list-group-item" key={item.id} style={{
                        borderWidth:'3px',
                    }}>
                        <Link to={'/chatzoom/'+item.id}>
                            <p>{item.name}</p>
                        </Link>
                    </div>
                )
                setChatzoomitems(theChatroomitems)
            }
        })()
    },[])
    return(
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <FormControl fullWidth>
                        <small>至少填写房间名，默认为公开房间，所有用户均可加入。</small>
                        <FormLabel>房间名</FormLabel>
                        <Input placeholder="房间名......" onChange={(e)=>{
                            roomForm.name = e.target.value
                            setRoomForm(roomForm)
                        }} />
                        <FormLabel>房主说明</FormLabel>
                        <Textarea placeholder="房主说明......" minRows={4} onChange={(e)=>{
                            roomForm.info = e.target.value
                            setRoomForm(roomForm)
                        }} />
                        <div className="p-2">
                            <Checkbox
                                label="私有房间"
                                onChange={()=>{
                                    roomForm.type=='public'?roomForm.type='private':roomForm.type='public'
                                    setRoomForm(roomForm)
                                }}
                            />
                        </div>
                        <small>成员要加入私有房间只能通过房主添加</small>
                        <Button variant="outlined" sx={{mt:2}} onClick={createRoom} disabled={btnDisabled}>创建</Button>
                    </FormControl>
                </div>
                <div className="col-sm-6">
                    <h2>最近创建</h2>
                    {chatzoomitems}
                </div>
            </div>
        </div>
    )
}
