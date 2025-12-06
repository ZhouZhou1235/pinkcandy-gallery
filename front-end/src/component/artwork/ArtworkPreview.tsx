import { DefaultObj } from "../../vars/ConstVars";
import { Link } from "react-router";
import { ArtworkPawArea } from "./ArtworkPawArea";
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { urls } from "../../vars/urls";

export function ArtworkPreview({artworkdata=DefaultObj.artworkdata}){
    return(
        <div className="card h-100">
            <Link to={'/artwork/'+artworkdata.id}>
                <LazyLoadComponent>
                    <div className="ratio ratio-1x1">
                        <img 
                            src={ urls.artworkimagePreviewURL+artworkdata.filename }
                            alt={artworkdata.title}
                            className="card-img-top"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </LazyLoadComponent>
            </Link>
            <div className="card-body d-flex flex-column">
                <Link to={'/artwork/'+artworkdata.id} className="text-decoration-none text-dark">
                    <h5 className="card-title OnelineTextBox mb-2">
                        { artworkdata.title }
                    </h5>
                </Link>
                <div className="mt-auto">
                    <ArtworkPawArea galleryid={artworkdata.id}/>
                </div>
            </div>
        </div>
    )
}
