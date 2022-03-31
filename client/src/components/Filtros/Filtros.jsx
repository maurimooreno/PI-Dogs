import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './Filtros.css';

import { filterByCreation, filterByTemperament } from '../../actions/index.jsx';

export default function Filtros() {

    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);
    const temperamentsOrdenados = temperaments.sort((a,b)=> { if(a < b){return -1} if(a>b){return 1} else return 0})
    
    const handleFilterByCreation = (e) =>{
        e.preventDefault();
        dispatch(filterByCreation(e.target.value))
    }
    const handleFilterByTemperament = (e) =>{
        e.preventDefault()
        dispatch(filterByTemperament(e.target.value))
    }

    return(
        <div className="filtros_container">
            <select onChange={handleFilterByTemperament}>
                <option value="all">Todos</option>
                {temperamentsOrdenados.map((t, i) => {
                    return (
                        <option key={i} value={t}>{t}</option>
                    )
                })}
            </select>
            <select onChange={handleFilterByCreation}>
                <option value="all">Todos</option>
                <option value="created">Creados</option>
                <option value="api">Api</option>
            </select>
        </div>
    )
}