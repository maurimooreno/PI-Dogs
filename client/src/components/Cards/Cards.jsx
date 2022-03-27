import React from "react";
import './Cards.css'
import loading from '../../Assets/img/loading.gif'

import Card from "../Card/Card";

export default function Cards({dogs}){
    
    return(
        <div className="cards_container">
        {
            dogs.length >= 1 ? (
                dogs.map((dog) => {
                    return(
                        <Card
                            key={dog.id}
                            id={dog.id}
                            dogName={dog.name}
                            image={dog.image}
                            weight={dog.weight}
                            height={dog.height}
                            yearsOfLife={dog.yearsOfLife}
                            temperament={dog.temperament}
                        />
                    )
                })
            ) : (
                <div>
                    <img src={loading} alt="loading..." />
                </div>
            )
        }
        </div>
    )
}