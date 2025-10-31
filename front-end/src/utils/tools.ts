// 工具

import { SelectProps } from "antd";

// key object 类型判断
function isValidKey(key:any,object:object):key is keyof typeof object{return key in object;}

// datetime转为一般时间表示
export function toNormalDate(datetime:string){
    let date = new Date(datetime)
    return date.toLocaleString()
}

// js对象转为FormData
export function objToFormdata(obj:Object){
    let formData = new FormData();
    for(let key in obj){
        if(isValidKey(key,obj)){
            formData.append(key,obj[key]);
        }
    }
    return formData
}

// 是否为邮箱字符串
export function isEmailString(email:string){
    let pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/
    return pattern.test(email)
}

// 检查对象键值对是否有空值
export function checkObjHaveEmpty(obj:Object,exclude:string[]=[]){
    for(let key in obj){
        if(exclude.includes(key)){continue}
        else if(isValidKey(key,obj)){
            if(!obj[key]){return true}
        }
    }
    return false
}

// 是否为数字字符串
export function isNumberString(num:string){return !isNaN(Number(num))}

// sort 对象数组的排序依据
export function objSortBy(attr='',desc=false){
    let num = 1
    if(desc){num=-1}
    return (a:any,b:any)=>{
        a=a[attr];
        b=b[attr];
        if(a<b){return num*-1}
        if(a>b){return num*1}
        return 0;
    }
}

// 标签类型数对应中文
export function tagtypeNumToString(type:number){
    switch(type){
        case 1: return '描述'
        case 2: return '作者'
        case 3: return '系列'
        case 4: return '角色'
        case 5: return '兽种'
    }
    return ''
}

// 标签类型数对应WEB颜色
export function tagtypeNumToColorString(type:number){
    switch(type){
        case 1: return 'gray'
        case 2: return 'gold'
        case 3: return 'dodgerblue'
        case 4: return 'forestgreen'
        case 5: return 'brown'
    }
    return ''
}

// 是否为粉糖账号
export function isUsername(num:string){return isNumberString(num)&&num.length==5}

// 标签的SelectProps数组转换为字符串数组
export function selectPropsTagsToArray(selectpropsArray:SelectProps['options']=[]){
    let tagList :string[] = []
    for(let i=0;i<selectpropsArray.length;i++){
        let obj = selectpropsArray[i]
        let tag = obj.value?.toString()
        if(tag){tagList.push(tag)}
    }
    return tagList
}

// 获取 MessageEvent 的数据
export function getMessageEventData(m:MessageEvent){return JSON.parse(m.data)}

// 获取指定名称的cookie (document.cookie)
export function getCookieFromDocument(cookieName:string){
    let cookies :string = document.cookie;
    let cookieArray = cookies.split(';');
    for (let i=0;i<cookieArray.length;i++){
        let cookie = cookieArray[i].trim();
        let equalsIndex = cookie.indexOf('=');
        if(equalsIndex==-1){continue;}
        let name = cookie.substring(0,equalsIndex);
        let value = cookie.substring(equalsIndex+1);
        if(name==cookieName){
            return decodeURIComponent(value);
        }
    }
    return '';
}
