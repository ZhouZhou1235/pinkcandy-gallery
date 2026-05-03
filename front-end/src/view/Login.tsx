// 登录

import { RegisterForm } from "../component/form/RegisterForm";
import { LoginForm } from "../component/form/LoginForm";
import { ResetPasswordForm } from "../component/form/ResetPasswordForm";
import { GArea } from "../vars/ConstVars";
import { useState } from "react";

export function Login() {
    const [activePanel, setActivePanel] = useState<'login' | 'register' | 'reset'>('login');
    return (
        <>
            <div 
                className="position-fixed top-0 start-0 w-100 h-100"
                style={{
                    zIndex: -1,
                    backgroundImage: `url(${GArea.SkyblueHound})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    backgroundRepeat: 'no-repeat'
                }}
            />
            <div className="container py-4" style={{ minHeight: '100vh' }}>
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
                        <div className="card shadow-lg border-0 bg-white mt-4 mt-sm-5 mt-md-0">
                            <div className="card-body p-4 p-md-5">
                                <div className="text-center mb-4">
                                    <img
                                        src={GArea.titleURL}
                                        alt="logo"
                                        className="img-fluid"
                                        style={{ maxWidth: '280px' }}
                                    />
                                </div>
                                <div className="text-muted small text-center mb-4">
                                    幻想动物画廊是一个非盈利毛绒绒主题中文艺术网站，用户能发布有关毛绒绒的绘画作品。
                                </div>

                                <ul className="nav nav-tabs nav-fill mb-3">
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${activePanel === 'login' ? 'active' : ''}`}
                                            onClick={() => setActivePanel('login')}
                                        >
                                            登录
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${activePanel === 'register' ? 'active' : ''}`}
                                            onClick={() => setActivePanel('register')}
                                        >
                                            注册
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${activePanel === 'reset' ? 'active' : ''}`}
                                            onClick={() => setActivePanel('reset')}
                                        >
                                            重设密码
                                        </button>
                                    </li>
                                </ul>

                                <div className="tab-content">
                                    {activePanel === 'login' && <LoginForm />}
                                    {activePanel === 'register' && <RegisterForm />}
                                    {activePanel === 'reset' && <ResetPasswordForm />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
