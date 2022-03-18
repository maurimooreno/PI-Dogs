import React from "react";


export default function Card({id, name, image, weight, height, temperament}){
    let tempArr = temperament?.map(t=> t.name)
    tempArr = tempArr?.join(', ')
    return(
        <div className="card_conteiner">
            <h3>{name}</h3>
            <img src={image} alt="imagen not Found" height='200px' width='200px'/>
            <p>Peso</p>
            <p>{weight}</p>
            <p>Temperamentos</p>
            <p>{tempArr}</p>
        </div>
    )
}