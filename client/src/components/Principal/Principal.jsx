import React from "react";
import {Link} from 'react-router-dom';

export default function Principal() {
    
    return(
        <div>
            <img src="" alt="Imgagen" />
            <Link to={'/home'}>
                <button>HOME</button>
            </Link>
        </div>
    )
}