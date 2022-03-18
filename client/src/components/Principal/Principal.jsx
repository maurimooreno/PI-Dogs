import React from "react";
import {Link} from 'react-router-dom';

export default function Principal() {
    
    return(
        <div>
            <Link to={'/home'}>
                <button>HOME</button>
            </Link>
        </div>
    )
}