import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css'
import icon_nav from '../../Assets/img/icon_nav.png'
import icon_addDog from '../../Assets/img/add_Dog.png'

import SearchBar from "../SearchBar/SearchBar";

export default function NavBar(){

    const redirectHome = (e) =>{
        e.preventDefault();
        window.location.reload(false)
    }
    return(
        <div className="nav_container">
            <div className='icon_nav' onClick={redirectHome}>
                <img src={icon_nav} alt="not found img"/>
                <p>THE DOG API</p>
            </div>
            <div className="nav_items">
                <Link to={'/addDog'}>
                    <input type="image" className="icon_addDog" alt="img not found" src={icon_addDog}/>
                </Link>
                <SearchBar />
            </div>
        </div>
    )
}