import { faShieldDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { postRequest, urls } from "../../code/api";

export function UserWatchButton({ username = '' }) {
    const [haveWatch, setHaveWatch] = useState(false)
    async function watchUser() { return postRequest(urls.watchUser, { towatch: username }) }
    useEffect(() => {
        postRequest(urls.haveWatch, { towatch: username }).then(res => {
            if (res == 0) { setHaveWatch(false) }
            else { setHaveWatch(true) }
        })
    }, [username])

    return (
        <button
            className={`btn btn-${haveWatch ? 'secondary' : 'outline-secondary'} w-100`}
            onClick={() => { watchUser().then(res => { if (res == 1) { setHaveWatch(!haveWatch) } }) }}
        >
            <FontAwesomeIcon icon={faShieldDog} className="me-2" />
            {!haveWatch ? '关注' : '已关注'}
        </button>
    )
}
