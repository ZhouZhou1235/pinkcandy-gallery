import { Button, FormControl, FormLabel, Input } from "@mui/material"
import { useState } from "react"
import { postRequest } from "../../utils/HttpRequest"
import { urls } from "../../vars/urls"
import { useNavigate } from "react-router"

export function BoardForm(){
    const navigate = useNavigate()
    const [boardForm,setBoardForm] = useState({content: '',})
    const [btnDisabled,setBtnDisabled] = useState(false)
    function addBoardMessage(){
        setBtnDisabled(true)
        postRequest(urls.addBoardMessage,boardForm).then(data=>{
            if(typeof data=='number'){
                if(data==1){navigate('/')}
                else{setBtnDisabled(false)}
            }
        })
    }
    return(
        <div className="container">
            <FormControl fullWidth>
                <FormLabel>粉糖留言板</FormLabel>
                <Input placeholder="说些什么......" onChange={(e)=>{
                    boardForm.content = e.target.value
                    setBoardForm(boardForm)
                }} />
                <Button variant="outlined" sx={{mt:2}} onClick={addBoardMessage} disabled={btnDisabled}>留言</Button>
            </FormControl>
        </div>
    )
}
