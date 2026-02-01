import { DefaultObj, GArea } from "../vars/ConstVars";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faAdd,
faBell,
faBook,
faPalette,
faRightToBracket,
faShieldDog,
faTags,
faBars,
faPen,
} from "@fortawesome/free-solid-svg-icons";

function BarOption(){
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
        return `nav-link ${isActive ? "active fw-bold" : ""}`;
    };
    const getNavLinkStyle = ({ isActive }: { isActive: boolean }) => {
        return {
            color: isActive ? 'rgb(100, 200, 250)' : 'inherit',
            fontWeight: isActive ? 'bold' : 'normal',
            backgroundColor: isActive ? 'rgba(100, 100, 100, 0.1)' : 'transparent',
            borderRadius: isActive ? '4px' : '0'
        };
    };
    return (
        <>
            <li className="nav-item">
                <NavLink className={getNavLinkClass} to={"/gallery"} style={getNavLinkStyle}>
                    <FontAwesomeIcon icon={faPalette} className="me-1" />
                    画廊
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className={getNavLinkClass} to={"/tag"} style={getNavLinkStyle}>
                    <FontAwesomeIcon icon={faTags} className="me-1" />
                    标签
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className={getNavLinkClass} to={"/board"} style={getNavLinkStyle}>
                    <FontAwesomeIcon icon={faPen} className="me-1" />
                    留言
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className={getNavLinkClass} to={"/about"} style={getNavLinkStyle}>
                    <FontAwesomeIcon icon={faBook} className="me-1" />
                    关于
                </NavLink>
            </li>
        </>
    );
}

function LoginButton(){
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
        return `nav-link ${isActive ? "active fw-bold" : ""}`;
    };
    const getNavLinkStyle = ({ isActive }: { isActive: boolean }) => {
        return {
            color: isActive ? 'rgb(50, 100, 250)' : 'inherit',
            fontWeight: isActive ? 'bold' : 'normal',
            backgroundColor: isActive ? 'rgba(100, 100, 100, 0.1)' : 'transparent',
            borderRadius: isActive ? '4px' : '0'
        };
    };
    return (
        <li className="nav-item">
        <NavLink className={getNavLinkClass} to={"/login"} style={getNavLinkStyle}>
            <FontAwesomeIcon icon={faRightToBracket} className="me-1" />
            登录
        </NavLink>
        </li>
    )
}

function UserArea(userdata = DefaultObj.userdata, noticenum=0, trendsnum=0){
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
        return `nav-link ${isActive ? "active fw-bold" : ""}`;
    };
    const getNavLinkClassWithBadge = ({ isActive }: { isActive: boolean }) => {
        return `nav-link position-relative ${isActive ? "active fw-bold" : ""}`;
    };
    const getNavLinkStyle = ({ isActive }: { isActive: boolean }) => {
        return {
            color: isActive ? 'rgb(100, 100, 250)' : 'inherit',
            fontWeight: isActive ? 'bold' : 'normal',
            backgroundColor: isActive ? 'rgba(100, 100, 100, 0.1)' : 'transparent',
            borderRadius: isActive ? '4px' : '0'
        };
    };
    return(
        <>
        <li className="nav-item">
            <NavLink className={getNavLinkClassWithBadge} to={"/notice"} style={getNavLinkStyle}>
            <FontAwesomeIcon icon={faBell} className="me-1" />
            消息
            {noticenum+trendsnum > 0 && (
                <span className="badge rounded-pill bg-danger">
                {noticenum+trendsnum}
                </span>
            )}
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className={getNavLinkClass} to={"/add"} style={getNavLinkStyle}>
            <FontAwesomeIcon icon={faAdd} className="me-1" />
            添加
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className={getNavLinkClass} to={"/myzoom"} style={getNavLinkStyle}>
            <FontAwesomeIcon icon={faShieldDog} className="me-1" />
            {userdata.name || "用户"}
            </NavLink>
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
    
    // 主页链接的高亮函数
    const getBrandLinkClass = ({ isActive }: { isActive: boolean }) => {
        return `navbar-brand d-flex align-items-center ${isActive ? "active" : ""}`;
    };
    
    return(
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
            <div className="container-fluid">
            <NavLink
                className={getBrandLinkClass}
                to={"/"}
                onClick={() => {
                updateState();
                handleNavLinkClick();
                }}
            >
                <img
                    src={GArea.titleURL}
                    alt="logo"
                    height="40"
                />
            </NavLink>
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
