import { useEffect, useState } from "react"
import { getRequest, urls } from "../../code/api"
import { UserWatchItems } from "./UserWatchItems"
import { GArea } from "../../code/vars"

export function UserWatchList({ username = '' }) {
    const [watcherElement, setWatcherElement] = useState(<></>)
    const [towatchElement, setTowatchElement] = useState(<></>)
    const [watcherOffset, setWatcherOffset] = useState(0)
    const [towatchOffset, setTowatchOffset] = useState(0)
    const [hasMoreWatcher, setHasMoreWatcher] = useState(true)
    const [hasMoreTowatch, setHasMoreTowatch] = useState(true)
    const [activeTab, setActiveTab] = useState<'fans' | 'following'>('fans')
    const [showModal, setShowModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const pageSize = GArea.defaultShowNum

    function loadUserWatch(offset: number, type: 'fans' | 'following') {
        setIsLoading(true)
        getRequest(urls.getUserWatch + `?username=${username}&begin=${offset}&num=${pageSize}`).then(data => {
            setIsLoading(false)
            if (data != 0) {
                let watchersArray = data.watcher || []
                let towatchArray = data.towatch || []
                
                if (type === 'fans') {
                    setWatcherElement(<UserWatchItems userwatchArray={watchersArray} />)
                    setHasMoreWatcher(watchersArray.length === pageSize)
                } else {
                    setTowatchElement(<UserWatchItems userwatchArray={towatchArray} />)
                    setHasMoreTowatch(towatchArray.length === pageSize)
                }
            } else {
                if (type === 'fans') {
                    setWatcherElement(<div className="text-center text-muted p-3">暂无粉丝</div>)
                    setHasMoreWatcher(false)
                } else {
                    setTowatchElement(<div className="text-center text-muted p-3">暂无关注</div>)
                    setHasMoreTowatch(false)
                }
            }
        }).catch(() => {
            setIsLoading(false)
            if (type === 'fans') {
                setWatcherElement(<div className="text-center text-muted p-3">加载失败</div>)
            } else {
                setTowatchElement(<div className="text-center text-muted p-3">加载失败</div>)
            }
        })
    }

    function nextWatcher() {
        const newOffset = watcherOffset + pageSize
        setWatcherOffset(newOffset)
        loadUserWatch(newOffset, 'fans')
    }

    function prevWatcher() {
        if (watcherOffset === 0) return
        const newOffset = watcherOffset - pageSize
        setWatcherOffset(newOffset)
        loadUserWatch(newOffset, 'fans')
    }

    function nextTowatch() {
        const newOffset = towatchOffset + pageSize
        setTowatchOffset(newOffset)
        loadUserWatch(newOffset, 'following')
    }

    function prevTowatch() {
        if (towatchOffset === 0) return
        const newOffset = towatchOffset - pageSize
        setTowatchOffset(newOffset)
        loadUserWatch(newOffset, 'following')
    }

    function openModal(tab: 'fans' | 'following') {
        setActiveTab(tab)
        setShowModal(true)
        if (tab === 'fans') {
            setWatcherOffset(0)
            loadUserWatch(0, 'fans')
        } else {
            setTowatchOffset(0)
            loadUserWatch(0, 'following')
        }
    }

    function renderNavigation(
        offset: number,
        hasMore: boolean,
        onPrev: () => void,
        onNext: () => void
    ) {
        return (
            <div className="d-flex justify-content-between align-items-center mt-3">
                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={onPrev}
                    disabled={offset === 0}
                >
                    上一组
                </button>
                <span className="text-muted small">第 {Math.floor(offset / pageSize) + 1} 组</span>
                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={onNext}
                    disabled={!hasMore}
                >
                    下一组
                </button>
            </div>
        )
    }

    useEffect(() => {
        loadUserWatch(0, 'fans')
        loadUserWatch(0, 'following')
    }, [username])

    return (
        <>
            <button
                className="btn btn-outline-secondary w-100"
                onClick={() => openModal('fans')}
            >
                粉丝和关注
            </button>

            {showModal && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false) }}>
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <ul className="nav nav-tabs card-header-tabs w-100" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${activeTab === 'fans' ? 'active' : ''}`}
                                            onClick={() => {
                                                setActiveTab('fans')
                                                setWatcherOffset(0)
                                                loadUserWatch(0, 'fans')
                                            }}
                                        >
                                            粉丝
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${activeTab === 'following' ? 'active' : ''}`}
                                            onClick={() => {
                                                setActiveTab('following')
                                                setTowatchOffset(0)
                                                loadUserWatch(0, 'following')
                                            }}
                                        >
                                            关注
                                        </button>
                                    </li>
                                </ul>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body" style={{ minHeight: '300px' }}>
                                {isLoading ? (
                                    <div className="text-center p-4">
                                        <div className="spinner-border text-secondary" role="status">
                                            <span className="visually-hidden">加载中...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {activeTab === 'fans' ? (
                                            <>
                                                {watcherElement}
                                                {renderNavigation(watcherOffset, hasMoreWatcher, prevWatcher, nextWatcher)}
                                            </>
                                        ) : (
                                            <>
                                                {towatchElement}
                                                {renderNavigation(towatchOffset, hasMoreTowatch, prevTowatch, nextTowatch)}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>
                                    关闭
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}