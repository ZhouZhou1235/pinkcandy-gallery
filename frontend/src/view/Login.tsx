// 登录

import { RegisterForm } from "../component/form/RegisterForm";
import { LoginForm } from "../component/form/LoginForm";
import { ResetPasswordForm } from "../component/form/ResetPasswordForm";
import { GArea, PageTitle } from "../code/vars";
import { useEffect, useState } from "react";
import { Footer } from "../component/Footer";

export function Login() {
    const [activePanel, setActivePanel] = useState<'login' | 'register' | 'reset'>('login');
    useEffect(()=>{document.title=PageTitle.login},[])
    return (
        <>
            <div className="container py-4">
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
            <Footer />
        </>
    );
}
