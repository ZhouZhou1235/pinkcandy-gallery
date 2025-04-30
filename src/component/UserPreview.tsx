import { Avatar } from "antd";
import { DefaultObj, GArea } from "../vars/ConstVars";

export function UserPreview({userdata=DefaultObj.userdata}){
    return(
        <>
            <Avatar shape="square" size={64} icon={
                <img src={
                    userdata.headimage
                    ?
                    GArea.headimageURL+userdata.headimage
                    :
                    GArea.defaultHeadimage
                } alt="headimage" />
            } />
            <br />
            <span style={{fontSize:'2em'}}>{ userdata.name }</span>
            <br />
            <span>
                { Number(userdata.sex)==1?'雄':Number(userdata.sex)==2?'雌':'' }
                &nbsp;
                { userdata.species?userdata.species:'' }
            </span>
        </>
    )
}
