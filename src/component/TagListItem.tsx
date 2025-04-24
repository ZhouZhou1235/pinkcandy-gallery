import { tagtypeNumToColorString, tagtypeNumToString } from "../utils/tools";

// <ul className="list-group list-group-flush"></ul>

export function TagListItem({data={tag:'',type:0}}){
    let typeNum = Number(data.type)
    let colorStr = tagtypeNumToColorString(typeNum)
    let typeStr = tagtypeNumToString(typeNum)
    return(
        <li className="list-group-item" style={{ color:colorStr  }}>
            { typeStr } - { data.tag }
        </li>
    )
}
