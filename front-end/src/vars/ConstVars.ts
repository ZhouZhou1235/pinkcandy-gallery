// 全局变量

import { config_backend_api, config_backend_proxy_string, config_ws_server_http_api, config_ws_server_http_proxy_string, config_ws_server_websocket_api } from "./config"



// 接口
export const backend_proxy_string = config_backend_proxy_string
export const ws_server_http_proxy_string = config_ws_server_http_proxy_string
export const backend_api = config_backend_api
export const ws_server_http_api = config_ws_server_http_api
export const ws_server_websocket_api = config_ws_server_websocket_api

// 静态固定量
export const GArea = {
    defaultHeadimage: "/images/head.png",
    defaultBackimage: "/images/back.png",
    logoURL: "/images/logo.svg",
    titleURL: "/images/title.png",
    image404URL: "/images/image404.png",
    SkyblueHound: '/images/SkyblueHound.webp',
    lucky: {
        BaiAndZhou: {src:'/images/lucky/BaiAndZhou.webp',info:'白：给周在一次茶绘上的作品'},
        TuDouAndZhou: {src:'/images/lucky/TuDouAndZhou.webp',info:'周：土豆是我印象深刻的好友之一'},
        ZhouWalk: {src:'/images/lucky/ZhouWalk.webp',info:'羽：出去走走！'},
        YuGift: {src:'/images/lucky/YuGift.webp',info:'羽：2025年生日'},
        DirtHound: {src:'/images/lucky/DirtHound.webp',info:'小闪：蓝狗钻土'},
        ZhouShow: {src:'images/lucky/ZhouShow.webp',info:'苏朗：周周卖艺'},
        TuDouGift: {src:'images/lucky/TuDouGift.webp',info:'土豆：雨后彩虹'},
        FantasyConfession: {src:'images/lucky/FantasyConfession.webp',info:'九尾：幻想中的告白'},
        DrinkMilk: {src:'images/lucky/DrinkMilk.webp',info:'椰雪：奶狗'}
    },
    defaultShowNum: 12,
    defaultGetNum: 20,
}

// 页面标题
export const PageTitle = {
    pinkcandy: '粉糖 - 幻想动物画廊',
    about: '幻想动物画廊 - 关于',
    add: '幻想动物画廊 - 添加',
    artwork: '作品 | ',
    login: '幻想动物画廊 - 登录',
    notFound: '幻想动物画廊 - 404',
    gallery: '幻想动物画廊 - 画廊',
    zoom: '空间 | ',
    notice: '幻想动物画廊 - 消息中心',
    tag: '幻想动物画廊 - 标签',
    trends: '幻想动物画廊 - 动态',
    chat: '幻想动物画廊 - 聊天',
    chatzoom: '房间 | ',
}

// 默认展示对象
export const DefaultObj = {
    artworkdata: {
        id: '',
        username: '',
        filename: '',
        title: '',
        info: '',
        time: '',
    },
    userdata: {
        username: '',
        name: '',
        jointime: '',
        info: '',
        headimage: '',
        backimage: '',
        sex: '',
        species: '',
    },
    homedata: {
        board: Array(),
        artworks: Array(),
    },
    tagArray: [{
        id: '',
        tag: '',
        type: '',
        info: '',
        usenum: 0,
    },],
    artworkCommentArray: [{
        id: '',
        galleryid: '',
        username: '',
        content: '',
        time: '',
        user: {
            username: '',
            name: '',
            headimage: '',
            sex: '',
            species: '',
        },
        pawnum: 0,
        havepaw: false,
    }],
    pawAreaInfo: {
        pawnum: 0,
        starnum: 0,
        commentnum: 0,
        user: {
            havepaw: false,
            havestar: false,
        },
    },
    userInfoCount: {
        watchernum: 0,
        towatchnum: 0,
        artworknum: 0,
        gotpawnum: 0,
    },
    userwatchArray: [{
        id: '',
        username: '',
        watcher: '',
        time: '',
        user: {
            username: '',
            name: '',
            headimage: '',
            sex: '',
            species: '',
        },
    }],
    tagdata: {
        id: '',
        tag: '',
        type: '',
        info: '',
        usenum: 0,
    },
    pinkcandyResult: {
        artwork: [{
            id: '',
            username: '',
            filename: '',
            title: '',
            info: '',
            time: '',
        }],
        user: [{
            username: '',
            name: '',
            jointime: '',
            info: '',
            headimage: '',
            backimage: '',
            sex: '',
            species: '',
        }],
    },
    socketSendData: {
        action: '',
        cookie: '',
        data: null as any,
    },
    socketEchoData: {
        message: '' as any,
        type: '',
        dateTime: Date(),
    },
    roomData: {
        id: '',
        owner_username: '',
        name: '',
        info: '',
        type: '',
        create_time: Date(),
    },
}
