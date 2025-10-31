// 粉糖聊天室

import { Box } from "@mui/material"
import { postRequest } from "../utils/HttpRequest"
import { socket_http_urls, urls } from "../vars/urls";

function Chat(){
    return(
        <Box>
            <div className="container p-2">
                <div className="row">
                    <div className="col-sm-8">
                        <h1>大厅</h1>
                        <button onClick={async()=>{
                            await postRequest(
                                socket_http_urls.createRoom,
                                {
                                    sessionId: await postRequest(urls.getSessionId),
                                    name:'room1',
                                    info:'room1 info',
                                    type:'public'
                                }
                            );
                        }}>测试</button>
                    </div>
                    <div className="col-sm-4">
                        <h1>房间列表</h1>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default Chat
