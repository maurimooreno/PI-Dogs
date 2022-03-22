import React from "react";
import { useDispatch } from "react-redux";

import { orderBy} from '../../actions/index.jsx';

export default function Order() {

    const dispatch = useDispatch();
 
    const handleOrder = (e) => {
        e.preventDefault();
        dispatch(orderBy(e.target.value));
    }

    return(
        <div>
            <select onChange={handleOrder}>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
            </select>
            <select onChange={handleOrder}>
                <option value="mayor">MAYOR PESO</option>
                <option value="menor">MENOR PESO</option>
            </select>
        </div>
    )
}