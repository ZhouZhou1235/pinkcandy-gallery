// 全局变量

export const systemAPI = 'http://localhost:3000' // 后端接口
export const resourcePath = 'http://localhost:3000' // 资源路径 gallery-system.pinkcandy.top
export const proxyAPI = '/api' // 代理url 解决跨域问题

// 静态固定量
export const GArea = {
    connectURL: proxyAPI,
    headimageURL: resourcePath+"/files/headimage/",
    backimageURL: resourcePath+"/files/backimage/",
    artworkimageURL: resourcePath+"/files/gallery/",
    artworkimagePreviewURL: resourcePath+"/files/GalleryPreview/",
    plantpotimageURL: resourcePath+"/files/garden/",
    defaultHeadimage: "/images/head.png",
    defaultBackimage: "/images/back.png",
    logoURL: "/images/logo.png",
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
        topInfo: '',
        board: Array(),
        artworks: Array(),
        plantpots: Array(),
    },
    tagArray: [{
        id: '',
        tag: '',
        type: '',
        info: '',
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
}

// 页面标题
export const PageTitle = {
    home: '粉糖粒子 - 幻想动物画廊',
    about: '幻想动物画廊 - 关于',
    add: '幻想动物画廊 - 添加',
    artwork: '【作品】',
    login: '幻想动物画廊 - 登录',
    notFound: '幻想动物画廊 - 404',
    gallery: '幻想动物画廊 - 画廊大厅',
    garden: '幻想动物画廊 - 花园',
    plantpot: '【盆栽】',
    zoom: '【空间】',
}
