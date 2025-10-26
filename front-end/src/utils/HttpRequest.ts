// HTTP请求

import axios from "axios";

// get请求
export async function getRequest(url:string){
    let echoThing:any
    await axios
    .get(url)
    .then(res=>{echoThing=res.data})
    return echoThing
}

// post请求
export async function postRequest(url:string,obj:Object|FormData={},header:Object={}){
    let echoThing:any
    await axios
    .post(url,obj,header)
    .then(res=>{echoThing=res.data})
    return echoThing
}
