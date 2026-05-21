import { GArea } from "../code/vars";

export function Footer() {
    const date = new Date();
    return (
        <footer className="border-top mt-5 py-4">
            <div className="container text-center">
                <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                    <img src={GArea.logoURL} alt="粉糖" height="50" />
                    <span className="text-muted">|</span>
                    <small>
                        开发者邮箱 1479499289@qq.com
                    </small>
                    <small>
                        <a href="https://pinkcandy.top" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-muted">粉糖</a>
                    </small>
                    <small>
                        <a href="https://github.com/ZhouZhou1235/pinkcandy-gallery" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-muted">GitHub</a>
                    </small>
                </div>
                <div className="text-muted small">
                    <span>© 2023-{date.getFullYear()} 小蓝狗周周</span>
                    <span className="mx-2">·</span>
                    <span>保留所有权利</span>
                    <span className="mx-2">·</span>
                    <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-muted">
                        黔ICP备2024038291号
                    </a>
                </div>
            </div>
        </footer>
    );
}
