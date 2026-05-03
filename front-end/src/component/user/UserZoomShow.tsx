import { DefaultObj, GArea, PageTitle } from "../../vars/ConstVars";
import { JSX, useEffect, useState } from "react";
import { getRequest } from "../../utils/HttpRequest";
import { urls } from "../../vars/urls";
import { toNormalDate } from "../../utils/tools";
import { UserWatchButton } from "./UserWatchButton";
import { UserInfoCount } from "./UserInfoCount";
import { ArtworkPreview } from "../artwork/ArtworkPreview";
import { UserWatchList } from "./UserWatchList";
import { LazyLoadComponent } from "react-lazy-load-image-component";

export function UserZoomShow({ username = '' }) {
    const [userdata, setUserdata] = useState(DefaultObj.userdata);
    const [watchButton, setWatchButton] = useState(<></>);
    const [infocountElement, setInfocountElement] = useState(<></>);
    const [artworkitems, setArtworkitems] = useState([] as JSX.Element[]);
    const [galleryPage, setGalleryPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    async function updateGalleryPage(page: number) {
        setCurrentPage(page);
        await getRequest(urls.getArtworks + `?num=${GArea.defaultShowNum}&begin=${(page - 1) * GArea.defaultShowNum}&username=${username}`).then(data => {
            if (data != 0) {
                let artworks: any[] = data;
                let theArtworkItems = artworks.map(item =>
                    <div className="col-12 col-md-6 col-lg-4 mb-4" key={item.id}>
                        <ArtworkPreview artworkdata={item} />
                    </div>
                );
                setArtworkitems(theArtworkItems);
            }
            else {
                setArtworkitems([] as JSX.Element[]);
            }
        });
    }

    function renderPagination() {
        if (galleryPage <= 1) return null;

        const pageNumbers = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(galleryPage, startPage + maxVisible - 1);

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
                        <button className="page-link" onClick={() => updateGalleryPage(currentPage - 1)} disabled={currentPage === 1}>
                            上一页
                        </button>
                    </li>
                    {startPage > 1 && (
                        <>
                            <li className="page-item">
                                <button className="page-link" onClick={() => updateGalleryPage(1)}>1</button>
                            </li>
                            {startPage > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                        </>
                    )}
                    {pageNumbers.map(num => (
                        <li key={num} className={`page-item ${currentPage === num ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => updateGalleryPage(num)}>
                                {num}
                            </button>
                        </li>
                    ))}
                    {endPage < galleryPage && (
                        <>
                            {endPage < galleryPage - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                            <li className="page-item">
                                <button className="page-link" onClick={() => updateGalleryPage(galleryPage)}>{galleryPage}</button>
                            </li>
                        </>
                    )}
                    <li className={`page-item ${currentPage === galleryPage ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => updateGalleryPage(currentPage + 1)} disabled={currentPage === galleryPage}>
                            下一页
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }

    function loadData() {
        (async () => {
            if (!username) { return; }
            await getRequest(urls.getUser + '/' + username).then(res => {
                if (typeof res == 'object') {
                    let theUserdata = res;
                    setUserdata(theUserdata);
                    document.title = PageTitle.zoom + theUserdata.name;
                    getRequest(urls.getSessionUser).then(data => {
                        if (data != 0) {
                            if (username != data.username) { setWatchButton(<UserWatchButton username={username} />); }
                        }
                    });
                }
            });
            await updateGalleryPage(1);
            await getRequest(urls.getUserInfoCount + '?username=' + username).then(data => {
                if (data != 0) {
                    setGalleryPage(Math.ceil(data.artworknum / GArea.defaultShowNum));
                }
            });
            setInfocountElement(<></>);
            setInfocountElement(<UserInfoCount username={username} />);
        })();
    }

    useEffect(() => {
        loadData();
    }, [username]);

    return (
        <>
            {userdata.backimage && (
                <LazyLoadComponent>
                    <div
                        className="position-fixed top-0 start-0 w-100 vh-100"
                        style={{
                            zIndex: -1,
                            opacity: 1,
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.2),rgba(255,255,255,0.4)),url(${urls.backimageURL}${userdata.backimage})`,
                            backgroundColor: 'transparent',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundAttachment: 'fixed',
                            backgroundRepeat: 'no-repeat',
                            pointerEvents: 'none'
                        }}
                    />
                </LazyLoadComponent>
            )}
            <div className="row g-4 p-2">
                <div className="col-12 col-lg-4">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <div className="d-flex align-items-start mb-3">
                                <div className="flex-shrink-0 me-3">
                                    <img
                                        src={userdata.headimage ? urls.headimageURL + userdata.headimage : GArea.defaultHeadimage}
                                        alt="headimage"
                                        className="rounded"
                                        width="80"
                                        height="80"
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    <h4 className="card-title mb-1">{userdata.name}</h4>
                                    <p className="text-muted mb-0">
                                        {Number(userdata.sex) == 1 ? '雄' : Number(userdata.sex) == 2 ? '雌' : ''}
                                        {userdata.species ? ` ${userdata.species}` : ''}
                                    </p>
                                </div>
                            </div>
                            {infocountElement}
                            <div className="mb-3">
                                {watchButton}
                                <hr className="my-3" />
                                <UserWatchList username={username} />
                            </div>
                            <div className="border-top pt-3">
                                <p className="card-text" style={{ whiteSpace: 'pre-line' }}>
                                    {userdata.info}
                                </p>
                                <div className="text-muted small">
                                    <div>粉糖账号 {userdata.username}</div>
                                    <div>{toNormalDate(userdata.jointime)} 加入</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-8">
                    <div className="row g-3">
                        {artworkitems}
                    </div>
                    <div className="p-2">
                        {artworkitems.length > 0 && renderPagination()}
                    </div>
                </div>
            </div>
        </>
    );
}
