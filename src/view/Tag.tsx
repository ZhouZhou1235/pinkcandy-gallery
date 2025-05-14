import { Box, Button, Grid, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/HttpRequest";
import { urls } from "../vars/urls";
import { DefaultObj, GArea } from "../vars/ConstVars";
import { tagtypeNumToColorString } from "../utils/tools";
import { EditTagForm } from "../component/form/EditTagForm";
import { DeleteTagButton } from "../component/DeleteTagButton";

export function Tag(){
    const [tagPage,setTagPage] = useState(1)
    const [tagtableItems,setTagtableItems] = useState([<TableRow key={1}></TableRow>])
    const [searchtagText,setSearchtagText] = useState('')
    const [searchtagtableItems,setSearchtagtableItems] = useState([<TableRow key={1}></TableRow>])
    function renderTagtableItems(data=DefaultObj.tagArray){
        let theItems = data.map(item=>
            <TableRow key={item.id}>
                <TableCell style={{color:tagtypeNumToColorString(Number(item.type)),fontWeight:'bold'}}>{item.tag} {item.usenum}</TableCell>
                <TableCell>{item.info}</TableCell>
                <TableCell>
                    <EditTagForm tagdata={item}/>
                    <DeleteTagButton tagdata={item}/>
                </TableCell>
            </TableRow>
        )
        setTagtableItems(theItems)
    }
    function renderSearchTagtableItems(data=DefaultObj.tagArray){
        let theItems = data.map(item=>
            <TableRow key={item.id}>
                <TableCell style={{color:tagtypeNumToColorString(Number(item.type)),fontWeight:'bold'}}>{item.tag} {item.usenum}</TableCell>
                <TableCell>
                    <EditTagForm tagdata={item}/>
                    <DeleteTagButton tagdata={item}/>
                </TableCell>
            </TableRow>
        )
        setSearchtagtableItems(theItems)
    }
    function getTags(){
        getRequest(urls.getTags+`?num=${Math.floor(GArea.defaultShowNum)}`).then(data=>{
            if(data!=0){
                renderTagtableItems(data)
                getRequest(urls.getDBRecordCount+'?table=tag').then(count=>{
                    let pagenum = Math.round(count/Math.floor(GArea.defaultShowNum))+1
                    setTagPage(pagenum)
                })
            }
        })
    }
    function updateTagPage(_event:any,value:number){
        getRequest(urls.getTags+`?num=${Math.floor(GArea.defaultShowNum)}&begin=${(value-1)*Math.floor(GArea.defaultShowNum)}`).then(data=>{
            if(data!=0){
                renderTagtableItems(data)
            }
        })
    }
    function searchTags(){
        getRequest(urls.searchTags+'?tagtext='+searchtagText).then(data=>{
            if(data!=0){
                let tagArray :any[] = data
                renderSearchTagtableItems(tagArray)
            }
        })
    }
    useEffect(()=>{
        getTags()
    },[])
    return(
        <Box>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 p-2">
                        <h2>标签系统</h2>
                        <div className="input-group mt-2 mb-2">
                            <input
                                className="form-control"
                                placeholder="输入标签"
                                onChange={(e)=>{setSearchtagText(e.target.value)}}
                            />
                            <button
                                className="btn btn-outline-secondary"
                                onClick={searchTags}
                            >搜索</button>
                        </div>
                        <div>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>标签</TableCell>
                                        <TableCell>操作</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchtagtableItems}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div className="col-sm-8 p-2">
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>标签</TableCell>
                                        <TableCell>描述</TableCell>
                                        <TableCell>操作</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tagtableItems}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid container spacing={2} minHeight={50}>
                            <Grid display="flex" justifyContent="center" alignItems="center">
                                <Pagination count={tagPage} onChange={ updateTagPage } />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </Box>
    )
}
