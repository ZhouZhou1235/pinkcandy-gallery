// 关于

import { useEffect } from "react";
import { GArea, PageTitle } from "../code/vars";
import { Footer } from "../component/Footer";

export function About() {
    useEffect(() => {
        document.title = PageTitle.about;
    }, []);
    return (
        <>
            <div className="container py-5">
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-4">
                        <div className="text-center mb-3">
                            <img src={GArea.titleURL} alt="幻想动物画廊" style={{ maxWidth: "500px", width: "100%" }} />
                        </div>
                        <p className="small text-secondary mb-3">
                            幻想动物画廊是一个非盈利毛绒绒主题中文艺术网站，用户能发布有关毛绒绒的绘画作品。
                        </p>
                        <p className="small text-secondary mb-3">
                            本网站是小蓝狗周周的个人项目，已获得国家软件著作权，并长期维护和更新。
                            我为身边的兽迷爱好伙伴们提供一个展示、分享和交流绘画作品的平台。
                        </p>
                        <p className="small text-secondary mb-3">
                            什么是毛绒绒？毛绒绒（furry）是指以各种非人类动物为主要原型创作的角色形象。
                            喜爱毛绒绒文化的群体常被称为兽迷、福瑞控或兽迷爱好者。
                            角色的类型也有很大的差别。有的以直立行走为基础；
                            有的完全按动物原型设计，称为纯兽（feral）；
                            还有的不局限于哺乳动物，可能包括各种幻想生物......
                        </p>
                        <h5 className="fw-bold text-primary mb-3">网站须知</h5>
                        <p className="small text-secondary mb-3">
                            本网站倡导毛绒绒艺术创作、友好评论和交流，尊重不同的创作观点。
                            禁止发布限制级、敏感政治内容，猎奇恐怖、暴力等不适内容，以及未经授权的作品转载。
                        </p>
                        <h5 className="fw-bold text-primary mb-3">免责声明</h5>
                        <p className="small text-secondary mb-3">
                            幻想动物画廊的所有内容均由用户自行上传和发布。
                            本网站仅提供信息存储服务，不对用户发布的内容承担任何法律责任。
                            如发现违规内容，及时联系管理员处理。
                        </p>
                        <h5 className="fw-bold text-primary mb-3">联系</h5>
                        <p className="small text-secondary mb-3">
                            开发者邮箱 1479499289@qq.com
                            <span>|</span>
                            <a href="https://pinkcandy.top" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-muted">粉糖</a>
                            <span>|</span>
                            <a href="https://github.com/ZhouZhou1235/pinkcandy-gallery" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-muted">GitHub</a>
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
