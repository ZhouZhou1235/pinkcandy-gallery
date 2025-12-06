import { faComment, faPaw, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Box } from "@mui/material";
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
        <Box sx={{ width: '100%' }}>
            <Box 
                className="d-none d-md-flex" 
                sx={{ 
                    width: '100%', 
                    justifyContent: 'center',
                    '& > *': { 
                        flex: 1, 
                        mx: 0.5,
                        minWidth: 0
                    },
                }}
            >
                <Button
                    startIcon={<FontAwesomeIcon icon={faPaw}/>}
                    onClick={pawAction}
                    variant={havepaw?'contained':'text'}
                    size="small"
                    sx={{ flex: 1 }}
                >
                    {pawAreaInfo.pawnum}
                </Button>
                <Button
                    startIcon={<FontAwesomeIcon icon={faStar}/>}
                    onClick={starAction}
                    variant={havestar?'contained':'text'}
                    size="small"
                    sx={{ flex: 1 }}
                >
                    {pawAreaInfo.starnum}
                </Button>
                <Button
                    startIcon={<FontAwesomeIcon icon={faComment}/>}
                    variant="outlined"
                    size="small"
                    sx={{ flex: 1 }}
                >
                    {pawAreaInfo.commentnum}
                </Button>
            </Box>
            <Box 
                className="d-flex d-md-none flex-column"
                sx={{ width: '100%' }}
            >
                <Button
                    startIcon={<FontAwesomeIcon icon={faPaw}/>}
                    onClick={pawAction}
                    variant={havepaw?'contained':'text'}
                    size="small"
                    fullWidth
                    sx={{ justifyContent: 'flex-start', mb: 0.5 }}
                >
                    印爪 {pawAreaInfo.pawnum}
                </Button>
                <Button
                    startIcon={<FontAwesomeIcon icon={faStar}/>}
                    onClick={starAction}
                    variant={havestar?'contained':'text'}
                    size="small"
                    fullWidth
                    sx={{ justifyContent: 'flex-start', mb: 0.5 }}
                >
                    收藏 {pawAreaInfo.starnum}
                </Button>
                <Button
                    startIcon={<FontAwesomeIcon icon={faComment}/>}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                >
                    评论 {pawAreaInfo.commentnum}
                </Button>
            </Box>
        </Box>
    )
}
