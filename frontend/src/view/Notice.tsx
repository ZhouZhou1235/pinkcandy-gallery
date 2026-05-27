// 通知

import { JSX, useEffect, useState } from "react";
import { getRequest, postRequest, urls } from "../code/api";
import { GArea, PageTitle } from "../code/vars";
import { toNormalDate } from "../code/utils";
import { Link } from "react-router";
import { ArtworkPreview } from "../component/artwork/ArtworkPreview";
import { UserPreview } from "../component/user/UserPreview";

function UserTrend({ username = '', refreshKey = 0 }: { username: string; refreshKey: number }) {
    const [artworkItems, setArtworkItems] = useState([] as JSX.Element[])
    const [activeTab, setActiveTab] = useState('artwork')

    function loadData() {
        if (!username) return
        getRequest(urls.getUserTrendArtworks + '?username=' + username).then(data => {
            if (data != 0) {
                let theArray: any[] = data
                let theItems = theArray.map(item =>
                    <div className="col-sm-6 col-md-4 p-2" key={item.id}>
                        <ArtworkPreview artworkdata={item} />
                    </div>
                )
                setArtworkItems(theItems)
            }
            else { setArtworkItems([] as JSX.Element[]) }
        })
    }

    useEffect(() => {
        loadData()
    }, [username, refreshKey])

    return (
        username
            ?
            <>
                <div className="mb-4">
                    <UserPreview username={username} />
                </div>
                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'artwork' ? 'active' : ''}`}
                            onClick={() => setActiveTab('artwork')}
                        >
                            发布作品
                        </button>
                    </li>
                </ul>
                <div className="row">
                    {artworkItems.length > 0 ? artworkItems : (
                        <div className="text-center p-4 text-muted">暂无作品</div>
                    )}
                </div>
            </>
            :
            <div className="text-center mt-5">
                <p className="text-muted">选择关注的用户查看动态</p>
            </div>
    )
}

function Trends({ refreshKey = 0 }: { refreshKey: number }) {
    const [selectedUsername, setSelectedUsername] = useState('')
    const [trenduserItems, setTrenduserItems] = useState([] as JSX.Element[])

    function renderTrenduserItems(data: any[]) {
        let theTrenduserItems = data.map(item =>
            <button
                key={item.username}
                className={`list-group-item list-group-item-action text-start ${selectedUsername === item.username ? 'active' : ''}`}
                onClick={() => { setSelectedUsername(item.username) }}
            >
                {item.name}
            </button>
        )
        setTrenduserItems(theTrenduserItems)
    }

    function getUserTrendUsers() {
        getRequest(urls.getUserTrendUsers).then(data => {
            if (data != 0) {
                renderTrenduserItems(data)
            }
        })
    }

    useEffect(() => {
        getUserTrendUsers()
    }, [refreshKey])

    return (
        <div className="row">
            <div className="col-md-4 mb-3">
                <div className="list-group">
                    {trenduserItems.length > 0 ? trenduserItems : (
                        <div className="list-group-item text-muted">暂无关注用户</div>
                    )}
                </div>
            </div>
            <div className="col-md-8">
                <UserTrend username={selectedUsername} refreshKey={refreshKey} />
            </div>
        </div>
    )
}

function UserNoticePawArtwork({ username = '', refreshTrigger = 0 }) {
    const [activeTab, setActiveTab] = useState('artwork')
    const [artworkItems, setArtworkItems] = useState([] as JSX.Element[])
    const [artworkcommentItems, setArtworkcommentItems] = useState([] as JSX.Element[])
    const [isLoading, setIsLoading] = useState(false)

    function loadData() {
        setIsLoading(true)
        getRequest(urls.getUserNoticePawArtwork + `?username=${username}`).then(data => {
            setIsLoading(false)
            if (data != 0) {
                let artworkObjArray: any[] = data.artwork || []
                let theArtworkItems = artworkObjArray.map(item => (
                    <div className="list-group-item" key={item.id}>
                        <div className="row align-items-center">
                            <div className="col-8">
                                <Link to={'/user/' + item.user.username} className="text-decoration-none">
                                    <img
                                        src={item.user.headimage ? urls.headimageURL + item.user.headimage : GArea.defaultHeadimage}
                                        alt="headimage"
                                        width={40}
                                        height={40}
                                        className="rounded me-2"
                                    />
                                    <strong>{item.user.name}</strong>
                                    <span className="text-muted ms-1">
                                        {Number(item.user.sex) == 1 ? '雄' : Number(item.user.sex) == 2 ? '雌' : ''} {item.user.species}
                                    </span>
                                </Link>
                                <div className="mt-1">给作品 <Link to={'/artwork/' + item.galleryid} className="text-decoration-none">{item.title}</Link> 印爪了</div>
                                <small className="text-muted">{toNormalDate(item.time)}</small>
                            </div>
                            <div className="col-4 text-end">
                                <Link to={'/artwork/' + item.galleryid}>
                                        <img
                                            src={urls.artworkimagePreviewURL + item.filename}
                                            alt="artworkimage"
                                            className="rounded"
                                            style={{ maxWidth: '100%', height: 'auto', maxHeight: '80px', objectFit: 'cover' }}
                                        />
                                    </Link>
                            </div>
                        </div>
                    </div>
                ))
                setArtworkItems(theArtworkItems)

                let artworkcommentObjArray: any[] = data.artworkcomment || []
                let theArtworkcommentItems = artworkcommentObjArray.map(item => (
                    <div className="list-group-item" key={item.id}>
                        <Link to={'/user/' + item.user.username} className="text-decoration-none">
                            <img
                                src={item.user.headimage ? urls.headimageURL + item.user.headimage : GArea.defaultHeadimage}
                                alt="headimage"
                                width={40}
                                height={40}
                                className="rounded me-2"
                            />
                            <strong>{item.user.name}</strong>
                            <span className="text-muted ms-1">
                                {Number(item.user.sex) == 1 ? '雄' : Number(item.user.sex) == 2 ? '雌' : ''} {item.user.species}
                            </span>
                        </Link>
                        <div className="mt-1">
                            给 <Link to={'/artwork/' + item.galleryid} className="text-decoration-none">作品</Link> 的评论 "{item.content}" 印爪了
                        </div>
                        <small className="text-muted">{toNormalDate(item.time)}</small>
                    </div>
                ))
                setArtworkcommentItems(theArtworkcommentItems)
            } else {
                setArtworkItems([])
                setArtworkcommentItems([])
            }
        })
    }

    useEffect(() => {
        loadData()
    }, [username, refreshTrigger])

    return (
        <>
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'artwork' ? 'active' : ''}`} onClick={() => setActiveTab('artwork')}>
                        作品 ({artworkItems.length})
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'artworkcomment' ? 'active' : ''}`} onClick={() => setActiveTab('artworkcomment')}>
                        作品评论 ({artworkcommentItems.length})
                    </button>
                </li>
            </ul>
            {isLoading ? (
                <div className="text-center p-4">
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">加载中...</span>
                    </div>
                </div>
            ) : (
                <div className="list-group">
                    {activeTab === 'artwork' ? (
                        artworkItems.length > 0 ? artworkItems : <div className="list-group-item text-center text-muted">暂无印爪通知</div>
                    ) : (
                        artworkcommentItems.length > 0 ? artworkcommentItems : <div className="list-group-item text-center text-muted">暂无评论印爪通知</div>
                    )}
                </div>
            )}
        </>
    )
}

function UserNoticeTextEcho({ username = '', refreshTrigger = 0 }) {
    const [artworkcommentItems, setArtworkcommentItems] = useState([] as JSX.Element[])
    const [isLoading, setIsLoading] = useState(false)

    function loadData() {
        setIsLoading(true)
        getRequest(urls.getUserNoticeTextEcho + `?username=${username}`).then(data => {
            setIsLoading(false)
            if (data != 0) {
                let artworkcommentObjArray: any[] = data.artworkcomment || []
                let theArtworkcommentItems = artworkcommentObjArray.map(item => (
                    <div className="list-group-item" key={item.id}>
                        <div className="row align-items-center">
                            <div className="col-8">
                                <Link to={'/user/' + item.user.username} className="text-decoration-none">
                                    <img
                                        src={item.user.headimage ? urls.headimageURL + item.user.headimage : GArea.defaultHeadimage}
                                        alt="headimage"
                                        width={40}
                                        height={40}
                                        className="rounded me-2"
                                    />
                                    <strong>{item.user.name}</strong>
                                    <span className="text-muted ms-1">
                                        {Number(item.user.sex) == 1 ? '雄' : Number(item.user.sex) == 2 ? '雌' : ''} {item.user.species}
                                    </span>
                                </Link>
                                <div className="mt-1">给作品 <Link to={'/artwork/' + item.galleryid} className="text-decoration-none">{item.title}</Link> 留下评论</div>
                                <div className="mt-1 text-muted">“{item.content}”</div>
                                <small className="text-muted">{toNormalDate(item.time)}</small>
                            </div>
                            <div className="col-4 text-end">
                                <Link to={'/artwork/' + item.galleryid}>
                                    <img
                                        src={urls.artworkimagePreviewURL + item.filename}
                                        alt="artworkimage"
                                        className="rounded"
                                        style={{ maxWidth: '100%', height: 'auto', maxHeight: '80px', objectFit: 'cover' }}
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
                setArtworkcommentItems(theArtworkcommentItems)
            } else {
                setArtworkcommentItems([])
            }
        })
    }

    useEffect(() => {
        loadData()
    }, [username, refreshTrigger])

    return (
        <>
            {isLoading ? (
                <div className="text-center p-4">
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">加载中...</span>
                    </div>
                </div>
            ) : (
                <div className="list-group">
                    {artworkcommentItems.length > 0 ? artworkcommentItems : (
                        <div className="list-group-item text-center text-muted">暂无回复通知</div>
                    )}
                </div>
            )}
        </>
    )
}

function UserNoticeWatcher({ username = '', refreshTrigger = 0 }) {
    const [items, setItems] = useState([] as JSX.Element[])
    const [isLoading, setIsLoading] = useState(false)

    function loadData() {
        setIsLoading(true)
        getRequest(urls.getUserNoticeWatcher + `?username=${username}`).then(data => {
            setIsLoading(false)
            if (data != 0) {
                let objArray: any[] = data
                let theItems = objArray.map(item => (
                    <div className="list-group-item" key={item.id}>
                        <Link to={'/user/' + item.user.username} className="text-decoration-none">
                            <img
                                src={item.user.headimage ? urls.headimageURL + item.user.headimage : GArea.defaultHeadimage}
                                alt="headimage"
                                width={40}
                                height={40}
                                className="rounded me-2"
                            />
                            <strong>{item.user.name}</strong>
                            <span className="text-muted ms-1">
                                {Number(item.user.sex) == 1 ? '雄' : Number(item.user.sex) == 2 ? '雌' : ''} {item.user.species}
                            </span>
                        </Link>
                        <span className="ms-2">成为了你的粉丝！</span>
                        <br />
                        <small className="text-muted">{toNormalDate(item.time)}</small>
                    </div>
                ))
                setItems(theItems)
            } else {
                setItems([])
            }
        })
    }

    useEffect(() => {
        loadData()
    }, [username, refreshTrigger])

    return (
        <>
            {isLoading ? (
                <div className="text-center p-4">
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">加载中...</span>
                    </div>
                </div>
            ) : (
                <div className="list-group">
                    {items.length > 0 ? items : (
                        <div className="list-group-item text-center text-muted">暂无粉丝通知</div>
                    )}
                </div>
            )}
        </>
    )
}

export function Notice() {
    const [username, setUsername] = useState('')
    const [noticeElement, setNoticeElement] = useState(<></>)
    const [selectedOption, setSelectedOption] = useState('pawArtwork')
    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const [trendsRefreshKey, setTrendsRefreshKey] = useState(0)
    const [isReReadMode, setIsReReadMode] = useState(false)
    const [noticeCounts, setNoticeCounts] = useState({
        pawArtwork: 0,
        textEcho: 0,
        watcher: 0,
        trends: 0
    })

    function loadNoticeCounts() {
        if (!username) return
        Promise.all([
            getRequest(urls.getUserNoticePawArtwork + `?username=${username}`).then(data => data != 0 ? (data.artwork?.length || 0) + (data.artworkcomment?.length || 0) : 0),
            getRequest(urls.getUserNoticeTextEcho + `?username=${username}`).then(data => data != 0 ? (data.artworkcomment?.length || 0) : 0),
            getRequest(urls.getUserNoticeWatcher + `?username=${username}`).then(data => data != 0 ? data.length : 0),
            getRequest(urls.getUserTrendUsers + `?username=${username}`).then(data => {
                if (data != 0) {
                    let promises = data.map((user: any) =>
                        getRequest(urls.getUserTrendArtworks + '?username=' + user.username).then(artworks => artworks != 0 ? artworks.length : 0)
                    )
                    return Promise.all(promises).then(results => results.reduce((a, b) => a + b, 0))
                }
                return 0
            })
        ]).then(([paw, echo, watcher, trends]) => {
            setNoticeCounts({ pawArtwork: paw, textEcho: echo, watcher: watcher, trends: trends })
        })
    }

    function selectOption(optionName: string) {
        let theElement = <></>
        switch (optionName) {
            case 'pawArtwork':
                theElement = <UserNoticePawArtwork username={username} refreshTrigger={refreshTrigger} />
                break
            case 'textEcho':
                theElement = <UserNoticeTextEcho username={username} refreshTrigger={refreshTrigger} />
                break
            case 'watcher':
                theElement = <UserNoticeWatcher username={username} refreshTrigger={refreshTrigger} />
                break
            case 'trends':
                theElement = <Trends refreshKey={trendsRefreshKey} />
                break
            default: return
        }
        setNoticeElement(theElement)
        setSelectedOption(optionName)
    }

    function handleReRead() {
        setIsReReadMode(true)
        Promise.all([
            postRequest(urls.noticeNotRead),
            postRequest(urls.trendNotRead)
        ]).then(() => {
            // 先更新刷新触发器
            const newRefreshTrigger = refreshTrigger + 1
            const newTrendsRefreshKey = trendsRefreshKey + 1
            setRefreshTrigger(newRefreshTrigger)
            setTrendsRefreshKey(newTrendsRefreshKey)
            // 重新加载数量
            loadNoticeCounts()
            // 强制刷新当前选中的内容
            if (selectedOption !== 'trends') {
                const elementMap = {
                    pawArtwork: <UserNoticePawArtwork username={username} refreshTrigger={newRefreshTrigger} />,
                    textEcho: <UserNoticeTextEcho username={username} refreshTrigger={newRefreshTrigger} />,
                    watcher: <UserNoticeWatcher username={username} refreshTrigger={newRefreshTrigger} />
                }
                setNoticeElement(elementMap[selectedOption as keyof typeof elementMap] || <></>)
            } else {
                setNoticeElement(<Trends refreshKey={newTrendsRefreshKey} />)
            }
            setTimeout(() => setIsReReadMode(false), 200)
        })
    }

    useEffect(() => {
        document.title = PageTitle.notice
        getRequest(urls.getSessionUser).then(data => {
            if (data != 0) {
                setUsername(data.username)
                selectOption('pawArtwork')
            }
        })
        return () => {
            postRequest(urls.noticeFinishRead)
            postRequest(urls.trendFinishRead)
        }
    }, [])

    useEffect(() => {
        if (username) {
            loadNoticeCounts()
            const interval = setInterval(loadNoticeCounts, 30000)
            return () => clearInterval(interval)
        }
    }, [username])

    return (
        <div className="container p-2">
            <div className="row">
                <div className="col-md-3 mb-3">
                    <h2 className="mb-3">消息</h2>
                    <div className="d-flex flex-column gap-2">
                        <button
                            className={`btn ${selectedOption === 'pawArtwork' ? 'btn-primary' : 'btn-outline-secondary'} position-relative`}
                            onClick={() => selectOption('pawArtwork')}
                        >
                            印爪
                            {!isReReadMode && noticeCounts.pawArtwork > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {noticeCounts.pawArtwork}
                                    <span className="visually-hidden">未读消息</span>
                                </span>
                            )}
                        </button>
                        <button
                            className={`btn ${selectedOption === 'textEcho' ? 'btn-primary' : 'btn-outline-secondary'} position-relative`}
                            onClick={() => selectOption('textEcho')}
                        >
                            回复
                            {!isReReadMode && noticeCounts.textEcho > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {noticeCounts.textEcho}
                                    <span className="visually-hidden">未读消息</span>
                                </span>
                            )}
                        </button>
                        <button
                            className={`btn ${selectedOption === 'watcher' ? 'btn-primary' : 'btn-outline-secondary'} position-relative`}
                            onClick={() => selectOption('watcher')}
                        >
                            粉丝
                            {!isReReadMode && noticeCounts.watcher > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {noticeCounts.watcher}
                                    <span className="visually-hidden">未读消息</span>
                                </span>
                            )}
                        </button>
                        <button
                            className={`btn ${selectedOption === 'trends' ? 'btn-primary' : 'btn-outline-secondary'} position-relative`}
                            onClick={() => selectOption('trends')}
                        >
                            动态
                            {!isReReadMode && noticeCounts.trends > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {noticeCounts.trends}
                                    <span className="visually-hidden">未读消息</span>
                                </span>
                            )}
                        </button>
                        <hr className="my-3"/>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={handleReRead}
                        >
                            回看
                        </button>
                    </div>
                </div>
                <div className="col-md-9">
                    {noticeElement}
                </div>
            </div>
        </div>
    )
}
