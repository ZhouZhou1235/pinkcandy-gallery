import { useEffect, useState } from "react"
import { DefaultObj } from "../../vars/ConstVars"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faPalette, faPaw, faShieldDog } from "@fortawesome/free-solid-svg-icons"
import { getRequest } from "../../utils/HttpRequest"
import { urls } from "../../vars/urls"

export function UserInfoCount({username=''}){
    const [infocount,setInfocount] = useState(DefaultObj.userInfoCount)
    useEffect(()=>{
        getRequest(urls.getUserInfoCount+'?username='+username).then(data=>{
            if(data!=0){setInfocount(data)}
        })
    },[username])
    return(
        <>
            <div className="d-flex gap-3">
                <button className="btn btn-outline-secondary" type="button">
                    <FontAwesomeIcon icon={faShieldDog} /> {infocount.watchernum}
                </button>
                <button className="btn btn-outline-secondary" type="button">
                    <FontAwesomeIcon icon={faEye} /> {infocount.towatchnum}
                </button>
                <button className="btn btn-outline-secondary" type="button">
                    <FontAwesomeIcon icon={faPalette} /> {infocount.artworknum}
                </button>
                <button className="btn btn-outline-secondary" type="button">
                    <FontAwesomeIcon icon={faPaw} /> {infocount.gotpawnum}
                </button>
            </div>
        </>
    )
}
