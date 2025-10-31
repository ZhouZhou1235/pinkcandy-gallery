// 全局变量

// 开发 systemAPI http://localhost:3000
// 生产 systemAPI https://gallery-system.pinkcandy.top
export const systemAPI = 'http://localhost:3000' // 后端接口
export const ws_system = 'ws://localhost:8081' // socket服务器地址
export const ws_http_system = 'http://localhost:8080' // socket服务器的HTTP服务
export const proxyAPI = '/api' // 代理url
export const ws_http_API = '/chat_api' // socket服务器的http服务代理

// 静态固定量
export const GArea = {
    headimageURL: systemAPI+"/files/headimage/",
    backimageURL: systemAPI+"/files/backimage/",
    artworkimageURL: systemAPI+"/files/gallery/",
    artworkimagePreviewURL: systemAPI+"/files/GalleryPreview/",
    defaultHeadimage: "/images/head.png",
    defaultBackimage: "/images/back.png",
    logoURL: "/images/logo.svg",
    titleURL: "/images/title.png",
    image404URL: "/images/image404.png",
    GalleryPageview: '/images/GalleryPageview.webp',
    BaiAndZhou: '/images/BaiAndZhou.png',
    TuDouAndZhou: '/images/TuDouAndZhou.png',
    defaultShowNum: 12,
    defaultGetNum: 20,
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
        message: '',
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

// 页面标题
export const PageTitle = {
    pinkcandy: '粉糖 - 幻想动物画廊',
    latest: '幻想动物画廊 - 最新内容',
    about: '幻想动物画廊 - 关于',
    add: '幻想动物画廊 - 添加',
    artwork: '【作品】',
    login: '幻想动物画廊 - 登录',
    notFound: '幻想动物画廊 - 404',
    gallery: '幻想动物画廊 - 画廊大厅',
    zoom: '【空间】',
    notice: '幻想动物画廊 - 消息中心',
    tag: '幻想动物画廊 - 标签系统',
    trends: '幻想动物画廊 - 动态',
    chat: '粉糖 - 聊天室',
}
