import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';

import { getDogs, getTemperaments } from "../../actions/index.jsx";

import NavBar from "../NavBar/NavBar.jsx";
import Cards from '../Cards/Cards.jsx'

export default function Home(){

    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogs);
    const [dogsDisplay, setDogsDisplay] = useState([])

    useEffect(() =>{
        dispatch(getDogs());
        dispatch(getTemperaments());
      },[])  
      
    useEffect(()=>{
        setDogsDisplay(dogs)
    },[dogs])

    // useEffect(()=>{

    // })

    return(
        <>
        <NavBar />
        <Cards dogs={dogsDisplay}/>
        </>
    )
}