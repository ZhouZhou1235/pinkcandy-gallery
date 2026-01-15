import { Box, Button, FormControl, Stack, Tab, Tabs } from "@mui/material";
import { JSX, SyntheticEvent, useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { GArea, PageTitle } from "../vars/ConstVars";
import { toNormalDate } from "../utils/tools";
import { Link } from "react-router";
import { TabContext, TabPanel } from "@mui/lab";
import { ArtworkPreview } from "../component/artwork/ArtworkPreview";
import { UserPreview } from "../component/user/UserPreview";

function UserTrend({ username = '' }: { username: string }) {
    const [artworkItems, setArtworkItems] = useState([] as JSX.Element[])
    const [tabvalue, setTabvalue] = useState('artwork')
    const tabHandleChange = (_event: SyntheticEvent, newTabvalue: string) => { setTabvalue(newTabvalue) }
    function loadData() {
        getRequest(urls.getUserTrendArtworks + '?username=' + username).then(data => {
            if (data != 0) {
                let theArray: any[] = data
                let theItems = theArray.map(item =>
                    <div className="col-sm-4 p-2" key={item.id}>
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
    }, [username])
    return (
        username
            ?
            <>
                <div className="mb-4">
                    <UserPreview username={username} />
                </div>
                <TabContext value={tabvalue}>
                    <Tabs
                        value={tabvalue}
                        onChange={tabHandleChange}
                    >
                        <Tab value="artwork" label="发布作品" />
                    </Tabs>
                    <TabPanel value={'artwork'}>
                        <div className="row">
                            {artworkItems}
                        </div>
                    </TabPanel>
                </TabContext>
            </>
            :
            <div className="text-center mt-5">
                <p className="text-muted">选择关注的用户查看动态</p>
            </div>
    )
}

function Trends() {
    const [selectedUsername, setSelectedUsername] = useState('')
    const [trenduserItems, setTrenduserItems] = useState([] as JSX.Element[])
    function renderTrenduserItems(data: any[]) {
        let theTrenduserItems = data.map(item =>
            <div key={item.username} className="row p-2 align-items-center">
                <Button
                    onClick={() => { setSelectedUsername(item.username) }}
                    variant={"outlined"}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                >
                    {item.name}
                </Button>
            </div>
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
    }, [])
    return (
        <Box>
            <div className="container p-2">
                <div className="row">
                    <div className="col-sm-3">
                        <Stack>
                            {trenduserItems}
                        </Stack>
                    </div>
                    <div className="col-sm-9">
                        <UserTrend username={selectedUsername} />
                    </div>
                </div>
            </div>
        </Box>
    )
}

function UserNoticePawArtwork({ username = '' }) {
    const [tabvalue, setTabvalue] = useState('artwork')
    const tabHandleChange = (_event: SyntheticEvent, newTabvalue: string) => { setTabvalue(newTabvalue) }
    const [artworkItems, setArtworkItems] = useState([] as JSX.Element[])
    const [artworkcommentItems, setArtworkcommentItems] = useState([] as JSX.Element[])
    useEffect(() => {
        getRequest(urls.getUserNoticePawArtwork + `?username=${username}`).then(data => {
            if (data != 0) {
                let artworkObjArray: any[] = data.artwork
                let theArtworkItems = artworkObjArray.map(item =>
                    <div className="list-group-item" key={item.id}>
                        <div className="row">
                            <div className="col-9">
                                <Link to={'/user/' + item.user.username}>
                                    <img
                                        src={
                                            item.user.headimage
                                                ?
                                                urls.headimageURL + item.user.headimage
                                                :
                                                GArea.defaultHeadimage
                                        }
                                        alt="headimage"
                                        width={50}
                                        height={50}
                                        className="rounded"
                                    />
                                    {item.user.name} {Number(item.user.sex) == 1 ? '雄' : Number(item.user.sex) == 2 ? '雌' : ''} {item.user.species}
                                </Link>
                                <br />
                                给作品 {item.title} 印爪了
                                <br />
                                <small>{toNormalDate(item.time)}</small>
                            </div>
                            <div className="col-3" style={{ overflow: 'hidden' }}>
                                <Link to={'/artwork/' + item.galleryid}>
                                    <img
                                        src={urls.artworkimagePreviewURL + item.filename}
                                        alt="artworkimage"
                                        height={100}
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                )
                setArtworkItems(theArtworkItems)
                let artworkcommentObjArray: any[] = data.artworkcomment
                let theArtworkcommentItems = artworkcommentObjArray.map(item =>
                    <div className="list-group-item" key={item.id}>
                        <Link to={'/user/' + item.user.username}>
                            <img
                                src={
                                    item.user.headimage
                                        ?
                                        urls.headimageURL + item.user.headimage
                                        :
                                        GArea.defaultHeadimage
                                }
                                alt="headimage"
                                width={50}
                                height={50}
                                className="rounded"
                            />
                            {item.user.name} {Number(item.user.sex) == 1 ? '雄' : Number(item.user.sex) == 2 ? '雌' : ''} {item.user.species}
                        </Link>
                        <br />
                        给 <Link to={'/artwork/' + item.galleryid}>作品</Link> 的评论 {item.content} 印爪了
                        <br />
                        <small>{toNormalDate(item.time)}</small>
                    </div>
                )
                setArtworkcommentItems(theArtworkcommentItems)
            }
        })
    }, [username])
    return (
        <TabContext value={tabvalue}>
            <Tabs
                value={tabvalue}
                onChange={tabHandleChange}
            >
                <Tab value="artwork" label="作品" />
                <Tab value="artworkcomment" label="作品评论" />
            </Tabs>
            <TabPanel value={'artwork'}>
                <div className="list-group">
                    {artworkItems}
                </div>
            </TabPanel>
            <TabPanel value={'artworkcomment'}>
                <div className="list-group">
                    {artworkcommentItems}
                </div>
            </TabPanel>
        </TabContext>
    )
}

function UserNoticeTextEcho({ username = '' }) {
    const [tabvalue, setTabvalue] = useState('artworkcomment')
    const tabHandleChange = (_event: SyntheticEvent, newTabvalue: string) => { setTabvalue(newTabvalue) }
    const [artworkcommentItems, setArtworkcommentItems] = useState([] as JSX.Element[])
    useEffect(() => {
        getRequest(urls.getUserNoticeTextEcho + `?username=${username}`).then(data => {
            if (data != 0) {
                let artworkcommentObjArray: any[] = data.artworkcomment
                let theArtworkcommentItems = artworkcommentObjArray.map(item =>
                    <div className="list-group-item" key={item.id}>
                        <div className="row">
                            <div className="col-9">
                                <Link to={'/user/' + item.user.username}>
                                    <img
                                        src={
                                            item.user.headimage
                                                ?
                                                urls.headimageURL + item.user.headimage
                                                :
                                                GArea.defaultHeadimage
                                        }
                                        alt="headimage"
                                        width={50}
                                        height={50}
                                        className="rounded"
                                    />
                                    {item.user.name} {Number(item.user.sex) == 1 ? '雄' : Number(item.user.sex) == 2 ? '雌' : ''} {item.user.species}
                                </Link>
                                <br />
                                给作品 {item.title} 留下评论
                                <br />
                                {item.content}
                                <br />
                                <small>{toNormalDate(item.time)}</small>
                            </div>
                            <div className="col-3" style={{ overflow: 'hidden' }}>
                                <Link to={'/artwork/' + item.galleryid}>
                                    <img
                                        src={urls.artworkimagePreviewURL + item.filename}
                                        alt="artworkimage"
                                        height={100}
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                )
                setArtworkcommentItems(theArtworkcommentItems)
            }
        })
    }, [username])
    return (
        <TabContext value={tabvalue}>
            <Tabs
                value={tabvalue}
                onChange={tabHandleChange}
            >
                <Tab value="artworkcomment" label="作品评论" />
            </Tabs>
            <TabPanel value={'artworkcomment'}>
                <div className="list-group">
                    {artworkcommentItems}
                </div>
            </TabPanel>
        </TabContext>
    )
}

function UserNoticeWatcher({ username = '' }) {
    const [items, setItems] = useState([] as JSX.Element[])
    useEffect(() => {
        getRequest(urls.getUserNoticeWatcher + `?username=${username}`).then(data => {
            if (data != 0) {
                let objArray: any[] = data
                let theItems = objArray.map(item =>
                    <div className="list-group-item" key={item.id}>
                        <Link to={'/user/' + item.user.username}>
                            <img
                                src={
                                    item.user.headimage
                                        ?
                                        urls.headimageURL + item.user.headimage
                                        :
                                        GArea.defaultHeadimage
                                }
                                alt="headimage"
                                width={50}
                                height={50}
                                className="rounded"
                            />
                            {item.user.name} {Number(item.user.sex) == 1 ? '雄' : Number(item.user.sex) == 2 ? '雌' : ''} {item.user.species}
                        </Link>
                        &nbsp;成为粉丝！
                        <br />
                        <small>{toNormalDate(item.time)}</small>
                    </div>
                )
                setItems(theItems)
            }
        })
    }, [username])
    return (
        <div className="list-group">
            {items}
        </div>
    )
}

export function Notice() {
    const [username, setUsername] = useState('')
    const [noticeElement, setNoticeElement] = useState(<></>)
    const [selectedOption, setSelectedOption] = useState('')
    function selectOption(optionName = '') {
        let ok = true
        let theElement = <></>
        switch (optionName) {
            case 'pawArtwork':
                theElement = <UserNoticePawArtwork username={username} />
                break
            case 'textEcho':
                theElement = <UserNoticeTextEcho username={username} />
                break
            case 'watcher':
                theElement = <UserNoticeWatcher username={username} />
                break
            case 'trends':
                theElement = <Trends />
                break
            default: ok = false
        }
        if (ok) {
            setNoticeElement(theElement)
            setSelectedOption(optionName)
        }
    }
    function noticeFinishRead() {
        postRequest(urls.noticeFinishRead)
        postRequest(urls.trendFinishRead)
    }
    
    function noticeNotRead() {
        postRequest(urls.noticeNotRead)
        postRequest(urls.trendNotRead)
    }
    useEffect(() => {
        document.title = PageTitle.notice
        getRequest(urls.getSessionUser).then(data => {
            if (data != 0) {
                setUsername(data.username)
            }
        })
        return ()=>{noticeFinishRead()}
    }, [])
    return (
        <Box>
            <div className="container p-2">
                <div className="row">
                    <div className="col-sm-3">
                        <h2>消息</h2>
                        <FormControl fullWidth>
                            <Button
                                variant={selectedOption == 'pawArtwork' ? 'contained' : 'text'}
                                onClick={() => { selectOption('pawArtwork') }}
                                fullWidth
                            >
                                印爪
                            </Button>
                            <Button
                                variant={selectedOption == 'textEcho' ? 'contained' : 'text'}
                                onClick={() => { selectOption('textEcho') }}
                                fullWidth
                            >
                                回复
                            </Button>
                            <Button
                                variant={selectedOption == 'watcher' ? 'contained' : 'text'}
                                onClick={() => { selectOption('watcher') }}
                                fullWidth
                            >
                                粉丝
                            </Button>
                            <Button
                                variant={selectedOption == 'trends' ? 'contained' : 'text'}
                                onClick={() => { selectOption('trends') }}
                                fullWidth
                            >
                                动态
                            </Button>
                            <Button color="inherit" onClick={noticeNotRead}>回看</Button>
                        </FormControl>
                    </div>
                    <div className="col-sm-9">
                        {noticeElement}
                    </div>
                </div>
            </div>
        </Box>
    )
}
