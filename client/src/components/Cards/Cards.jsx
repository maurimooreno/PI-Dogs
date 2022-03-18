import React from "react";

import Card from "../Card/Card";

export default function Cards({dogs}){
    
    return(
        <div>
        {
            dogs && dogs.map((dog) => {
                return(
                    <>
                        <Card
                            id={dog.id}
                            name={dog.name}
                            image={dog.image}
                            weight={dog.weight}
                            height={dog.height}
                            yearsOfLife={dog.yearsOfLife}
                            temperament={dog.temperament}
                        />
                    </>  
                )
            })
        }
        </div>
    )
}