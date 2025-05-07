import { useEffect, useState } from "react"
import { DefaultObj, GArea } from "../vars/ConstVars"
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Pagination, Typography } from "@mui/material"
import { toNormalDate } from "../utils/tools"
import { getRequest, postRequest } from "../utils/HttpRequest"
import { urls } from "../vars/urls"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaw } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router"
import { PlantpotCommentReplyForm } from "./form/PlantpotCommentReplyForm"

export function PlantpotCommentList({gardenid=''}){
    const [commentListItems,setCommentListItems] = useState([<span key={1}></span>])
    const [commentPage,setCommentPage] = useState(1)
    function pawPlantpotComment(commentid=''){postRequest(urls.pawPlantpotMedia,{id:gardenid,commentid:commentid})}
    function updateItems(arr=DefaultObj.plantpotCommentArray){
        let items = arr.map(item=>
            <li key={item.id} className="list-group-item">
                <div className="row">
                    <div className="col-3 text-center">
                        <Link to={'/user/'+item.user.username}>
                            <img src={GArea.headimageURL+item.user.headimage} alt="headimage" width={50} className="rounded"/>
                        </Link>
                    </div>
                    <div className="col-6">
                        <div style={{fontSize:'1.2em'}}>{item.user.name} {Number(item.user.sex)==1?'雄':Number(item.user.sex)==2?'雌':''} {item.user.species}</div>
                        <div>{item.content}</div>
                        <small>{toNormalDate(item.time)}</small>
                        <button
                            className={item.havepaw?'btn btn-secondary btn-sm active':'btn btn-sm'}
                            data-bs-toggle="button"
                            onClick={()=>{pawPlantpotComment(item.id)}}
                        >
                            <FontAwesomeIcon icon={faPaw}/>
                            {item.pawnum}
                        </button>
                    </div>
                    <div className="col-3">
                        {
                            item.filename
                            ?
                            <img src={GArea.plantpotimageURL+item.filename} alt="commentimage" width={'100%'}/>
                            :
                            null
                        }
                    </div>
                </div>
                <Accordion>
                    <AccordionSummary>
                        <Typography component="span">叶纸条 {item.reply.length}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul className="list-group">
                            <PlantpotCommentReplyForm commentid={item.id}/>
                            {
                                item.reply.map(item=>
                                    <li key={item.id} className="list-group-item">
                                        <Link to={'/user/'+item.username}>{item.user.name}</Link>
                                        &nbsp;
                                        {item.content}
                                        <br />
                                        {toNormalDate(item.time)}
                                    </li>
                                )
                            }
                        </ul>
                    </AccordionDetails>
                </Accordion>
            </li>
        )
        setCommentListItems(items)
    }
    function updateCommentPage(_event:any,value:number){
        getRequest(urls.getPlantpotComments+`?id=${gardenid}&num=${Math.floor(GArea.defaultShowNum)}&begin=${(value-1)*Math.floor(GArea.defaultShowNum)}`).then(data=>{
            if(data!=0){
                updateItems(data)
            }
        })
    }
    useEffect(()=>{
        getRequest(urls.getCommentGardenCount+'?id='+gardenid).then(count=>{
            let pageNum = Math.floor(count/Math.floor(GArea.defaultShowNum))+1
            setCommentPage(pageNum)
        })
        getRequest(urls.getPlantpotComments+`?id=${gardenid}&num=${Math.floor(GArea.defaultShowNum)}`).then(data=>{
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
                <Grid container spacing={2} minHeight={50}>
                    <Grid display="flex" justifyContent="center" alignItems="center">
                        <Pagination count={commentPage} onChange={ updateCommentPage } />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
