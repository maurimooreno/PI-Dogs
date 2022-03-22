import React from "react";
import { useDispatch, useSelector } from "react-redux";

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
        <div>
            <select onChange={handleFilterByTemperament}>
                <option value="all">all</option>
                {temperamentsOrdenados.map((t, i) => {
                    return (
                        <option key={i} value={t}>{t}</option>
                    )
                })}
            </select>
            <select onChange={handleFilterByCreation}>
                <option value="all">all</option>
                <option value="created">created</option>
                <option value="api">api</option>
            </select>
        </div>
    )
}