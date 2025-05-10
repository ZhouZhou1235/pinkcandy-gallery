import { Badge, Button, Stack } from "@mui/material";
import { DefaultObj, GArea } from "../vars/ConstVars";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faBell, faBook, faFan, faMagnifyingGlass, faPalette, faRightToBracket, faShieldDog, faTags, faTree } from "@fortawesome/free-solid-svg-icons";

export function Bar(){
    const [userdata,setUserdata] = useState(DefaultObj.userdata)
    useEffect(()=>{
        postRequest(urls.checkLogin).then(x=>{
            if(typeof x=='number'){if(x==1){
                getRequest(urls.getSessionUser).then(x=>{
                    if(typeof x=='object'){setUserdata(x)}
                })
            }}
        })
    },[])
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to={'/'}><img src={GArea.logoURL} alt="logo" height={50}/></Link>
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
                            <Link to={'/search'}>
                                <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}>
                                    来点粉糖
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
                            {
                                userdata.username!=''
                                ?
                                    <>
                                        <Link to={'/myzoom'}>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                startIcon={<FontAwesomeIcon icon={faShieldDog} />}
                                            >
                                                { userdata.name }
                                            </Button>
                                        </Link>
                                        <Link to={'/add'}>
                                            <Button variant="outlined" color="secondary" startIcon={<FontAwesomeIcon icon={faAdd} />}>
                                                添加
                                            </Button>
                                        </Link>
                                        <Link to={'/myzoom/message'}>
                                            <Button variant="text" color="secondary" startIcon={<FontAwesomeIcon icon={faBell} />}>
                                                <Badge color="secondary" badgeContent={'-'}>
                                                    消息
                                                </Badge>
                                            </Button>
                                        </Link>
                                        <Link to={'/trends'}>
                                            <Button variant="text" color="secondary" startIcon={<FontAwesomeIcon icon={faFan} />}>
                                                <Badge color="secondary" badgeContent={'-'}>
                                                    动态
                                                </Badge>
                                            </Button>
                                        </Link>
                                    </>
                                :
                                <Link to={'/login'}>
                                    <Button variant="outlined" color="secondary" startIcon={<FontAwesomeIcon icon={faRightToBracket} />}>
                                        登录
                                    </Button>
                                </Link>
                            }
                        </Stack>
                    </div>
                </div>
            </div>
        </nav>
    )
}
