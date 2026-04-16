import { GArea } from "../vars/ConstVars";

export function Footer(){
    const date = new Date()
    return(
        <div className="p-2 text-center">
            <img src={GArea.logoURL} alt="logo" height={50}/>
            <br />
            <small>
                开发者邮箱 1479499289@qq.com <a href="https://pinkcandy.top">粉糖</a> <a href="https://github.com/ZhouZhou1235/pinkcandy-gallery">github</a>
            </small>
            <br />
            <small>© 2023-{date.getFullYear()} 小蓝狗周周 保留所有权利 <a href="https://beian.miit.gov.cn">黔ICP备2024038291号</a></small>
        </div>
    )
}
