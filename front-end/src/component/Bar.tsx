import { DefaultObj, GArea } from "../vars/ConstVars";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faAdd,
faBell,
faBook,
faComments,
faFan,
faPalette,
faRightToBracket,
faShieldDog,
faTags,
faBars,
} from "@fortawesome/free-solid-svg-icons";

function BarOption(){
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link" to={"/gallery"}>
                    <FontAwesomeIcon icon={faPalette} className="me-1" />
                    画廊
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={"/chat"}>
                    <FontAwesomeIcon icon={faComments} className="me-1" />
                    聊天
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={"/tag"}>
                    <FontAwesomeIcon icon={faTags} className="me-1" />
                    标签
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={"/about"}>
                    <FontAwesomeIcon icon={faBook} className="me-1" />
                    关于
                </Link>
            </li>
        </>
    );
}

function LoginButton(){
    return (
        <li className="nav-item">
        <Link className="nav-link" to={"/login"}>
            <FontAwesomeIcon icon={faRightToBracket} className="me-1" />
            登录
        </Link>
        </li>
    )
}

function UserArea(userdata = DefaultObj.userdata,noticenum=0,trendsnum=0){
    return(
        <>
        <li className="nav-item">
            <Link className="nav-link position-relative" to={"/notice"}>
            <FontAwesomeIcon icon={faBell} className="me-1" />
            消息
            {noticenum > 0 && (
                <span className="badge rounded-pill bg-danger">
                {noticenum}
                </span>
            )}
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link position-relative" to={"/trends"}>
            <FontAwesomeIcon icon={faFan} className="me-1" />
            动态
            {trendsnum > 0 && (
                <span className="badge rounded-pill bg-danger">
                {trendsnum}
                </span>
            )}
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to={"/add"}>
            <FontAwesomeIcon icon={faAdd} className="me-1" />
            添加
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to={"/myzoom"}>
            <FontAwesomeIcon icon={faShieldDog} className="me-1" />
            {userdata.name || "用户"}
            </Link>
        </li>
        </>
    )
}

export function Bar(){
    const [userareaElement,setUserareaElement] = useState(<LoginButton />)
    const [isNavCollapsed,setIsNavCollapsed] = useState(true)
    function updateState(){
        (async () => {
        let data = await getRequest(urls.getSessionUser);
        if (data) {
            let noticenum = await getRequest(
            urls.getNoticenum + "?username=" + data.username
            );
            let trendsnum = await getRequest(
            urls.getTrendnum + "?username=" + data.username
            );
            setUserareaElement(UserArea(data, noticenum, trendsnum));
        } else {
            setUserareaElement(<LoginButton />);
        }
        })();
    }
    useEffect(()=>{
        updateState()
    }, []);
    const handleNavToggle = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };
    const handleNavLinkClick = () => {
        if (window.innerWidth < 992) {
        setIsNavCollapsed(true);
        }
    };
    return(
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
            <div className="container-fluid">
            <Link
                className="navbar-brand d-flex align-items-center"
                to={"/"}
                onClick={() => {
                updateState();
                handleNavLinkClick();
                }}
            >
                <img
                src={GArea.logoURL}
                alt="logo"
                height="40"
                width="40"
                className="d-inline-block align-text-top me-2"
                />
                <span className="fw-bold">幻想动物画廊</span>
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded={!isNavCollapsed}
                aria-label="Toggle navigation"
                onClick={handleNavToggle}
            >
                <FontAwesomeIcon icon={faBars} />
                选项
            </button>
            <div
                className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""}`}
                id="navbarNav"
            >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <BarOption />
                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {userareaElement}
                </ul>
            </div>
            </div>
        </nav>
        <div style={{ height: "70px" }}></div>
        </>
    )
}
