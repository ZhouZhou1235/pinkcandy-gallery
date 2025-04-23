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
    defaultShowNum: 12,
    defaultGetNum: 20,
    artworkimageURL: "http://localhost:3000/files/gallery/",
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
        artworks: Array(),
        tags: Array(),
    },
}
