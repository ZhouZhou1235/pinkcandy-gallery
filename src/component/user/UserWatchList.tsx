import { useEffect, useState } from "react"
import { getRequest } from "../../utils/HttpRequest"
import { urls } from "../../vars/urls"
import { UserWatchItems } from "./UserWatchItems"
import { GArea } from "../../vars/ConstVars"
import { Accordion, AccordionSummary, Typography, Button } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

export function UserWatchList({username=''}){
    const [watcherElement,setWatcherElement] = useState(<></>)
    const [towatchElement,setTowatchElement] = useState(<></>)
    const [pagenum,setPagenum] = useState(1)
    function lastPage(){
        let num = pagenum-1
        if(num<1){num=1}
        setPagenum(num)
    }
    function nextPage(){
        let num = pagenum+1
        setPagenum(num)
    }
    function gettoloadUserWatch(pageNum:number){
        getRequest(urls.getUserWatch+`?username=${username}&begin=${GArea.defaultShowNum*(pageNum-1)}&num=${GArea.defaultShowNum*pageNum}`).then(data=>{
            if(data!=0){
                let watchersArray = data.watcher
                let towatchArray = data.towatch
                setWatcherElement(<UserWatchItems userwatchArray={watchersArray}/>)
                setTowatchElement(<UserWatchItems userwatchArray={towatchArray}/>)
            }
        })
    }
    useEffect(()=>{
        gettoloadUserWatch(pagenum)
    },[pagenum,username])
    return(
        <>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">
                        粉丝
                    </Typography>
                </AccordionSummary>
                {watcherElement}
                <Button onClick={lastPage} startIcon={<FontAwesomeIcon icon={faArrowLeft}/>}/>
                <Button onClick={nextPage} startIcon={<FontAwesomeIcon icon={faArrowRight}/>}/>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography component="span">
                        关注
                    </Typography>
                </AccordionSummary>
                {towatchElement}
                <Button onClick={lastPage} startIcon={<FontAwesomeIcon icon={faArrowLeft}/>}/>
                <Button onClick={nextPage} startIcon={<FontAwesomeIcon icon={faArrowRight}/>}/>
            </Accordion>
        </>
    )
}
