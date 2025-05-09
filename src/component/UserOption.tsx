import { Box, Button } from "@mui/material";
import { EditUserDialog } from "./EditUserDialog";

export function UserOption({selectOption=(_optionName:string)=>{}}){
    return(
        <Box>
            <Button onClick={()=>{selectOption('zoom')}}>空间</Button>
            <Button onClick={()=>{selectOption('message')}}>消息</Button>
            <Button onClick={()=>{selectOption('star')}}>收藏</Button>
            <Button onClick={()=>{selectOption('control')}}>内容管理</Button>
            <EditUserDialog />
        </Box>
    )
}
