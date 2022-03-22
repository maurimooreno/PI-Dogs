import React from "react";

import Card from "../Card/Card";

export default function Cards({dogs}){
    
    return(
        <div>
        {
            dogs.length ? (
                dogs.map((dog) => {
                    return(
                        <Card
                            key={dog.id}
                            id={dog.id}
                            name={dog.name}
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
                    loading...
                </div>
            )
        }
        </div>
    )
}