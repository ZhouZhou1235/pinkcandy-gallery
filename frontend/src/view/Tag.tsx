// 标签 - 仅搜索展示

import { JSX, useEffect, useState } from "react";
import { getRequest, urls } from "../code/api";
import { DefaultObj, GArea, PageTitle } from "../code/vars";
import { tagtypeNumToColorString } from "../code/utils";

export function Tag() {
    const [tagPage, setTagPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [tagItems, setTagItems] = useState<JSX.Element[]>([]);
    const [searchtagText, setSearchtagText] = useState('');
    const [searchtagItems, setSearchtagItems] = useState<JSX.Element[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    function renderTagItems(data = DefaultObj.tagArray) {
        let theItems = data.map(item => (
            <span
                key={item.id}
                className="badge me-2 mb-2 p-2"
                style={{ backgroundColor: tagtypeNumToColorString(Number(item.type)), color: 'white', fontSize: '1rem' }}
            >
                {item.tag} <span className="ms-1">{item.usenum}</span>
            </span>
        ));
        setTagItems(theItems);
    }

    function renderSearchTagItems(data = DefaultObj.tagArray) {
        let theItems = data.map(item => (
            <span
                key={item.id}
                className="badge me-2 mb-2 p-2"
                style={{ backgroundColor: tagtypeNumToColorString(Number(item.type)), color: 'white', fontSize: '1rem' }}
            >
                {item.tag} <span className="ms-1">{item.usenum}</span>
            </span>
        ));
        setSearchtagItems(theItems);
    }

    function getTags() {
        getRequest(urls.getTags + `?num=${Math.floor(GArea.defaultShowNum*4)}`).then(data => {
            if (data != 0) {
                renderTagItems(data);
                getRequest(urls.getDBRecordCount + '?table=tag').then(count => {
                    const pages = Math.ceil(count / Math.floor(GArea.defaultShowNum*4));
                    setTagPage(pages);
                });
            }
        });
    }

    function updateTagPage(page: number) {
        setCurrentPage(page);
        getRequest(urls.getTags + `?num=${GArea.defaultShowNum*4}&begin=${(page - 1) * GArea.defaultShowNum*4}`).then(data => {
            if (data != 0) {
                renderTagItems(data);
            }
        });
    }

    function searchTags() {
        if (!searchtagText.trim()) {
            setSearchtagItems([]);
            setIsSearching(false);
            return;
        }
        setIsSearching(true);
        getRequest(urls.searchTags + '?tagtext=' + searchtagText).then(data => {
            if (data != 0) {
                let tagArray: any[] = data;
                renderSearchTagItems(tagArray);
            } else {
                setSearchtagItems([]);
            }
        });
    }

    function clearSearch() {
        setSearchtagText('');
        setSearchtagItems([]);
        setIsSearching(false);
    }

    function renderPagination() {
        if (tagPage <= 1) return null;

        const pageNumbers = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(tagPage, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <nav aria-label="Page navigation" className="d-flex justify-content-center mt-3">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => updateTagPage(currentPage - 1)} disabled={currentPage === 1}>
                            上一页
                        </button>
                    </li>
                    {startPage > 1 && (
                        <>
                            <li className="page-item">
                                <button className="page-link" onClick={() => updateTagPage(1)}>1</button>
                            </li>
                            {startPage > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                        </>
                    )}
                    {pageNumbers.map(num => (
                        <li key={num} className={`page-item ${currentPage === num ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => updateTagPage(num)}>
                                {num}
                            </button>
                        </li>
                    ))}
                    {endPage < tagPage && (
                        <>
                            {endPage < tagPage - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                            <li className="page-item">
                                <button className="page-link" onClick={() => updateTagPage(tagPage)}>{tagPage}</button>
                            </li>
                        </>
                    )}
                    <li className={`page-item ${currentPage === tagPage ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => updateTagPage(currentPage + 1)} disabled={currentPage === tagPage}>
                            下一页
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }

    useEffect(() => {
        document.title = PageTitle.tag;
        getTags();
    }, []);

    return (
        <div className="container py-3">
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title mb-3">搜索标签</h5>
                    <div className="input-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="输入标签关键字"
                            value={searchtagText}
                            onChange={(e) => setSearchtagText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && searchTags()}
                        />
                        <button className="btn btn-outline-primary" onClick={searchTags}>搜索</button>
                        {isSearching && (
                            <button className="btn btn-outline-secondary" onClick={clearSearch}>清除</button>
                        )}
                    </div>
                    {isSearching && (
                        <div className="mt-3">
                            {searchtagItems.length > 0 ? searchtagItems : (
                                <span className="text-muted">未找到匹配的标签</span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title mb-3">全部标签</h5>
                    <div className="p-2">
                        {tagItems.length > 0 ? tagItems : (
                            <span className="text-muted">加载中...</span>
                        )}
                    </div>
                    {renderPagination()}
                </div>
            </div>
        </div>
    );
}
