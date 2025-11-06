import { Avatar } from "antd";
import { GArea } from "../../vars/ConstVars";
import { Link } from "react-router";


export function RoomMessageItem({messagedata,memberdataobj}:{messagedata:any[],memberdataobj:any}){
    let items = messagedata.map(item=>
        <li key={item.id} className="list-group-item border-0 px-3 py-2">
            <div className="d-flex">
                <Link to={'/user/'+item.username} className="me-3">
                    <Avatar
                        shape="square"
                        size={50}
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
                <div className="flex-grow-1 min-width-0">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                        <strong className="text-truncate me-2 fs-6">{
                            memberdataobj[item.username]
                            ?
                            memberdataobj[item.username]['name']
                            :
                            item.username
                        }</strong>
                        <small className="text-muted flex-shrink-0 fs-7">{item.time}</small>
                    </div>
                    <div>
                        <p className="mb-0 text-break fs-6" style={{whiteSpace:'pre-line', wordBreak: 'break-word'}}>{item.content}</p>
                    </div>
                </div>
            </div>
            <hr className="my-2 opacity-25"/>
        </li>
    )
    return(
        <ul 
            className="list-group mt-2 flex-grow-1" 
            style={{overflowY: 'auto', maxHeight: 'none'}}
        >
            {items}
        </ul>
    )
    return(
        <ul 
            className="list-group mt-2 flex-grow-1 bg-light" 
            style={{overflowY: 'auto', maxHeight: 'none'}}
        >
            {items}
        </ul>
    )
}
