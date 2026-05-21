import { JSX, useEffect, useState } from "react";
import { DefaultObj } from "../code/vars";
import { tagtypeNumToColorString } from "../code/utils";

export function TagList({tagArray=DefaultObj.tagArray}){
    const [tagItems,setTagItems] = useState([] as JSX.Element[])
    useEffect(()=>{
        if(tagArray[0]['id']){
            let theTagItems = tagArray.map(item=>
                <span key={item.id} className={`badge me-2 mb-2`} style={{backgroundColor: tagtypeNumToColorString(Number(item.type)), color: 'white'}}>
                    {item.tag} {item.usenum}
                </span>
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
