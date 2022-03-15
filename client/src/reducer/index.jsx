const initialState = {
    dogs: []
};

export default function rootReducer (state=initialState, action) {
    switch (action.type) {
        case 'GET_DOG':
            return{
                ...state,
                dogs: action.payload
            }
        default:
            return{
                state
            }
    }
}