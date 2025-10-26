import { Link } from "react-router";
import { DefaultObj, GArea } from "../../vars/ConstVars";

export function UserWatchItems({userwatchArray=DefaultObj.userwatchArray}){
    return(
        <div className="list-group">
            {
                userwatchArray.map(item=>
                    <div className="list-group-item" key={item.id}>
                        <div className="row">
                            <div className="col-3">
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
                                </Link>
                            </div>
                            <div className="col-9">
                                <div style={{fontSize:'1.2em'}}>{item.user.name}</div>
                                { Number(item.user.sex)==1?'雄':Number(item.user.sex)==2?'雌':'' }
                                &nbsp;
                                { item.user.species?item.user.species:'' }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
