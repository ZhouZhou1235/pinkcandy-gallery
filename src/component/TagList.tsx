import { JSX, useEffect, useState } from "react";
import { DefaultObj } from "../vars/ConstVars";
import { Tag } from "antd";
import { tagtypeNumToColorString } from "../utils/tools";

export function TagList({tagArray=DefaultObj.tagArray}){
    const [tagItems,setTagItems] = useState([] as JSX.Element[])
    useEffect(()=>{
        if(tagArray[0]['id']){
            let theTagItems = tagArray.map(item=>
                <Tag key={item.id} color={tagtypeNumToColorString(Number(item.type))}>
                    {item.tag} {item.usenum}
                </Tag>
            )
            setTagItems(theTagItems)
        }
    },[tagArray])
    return(
        <>
            <div className="p-2">{tagItems}</div>
        </>
    )
}
