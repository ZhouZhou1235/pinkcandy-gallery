import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { DefaultObj, GArea } from "../../vars/ConstVars";
import { Link } from "react-router";
import { ArtworkPawArea } from "./ArtworkPawArea";
import { LazyLoadComponent } from 'react-lazy-load-image-component';

export function ArtworkPreview({artworkdata=DefaultObj.artworkdata}){
    return(
        <Card>
            <Link to={'/artwork/'+artworkdata.id}>
                <LazyLoadComponent children={
                    <CardMedia
                        sx={{ height: 250 }}
                        image={ GArea.artworkimagePreviewURL+artworkdata.filename }
                        title="artworkimage"
                    />
                } />
            </Link>
            <CardContent>
                <Link to={'/artwork/'+artworkdata.id}>
                    <Typography gutterBottom variant="h5" component="div" className="OnelineTextBox">
                        { artworkdata.title }
                    </Typography>
                </Link>
            </CardContent>
            <div className="text-center">
                <ArtworkPawArea galleryid={artworkdata.id}/>
            </div>
        </Card>
    )
}
