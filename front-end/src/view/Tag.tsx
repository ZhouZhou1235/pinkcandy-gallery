// 标签

import { JSX, useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { DefaultObj, GArea, PageTitle } from "../vars/ConstVars";
import { tagtypeNumToColorString } from "../utils/tools";
import { EditTagForm } from "../component/form/EditTagForm";
import { DeleteTagButton } from "../component/DeleteTagButton";

export function Tag() {
    const [tagPage, setTagPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [tagtableItems, setTagtableItems] = useState<JSX.Element[]>([]);
    const [searchtagText, setSearchtagText] = useState('');
    const [searchtagtableItems, setSearchtagtableItems] = useState<JSX.Element[]>([]);

    function renderTagtableItems(data = DefaultObj.tagArray) {
        let theItems = data.map(item => (
            <tr key={item.id}>
                <td style={{ color: tagtypeNumToColorString(Number(item.type)), fontWeight: 'bold' }}>
                    {item.tag} <span className="badge bg-secondary ms-1">{item.usenum}</span>
                </td>
                <td>{item.info || '-'}</td>
                <td>
                    <div className="d-flex gap-1">
                        <EditTagForm tagdata={item} />
                        <DeleteTagButton tagdata={item} />
                    </div>
                </td>
            </tr>
        ));
        setTagtableItems(theItems);
    }

    function renderSearchTagtableItems(data = DefaultObj.tagArray) {
        let theItems = data.map(item => (
            <tr key={item.id}>
                <td style={{ color: tagtypeNumToColorString(Number(item.type)), fontWeight: 'bold' }}>
                    {item.tag} <span className="badge bg-secondary ms-1">{item.usenum}</span>
                </td>
                <td>
                    <div className="d-flex gap-1">
                        <EditTagForm tagdata={item} />
                        <DeleteTagButton tagdata={item} />
                    </div>
                </td>
            </tr>
        ));
        setSearchtagtableItems(theItems);
    }

    function getTags() {
        getRequest(urls.getTags + `?num=${Math.floor(GArea.defaultShowNum)}`).then(data => {
            if (data != 0) {
                renderTagtableItems(data);
                getRequest(urls.getDBRecordCount + '?table=tag').then(count => {
                    const pages = Math.ceil(count / Math.floor(GArea.defaultShowNum));
                    setTagPage(pages);
                });
            }
        });
    }

    function updateTagPage(page: number) {
        setCurrentPage(page);
        getRequest(urls.getTags + `?num=${GArea.defaultShowNum}&begin=${(page - 1) * GArea.defaultShowNum}`).then(data => {
            if (data != 0) {
                renderTagtableItems(data);
            }
        });
    }

    function searchTags() {
        if (!searchtagText.trim()) {
            setSearchtagtableItems([]);
            return;
        }
        getRequest(urls.searchTags + '?tagtext=' + searchtagText).then(data => {
            if (data != 0) {
                let tagArray: any[] = data;
                renderSearchTagtableItems(tagArray);
            } else {
                setSearchtagtableItems([]);
            }
        });
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
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="输入标签"
                            value={searchtagText}
                            onChange={(e) => setSearchtagText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && searchTags()}
                        />
                        <button className="btn btn-outline-secondary" onClick={searchTags}>
                            搜索
                        </button>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-sm table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>标签</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchtagtableItems.length > 0 ? searchtagtableItems : (
                                    <tr>
                                        <td colSpan={2} className="text-center text-muted">
                                            输入标签进行搜索
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>标签</th>
                                            <th>描述</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tagtableItems.length > 0 ? tagtableItems : (
                                            <tr>
                                                <td colSpan={3} className="text-center text-muted">
                                                    加载中...
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {renderPagination()}
                </div>
            </div>
        </div>
    );
}
