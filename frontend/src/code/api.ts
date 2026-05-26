
// 接口

import axios from 'axios'
import { backend_api } from './vars'
import { config_backend_api } from './config'

// 资源URL配置
export const urls = {
    headimageURL: backend_api + '/files/headimage/',
    backimageURL: backend_api + '/files/backimage/',
    artworkimageURL: backend_api + '/files/gallery/',
    artworkimagePreviewURL: backend_api + '/files/GalleryPreview/',
    checkLogin: config_backend_api + '/core/checkLogin',
    getSessionId: config_backend_api + '/core/getSessionId',
    getSessionUser: config_backend_api + '/core/getSessionUser',
    login: config_backend_api + '/core/login',
    logout: config_backend_api + '/core/logout',
    getRegisterCode: config_backend_api + '/core/getRegisterCode',
    register: config_backend_api + '/core/register',
    getResetPasswordCode: config_backend_api + '/core/getResetPasswordCode',
    resetPassword: config_backend_api + '/core/resetPassword',
    uploadArtwork: config_backend_api + '/core/uploadArtwork',
    getArtworks: config_backend_api + '/core/getArtworks',
    getArtwork: config_backend_api + '/core/getArtwork',
    editArtwork: config_backend_api + '/core/editArtwork',
    deleteArtwork: config_backend_api + '/core/deleteArtwork',
    getTags: config_backend_api + '/core/getTags',
    getTagsArtwork: config_backend_api + '/core/getTagsArtwork',
    searchTags: config_backend_api + '/core/searchTags',
    editTag: config_backend_api + '/core/editTag',
    deleteTag: config_backend_api + '/core/deleteTag',
    getTopTags: config_backend_api + '/core/getTopTags',
    addBoardMessage: config_backend_api + '/core/addBoardMessage',
    getBoradMessages: config_backend_api + '/core/getBoradMessages',
    getDBRecordCount: config_backend_api + '/core/getDBRecordCount',
    getUser: config_backend_api + '/core/getUser',
    editUser: config_backend_api + '/core/editUser',
    editUserImage: config_backend_api + '/core/editUserImage',
    getEditUserImportantCode: config_backend_api + '/core/getEditUserImportantCode',
    editUserImportant: config_backend_api + '/core/editUserImportant',
    clearUserImage: config_backend_api + '/core/clearUserImage',
    sendCommentArtwork: config_backend_api + '/core/sendCommentArtwork',
    getArtworkComments: config_backend_api + '/core/getArtworkComments',
    getCommentGalleryCount: config_backend_api + '/core/getCommentGalleryCount',
    pawArtworkMedia: config_backend_api + '/core/pawArtworkMedia',
    starArtworkMedia: config_backend_api + '/core/starArtworkMedia',
    getArtworkPawAreaInfo: config_backend_api + '/core/getArtworkPawAreaInfo',
    haveWatch: config_backend_api + '/core/haveWatch',
    watchUser: config_backend_api + '/core/watchUser',
    getUserInfoCount: config_backend_api + '/core/getUserInfoCount',
    getUserWatch: config_backend_api + '/core/getUserWatch',
    getStarArtworks: config_backend_api + '/core/getStarArtworks',
    getUserStarInfoCount: config_backend_api + '/core/getUserStarInfoCount',
    getUserNoticePawArtwork: config_backend_api + '/core/getUserNoticePawArtwork',
    getUserNoticeTextEcho: config_backend_api + '/core/getUserNoticeTextEcho',
    getUserNoticeWatcher: config_backend_api + '/core/getUserNoticeWatcher',
    noticeFinishRead: config_backend_api + '/core/noticeFinishRead',
    noticeNotRead: config_backend_api + '/core/noticeNotRead',
    getNoticenum: config_backend_api + '/core/getNoticenum',
    getUserTrendUsers: config_backend_api + '/core/getUserTrendUsers',
    trendFinishRead: config_backend_api + '/core/trendFinishRead',
    trendNotRead: config_backend_api + '/core/trendNotRead',
    getTrendnum: config_backend_api + '/core/getTrendnum',
    getUserTrendArtworks: config_backend_api + '/core/getUserTrendArtworks',
    searchPinkCandy: config_backend_api + '/core/searchPinkCandy',
    getRegisterableUsername: config_backend_api + '/core/getRegisterableUsername',
}

// 发送GET请求
export async function getRequest(url: string) {
    let echoThing: any
    await axios.get(url).then(res => {
        echoThing = res.data
    })
    return echoThing
}

// 发送POST请求
export async function postRequest(url: string, obj: Object | FormData = {}, header: Object = {}) {
    let echoThing: any
    await axios.post(url, obj, header).then(res => {
        echoThing = res.data
    })
    return echoThing
}
