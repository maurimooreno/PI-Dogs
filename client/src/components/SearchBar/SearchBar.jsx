import React, {useState} from "react";
import { useDispatch } from "react-redux";
import './SearchBar.css';
import icon_seach from '../../Assets/img/icon-search.png'

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
        <form onSubmit={handleSubmit} className='searchBar_container'>
            <div className='input_searchBar'>
                <input type="text"  value={raza} onChange={handleChange} placeholder='Buscar raza' />
            </div>
            <div className="icon_button">
                <input type="image" src={icon_seach} alt='img not found'/>
            </div>
        </form>
    )
}