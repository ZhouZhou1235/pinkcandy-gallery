import { useEffect, useState } from "react";
import { getRequest, urls } from "../code/api";
import { UserZoomShow } from "../component/user/UserZoomShow";
import { UserStar } from "../component/user/UserStar";
import { UserEditDialog } from "../component/user/UserEditDialog";
import { UserMediaControl } from "../component/user/UserMediaControl";

export function MyZoom(){
    const [username,setUsername] = useState('')
    const [userzoomElement,setUserzoomElement] = useState(<></>)
    const [selectedOption,setSelectedOption] = useState('zoom')
    function selectOption(optionName:string){
        let theElement = <></>
        let ok = true
        switch(optionName){
            case 'zoom':
                theElement = <UserZoomShow username={username}/>
                setSelectedOption('zoom')
                break
            case 'star':
                theElement = <UserStar username={username}/>
                setSelectedOption('star')
                break
            case 'control':
                theElement = <UserMediaControl username={username}/>
                setSelectedOption('control')
                break
            default: ok=false
        }
        if(ok){setUserzoomElement(theElement)}
    }
    useEffect(()=>{
        getRequest(urls.getSessionUser).then(data=>{
            if(data!=0){
                let username = data.username
                setUserzoomElement(<UserZoomShow username={username}/>)
                setUsername(username)
            }
        })
    },[]);
    return(
        <div className="container">
            <div className="p-2 d-flex gap-2">
                <button className={`btn ${selectedOption=='zoom'?'btn-primary':'btn-outline-primary'}`} onClick={()=>{selectOption('zoom')}}>空间</button>
                <button className={`btn ${selectedOption=='star'?'btn-primary':'btn-outline-primary'}`} onClick={()=>{selectOption('star')}}>收藏</button>
                <button className={`btn ${selectedOption=='control'?'btn-primary':'btn-outline-primary'}`} onClick={()=>{selectOption('control')}}>内容管理</button>
                <UserEditDialog />
            </div>
            {userzoomElement}
        </div>
    )
}
