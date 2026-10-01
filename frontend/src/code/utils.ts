// 工具

// 验证键名是否在对象中
function isValidKey(key: any, object: object): key is keyof typeof object {
    return key in object;
}

// 转换日期时间为本地字符串格式
export function toNormalDate(datetime: string){
    let date = new Date(datetime);
    return date.toLocaleString();
}

// 将对象转换为FormData格式
export function objToFormdata(obj: Object){
    let formData = new FormData();
    for (let key in obj) {
        if (isValidKey(key, obj)) {
            formData.append(key, obj[key]);
        }
    }
    return formData;
}

// 验证邮箱格式
export function isEmailString(email: string){
    let pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    return pattern.test(email);
}

// 检查对象中是否存在空值
export function checkObjHaveEmpty(obj: Object, exclude: string[] = []){
    for (let key in obj) {
        if (exclude.includes(key)) {
            continue;
        } else if (isValidKey(key, obj)) {
            if (!obj[key]) {
                return true;
            }
        }
    }
    return false;
}

// 对象排序函数
export function objSortBy(attr = '', desc = false){
    let num = 1;
    if (desc) {
        num = -1;
    }
    return (a: any, b: any) => {
        a = a[attr];
        b = b[attr];
        if (a < b) {
            return num * -1;
        }
        if (a > b) {
            return num * 1;
        }
        return 0;
    };
}

// 标签类型数字转颜色值
export function tagtypeNumToColorString(type: number){
    switch (type) {
        case 1:
            return 'gray';
        case 2:
            return 'gold';
        case 3:
            return 'dodgerblue';
        case 4:
            return 'forestgreen';
        case 5:
            return 'brown';
    }
    return '';
}

// 验证是否为用户名
export function isUsername(num: string){
    return isNaN(Number(num));
}
