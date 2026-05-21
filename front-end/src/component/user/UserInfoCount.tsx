import { useEffect, useState } from "react"
import { DefaultObj } from "../../code/vars"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faPalette, faPaw, faShieldDog } from "@fortawesome/free-solid-svg-icons"
import { getRequest, urls } from "../../code/api"

export function UserInfoCount({username=''}){
    const [infocount,setInfocount] = useState(DefaultObj.userInfoCount)
    useEffect(()=>{
        getRequest(urls.getUserInfoCount+'?username='+username).then(data=>{
            if(data!=0){setInfocount(data)}
        })
    },[username])
    return(
        <>
            <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-outline-secondary btn-sm px-2" type="button">
                    <FontAwesomeIcon icon={faShieldDog} /> {infocount.watchernum}
                </button>
                <button className="btn btn-outline-secondary btn-sm px-2" type="button">
                    <FontAwesomeIcon icon={faEye} /> {infocount.towatchnum}
                </button>
                <button className="btn btn-outline-secondary btn-sm px-2" type="button">
                    <FontAwesomeIcon icon={faPalette} /> {infocount.artworknum}
                </button>
                <button className="btn btn-outline-secondary btn-sm px-2" type="button">
                    <FontAwesomeIcon icon={faPaw} /> {infocount.gotpawnum}
                </button>
            </div>
        </>
    )
}
