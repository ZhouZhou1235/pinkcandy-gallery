import { JSX, useEffect, useState } from "react"
import { DefaultObj, GArea } from "../../code/vars"
import { toNormalDate } from "../../code/utils"
import { getRequest, postRequest, urls } from "../../code/api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaw } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router"

export function ArtworkCommentList({ galleryid = '', randomNum = 0 }) {
    const [commentListItems, setCommentListItems] = useState([] as JSX.Element[])
    const [commentPage, setCommentPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [theRandomNum, setTheRandomNum] = useState(randomNum)
    const [hasComments, setHasComments] = useState(true)

    function pawArtworkComment(commentid = '') {
        postRequest(urls.pawArtworkMedia, { id: galleryid, commentid: commentid })
            .then(res => { if (res) { setTheRandomNum(Math.floor(Math.random() * 100)) } })
    }

    function updateItems(arr = DefaultObj.artworkCommentArray) {
        if (!arr || arr.length === 0) {
            setHasComments(false)
            setCommentListItems([])
            return
        }
        setHasComments(true)
        let items = arr.map(item => {
            const user = item.user || {};
            return (
                <li key={item.id} className="list-group-item">
                    <div className="row">
                        <div className="col-3 text-center">
                            <Link to={'/user/' + (user.username || '')}>
                                <img
                                    src={
                                        user.headimage
                                            ?
                                            urls.headimageURL + user.headimage
                                            :
                                            GArea.defaultHeadimage
                                    }
                                    alt="headimage"
                                    width={50}
                                    height={50}
                                    className="rounded"
                                />
                            </Link>
                        </div>
                        <div className="col-9">
                            <div style={{ fontSize: '1.2em' }}>{user.name || '用户'} {Number(user.sex) == 1 ? '雄' : Number(user.sex) == 2 ? '雌' : ''} {user.species || ''}</div>
                            <div>{item.content || ''}</div>
                            <small>{toNormalDate(item.time)}</small>
                            <button
                                className={item.havepaw ? 'btn btn-secondary btn-sm active ms-2' : 'btn btn-outline-secondary btn-sm ms-2'}
                                onClick={() => { pawArtworkComment(item.id) }}
                            >
                                <FontAwesomeIcon icon={faPaw} className="me-1" />
                                {item.pawnum || 0}
                            </button>
                        </div>
                    </div>
                </li>
            );
        })
        setCommentListItems(items)
    }

    function updateCommentPage(page: number) {
        setCurrentPage(page)
        getRequest(urls.getArtworkComments + `?id=${galleryid}&num=${Math.floor(GArea.defaultShowNum / 2)}&begin=${(page - 1) * Math.floor(GArea.defaultShowNum / 2)}`).then(data => {
            if (data != 0) {
                updateItems(data)
            } else {
                updateItems([])
            }
        })
    }

    function renderPagination() {
        if (commentPage <= 1) return null

        const pageNumbers = []
        const maxVisible = 5
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
        let endPage = Math.min(commentPage, startPage + maxVisible - 1)

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i)
        }

        return (
            <nav aria-label="Page navigation" className="d-flex justify-content-center mt-3">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => updateCommentPage(currentPage - 1)} disabled={currentPage === 1}>
                            上一页
                        </button>
                    </li>
                    {startPage > 1 && (
                        <>
                            <li className="page-item">
                                <button className="page-link" onClick={() => updateCommentPage(1)}>1</button>
                            </li>
                            {startPage > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                        </>
                    )}
                    {pageNumbers.map(num => (
                        <li key={num} className={`page-item ${currentPage === num ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => updateCommentPage(num)}>
                                {num}
                            </button>
                        </li>
                    ))}
                    {endPage < commentPage && (
                        <>
                            {endPage < commentPage - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                            <li className="page-item">
                                <button className="page-link" onClick={() => updateCommentPage(commentPage)}>{commentPage}</button>
                            </li>
                        </>
                    )}
                    <li className={`page-item ${currentPage === commentPage ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => updateCommentPage(currentPage + 1)} disabled={currentPage === commentPage}>
                            下一页
                        </button>
                    </li>
                </ul>
            </nav>
        )
    }

    useEffect(() => {
        getRequest(urls.getCommentGalleryCount + '?id=' + galleryid).then(count => {
            const pages = Math.ceil(count / Math.floor(GArea.defaultShowNum / 2))
            setCommentPage(pages > 0 ? pages : 1)
            if (count === 0) {
                setHasComments(false)
            }
        })
        getRequest(urls.getArtworkComments + `?id=${galleryid}&num=${Math.floor(GArea.defaultShowNum / 2)}`).then(data => {
            if (data != 0 && data.length > 0) {
                updateItems(data)
            } else {
                updateItems([])
            }
        })
    }, [theRandomNum, randomNum, galleryid])

    return (
        <>
            {hasComments ? (
                <>
                    <ul className="list-group">
                        {commentListItems}
                    </ul>
                    {renderPagination()}
                </>
            ):null}
        </>
    )
}
