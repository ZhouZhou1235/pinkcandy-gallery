// 留言板

import { JSX, useEffect, useState } from "react";
import { getRequest, urls } from "../code/api";
import { GArea, PageTitle } from "../code/vars";
import { toNormalDate } from "../code/utils";
import { Link } from "react-router";

export function Board() {
    const [boardItems, setBoardItems] = useState([] as JSX.Element[]);
    const [boardPage, setBoardPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    function loadBoardMessages(page: number = 1) {
        const begin = (page - 1) * GArea.defaultShowNum;
        getRequest(urls.getBoradMessages + `?num=${GArea.defaultShowNum}&begin=${begin}`).then(data => {
            if (typeof data == 'object') {
                let boardMessages: any[] = data;
                let theBoardItems = boardMessages.map(item => (
                    <div className="list-group-item" key={item.id}>
                        <Link to={'/user/' + item.username} className="text-decoration-none">
                            <strong>{item.name?item.name:item.username}</strong>
                        </Link>
                        <span className="ms-2">{item.content}</span>
                        <br />
                        <small className="text-muted">{toNormalDate(item.time)}</small>
                    </div>
                ));
                setBoardItems(theBoardItems);
            }
        });
    }

    function updateBoardPage(page: number) {
        setCurrentPage(page);
        loadBoardMessages(page);
    }

    function renderPagination() {
        if (boardPage <= 1) return null;

        const pageNumbers = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(boardPage, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <nav aria-label="Page navigation" className="d-flex justify-content-center mt-3">
                <ul className="pagination pagination-sm">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => updateBoardPage(currentPage - 1)} disabled={currentPage === 1}>
                            上一页
                        </button>
                    </li>
                    {startPage > 1 && (
                        <>
                            <li className="page-item">
                                <button className="page-link" onClick={() => updateBoardPage(1)}>1</button>
                            </li>
                            {startPage > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                        </>
                    )}
                    {pageNumbers.map(num => (
                        <li key={num} className={`page-item ${currentPage === num ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => updateBoardPage(num)}>
                                {num}
                            </button>
                        </li>
                    ))}
                    {endPage < boardPage && (
                        <>
                            {endPage < boardPage - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                            <li className="page-item">
                                <button className="page-link" onClick={() => updateBoardPage(boardPage)}>{boardPage}</button>
                            </li>
                        </>
                    )}
                    <li className={`page-item ${currentPage === boardPage ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => updateBoardPage(currentPage + 1)} disabled={currentPage === boardPage}>
                            下一页
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }

    function getDaysBetween(date1: Date, date2: Date) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const timeDiff = d2.getTime() - d1.getTime();
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
        return Math.floor(daysDiff);
    }

    useEffect(() => {
        document.title = PageTitle.board;
        loadBoardMessages(1);
        getRequest(urls.getDBRecordCount + '?table=board').then(count => {
            setBoardPage(Math.ceil(count / GArea.defaultShowNum));
        });
    }, []);

    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center">
                            <img 
                                src={GArea.Board} 
                                alt="board" 
                                className="img-fluid rounded mb-3"
                            />
                            <p className="small text-muted mb-2">
                                粉糖留言板是纪念功能，Hello World！
                            </p>
                            <div className="text-primary small fw-semibold">
                                “周周的网络世界”已运行 {getDaysBetween(new Date('2023-10-1'), new Date())} 天
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-0">
                            <div className="list-group list-group-flush">
                                {boardItems.length > 0 ? boardItems : (
                                    <div className="list-group-item text-center text-muted">暂无留言</div>
                                )}
                            </div>
                        </div>
                    </div>
                    {renderPagination()}
                </div>
            </div>
        </div>
    );
}
