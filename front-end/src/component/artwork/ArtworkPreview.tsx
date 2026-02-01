import { DefaultObj } from "../../vars/ConstVars";
import { Link } from "react-router";
import { ArtworkPawArea } from "./ArtworkPawArea";
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { urls } from "../../vars/urls";
import { useState } from "react";

export function ArtworkPreview({artworkdata=DefaultObj.artworkdata}){
    const [showTitle, setShowTitle] = useState(false);
    return(
        <div className="card h-100">
            <div 
                className="position-relative"
                onMouseEnter={() => setShowTitle(true)}
                onMouseLeave={() => setShowTitle(false)}
            >
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
                {showTitle && (
                    <div className="position-absolute bottom-0 start-0 w-100 p-2 bg-dark bg-opacity-75">
                        <Link 
                            to={'/artwork/'+artworkdata.id} 
                            className="text-decoration-none text-white"
                        >
                            <h6 className="mb-0 OnelineTextBox">
                                {artworkdata.title}
                            </h6>
                        </Link>
                    </div>
                )}
            </div>
            <div className="card-body d-flex flex-column">
                <div className="mt-auto">
                    <ArtworkPawArea galleryid={artworkdata.id}/>
                </div>
            </div>
        </div>
    )
}
