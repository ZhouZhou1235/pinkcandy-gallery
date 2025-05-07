import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { DefaultObj, GArea } from "../vars/ConstVars";
import { toNormalDate } from "../utils/tools";
import { PlantpotPawArea } from "./PlantpotPawArea";

export function PlantpotPreview({plantpotdata=DefaultObj.plantpotdata}){
    return(
        <Card sx={{ mt: 2 }}>
            <div className="row">
                <div className="col-8">
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            { plantpotdata.title }
                        </Typography>
                        <p style={{whiteSpace:'pre-line'}}>
                            { plantpotdata.content }
                        </p>
                        <small>{ toNormalDate(plantpotdata.createtime) } 创建</small>
                        <br />
                        <small>{ toNormalDate(plantpotdata.updatetime) } 更新</small>
                    </CardContent>
                    <div className="text-center">
                        <PlantpotPawArea gardenid={plantpotdata.id} />
                    </div>
                </div>
                <div className="col-4">
                    {
                        plantpotdata.filename
                        ?
                        <CardMedia
                            sx={{ height: 200 }}
                            image={ GArea.plantpotimageURL+plantpotdata.filename }
                            title="plantpotimage"
                        />
                        :
                        null
                    }
                </div>
            </div>
        </Card>
    )
}
