import { useEffect, useState } from "react"
import { DefaultObj, GArea } from "../vars/ConstVars"
import { Box, Pagination } from "@mui/material"
import { toNormalDate } from "../utils/tools"
import { getRequest, postRequest } from "../utils/HttpRequest"
import { urls } from "../vars/urls"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaw } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router"

export function ArtworkCommentList({galleryid=''}){
    const [commentListItems,setCommentListItems] = useState([<span key={1}></span>])
    const [commentPage,setCommentPage] = useState(1)
    function pawArtworkComment(commentid=''){postRequest(urls.pawArtworkMedia,{id:galleryid,commentid:commentid})}
    function updateItems(arr=DefaultObj.artworkCommentArray){
        let items = arr.map(item=>
            <li key={item.id} className="list-group-item">
                <div className="row">
                    <div className="col-3 text-center">
                        <Link to={'/user/'+item.user.username}>
                            <img src={GArea.headimageURL+item.user.headimage} alt="headimage" width={50} className="rounded"/>
                        </Link>
                    </div>
                    <div className="col-9">
                        <div style={{fontSize:'1.2em'}}>{item.user.name} {Number(item.user.sex)==1?'雄':Number(item.user.sex)==2?'雌':''} {item.user.species}</div>
                        <div>{item.content}</div>
                        <small>{toNormalDate(item.time)}</small>
                        <button
                            className={item.havepaw?'btn btn-secondary btn-sm active':'btn btn-sm'}
                            data-bs-toggle="button"
                            onClick={()=>{pawArtworkComment(item.id)}}
                        >
                            <FontAwesomeIcon icon={faPaw}/>
                            {item.pawnum}
                        </button>
                    </div>
                </div>
            </li>
        )
        setCommentListItems(items)
    }
    function updateCommentPage(_event:any,value:number){
        getRequest(urls.getArtworkComments+`?id=${galleryid}&num=${Math.floor(GArea.defaultShowNum/2)}&begin=${(value-1)*Math.floor(GArea.defaultShowNum/2)}`).then(data=>{
            if(data!=0){
                updateItems(data)
            }
        })
    }
    useEffect(()=>{
        getRequest(urls.getCommentGalleryCount+'?id='+galleryid).then(count=>{
            let pageNum = Math.floor(count/Math.floor(GArea.defaultShowNum/2))+1
            setCommentPage(pageNum)
        })
        getRequest(urls.getArtworkComments+`?id=${galleryid}&num=${Math.floor(GArea.defaultShowNum/2)}`).then(data=>{
            if(data!=0){
                updateItems(data)
            }
        })
    },[])
    return(
        <>
            <Box sx={{mt:2}}>
                <ul className="list-group">
                    {commentListItems}
                </ul>
                <div className="position-relative mt-2">
                    <div className="position-absolute top-0 start-50 translate-middle-x">
                        <Pagination count={commentPage} onChange={ updateCommentPage } />
                    </div>
                </div>
            </Box>
        </>
    )
}
