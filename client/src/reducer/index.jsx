const initialState = {
    dogs: [],
    temperaments: []
};

export default function rootReducer (state=initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload
            }
        case 'GET_TEMPERAMENTS':
            return{
                ...state,
                temperaments: action.payload
            }
        case 'FIND_DOGS':
            return{
                ...state,
                dogs: action.payload
            }
        default:
            return{
                ...state
            }
    }
}