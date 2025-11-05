import { Avatar } from "antd";
import { Link, } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { GArea } from "../../vars/ConstVars";


export function RoomMemberItem({memberdata,onlinelist,memberdataobj}:{memberdata:any[],onlinelist:string[],memberdataobj:any}){
    let items = memberdata.map(item=>
        <li key={item.id} className="list-group-item d-flex align-items-center">
            <Link to={'/user/'+item.username} className="me-2">
                <Avatar
                    shape="square"
                    size={64}
                    alt="headimage"
                    src={
                        memberdataobj[item.username]
                        ?
                        memberdataobj[item.username]['headimage']?GArea.headimageURL+memberdataobj[item.username]['headimage']:GArea.defaultHeadimage
                        :
                        GArea.defaultHeadimage
                    }
                />
            </Link>
            <div>
                <strong className="d-block">
                    <span style={{color:'gold'}}>
                        {item.type=='owner'?<FontAwesomeIcon icon={faCrown}/>:''}
                    </span>
                    <span style={{color:(onlinelist.includes(item.username))?'green':'gray'}}>
                        <FontAwesomeIcon icon={faGlobe}/>
                    </span>
                    {memberdataobj[item.username]?memberdataobj[item.username]['name']:''}
                </strong>
                <small className="text-muted">粉糖账号 {item.username}</small>
            </div>
        </li>
    )
    return(
        <ul 
            className="list-group list-group-flush flex-grow-1" 
            style={{overflowY: 'auto', maxHeight: 'none'}}
        >
            {items}
        </ul>
    )
}
