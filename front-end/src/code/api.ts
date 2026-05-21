
// 接口

import axios from 'axios'
import { backend_api, backend_proxy_string } from './vars'

// 资源URL配置
export const urls = {
    headimageURL: backend_api + '/files/headimage/',
    backimageURL: backend_api + '/files/backimage/',
    artworkimageURL: backend_api + '/files/gallery/',
    artworkimagePreviewURL: backend_api + '/files/GalleryPreview/',
    checkLogin: backend_proxy_string + '/core/checkLogin',
    getSessionId: backend_proxy_string + '/core/getSessionId',
    getSessionUser: backend_proxy_string + '/core/getSessionUser',
    login: backend_proxy_string + '/core/login',
    logout: backend_proxy_string + '/core/logout',
    getRegisterCode: backend_proxy_string + '/core/getRegisterCode',
    register: backend_proxy_string + '/core/register',
    getResetPasswordCode: backend_proxy_string + '/core/getResetPasswordCode',
    resetPassword: backend_proxy_string + '/core/resetPassword',
    uploadArtwork: backend_proxy_string + '/core/uploadArtwork',
    getArtworks: backend_proxy_string + '/core/getArtworks',
    getArtwork: backend_proxy_string + '/core/getArtwork',
    editArtwork: backend_proxy_string + '/core/editArtwork',
    deleteArtwork: backend_proxy_string + '/core/deleteArtwork',
    getTags: backend_proxy_string + '/core/getTags',
    getTagsArtwork: backend_proxy_string + '/core/getTagsArtwork',
    searchTags: backend_proxy_string + '/core/searchTags',
    editTag: backend_proxy_string + '/core/editTag',
    deleteTag: backend_proxy_string + '/core/deleteTag',
    getTopTags: backend_proxy_string + '/core/getTopTags',
    addBoardMessage: backend_proxy_string + '/core/addBoardMessage',
    getBoradMessages: backend_proxy_string + '/core/getBoradMessages',
    getDBRecordCount: backend_proxy_string + '/core/getDBRecordCount',
    getUser: backend_proxy_string + '/core/getUser',
    editUser: backend_proxy_string + '/core/editUser',
    editUserImage: backend_proxy_string + '/core/editUserImage',
    getEditUserImportantCode: backend_proxy_string + '/core/getEditUserImportantCode',
    editUserImportant: backend_proxy_string + '/core/editUserImportant',
    clearUserImage: backend_proxy_string + '/core/clearUserImage',
    sendCommentArtwork: backend_proxy_string + '/core/sendCommentArtwork',
    getArtworkComments: backend_proxy_string + '/core/getArtworkComments',
    getCommentGalleryCount: backend_proxy_string + '/core/getCommentGalleryCount',
    pawArtworkMedia: backend_proxy_string + '/core/pawArtworkMedia',
    starArtworkMedia: backend_proxy_string + '/core/starArtworkMedia',
    getArtworkPawAreaInfo: backend_proxy_string + '/core/getArtworkPawAreaInfo',
    haveWatch: backend_proxy_string + '/core/haveWatch',
    watchUser: backend_proxy_string + '/core/watchUser',
    getUserInfoCount: backend_proxy_string + '/core/getUserInfoCount',
    getUserWatch: backend_proxy_string + '/core/getUserWatch',
    getStarArtworks: backend_proxy_string + '/core/getStarArtworks',
    getUserStarInfoCount: backend_proxy_string + '/core/getUserStarInfoCount',
    getUserNoticePawArtwork: backend_proxy_string + '/core/getUserNoticePawArtwork',
    getUserNoticeTextEcho: backend_proxy_string + '/core/getUserNoticeTextEcho',
    getUserNoticeWatcher: backend_proxy_string + '/core/getUserNoticeWatcher',
    noticeFinishRead: backend_proxy_string + '/core/noticeFinishRead',
    noticeNotRead: backend_proxy_string + '/core/noticeNotRead',
    getNoticenum: backend_proxy_string + '/core/getNoticenum',
    getUserTrendUsers: backend_proxy_string + '/core/getUserTrendUsers',
    trendFinishRead: backend_proxy_string + '/core/trendFinishRead',
    trendNotRead: backend_proxy_string + '/core/trendNotRead',
    getTrendnum: backend_proxy_string + '/core/getTrendnum',
    getUserTrendArtworks: backend_proxy_string + '/core/getUserTrendArtworks',
    searchPinkCandy: backend_proxy_string + '/core/searchPinkCandy',
    getRegisterableUsername: backend_proxy_string + '/core/getRegisterableUsername',
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
