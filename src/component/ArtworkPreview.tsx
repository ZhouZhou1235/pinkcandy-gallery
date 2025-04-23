import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { DefaultObj, GArea } from "../vars/ConstVars";

export function ArtworkPreview({artworkdata=DefaultObj.artworkdata}){
    return(
        <Box>
            <Card sx={{ mt: 2 }}>
                <CardMedia
                    sx={{ height: 200 }}
                    image={ GArea.artworkimageURL+artworkdata.filename }
                    title="artworkimage"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        { artworkdata.title }
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}
