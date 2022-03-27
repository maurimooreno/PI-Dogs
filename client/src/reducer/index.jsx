const initialState = {
    dogs: [],
    dogsFiltered: [],
    temperaments: [],
    order: '',
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
            return{
                ...state,
                order: action.payload
            }
        default:
            return{
                ...state
            }
    }
}