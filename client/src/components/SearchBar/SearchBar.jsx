import React, {useState} from "react";
import { useDispatch } from "react-redux";

import { findDogs } from "../../actions/index.jsx";

export default function SearchBar (){
    const dispatch = useDispatch();

    const [raza, setRaza] = useState([])
    const handleChange = (e) =>{
        e.preventDefault();
        setRaza(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(findDogs(raza))
        setRaza('');
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" value={raza} onChange={handleChange} placeholder='Ingrese Raza' />
            <button type="submit">X</button>
        </form>
    )
}