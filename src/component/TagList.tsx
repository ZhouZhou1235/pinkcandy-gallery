import { useEffect, useState } from "react";
import { DefaultObj } from "../vars/ConstVars";
import { Tag } from "antd";
import { tagtypeNumToColorString } from "../utils/tools";

export function TagList({tagArray=DefaultObj.tagArray}){
    const [tagItems,setTagItems] = useState([<span key={1}></span>])
    useEffect(()=>{
        let theTagItems = tagArray.map(item=>
            <Tag key={item.id} color={tagtypeNumToColorString(Number(item.type))}>
                {item.tag} {item.usenum}
            </Tag>
        )
        setTagItems(theTagItems)
    },[])
    return(
        <>
            <div className="p-2">{tagItems}</div>
        </>
    )
}
