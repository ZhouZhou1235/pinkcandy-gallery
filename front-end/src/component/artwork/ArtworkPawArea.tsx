import { faComment, faPaw, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRequest, postRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";
import { useEffect, useState } from "react";
import { DefaultObj } from "../../vars/ConstVars";

export function ArtworkPawArea({galleryid=''}){
    const [havepaw,setHavepaw] = useState(false)
    const [havestar,setHavestar] = useState(false)
    const [pawAreaInfo,setPawAreaInfo] = useState(DefaultObj.pawAreaInfo)
    function pawMedia(){return postRequest(urls.pawArtworkMedia,{id:galleryid})}
    function starMedia(){return postRequest(urls.starArtworkMedia,{id:galleryid})}
    useEffect(()=>{
        getRequest(urls.getArtworkPawAreaInfo+'?id='+galleryid).then(data=>{
            if(data!=0){
                setPawAreaInfo(data)
                setHavepaw(data.user.havepaw)
                setHavestar(data.user.havestar)
            }
        })
    },[])
    const pawAction = () => {
        pawMedia().then(res=>{
            if(res==1){
                const newInfo = {...pawAreaInfo};
                if(havepaw){
                    newInfo.pawnum--;
                } else {
                    newInfo.pawnum++;
                }
                setHavepaw(!havepaw);
                setPawAreaInfo(newInfo);
            }
        });
    }
    const starAction = () => {
        starMedia().then(res=>{
            if(res==1){
                const newInfo = {...pawAreaInfo};
                if(havestar){
                    newInfo.starnum--;
                } else {
                    newInfo.starnum++;
                }
                setHavestar(!havestar);
                setPawAreaInfo(newInfo);
            }
        });
    }
    return(
        <div className="container-fluid p-0">
            <div className="d-none d-md-block">
                <div className="row g-2 justify-content-center">
                    <div className="col-auto">
                        <button
                            className={`btn ${havepaw ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
                            onClick={pawAction}
                        >
                            <FontAwesomeIcon icon={faPaw} className="me-1" />
                            {pawAreaInfo.pawnum}
                        </button>
                    </div>
                    <div className="col-auto">
                        <button
                            className={`btn ${havestar ? 'btn-warning' : 'btn-outline-warning'} btn-sm`}
                            onClick={starAction}
                        >
                            <FontAwesomeIcon icon={faStar} className="me-1" />
                            {pawAreaInfo.starnum}
                        </button>
                    </div>
                    <div className="col-auto">
                        <button
                            className="btn btn-outline-secondary btn-sm"
                        >
                            <FontAwesomeIcon icon={faComment} className="me-1" />
                            {pawAreaInfo.commentnum}
                        </button>
                    </div>
                </div>
            </div>
            <div className="d-block d-md-none">
                <div className="d-flex flex-column gap-2">
                    <button
                        className={`btn ${havepaw ? 'btn-primary' : 'btn-outline-primary'} btn-sm w-100 text-start`}
                        onClick={pawAction}
                    >
                        <FontAwesomeIcon icon={faPaw} className="me-2" />
                        印爪 {pawAreaInfo.pawnum}
                    </button>
                    <button
                        className={`btn ${havestar ? 'btn-warning' : 'btn-outline-warning'} btn-sm w-100 text-start`}
                        onClick={starAction}
                    >
                        <FontAwesomeIcon icon={faStar} className="me-2" />
                        收藏 {pawAreaInfo.starnum}
                    </button>
                    <button
                        className="btn btn-outline-secondary btn-sm w-100 text-start"
                    >
                        <FontAwesomeIcon icon={faComment} className="me-2" />
                        评论 {pawAreaInfo.commentnum}
                    </button>
                </div>
            </div>
        </div>
    )
}
