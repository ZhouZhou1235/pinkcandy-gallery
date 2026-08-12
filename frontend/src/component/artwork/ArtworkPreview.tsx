import { DefaultObj, GArea } from "../../code/vars";
import { Link } from "react-router";
import { ArtworkPawArea } from "./ArtworkPawArea";
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { urls } from "../../code/api";
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
                                src={
                                    artworkdata.grading==0
                                    ?
                                    urls.artworkimagePreviewURL+artworkdata.filename
                                    :
                                    GArea.gradingPlaceholder
                                }
                                alt={artworkdata.title}
                                className="card-img-top"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </LazyLoadComponent>
                </Link>
                {artworkdata.audit==0 && (
                    <span className="position-absolute top-0 start-0 m-2 badge bg-warning text-dark">
                        未审核
                    </span>
                )}
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
