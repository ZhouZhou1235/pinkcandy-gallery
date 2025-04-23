// 请求地址

import { GArea } from "./ConstVars";

const host = GArea.proxyURL
// const host = GArea.connectURL

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
};
