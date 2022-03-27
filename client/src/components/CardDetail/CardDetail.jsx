import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './CardDetail.css';
import loading from '../../Assets/img/loading.gif'

import {useDispatch, useSelector} from 'react-redux';
import { useParams } from "react-router-dom";

import { getById } from "../../actions/index.jsx";

export default function CardDetail(){

    const dispatch = useDispatch()
    const dog = useSelector(state => state.dogs)
    const {id} = useParams()
    useEffect(()=>{
        dispatch(getById(id))
    }, [dispatch, id])

    return (
        <div>
        { dog.length > 1 ?
            <img src={loading} alt='loading...'></img>
            :
            dog?.map(d=>{
                let weight = d.weight.map(w=>Number(w))
                let height = d.height.map(h=>Number(h))
                
                return (
                    <div className="card_container">
                        <div key={d.id} className='cardDetail_container'>
                            <div className="cardDetail_header">
                                <Link to={'/home'}>
                                    <button>Back Home</button>
                                </Link> 
                                <div>
                                    <h3>{d.name}</h3>
                                </div>
                                <img src={d.image} alt="Imagen not fount" height='200px' width='200px'/>
                            </div>
                            <div className="cardDetail_body">
                                <div>
                                    <p>Peso</p>
                                    <p>Min: {weight[0]}</p>
                                    <p>Max: {weight[1]}</p>
                                </div>
                                <div>
                                    <p>Altura</p>
                                    <p>Min: {height[0]}</p>
                                    <p>Max: {height[1]}</p>
                                </div>
                                <div>
                                    <p>Temperamentos</p>
                                    <p>{d.temperament?.join(', ')}</p>
                                </div>
                                <div>
                                    <p>Años de Vida</p>
                                    <p>{d.yearsOfLife}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        </div>
    )
}