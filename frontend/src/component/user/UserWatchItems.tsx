import { Link } from "react-router";
import { DefaultObj, GArea } from "../../code/vars";
import { urls } from "../../code/api";

export function UserWatchItems({userwatchArray=DefaultObj.userwatchArray}){
    return(
        <div className="list-group">
            {
                userwatchArray.map(item=>{
                    // 安全地访问嵌套属性，提供默认值
                    const user = item.user || {};
                    return (
                        <div className="list-group-item" key={item.id || user.username}>
                            <div className="row">
                                <div className="col-3">
                                    <Link to={'/user/'+(user.username || '')}>
                                        <img
                                            src={
                                                user.headimage
                                                ?
                                                urls.headimageURL+user.headimage
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
                                    <div style={{fontSize:'1.2em'}}>{user.name || '用户'}</div>
                                    { Number(user.sex)==1?'雄':Number(user.sex)==2?'雌':'' }
                                    &nbsp;
                                    { user.species?user.species:'' }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
