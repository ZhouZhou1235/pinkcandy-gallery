import { useEffect } from "react";
import { GArea, PageTitle } from "../vars/ConstVars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faPalette, faShieldAlt, faHome, faInfo } from "@fortawesome/free-solid-svg-icons";
import { Footer } from "../component/Footer";

function Info() {
    return (
        <>
            <div className="text-center mb-5">
                <img 
                    src={GArea.titleURL} 
                    alt="幻想动物画廊" 
                    className="img-fluid"
                    style={{ maxWidth: '600px' }}
                    width={'100%'}
                />
                <p className="lead text-muted mt-3">
                    来点粉糖，探索小蓝狗与伙伴们的精彩作品！
                </p>
            </div>
            <div className="row mb-5">
                <div className="col-md-4 mb-4">
                    <div className="card border-0 shadow-sm h-100 text-center p-4">
                        <div className="text-primary mb-3">
                            <FontAwesomeIcon icon={faPalette} size="2x" />
                        </div>
                        <h5 className="card-title">绘画交流</h5>
                        <p className="card-text text-muted">
                            发布毛绒绒艺术作品
                        </p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card border-0 shadow-sm h-100 text-center p-4">
                        <div className="text-success mb-3">
                            <FontAwesomeIcon icon={faHome} size="2x" />
                        </div>
                        <h5 className="card-title">兴趣驱动</h5>
                        <p className="card-text text-muted">
                            本网站为非营利独立项目
                        </p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card border-0 shadow-sm h-100 text-center p-4">
                        <div className="text-warning mb-3">
                            <FontAwesomeIcon icon={faCode} size="2x" />
                        </div>
                        <h5 className="card-title">代码开源</h5>
                        <p className="card-text text-muted">
                            项目代码公开透明
                        </p>
                    </div>
                </div>
            </div>
            <div className="card shadow-sm mb-5 border-0">
                <div className="card-body p-4">
                    <h3 className="card-title mb-4 text-primary">
                        <FontAwesomeIcon icon={faInfo} className="me-2" />
                        关于
                    </h3>
                    <p className="card-text mb-3">
                        幻想动物画廊是一个非商业性质的毛绒绒主题中文艺术网站，
                        用户能发布分享有关毛绒绒的绘画作品。
                    </p>
                    <p className="card-text mb-3">
                        本网站是小蓝狗周周的个人项目，已获得国家软件著作权，并长期维护和更新。
                        我为身边的兽迷爱好伙伴们提供一个展示、分享和交流绘画作品的平台。
                    </p>
                    <p className="card-text">
                        什么是毛绒绒？
                        毛绒绒（furry）是指以各种非人类动物为主要原型创作的角色形象。
                        喜爱毛绒绒文化的群体常被称为兽迷、福瑞控或兽迷爱好者。
                        角色的类型也有很大的差别。
                        有的以直立行走为基础；
                        有的完全按动物原型设计，称为纯兽（feral）；
                        还有的不局限于哺乳动物，可能包括各种幻想生物......
                    </p>
                </div>
            </div>
            <div className="card shadow-sm mb-5 border-0">
                <div className="card-body p-4">
                    <h3 className="card-title mb-4 text-primary">
                        <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
                        网站须知
                    </h3>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-4">
                                <h5 className="text-success mb-3">倡导</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item border-0 ps-0">
                                        毛绒绒艺术创作
                                    </li>
                                    <li className="list-group-item border-0 ps-0">
                                        友好评论和交流
                                    </li>
                                    <li className="list-group-item border-0 ps-0">
                                        尊重不同的创作观点
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-4">
                                <h5 className="text-danger mb-3">禁止</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item border-0 ps-0">
                                        <span className="ms-2">限制级、敏感政治内容</span>
                                    </li>
                                    <li className="list-group-item border-0 ps-0">
                                        <span className="ms-2">猎奇恐怖、暴力等不适内容</span>
                                    </li>
                                    <li className="list-group-item border-0 ps-0">
                                        <span className="ms-2">未经授权的作品转载</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="alert alert-light mt-3">
                        <h6 className="alert-heading">免责声明</h6>
                        <p className="mb-0 small">
                            幻想动物画廊的所有内容均由用户自行上传和发布。
                            本网站仅提供信息存储服务，不对用户发布的内容承担任何法律责任。
                            如发现违规内容，及时联系管理员处理。
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export function About() {
    useEffect(() => {
        document.title = PageTitle.about;
    }, []);
    return (
        <div className="py-5">
            <div className="container">
                <Info />
            </div>
        </div>
    );
}
