import React from "react";
import {Link} from 'react-router-dom';
import './Principal.css';
import prinicipal from '../../Assets/img/principal.jpg'


export default function Principal() {
    
    return(
        <div className="principal">
            <div className="img_right">
                <img  src={prinicipal} alt="not found" />
            </div>
                <div>
                    <h2>WELCOME TO THE DOGS API</h2>
                <Link to={'/home'}>
                    <button className="button">INGRESAR</button>
                </Link>
                </div>
            <div className="img_left" >
                <img src={prinicipal} alt="not found" />
            </div>
        </div>
    )
}