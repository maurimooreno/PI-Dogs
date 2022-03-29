const initialState = {
    dogs: [],
    dogsFiltered: [],
    temperaments: [],
    order: ''
};

export default function rootReducer (state=initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload,
                dogsFiltered: action.payload
            }
        case 'GET_TEMPERAMENTS':
            return{
                ...state,
                temperaments: action.payload,
            }
        case 'FIND_DOGS':
            return{
                ...state,
                dogs: action.payload
            }
        case 'GET_BY_ID':
            return{
                ...state,
                dogs: action.payload
            }
        case 'ADD_DOG':
            return{
                ...state
            }
        case 'FILTER_BY_CREATION':
            const dogsFilteredByCreation = state.dogsFiltered;
            let filteredDogs = []
            if(action.payload === 'created'){
                filteredDogs = dogsFilteredByCreation.filter( d=> d.createdInDB)
            }
            if(action.payload === 'api'){
                filteredDogs = dogsFilteredByCreation.filter(d => !d.createdInDB)
            }
            if(action.payload === 'all'){
                filteredDogs = dogsFilteredByCreation
            }
            return{
                ...state,
                dogs: filteredDogs
            }
        case 'FILTER_BY_TEMPERAMENT':
            const dogsFilteredByTemp = state.dogsFiltered;
            const filteredTemp = action.payload === 'all' ? dogsFilteredByTemp : dogsFilteredByTemp.filter( dog => dog.temperament?.includes(action.payload))
            return{
                ...state,
                dogs: filteredTemp
            }
        case 'ORDER_BY':
            const dogsOrder = state.dogsFiltered
            let ordenados = dogsOrder
            if(action.payload === 'asc'){
                ordenados.sort((a,b)=>
                    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
            }else if(action.payload === 'desc'){
                ordenados.sort((a,b)=>
                    a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1);
            }else if(action.payload === 'mayor'){
                ordenados.sort((a,b)=>
                    a.weight[1] < b.weight[1] ? 1 : -1)
            }else if(action.payload === 'menor'){
                ordenados.sort((a,b)=>
                    a.weight[0] > b.weight[0] ? 1 : -1)
            }else if(action.payload === 'none'){
                ordenados = dogsOrder;
            }
            return{
                ...state,
                dogs: ordenados,
                order: action.payload
            }
        default:
            return{
                ...state
            }
    }
}