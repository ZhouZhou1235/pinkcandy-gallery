import { JSX, useEffect, useState } from "react"
import { getRequest, postRequest } from "../../utils/HttpRequest"
import { urls } from "../../vars/urls"
import { Link } from "react-router"
import { GArea } from "../../vars/ConstVars"
import { toNormalDate } from "../../utils/tools"

export function BoardForm() {
    const [updatenum, setUpdatenum] = useState(0)
    const [boardForm, setBoardForm] = useState({ content: '' })
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [boardItems, setBoardItems] = useState([] as JSX.Element[])

    function addBoardMessage() {
        if (!boardForm.content.trim()) {
            alert('请输入留言内容')
            return
        }
        setBtnDisabled(true)
        postRequest(urls.addBoardMessage, boardForm).then(data => {
            if (typeof data == 'number') {
                if (data == 1) {
                    setUpdatenum(updatenum + 1)
                    setBoardForm({ content: '' })
                }
                setBtnDisabled(false)
            }
        })
    }

    useEffect(() => {
        getRequest(urls.getBoradMessages + '?num=' + GArea.defaultShowNum).then(data => {
            if (typeof data == 'object') {
                let boardMessages: any[] = data
                let theBoardItems = boardMessages.map(item => (
                    <div className="list-group-item" key={item.id}>
                        <Link to={'/user/' + item.username} className="text-decoration-none">
                            <strong>{item.user?.name || item.username}</strong>
                        </Link>
                        <span className="ms-2">{item.content}</span>
                        <br />
                        <small className="text-muted">{toNormalDate(item.time)}</small>
                    </div>
                ))
                setBoardItems(theBoardItems)
            }
        })
    }, [updatenum])

    return (
        <div className="row">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">粉糖留言板</h5>
                        <p className="card-text small text-muted">留下想说的话吧！</p>
                        <textarea
                            className="form-control"
                            rows={3}
                            placeholder="说些什么......"
                            value={boardForm.content}
                            onChange={(e) => {
                                setBoardForm({ content: e.target.value })
                            }}
                        />
                        <button
                            className="btn btn-outline-primary mt-3 w-100"
                            onClick={addBoardMessage}
                            disabled={btnDisabled}
                        >
                            {btnDisabled ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    发送中...
                                </>
                            ) : '留言'}
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">留言列表</h5>
                        <div className="list-group">
                            {boardItems.length > 0 ? boardItems : (
                                <div className="list-group-item text-center text-muted">暂无留言</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
