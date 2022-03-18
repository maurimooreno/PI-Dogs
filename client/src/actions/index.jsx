import axios from 'axios';

export function getDogs(payload){
    return async function(dispatch){
        let dogs = await axios.get('http://localhost:3001/dogs/');
        return dispatch({
            type: 'GET_DOGS',
            payload: dogs.data
        })
    }
}

export function getTemperaments(payload){
    return async function(dispatch){
        let temperaments = await axios.get('http://localhost:3001/temperament/')
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: temperaments.data
        })
    }
}

export function findDogs(payload){
    return async function(dispatch){
        let dogs = await axios.get(`http://localhost:3001/dogs/?name=${payload}`)
        return dispatch({
            type: 'FIND_DOGS',
            payload: dogs.data
        })
    }
}