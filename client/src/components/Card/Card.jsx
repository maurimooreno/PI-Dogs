import React from "react";


export default function Card({id, name, image, weight, height, temperament}){
    let tempArr = temperament?.join(', ')

    return(
        <div className="card_conteiner" key={id}>
            <h3>{name}</h3>
            <img src={image} alt="imagen not Found" height='200px' width='200px'/>
            <p>Peso</p>
            <p>Min</p>
            <p>{weight[0]}</p>
            <p>Max</p>
            <p>{weight[1]}</p>
            <p>Temperamentos</p>
            <p>{tempArr}</p>
        </div>
    )
}