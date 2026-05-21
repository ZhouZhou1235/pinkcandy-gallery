import { useEffect } from "react";
import { PageTitle } from "../code/vars";
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
                        <div className="row">
                            <div className="col-md-4">
                                <div className="text-center">
                                    <div className="fw-bold text-primary mb-1">绘画交流</div>
                                    <small className="text-muted">发布毛绒绒艺术作品</small>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="text-center">
                                    <div className="fw-bold text-success mb-1">兴趣驱动</div>
                                    <small className="text-muted">本网站为非营利独立项目</small>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="text-center">
                                    <div className="fw-bold text-warning mb-1">代码开源</div>
                                    <small className="text-muted">项目代码公开透明</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-4">
                        <h5 className="fw-bold text-primary mb-3">关于</h5>
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
                        <p className="small text-secondary mb-3">
                            开发者邮箱 1479499289@qq.com
                            <span>|</span>
                            <a href="https://pinkcandy.top" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-muted">粉糖</a>
                            <span>|</span>
                            <a href="https://github.com/ZhouZhou1235/pinkcandy-gallery" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-muted">GitHub</a>
                        </p>
                    </div>
                </div>
                <div className="card border-0 shadow-sm">
                    <div className="card-body p-4">
                        <h5 className="fw-bold text-primary mb-3">网站须知</h5>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <h6 className="fw-semibold text-success mb-2">倡导</h6>
                                <ul className="small text-secondary list-unstyled mb-0">
                                    <li className="mb-1">· 毛绒绒艺术创作</li>
                                    <li className="mb-1">· 友好评论和交流</li>
                                    <li className="mb-1">· 尊重不同的创作观点</li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <h6 className="fw-semibold text-danger mb-2">禁止</h6>
                                <ul className="small text-secondary list-unstyled mb-0">
                                    <li className="mb-1">· 限制级、敏感政治内容</li>
                                    <li className="mb-1">· 猎奇恐怖、暴力等不适内容</li>
                                    <li className="mb-1">· 未经授权的作品转载</li>
                                </ul>
                            </div>
                        </div>
                        <hr className="my-3" />
                        <div>
                            <h6 className="fw-semibold mb-1">免责声明</h6>
                            <p className="small text-secondary mb-0">
                                幻想动物画廊的所有内容均由用户自行上传和发布。
                                本网站仅提供信息存储服务，不对用户发布的内容承担任何法律责任。
                                如发现违规内容，及时联系管理员处理。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
