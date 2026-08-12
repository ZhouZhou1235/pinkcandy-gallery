// 定义量

// 全局资源路径和默认配置
export const GArea = {
    defaultHeadimage: '/images/head.png',
    defaultBackimage: '/images/back.png',
    logoURL: '/images/logo.svg',
    titleURL: '/images/title.png',
    image404URL: '/images/image404.png',
    SkyblueHound: '/images/SkyblueHound.webp',
    Board: '/images/board.png',
    homepage: '/images/homepage.webp',
    gradingPlaceholder: '/images/gradingPlaceholder.png',
    defaultShowNum: 12,
    defaultGetNum: 20,
}

// 页面标题配置
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
    board: '幻想动物画廊 - 留言',
}

// 默认数据对象模板
export const DefaultObj = {
    // 作品数据结构
    artworkdata: {
        id: '',
        username: '',
        filename: '',
        title: '',
        info: '',
        grading: 0,
        audit: 0,
        time: '',
    },
    // 用户数据结构
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
    // 首页数据
    homedata: {
        board: Array(),     // 留言数据
        artworks: Array(),  // 作品数据
    },
    // 标签数据
    tagArray: [{
        id: '',
        tag: '',
        type: '',
        info: '',
        usenum: 0,
    }],
    // 作品评论数据
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
        pawnum: 0,      // 爪印数
        havepaw: false, // 是否已爪
    }],
    // 作品互动信息
    pawAreaInfo: {
        pawnum: 0,          // 爪印数
        starnum: 0,         // 星星数
        commentnum: 0,      // 评论数
        user: {
            havepaw: false, // 是否已爪
            havestar: false,// 是否已收藏
        },
    },
    // 用户统计信息
    userInfoCount: {
        watchernum: 0,      // 粉丝数
        towatchnum: 0,      // 关注数
        artworknum: 0,      // 作品数
        gotpawnum: 0,       // 获得的爪印数
    },
    // 关注列表数据
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
    // 标签详情数据
    tagdata: {
        id: '',
        tag: '',
        type: '',
        info: '',
        usenum: 0,
    },
    // 粉糖搜索结果数据
    pinkcandyResult: {
        artwork: [{
            id: '',
            username: '',
            filename: '',
            title: '',
            info: '',
            grading: 0,
            audit: 0,
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
    // WebSocket发送数据
    socketSendData: {
        action: '',
        cookie: '',
        data: null as any,
    },
    // WebSocket接收数据
    socketEchoData: {
        message: '' as any,
        type: '',
        dateTime: Date(),
    },
    // 房间数据
    roomData: {
        id: '',
        owner_username: '',
        name: '',
        info: '',
        type: '',
        create_time: Date(),
    },
}
