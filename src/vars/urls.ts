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
    pawArtworkMedia: host+'/core/pawArtworkMedia',
    starArtworkMedia: host+'/core/starArtworkMedia',
    getArtworkPawAreaInfo: host+'/core/getArtworkPawAreaInfo',
    haveWatch: host+'/core/haveWatch',
    watchUser: host+'/core/watchUser',
    getUserInfoCount: host+'/core/getUserInfoCount',
    getPlantpots: host+'/core/getPlantpots',
    getPlantpotComments: host+'/core/getPlantpotComments',
    getCommentGardenCount: host+'/core/getCommentGardenCount',
    pawPlantpotMedia: host+'/core/pawPlantpotMedia',
    sendPlantpotCommentReply: host+'/core/sendPlantpotCommentReply',
    starPlantpotMedia: host+'/core/starPlantpotMedia',
    getPlantpotPawAreaInfo: host+'/core/getPlantpotPawAreaInfo',
    sendCommentPlantpot: host+'/core/sendCommentPlantpot',
    getPlantpot: host+'/core/getPlantpot',
    getTagsPlantpot: host+'/core/getTagsPlantpot',
    getUserWatch: host+'/core/getUserWatch',
    getStarArtworks: host+'/core/getStarArtworks',
    getStarPlantpots: host+'/core/getStarPlantpots',
    getUserStarInfoCount: host+'/core/getUserStarInfoCount',
    editArtwork: host+'/core/editArtwork',
    editPlantpot: host+'/core/editPlantpot',
    deleteArtwork: host+'/core/deleteArtwork',
    deletePlantpot: host+'/core/deletePlantpot',
};
