import { toNormalDate } from "../../utils/tools";
import { DefaultObj, GArea } from "../../vars/ConstVars";
import { PlantpotCommentForm } from "./../form/PlantpotCommentForm";
import { PlantpotCommentList } from "./PlantpotCommentList";
import { UserPreview } from "./../user/UserPreview";

export function PlantpotFirst({plantpotdata=DefaultObj.plantpotdata}){
    return(
        <div className="row">
            <div className="col-sm-6">
                {
                    plantpotdata.filename
                    ?
                    <div className="backImageBox">
                        <img src={GArea.plantpotimageURL+plantpotdata.filename} alt="plantpotimage" width={'100%'}/>
                    </div>
                    :
                    null
                }
                <h1>{plantpotdata.title}</h1>
                <p style={{whiteSpace:'pre-line'}}>{plantpotdata.content}</p>
                <small>{toNormalDate(plantpotdata.createtime)} 创建</small>
                <br />
                <small>{toNormalDate(plantpotdata.updatetime)} 更新</small>
                <br />
                <UserPreview username={plantpotdata.username}/>
            </div>
            <div className="col-sm-6">
                <PlantpotCommentForm gardenid={plantpotdata.id}/>
                <PlantpotCommentList gardenid={plantpotdata.id}/>
            </div>
        </div>
    )
}
