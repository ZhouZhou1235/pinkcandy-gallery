// 添加

import { useEffect, useState } from "react";
import { ArtworkForm } from "../component/form/ArtworkForm";
import { BoardForm } from "../component/form/BoardForm";
import { PageTitle } from "../vars/ConstVars";

export function Add() {
    const [tabvalue, setTabvalue] = useState('gallery');
    const [pendingTabValue, setPendingTabValue] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleTabClick = (newTabValue: string) => {
        if (tabvalue !== newTabValue) {
            setPendingTabValue(newTabValue);
            setShowModal(true);
        }
    };

    const handleConfirmSwitch = () => {
        if (pendingTabValue) {
            setTabvalue(pendingTabValue);
        }
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setPendingTabValue(null);
    };

    useEffect(() => {
        document.title = PageTitle.add;
    }, []);

    return (
        <div className="container py-3">
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <button
                        className={`nav-link ${tabvalue === 'gallery' ? 'active' : ''}`}
                        onClick={() => handleTabClick('gallery')}
                    >
                        上传作品
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${tabvalue === 'board' ? 'active' : ''}`}
                        onClick={() => handleTabClick('board')}
                    >
                        粉糖留言板
                    </button>
                </li>
            </ul>

            <div className="tab-content">
                {tabvalue === 'gallery' && <ArtworkForm />}
                {tabvalue === 'board' && <BoardForm />}
            </div>

            {showModal && (
                <div 
                    className="modal show d-block" 
                    tabIndex={-1} 
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    onClick={(e) => { if (e.target === e.currentTarget) handleCloseModal() }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">确认切换</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>确定切换到其他选项？若有未完成的更改则会丢失。</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    取消
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleConfirmSwitch}>
                                    确定
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
