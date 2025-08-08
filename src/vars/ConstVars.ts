// 全局变量

// 开发 http://localhost:3000
// 生产 https://gallery-system.pinkcandy.top
export const systemAPI = 'http://localhost:3000' // 后端接口
export const proxyAPI = '/api' // 代理url 解决跨域问题

// 静态固定量
export const GArea = {
    connectURL: proxyAPI,
    headimageURL: systemAPI+"/files/headimage/",
    backimageURL: systemAPI+"/files/backimage/",
    artworkimageURL: systemAPI+"/files/gallery/",
    artworkimagePreviewURL: systemAPI+"/files/GalleryPreview/",
    plantpotimageURL: systemAPI+"/files/garden/",
    defaultHeadimage: "/images/head.png",
    defaultBackimage: "/images/back.png",
    logoURL: "/images/logo.svg",
    titleURL: "/images/title.png",
    image404URL: "/images/image404.png",
    GalleryPageview: '/images/GalleryPageview.png',
    BaiBaiAndZhouZhou: '/images/BaiBaiAndZhouZhou.png',
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
        plantpots: Array(),
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
        plantpotnum: 0,
        gotpawnum: 0,
    },
    plantpotCommentArray: [{
        id: '',
        gardenid: '',
        username: '',
        content: '',
        filename: '',
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
        reply: [{
            id: '',
            commentid: '',
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
        }],
    }],
    plantpotdata: {
        id: '',
        username: '',
        filename: '',
        title: '',
        content: '',
        createtime: '',
        updatetime: '',
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
        plantpot: [{
            id: '',
            username: '',
            filename: '',
            title: '',
            content: '',
            createtime: '',
            updatetime: '',
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
}

// 页面标题
export const PageTitle = {
    home: '粉糖 - 幻想动物画廊',
    about: '幻想动物画廊 - 关于',
    add: '幻想动物画廊 - 添加',
    artwork: '【作品】',
    login: '幻想动物画廊 - 登录',
    notFound: '幻想动物画廊 - 404',
    gallery: '幻想动物画廊 - 画廊大厅',
    garden: '幻想动物画廊 - 花园',
    plantpot: '【盆栽】',
    zoom: '【空间】',
    notice: '幻想动物画廊 - 消息中心',
    pinkcandy: '幻想动物画廊 - 来点粉糖',
    tag: '幻想动物画廊 - 标签系统',
    trends: '幻想动物画廊 - 动态',
}
