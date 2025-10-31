// WebSocket 通信

import { DefaultObj } from "../vars/ConstVars";

// 向服务器发送信息
export function sendDataToWebSocketServer(connection:WebSocket,socketSendData=DefaultObj.socketSendData){
    let obj = socketSendData;
    let jsonString = JSON.stringify(obj);
    connection.send(jsonString);
}
