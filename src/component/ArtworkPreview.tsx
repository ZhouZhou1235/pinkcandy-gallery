import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { DefaultObj, GArea } from "../vars/ConstVars";
import { Link } from "react-router";
import { ArtworkPawArea } from "./ArtworkPawArea";
import { toNormalDate } from "../utils/tools";

export function ArtworkPreview({artworkdata=DefaultObj.artworkdata}){
    return(
        <Card sx={{ mt: 2 }}>
                <Link to={'/artwork/'+artworkdata.id}>
                    <CardMedia
                        sx={{ height: 200 }}
                        image={ GArea.artworkimagePreviewURL+artworkdata.filename }
                        title="artworkimage"
                    />
                </Link>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        { artworkdata.title }
                    </Typography>
                    <small>{ toNormalDate(artworkdata.time) }</small>
                </CardContent>
            <div className="text-center">
                <ArtworkPawArea galleryid={artworkdata.id}/>
            </div>
        </Card>
    )
}
