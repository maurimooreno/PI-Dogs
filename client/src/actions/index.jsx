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
        let temperaments = await axios.get('http://localhost:3001/temperaments/')
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: temperaments.data
        })
    }
}

export function addDog(payload){
    return async function(dispatch){
        await axios.post('http://localhost:3001/dogs', payload)
        return dispatch({
            type: 'ADD_DOG'
        })
    }
}

export function findDogs(payload){
    // return function (dispatch){
    //     axios.get(`http://localhost:3001/dogs/?name=${payload}`)
    //         .then((dogs) =>{
    //             return dispatch({
    //                 type: 'FIND_DOGS',
    //                 payload: dogs.data
    //             })
    //         })
    //         .catch((error) =>{
    //             alert('No se encontraron razas con ese nombre')
    //         })
    // }
    return async function(dispatch){
        try {
            let dogs = await axios.get(`http://localhost:3001/dogs/?name=${payload}`)
            return dispatch({
                type: 'FIND_DOGS',
                payload: dogs.data
            })
        } catch (error) {
            console.log(error)
            alert('No se encontraron razas con ese nombre')
        }
    }
}

export function getById(payload){
    return async function(dispatch){
        try {
            let dog = await axios.get(`http://localhost:3001/dogs/${payload}`)
            return dispatch({
                type: 'GET_BY_ID',
                payload: dog.data
            })
        } catch (error) {
            alert('No se ha encontrado ninguna raza con ese  ID')
        }
    }
}

export function filterByCreation(payload){
    return {
        type: 'FILTER_BY_CREATION',
        payload
    }
}

export function filterByTemperament(payload){
    return{
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}

export function orderBy(payload){
    return{
        type: 'ORDER_BY',
        payload
    }
}
