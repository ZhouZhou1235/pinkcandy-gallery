// 请求地址

import { GArea } from "./ConstVars";

const host = GArea.connectURL

export const urls = {
    checkLogin: host+'/core/checkLogin',
    getUser: host+'/core/getUser',
    getSessionUser: host+'/core/getSessionUser',
    login: host+'/core/login',
    logout: host+'/core/logout',
    uploadArtwork: host+'/core/uploadArtwork',
    getArtworks: host+'/core/getArtworks',
    getTags: host+'/core/getTags',
    getRegisterCode: host+'/core/getRegisterCode',
    register: host+'/core/register',
    getResetPasswordCode: host+'/core/getResetPasswordCode',
    resetPassword: host+'/core/resetPassword',
    createPlantpot: host+'/core/createPlantpot',
    addBoardMessage: host+'/core/addBoardMessage',
    getBoradMessages: host+'/core/getBoradMessages',
    getTopInfo: host+'/core/getTopInfo',
    getDBRecordCount: host+'/core/getDBRecordCount',
    getArtwork: host+'/core/getArtwork',
    editUser: host+'/core/editUser',
    editUserImage: host+'/core/editUserImage',
    getEditUserImportantCode: host+'/core/getEditUserImportantCode',
    editUserImportant: host+'/core/editUserImportant',
    clearUserImage: host+'/core/clearUserImage',
    getTagsArtwork: host+'/core/getTagsArtwork',
    sendCommentArtwork: host+'/core/sendCommentArtwork',
    getArtworkComments: host+'/core/getArtworkComments',
    getCommentGalleryCount: host+'/core/getCommentGalleryCount',
};
