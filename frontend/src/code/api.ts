
// 接口

import axios from 'axios'
import { config_backend_api, config_backend_proxy_string } from './config'

let the_api_string = import.meta.env.PROD ? config_backend_api : config_backend_proxy_string

// 资源URL配置
export const urls = {
    headimageURL: config_backend_api + '/files/headimage/',
    backimageURL: config_backend_api + '/files/backimage/',
    artworkimageURL: config_backend_api + '/files/gallery/',
    artworkimagePreviewURL: config_backend_api + '/files/GalleryPreview/',
    checkLogin: the_api_string + '/core/checkLogin',
    getSessionId: the_api_string + '/core/getSessionId',
    getSessionUser: the_api_string + '/core/getSessionUser',
    login: the_api_string + '/core/login',
    logout: the_api_string + '/core/logout',
    getRegisterCode: the_api_string + '/core/getRegisterCode',
    register: the_api_string + '/core/register',
    getResetPasswordCode: the_api_string + '/core/getResetPasswordCode',
    resetPassword: the_api_string + '/core/resetPassword',
    uploadArtwork: the_api_string + '/core/uploadArtwork',
    getArtworks: the_api_string + '/core/getArtworks',
    getArtwork: the_api_string + '/core/getArtwork',
    editArtwork: the_api_string + '/core/editArtwork',
    deleteArtwork: the_api_string + '/core/deleteArtwork',
    getTags: the_api_string + '/core/getTags',
    getTagsArtwork: the_api_string + '/core/getTagsArtwork',
    searchTags: the_api_string + '/core/searchTags',
    getTopTags: the_api_string + '/core/getTopTags',
    addBoardMessage: the_api_string + '/core/addBoardMessage',
    getBoradMessages: the_api_string + '/core/getBoradMessages',
    getDBRecordCount: the_api_string + '/core/getDBRecordCount',
    getUser: the_api_string + '/core/getUser',
    editUser: the_api_string + '/core/editUser',
    editUserImage: the_api_string + '/core/editUserImage',
    getEditUserImportantCode: the_api_string + '/core/getEditUserImportantCode',
    editUserImportant: the_api_string + '/core/editUserImportant',
    clearUserImage: the_api_string + '/core/clearUserImage',
    sendCommentArtwork: the_api_string + '/core/sendCommentArtwork',
    getArtworkComments: the_api_string + '/core/getArtworkComments',
    getCommentGalleryCount: the_api_string + '/core/getCommentGalleryCount',
    pawArtworkMedia: the_api_string + '/core/pawArtworkMedia',
    starArtworkMedia: the_api_string + '/core/starArtworkMedia',
    getArtworkPawAreaInfo: the_api_string + '/core/getArtworkPawAreaInfo',
    haveWatch: the_api_string + '/core/haveWatch',
    watchUser: the_api_string + '/core/watchUser',
    getUserInfoCount: the_api_string + '/core/getUserInfoCount',
    getUserWatch: the_api_string + '/core/getUserWatch',
    getStarArtworks: the_api_string + '/core/getStarArtworks',
    getUserStarInfoCount: the_api_string + '/core/getUserStarInfoCount',
    getUserNoticePawArtwork: the_api_string + '/core/getUserNoticePawArtwork',
    getUserNoticeTextEcho: the_api_string + '/core/getUserNoticeTextEcho',
    getUserNoticeWatcher: the_api_string + '/core/getUserNoticeWatcher',
    noticeFinishRead: the_api_string + '/core/noticeFinishRead',
    noticeNotRead: the_api_string + '/core/noticeNotRead',
    getNoticenum: the_api_string + '/core/getNoticenum',
    getUserTrendUsers: the_api_string + '/core/getUserTrendUsers',
    trendFinishRead: the_api_string + '/core/trendFinishRead',
    trendNotRead: the_api_string + '/core/trendNotRead',
    getTrendnum: the_api_string + '/core/getTrendnum',
    getUserTrendArtworks: the_api_string + '/core/getUserTrendArtworks',
    searchPinkCandy: the_api_string + '/core/searchPinkCandy',
    getRegisterableUsername: the_api_string + '/core/getRegisterableUsername',
}

// 发送GET请求
export async function getRequest(url: string) {
    let echoThing: any
    await axios.get(url, {
        withCredentials: true
    }).then(res => {
        echoThing = res.data
    })
    return echoThing
}

// 发送POST请求
export async function postRequest(url: string, obj: Object | FormData = {}, header: Object = {}) {
    let echoThing: any
    await axios.post(url, obj, {
        withCredentials: true,
        ...header
    }).then(res => {
        echoThing = res.data
    })
    return echoThing
}
