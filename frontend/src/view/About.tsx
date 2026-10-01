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
                            <img src={GArea.titleURL} alt="幻想动物画廊" style={{ maxWidth: "400px", width: "100%" }} />
                        </div>
                        <h2 className="mb-3 text-center">
                            毛茸茸主题中文艺术图站，发布各类拟人小动物绘画作品。
                        </h2>
                        <p className="text-secondary mb-3">
                            本网站为周周在校学习计算机编写的招牌项目，欢迎交流学习。
                            <br />
                            禁止发布限制级、敏感政治内容，猎奇恐怖、暴力等不适内容，以及未经授权的作品转载。
                            <br />
                            幻想动物画廊的所有内容均由用户自行上传和发布。
                            本网站仅提供信息存储服务，不对用户发布的内容承担任何法律责任。
                            如发现违规内容，及时联系管理员处理。
                            <br />
                            开发者邮箱 1479499289@qq.com
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
