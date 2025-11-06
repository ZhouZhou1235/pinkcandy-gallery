import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, List, ListItem, ListItemText, IconButton, Box } from "@mui/material";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { postRequest } from "../../utils/HttpRequest";
import { socket_http_urls } from "../../vars/urls";


interface RoomManageDialogProps {
    open: boolean;
    onClose: () => void;
    roomId: string;
    sessionId: string;
    members: any[];
    onMembersUpdate: () => void;
}

export function RoomManageDialog({ open,onClose,roomId,sessionId,members,onMembersUpdate }:RoomManageDialogProps){
    const [targetUsername,setTargetUsername] = useState('');
    const [loading,setLoading] = useState(false);
    const inviteMember = async ()=>{
        if(!targetUsername.trim()) return;
        setLoading(true);
        try{
            const result = await postRequest(socket_http_urls.inviteRoomMember,{
                sessionId: sessionId,
                room_id: roomId,
                target_username: targetUsername.trim()
            });
            if(result==1){
                setTargetUsername('')
                onMembersUpdate()
            }
        }
        catch(error){alert(error)}
        finally{setLoading(false)}
    };
    const removeMember = async (username: string) => {
        if(window.confirm(`确定移除粉糖账号为 ${username} 的成员？`)){
            setLoading(true);
            try{
                const result = await postRequest(socket_http_urls.removeRoomMember,{
                    sessionId: sessionId,
                    room_id: roomId,
                    target_username: username
                });
                if(result==1){onMembersUpdate()}
            }
            catch(error){alert(error)}
            finally{setLoading(false)}
        }
    };
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>管理</DialogTitle>
            <DialogContent>
                <Box className="p-2">
                    <TextField
                        fullWidth
                        label="粉糖账号"
                        value={targetUsername}
                        onChange={(e) => setTargetUsername(e.target.value)}
                        sx={{ mb: 1 }}
                    />
                    <Button 
                        variant="contained"
                        onClick={inviteMember}
                        disabled={loading || !targetUsername.trim()}
                        fullWidth
                    >
                        添加成员
                    </Button>
                </Box>
                <List>
                    {members.map((member) => (
                        <ListItem
                            key={member.username}
                            secondaryAction={
                                member.type !== 'owner' && (
                                    <IconButton 
                                        edge="end" 
                                        onClick={() => removeMember(member.username)}
                                        disabled={loading}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </IconButton>
                                )
                            }
                        >
                            <ListItemText
                                primary={member.username}
                                secondary={member.type=='owner'?'房主':'成员'}
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>关闭</Button>
            </DialogActions>
        </Dialog>
    );
}
