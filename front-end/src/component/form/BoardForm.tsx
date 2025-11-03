import { Button, FormControl, FormLabel, Input } from "@mui/material"
import { JSX, useEffect, useState } from "react"
import { getRequest, postRequest } from "../../utils/HttpRequest"
import { urls } from "../../vars/urls"
import { Link } from "react-router"
import { GArea } from "../../vars/ConstVars"
import { toNormalDate } from "../../utils/tools"

export function BoardForm(){
    const [updatenum,setUpdatenum] = useState(0)
    const [boardForm,setBoardForm] = useState({content: '',})
    const [btnDisabled,setBtnDisabled] = useState(false)
    const [boardItems,setBoardItems] = useState([] as JSX.Element[])
    function addBoardMessage(){
        setBtnDisabled(true)
        postRequest(urls.addBoardMessage,boardForm).then(data=>{
            if(typeof data=='number'){
                if(data==1){
                    setUpdatenum(updatenum+1)
                    setBoardForm({content: ''})
                }
                setBtnDisabled(false)
            }
        })
    }
    useEffect(()=>{
        getRequest(urls.getBoradMessages+'?num='+GArea.defaultShowNum).then(data=>{
            if(typeof data=='object'){
                let boardMessages :any[] = data
                let theBoardItems = boardMessages.map(item=>
                    <div className="list-group-item" key={item.id}>
                        <Link to={'/user/'+item.username}>
                            <strong>{ item.user.name }</strong>
                        </Link>
                        &nbsp;
                        { item.content }
                        <br />
                        <small>{ toNormalDate(item.time) }</small>
                    </div>
                )
                setBoardItems(theBoardItems)
            }
        })
    },[updatenum])
    return(
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <FormControl fullWidth>
                        <FormLabel>粉糖留言板</FormLabel>
                        <Input 
                            placeholder="说些什么......" 
                            value={boardForm.content}
                            onChange={(e)=>{
                                setBoardForm({content: e.target.value})
                            }} 
                        />
                        <Button variant="outlined" sx={{mt:2}} onClick={addBoardMessage} disabled={btnDisabled}>留言</Button>
                    </FormControl>
                </div>
                <div className="col-sm-6">
                    <div className="list-group p-2">
                        {boardItems}
                    </div>
                </div>
            </div>
        </div>
    )
}
