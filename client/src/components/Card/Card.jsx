import React from "react";
import {Link} from 'react-router-dom';
import './Card.css'


export default function Card({id, dogName, image, weight, height, temperament}){
    let tempArr = temperament?.join(', ')
    let weightArr = weight?.join(' - ')

    return(
        <div className="card_conteiner" key={id} id={id}>
                <div className="card_header">
                <Link to={`/CardDetail/${id}`}>
                    <img src={image} alt="imagen not Found"/>
                </Link>
                    <h3>🐶{dogName}</h3>
                </div>
                <div className="card_body">
                    <p className="weight_title">PESO:</p>
                    <div className="weight_data">
                        <div>
                            <p>{weightArr} KG</p>
                        </div>
                    </div>
                </div>
                <div className="card_footer">
                    <p>Temperamentos</p>
                    <p>{tempArr}</p>
                </div>
        </div>
    )
}