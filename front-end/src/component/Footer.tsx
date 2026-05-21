import { GArea } from "../code/vars";

export function Footer() {
    const date = new Date();
    return (
        <footer className="border-top mt-5 py-4">
            <div className="container text-center">
                <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                    <img src={GArea.logoURL} alt="粉糖" height="50" />
                </div>
                <div className="text-muted small">
                    <span>© 2023-{date.getFullYear()} 小蓝狗周周 保留所有权利</span>
                    <br />
                    <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-muted">
                        黔ICP备2024038291号
                    </a>
                </div>
            </div>
        </footer>
    );
}
