import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Form.css'

import { addDog } from '../../actions/index.jsx';

const validate = (dog) =>{
    let error = {}
    const regExName = /^([a-zA-Z ]+)$/i;
    const regExImgUrl = /(https?:\/\/.*\.(?:jpg|jpeg|png|gif))/i

    if(!dog.dogName){
        error.dogName = 'Por favor ingrese el nombre de la raza'
    }
    if(!dog.weightMin || !dog.weightMax){
        error.weight = 'Por favor ingrese el peso'
    }
    if(!dog.heightMin || !dog.heightMax){
        error.height = 'Por favor ingrese la altura'
    }
    if(!dog.image){
        error.image = 'Por favor ingrese una imagen'
    }
    if(dog.temperament.length < 1){
        error.temperament = 'Por favor ingrese uno o mas temperamentos'
    }

    if(dog.dogName && !regExName.test(dog.dogName)){
        error.dogName = 'No se incluir caracteres especiales en el nombre'
    }
    if((dog.weightMin || dog.weightMax) && Number(dog.weightMin) >= Number(dog.weightMax)){
        error.weight = 'El peso minimo no puede superar a su peso maximo'
    }
    if((dog.heightMin || dog.heightMax) && Number(dog.heightMin) >= Number(dog.heightMax)){
        error.height = 'La altura minima no puede superar a su altura maxima'
    }
    if(dog.image && !regExImgUrl.test(dog.image)){
        error.image = 'La imagen URL ingresada no es valida'
    }
    if((dog.yearsMin || dog.yearsMax) && Number(dog.yearsMin) >= Number(dog.yearsMax)){
        error.years = 'Los años minimos no pueden superar a sus maximos'
    }

    return error;
}

export default function Form(){

    const history = useHistory()
    const dispatch = useDispatch()
    const temperaments = useSelector(state => state.temperaments)

    const [fromState, setFormState] = useState({
        dogName: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        yearsMin: '',
        yearsMax: '',
        image: '',
        temperament: []
    })
    const [error, setError] = useState({
        dogName: '',
        height: '',
        weight: '',
        years: '',
        image: '',
        temperament: []
    });

    const handleChangeInput = (e) => {
        e.preventDefault()
        setFormState({...fromState, [e.target.name] : e.target.value})
        setError(validate({...fromState, [e.target.name]:e.target.value}))
    }

    const handleSelect = (e) => {
        e.preventDefault()
        setFormState({...fromState, temperament: [...fromState.temperament, e.target.value]})
        setError(validate({...fromState, temperament: [e.target.name, e.target.value]}))
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(!Object.keys(error).length){
            let body = {
                name: fromState.dogName,
                height: [].concat(fromState.heightMin,fromState.heightMax),
                weight: [].concat(fromState.weightMin,fromState.weightMax),
                yearsOfLife: fromState.yearsMin.concat(' - ',fromState.yearsMax, ' years'),
                image: fromState.image,
                temperament: fromState.temperament
            }
            dispatch(addDog(body))
            alert('Perro agregado con exito');
            history.push('/home')
        }else{
            alert('El formulario que intentas enviar presenta errores')
        }
    } 
    
    const handleRedirect = (e) =>{
        e.preventDefault()
        history.push('/home')
    }
    return(
        <div className='form_container'>
            <div className='title'>
                <h2>CREA UNA RAZA</h2>
            </div>
            <div className='form_body'>
                <form onSubmit={handleSubmit}>
                    <div className='form_item'>
                        <label htmlFor="name">Nombre: </label><br></br>
                        <div className='input'>
                            <input type="text" name='dogName' placeholder='ingrese un nombre' onChange={handleChangeInput} required/><br></br>
                        </div>
                        {error.dogName && <p className='errorDanger'>{error.dogName}</p>}
                    </div>
                    <div className='form_item'>
                        <label htmlFor="height">Altura: </label><br></br>
                        <div className='input'>
                            <input type="number" name='heightMin' placeholder='altura min' onChange={handleChangeInput}  max='129' min='1' required/><br></br>
                            <input type="number" name='heightMax' placeholder='altura max' onChange={handleChangeInput}  max='130' min='1' required/><br></br>
                        </div>
                        {error.height  && <p className='errorDanger'>{error.height}</p>}
                    </div>
                    <div className='form_item'>
                        <label htmlFor="weight">Peso: </label><br></br>
                        <div className='input'>
                            <input type="number" name='weightMin' placeholder='peso min' onChange={handleChangeInput} max='114' min='1' required/><br></br>
                            <input type="number" name='weightMax' placeholder='peso max' onChange={handleChangeInput} max='115' min='1' required/><br></br>
                        </div>
                        {error.weight  && <p className='errorDanger'>{error.weight}</p>}
                    </div>
                    <div className='form_item'>
                        <label htmlFor="yearsOfLife">Años de vida: </label><br></br>
                        <div className='input'>
                            <input type="number" name='yearsMin' placeholder='años de vida min' onChange={handleChangeInput} max='29' min='1'/><br></br>
                            <input type="number" name='yearsMax' placeholder='años de vida max' onChange={handleChangeInput} max='30' min='1'/><br></br>
                        </div>
                        {error.years  && <p className='errorDanger'>{error.years}</p>}
                    </div>
                    <div className='form_item'>
                        <label htmlFor="name">Imagen: </label><br></br>
                        <div className='input'>
                            <input type="url" name='image' placeholder='ingrese una img' onChange={handleChangeInput} required/><br></br>
                        </div>
                        {error.image  && <p className='errorDanger'>{error.image}</p>}
                    </div>
                    <div className='form_item'>
                        <label htmlFor="temperament">Temperamentos: </label>
                        <select onChange={handleSelect} required>
                            {temperaments?.map((t,i)=>(
                                <option value={t} key={i}>{t}</option>
                            ))}
                        </select><br></br>
                        
                        {fromState.temperament.length > 0 ? 
                        <p>{fromState.temperament.join(', ')}</p>
                        :
                        error.temperament && <p className='errorDanger'>{error.temperament}</p>
                        }
                        <br></br>
                    </div>
                    <div className='form_button'>
                        <button>Agregar</button>
                        <button onClick={handleRedirect}>Volver</button>
                    </div>
                </form>
            </div>
        </div>
    )
}