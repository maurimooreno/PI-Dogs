import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';

import { getDogs, getTemperaments } from "../../actions/index.jsx";

import NavBar from "../NavBar/NavBar.jsx";
import Cards from '../Cards/Cards.jsx'
import Filtros from "../Filtros/Filtros.jsx";
import Order from "../Order/Order.jsx";
import Paginado from "../Paginado/Paginado.jsx";

import './Home.css'

export default function Home(){

    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogs);
    const order = useSelector(state => state.order)

    const [dogsDisplay, setDogsDisplay] = useState([])

    useEffect(() =>{
        dispatch(getDogs());
        dispatch(getTemperaments());
      },[dispatch])  
      
    useEffect(()=>{
        setDogsDisplay(dogs)
        paginado(1);
    },[dogs])

    useEffect(()=>{
        let ordenados = dogs
        if(order === 'asc'){
            ordenados.sort((a,b)=>
                a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
        }else if(order === 'desc'){
            ordenados.sort((a,b)=>
                a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1);
        }else if(order === 'mayor'){
            ordenados.sort((a,b)=>
                a.weight[1] > b.weight[1] ? -1 : 1)
        }else if(order === 'menor'){
            ordenados.sort((a,b)=>
                a.weight[0] > b.weight[0] ? 1 : -1)
        }else if(!order){
            ordenados = dogs;
        }
        setDogsDisplay(ordenados)
        paginado(1);
    }, [order, dogs])

    //paginado
    const [pageCurrent, setPageCurrent] = useState(1)
    const dogsPerPage = 8;
    const lastIndex = pageCurrent * dogsPerPage;
    const firstIndex = lastIndex - dogsPerPage;
    const currentDogs = dogsDisplay.slice(firstIndex,lastIndex)

    const paginado = (number) =>{
        setPageCurrent(number)
    }

    return(
        <div className='container'>
                <NavBar />
                <div className="options_container">
                    <Filtros />
                    <Order />
                </div>
                <Paginado paginado={paginado} dogs={dogsDisplay.length} dogsPerPage={dogsPerPage}/>
                <Cards dogs={currentDogs}/>
        </div>
    )
}