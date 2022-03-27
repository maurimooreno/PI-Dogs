import React from "react";
import { useDispatch } from "react-redux";
import './Order.css'

import { orderBy} from '../../actions/index.jsx';

export default function Order() {

    const dispatch = useDispatch();
 
    const handleOrder = (e) => {
        e.preventDefault();
        dispatch(orderBy(e.target.value));
    }

    return(
        <div className="order_container">
            <select onChange={handleOrder}>
                <option>Por Nombre</option>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
            </select>
            <select onChange={handleOrder}>
                <option value="">Por Peso</option>
                <option value="mayor">MAYOR PESO</option>
                <option value="menor">MENOR PESO</option>
            </select>
        </div>
    )
}