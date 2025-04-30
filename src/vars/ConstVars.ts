// 全局变量

export const systemAPI = 'http://localhost:3000' // 后端接口
export const proxyAPI = '/api' // 代理url 解决跨域问题

// 静态固定量
export const GArea = {
    connectURL: proxyAPI,
    headimageURL: systemAPI+"/files/headimage/",
    backimageURL: systemAPI+"/files/backimage/",
    artworkimageURL: systemAPI+"/files/gallery/",
    artworkimagePreviewURL: systemAPI+"/files/GalleryPreview/",
    defaultHeadimage: "/images/head.png",
    defaultBackimage: "/images/back.png",
    logoURL: "/images/logo.png",
    image404URL: "/images/image404.png",
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
    },
    tagArray: [{
        id: '',
        tag: '',
        type: '',
        info: '',
    },],
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
