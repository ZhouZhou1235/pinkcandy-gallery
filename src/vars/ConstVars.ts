// 全局变量

// 静态固定量
export const GArea = {
    connectURL: "http://localhost:3000",
    proxyURL: "/api",
    defaultHeadimage: "/images/head.png",
    defaultBackimage: "/images/back.png",
    headimageURL: "",
    backimageURL: "",
    logoURL: "/images/logo.png",
    artworkimageURL: "http://localhost:3000/files/gallery/",
    defaultShowNum: 12,
    defaultGetNum: 20,
    image404URL: "/images/image404.png",
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
    },
}

// 页面标题
export const PageTitle = {
    home: '粉糖粒子 - 幻想动物画廊',
    about: '幻想动物画廊 - 关于',
    add: '幻想动物画廊 - 添加',
    artwork: '【作品】',
    login: '幻想动物画廊 - 登录',
    notFound: '幻想动物画廊 - 404',
    user: '【小兽空间】',
}
