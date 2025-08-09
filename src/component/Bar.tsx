import { Badge, Button, Stack } from "@mui/material";
import { DefaultObj, GArea } from "../vars/ConstVars";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faBell, faBook, faFan, faNewspaper, faPalette, faRightToBracket, faShieldDog, faTags, faTree } from "@fortawesome/free-solid-svg-icons";

function BarOption(){
    return(
        <>
            <Link to={'/latest'}>
                <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faNewspaper} />}>
                    最新内容
                </Button>
            </Link>
            <Link to={'/gallery'}>
                <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faPalette} />}>
                    画廊
                </Button>
            </Link>
            <Link to={'/garden'}>
                <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faTree} />}>
                    花园
                </Button>
            </Link>
            <Link to={'/tag'}>
                <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faTags} />}>
                    标签
                </Button>
            </Link>
            <Link to={'/about'}>
                <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faBook} />}>
                    关于
                </Button>
            </Link>
        </>
    )
}

function LoginButton(){
    return(
        <Link to={'/login'}>
            <Button variant="outlined" color="secondary" startIcon={<FontAwesomeIcon icon={faRightToBracket} />}>
                登录
            </Button>
        </Link>
    )
}

function UserArea(userdata=DefaultObj.userdata,noticenum=0,trendsnum=0){
    return(
        <>
            <Link to={'/notice'}>
                <Button variant="text" color="secondary" startIcon={<FontAwesomeIcon icon={faBell} />}>
                    <Badge color="info" badgeContent={noticenum}>
                        消息
                    </Badge>
                </Button>
            </Link>
            <Link to={'/trends'}>
                <Button variant="text" color="secondary" startIcon={<FontAwesomeIcon icon={faFan} />}>
                    <Badge color="info" badgeContent={trendsnum}>
                        动态
                    </Badge>
                </Button>
            </Link>
            <Link to={'/add'}>
                <Button variant="outlined" color="secondary" startIcon={<FontAwesomeIcon icon={faAdd} />}>
                    添加
                </Button>
            </Link>
            <Link to={'/myzoom'}>
                <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<FontAwesomeIcon icon={faShieldDog} />}
                >
                    { userdata.name }
                </Button>
            </Link>
        </>
    )
}

export function Bar(){
    const [userareaElement,setUserareaElement] = useState(LoginButton())
    function updateState(){
        (async()=>{
            let data = await getRequest(urls.getSessionUser)
            let noticenum = await getRequest(urls.getNoticenum+'?username='+data.username)
            let trendsnum = await getRequest(urls.getTrendnum+'?username='+data.username)
            if(data!=0){setUserareaElement(UserArea(data,noticenum,trendsnum))}
            else{setUserareaElement(LoginButton())}
        })()
    }
    useEffect(()=>{
        updateState()
    },[])
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to={'/'} onClick={updateState}>
                    <img src={GArea.logoURL} alt="logo" height={50} width={50}/>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav me-auto">
                        <Stack
                            direction={{ xs:'column',sm:'row' }}
                            spacing={1}
                            sx={{mx:2}}
                        >
                            <BarOption />
                        </Stack>
                    </div>
                        <span className="navbar-text">
                            <Stack
                                direction={{ xs:'column',sm:'row' }}
                                spacing={1}
                                sx={{mx:2}}
                            >
                                {userareaElement}
                            </Stack>
                        </span>
                </div>
            </div>
        </nav>
    )
}
