// 全局变量


// 代理字符常量
export const backend_proxy_string = '/api' // 访问后端的代理字符
export const ws_server_http_proxy_string = '/chat_api' // 访问socket服务器http的代理字符
// 开发环境
export const dev_backend_api = 'http://localhost:8081' // 后端接口
export const dev_ws_server_http_api = 'http://localhost:8082' // socket服务器HTTP服务接口
export const dev_ws_server_websocket_api = 'ws://localhost:8083' // socket服务器WebSocket服务接口
// 生产环境
export const prod_backend_api = 'https://gallery-system.pinkcandy.top'
export const prod_ws_server_http_api = 'https://gallery-chat.pinkcandy.top'
export const prod_ws_server_websocket_api = 'wss://gallery.pinkcandy.top/chat_ws'
// 导出的配置
let isproduction = true
export const backend_api = isproduction?prod_backend_api:dev_backend_api
export const ws_server_http_api = isproduction?prod_ws_server_http_api:dev_ws_server_http_api
export const ws_server_websocket_api = isproduction?prod_ws_server_websocket_api:dev_ws_server_websocket_api


// 静态固定量
export const GArea = {
    defaultHeadimage: "/images/head.png",
    defaultBackimage: "/images/back.png",
    logoURL: "/images/logo.svg",
    titleURL: "/images/title.png",
    image404URL: "/images/image404.png",
    SkyblueHound: '/images/SkyblueHound.webp',
    lucky: {
        BaiAndZhou: '/images/lucky/BaiAndZhou.webp',
        TuDouAndZhou: '/images/lucky/TuDouAndZhou.webp',
        ZhouWalk: '/images/lucky/ZhouWalk.webp',
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
