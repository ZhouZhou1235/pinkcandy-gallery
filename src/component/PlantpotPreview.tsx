import { Card, CardContent, Typography } from "@mui/material";
import { DefaultObj, GArea } from "../vars/ConstVars";
import { toNormalDate } from "../utils/tools";
import { PlantpotPawArea } from "./PlantpotPawArea";
import { Link } from "react-router";

export function PlantpotPreview({plantpotdata=DefaultObj.plantpotdata}){
    return(
        <Card>
            <CardContent>
                <div className="row">
                    <div className="col-8">
                        <Link to={'/plantpot/'+plantpotdata.id}>
                            <Typography gutterBottom variant="h5" component="div" className="OnelineTextBox">
                                { plantpotdata.title }
                            </Typography>
                        </Link>
                        <p className="TextPreviewBox">{ plantpotdata.content }</p>
                        <small>{ toNormalDate(plantpotdata.createtime) } 创建</small>
                        <br />
                        <small>{ toNormalDate(plantpotdata.updatetime) } 更新</small>
                        <br />
                        <PlantpotPawArea gardenid={plantpotdata.id} />
                    </div>
                    {
                        plantpotdata.filename
                        ?
                        <div className="col-4">
                            <Link to={'/plantpot/'+plantpotdata.id}>
                                <div className="squareBox">
                                    <img src={ GArea.plantpotimageURL+plantpotdata.filename } alt="plantpotimage"/>
                                </div>
                            </Link>
                        </div>
                        :
                        null
                    }
                </div>
            </CardContent>
        </Card>
    )
}
