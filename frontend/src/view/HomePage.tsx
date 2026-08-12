// 首页

import { JSX, useEffect, useState } from "react";
import { DefaultObj, GArea, PageTitle } from "../code/vars";
import { getRequest, postRequest, urls } from "../code/api";
import { objSortBy } from "../code/utils";
import { TagList } from "../component/TagList";
import { PinkcandyResultShow } from "../component/PinkcandyResultShow";
import { Footer } from "../component/Footer";
import { ArtworkPreview } from "../component/artwork/ArtworkPreview";
import { Link } from "react-router";

export function HomePage() {
    const [searchText, setSearchText] = useState('');
    const [toptagdata, setToptagdata] = useState(DefaultObj.tagArray);
    const [searchTagArray, setSearchTagArray] = useState(DefaultObj.tagArray);
    const [pinkcandyResultShowElement, setPinkcandyResultShowElement] = useState(<></>);
    const [artworkItems, setArtworkItems] = useState([] as JSX.Element[]);
    const [havelogin, setHavelogin] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isSearchMode, setIsSearchMode] = useState(false);

    function getTopTagsAndView() {
        getRequest(urls.getTags + `?num=${GArea.defaultShowNum * 100}`).then(data => {
            if (data != 0) {
                let tagList: any[] = data;
                tagList.sort(objSortBy('usenum', true));
                tagList.splice(GArea.defaultShowNum*2);
                setToptagdata(data);
                setSearchTagArray(data);
            }
        });
    }

    function searchTagsAndView(tagtext: string) {
        if (!tagtext.trim()) {
            setSearchTagArray(toptagdata);
            return;
        }
        getRequest(urls.searchTags + `?tagtext=${tagtext}`).then(data => {
            if (data != 0) {
                setSearchTagArray(data);
            } else {
                setSearchTagArray(toptagdata);
            }
        });
    }

    function searchResultHaveData(data = DefaultObj.pinkcandyResult) {
        return data.artwork?.length > 0 || data.user?.length > 0;
    }

    async function searchPinkCandy() {
        if (!searchText.trim()) {
            setIsSearchMode(false);
            setPinkcandyResultShowElement(<></>);
            loadArtworkItems(currentPage);
            return;
        }
        setIsSearchMode(true);
        const data = await getRequest(urls.searchPinkCandy + `?searchtext=${searchText}`);
        if (data != 0) {
            if (searchResultHaveData(data)) {
                setPinkcandyResultShowElement(<PinkcandyResultShow pinkcandyResult={data} />);
            } else {
                setPinkcandyResultShowElement(
                    <div className="text-center p-4">
                        <p>没有找到相关结果</p>
                    </div>
                );
            }
        } else {
            setPinkcandyResultShowElement(
                <div className="text-center p-4">
                    <p>搜索失败</p>
                </div>
            );
        }
    }

    async function loadArtworkItems(page: number = 1) {
        const begin = (page - 1) * GArea.defaultShowNum;
        const data = await getRequest(urls.getArtworks + `?num=${GArea.defaultShowNum}&begin=${begin}`);
        if (data != 0) {
            let artworks: any[] = data;
            let theArtworkItems = artworks.map(item => (
                <div className="col-sm-6 col-md-4 col-lg-3 p-2" key={item.id}>
                    <ArtworkPreview artworkdata={item} />
                </div>
            ));
            setArtworkItems(theArtworkItems);
        }
    }

    async function loadPaginationData() {
        const count = await getRequest(urls.getArtworkVisibleCount);
        const pages = Math.ceil(count / GArea.defaultShowNum);
        setTotalPages(pages);
    }

    async function handlePageChange(page: number) {
        setCurrentPage(page);
        if (!isSearchMode) {
            await loadArtworkItems(page);
        }
    }

    function handleSearchInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearchText(value);
        searchTagsAndView(value);
        if (!value.trim() && isSearchMode) {
            setIsSearchMode(false);
            setPinkcandyResultShowElement(<></>);
            loadArtworkItems(1);
            setCurrentPage(1);
        }
    }

    function handleSearchClick() {
        if (searchText.trim()) {
            searchPinkCandy();
            setCurrentPage(1);
        } else {
            setIsSearchMode(false);
            setPinkcandyResultShowElement(<></>);
            loadArtworkItems(1);
        }
    }

    function renderPagination() {
        if (totalPages <= 1) return null;
        
        const pageNumbers = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
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
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            上一页
                        </button>
                    </li>
                    {startPage > 1 && (
                        <>
                            <li className="page-item">
                                <button className="page-link" onClick={() => handlePageChange(1)}>1</button>
                            </li>
                            {startPage > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                        </>
                    )}
                    {pageNumbers.map(num => (
                        <li key={num} className={`page-item ${currentPage === num ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(num)}>
                                {num}
                            </button>
                        </li>
                    ))}
                    {endPage < totalPages && (
                        <>
                            {endPage < totalPages - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                            <li className="page-item">
                                <button className="page-link" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
                            </li>
                        </>
                    )}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            下一页
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }

    useEffect(() => {
        document.title = PageTitle.pinkcandy;
        getTopTagsAndView();
        loadArtworkItems(1);
        loadPaginationData();
        postRequest(urls.checkLogin).then(res => {
            if (res) setHavelogin(true);
        });
    }, []);

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-4 p-2">
                        <div className="text-center">
                            <img src={GArea.titleURL} alt="logo" className="img-fluid" width={'80%'}/>
                        </div>
                        <div className="p-2">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="搜索作品/用户......"
                                    value={searchText}
                                    onChange={handleSearchInputChange}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={handleSearchClick}
                                >
                                    搜索
                                </button>
                            </div>
                            <TagList tagArray={searchTagArray} />
                        </div>
                        <div className="p-2">
                            {havelogin ? null : (
                                <Link to={'/login'} className="d-grid">
                                    <button type="button" className="btn btn-outline-primary w-100">登录账号</button>
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-8 p-2">
                        {isSearchMode ? (
                            <div>
                                {pinkcandyResultShowElement}
                            </div>
                        ) : (
                            <div>
                                <div className="row">
                                    {artworkItems.length > 0 ? artworkItems : (
                                        <div className="text-center p-4">
                                            <p>暂无作品</p>
                                        </div>
                                    )}
                                </div>
                                {renderPagination()}
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
