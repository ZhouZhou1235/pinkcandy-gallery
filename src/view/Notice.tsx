import { Box, Button, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { GArea } from "../vars/ConstVars";
import { toNormalDate } from "../utils/tools";
import { Link } from "react-router";

function UserNoticePawArtwork({username=''}){
    const [items,setItems] = useState([<span key={1}></span>])
    useEffect(()=>{
        getRequest(urls.getUserNoticePawArtwork+`?username=${username}`).then(data=>{
            if(data!=0){
                let objArray :any[] = data
                let theItems = objArray.map(item=>
                    <div className="list-group-item" key={item.id}>
                        <div className="row">
                            <div className="col-9">
                                <Link to={'/user/'+item.user.username}>
                                    <img
                                        src={
                                            item.user.headimage
                                            ?
                                            GArea.headimageURL+item.user.headimage
                                            :
                                            GArea.defaultHeadimage
                                        }
                                        alt="headimage"
                                        width={50}
                                        height={50}
                                        className="rounded"
                                    />
                                    {item.user.name} {Number(item.user.sex)==1?'雄':Number(item.user.sex)==2?'雌':''} {item.user.species}
                                </Link>
                                <br />
                                给作品 {item.title} 印爪了
                                <br />
                                <small>{toNormalDate(item.time)}</small>
                            </div>
                            <div className="col-3" style={{overflow:'hidden'}}>
                                <Link to={'/artwork/'+item.galleryid}>
                                    <img
                                        src={GArea.artworkimagePreviewURL+item.filename}
                                        alt="artworkimage"
                                        height={100}
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                )
                setItems(theItems)
            }
        })
    },[username])
    return(
        <div className="list-group">
            {items}
        </div>
    )
}

function UserNoticePawPlantpot({username=''}){
    const [items,setItems] = useState([<span key={1}></span>])
    useEffect(()=>{
        getRequest(urls.getUserNoticePawPlantpot+`?username=${username}`).then(data=>{
            if(data!=0){
                let objArray :any[] = data
                // ...
                let theItems = objArray.map(item=>
                    <div className="list-group-item" key={item.id}>
                    </div>
                )
                setItems(theItems)
            }
        })
    },[username])
    return(
        <div className="list-group">
            {items}
        </div>
    )
}

function UserNoticeTextEcho({username=''}){
    const [items,setItems] = useState([<span key={1}></span>])
    useEffect(()=>{
        getRequest(urls.getUserNoticeTextEcho+`?username=${username}`).then(data=>{
            if(data!=0){
                let objArray :any[] = data
                // ...
                let theItems = objArray.map(item=>
                    <div className="list-group-item" key={item.id}>
                        
                    </div>
                )
                setItems(theItems)
            }
        })
    },[username])
    return(
        <div className="list-group">
            {items}
        </div>
    )
}

function UserNoticeWatcher({username=''}){
    const [items,setItems] = useState([<span key={1}></span>])
    useEffect(()=>{
        getRequest(urls.getUserNoticeWatcher+`?username=${username}`).then(data=>{
            if(data!=0){
                let objArray :any[] = data
                let theItems = objArray.map(item=>
                    <div className="list-group-item" key={item.id}>
                        
                    </div>
                )
                setItems(theItems)
            }
        })
    },[username])
    return(
        <div className="list-group">
            {items}
        </div>
    )
}

export function Notice(){
    const [username,setUsername] = useState('')
    const [noticeElement,setNoticeElement] = useState(<></>)
    const [selectedOption,setSelectedOption] = useState('pawArtwork')
    function selectOption(optionName=''){
        let ok = true
        let theElement = <></>
        switch(optionName){
            case 'pawArtwork':
                theElement = <UserNoticePawArtwork username={username}/>
                break
            case 'pawPlantpot':
                theElement = <UserNoticePawPlantpot username={username}/>
                break
            case 'textEcho':
                theElement = <UserNoticeTextEcho username={username}/>
                break
            case 'watcher':
                theElement = <UserNoticeWatcher username={username}/>
                break
            default: ok=false
        }
        if(ok){
            setNoticeElement(theElement)
            setSelectedOption(optionName)
        }
    }
    useEffect(()=>{
        getRequest(urls.getSessionUser).then(data=>{
            if(data!=0){setUsername(data.username)}
        })
        selectOption('pawArtwork')
    },[username])
    return(
        <Box>
            <div className="container p-2">
                <div className="row">
                    <div className="col-sm-3">
                        <h2>消息中心</h2>
                        <Box sx={{mt:2,mb:2}}>
                            <Button color="inherit">完成浏览</Button>
                            <Button color="inherit">设为未读</Button>
                        </Box>
                        <FormControl fullWidth>
                            <Button variant={selectedOption=='pawArtwork'?'contained':'text'} onClick={()=>{selectOption('pawArtwork')}}>作品印爪</Button>
                            <Button variant={selectedOption=='pawPlantpot'?'contained':'text'} onClick={()=>{selectOption('pawPlantpot')}}>盆栽印爪</Button>
                            <Button variant={selectedOption=='textEcho'?'contained':'text'} onClick={()=>{selectOption('textEcho')}}>文字回应</Button>
                            <Button variant={selectedOption=='watcher'?'contained':'text'} onClick={()=>{selectOption('watcher')}}>新增粉丝</Button>
                        </FormControl>
                    </div>
                    <div className="col-sm-9">
                        {noticeElement}
                    </div>
                </div>
            </div>
        </Box>
    )
}
