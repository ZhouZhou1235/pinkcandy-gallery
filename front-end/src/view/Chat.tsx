import { Box } from "@mui/material";
import { JSX, useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { socket_http_urls } from "../vars/urls";
import { PageTitle } from "../vars/ConstVars";
import { Link } from "react-router";
import { JoinRoomButton } from "../component/chat/JoinRoomButton";


function Chat(){
    const [searchText,setSearchText] = useState('')
    const [searchRoomItems,setSearchRoomItems] = useState([] as JSX.Element[])
    const [roomItems,setRoomItems] = useState([] as JSX.Element[])
    async function searchRooms(){
        let rooms :any[] = await getRequest(socket_http_urls.searchRooms+'?text='+searchText)
        if(rooms){
            let theSearchRoomItems = rooms.map(item=>
                <div className="list-group-item" key={item.id}>
                    <h2>
                        <Link to={'/chatzoom/'+item.id}>{item.name}</Link>
                    </h2>
                </div>
            )
            setSearchRoomItems(theSearchRoomItems)
        }
    }
    useEffect(()=>{
        document.title = PageTitle.chat;
        (async()=>{
            let rooms :any[] = await getRequest(socket_http_urls.getRooms+`?num=${10}`)
            if(rooms){
                let theRoomItems = rooms.map(item=>
                    <div className="list-group-item" key={item.id}>
                        <h2>
                            <JoinRoomButton id={item.id} />
                            <Link to={'/chatzoom/'+item.id}>{item.name}</Link>
                        </h2>
                        <small>{item.create_time} 创建</small>
                        <p style={{whiteSpace:'pre-line'}}>{item.info}</p>
                    </div>
                )
                setRoomItems(theRoomItems)
            }
        })()
    },[])
    return(
        <Box>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 p-2">
                        <h2>聊天</h2>
                        <div className="input-group mt-2 mb-2">
                            <input
                                className="form-control"
                                placeholder="搜索房间"
                                onChange={e=>{setSearchText(e.target.value)}}
                            />
                            <button
                                className="btn btn-outline-secondary"
                                onClick={searchRooms}
                            >
                                搜索
                            </button>
                        </div>
                        <div className="list-group p-2">
                            {searchRoomItems}
                        </div>
                    </div>
                    <div className="col-sm-8 p-2">
                        <div className="list-group p-2">
                            {roomItems}
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default Chat
