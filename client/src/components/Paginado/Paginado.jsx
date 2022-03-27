import React from "react";
import './Paginado.css'

export default function Paginado({paginado, dogsPerPage, dogs}){
    
    let page = [];
    for (let i = 0; i < Math.ceil(dogs/dogsPerPage); i++) {
        page.push(i+1)
    }

    return(
        <div className="paginado_container">
            {page.length ? (
                <div>
                {page.map((num) => (
                    <button key={num} onClick={()=> paginado(num)}>
                    {num}
                    </button>
                ))}
                </div>
            ) : (
                <p><button>1</button></p>
            )}
        </div>
    )
}