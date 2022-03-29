import React from "react";
import {Link} from 'react-router-dom';
import './ErrorPage.css'

export default function ErrorPage(){
    return(
        <div className="error_container">
            <Link to={'/home'}>
                <button>Volver al home</button>
            </Link>
        </div>
    )
}