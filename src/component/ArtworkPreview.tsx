import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { DefaultObj, GArea } from "../vars/ConstVars";
import { Link } from "react-router";

export function ArtworkPreview({artworkdata=DefaultObj.artworkdata}){
    return(
        <Box>
            <Card sx={{ mt: 2 }}>
                <Link to={'/artwork/'+artworkdata.id}>
                    <CardMedia
                        sx={{ height: 200 }}
                        image={ GArea.artworkimagePreviewURL+artworkdata.filename }
                        title="artworkimage"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            { artworkdata.title }
                        </Typography>
                    </CardContent>
                </Link>
            </Card>
        </Box>
    )
}
