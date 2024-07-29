

const editEmployeeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_EDIT_EMPLOYEE':
            return action.payload;
        case 'EDIT_ONCHANGE':
            return {
                ...state,
                [action.payload.property]: action.payload.value
            };
        case 'EDIT_CLEAR':
            return {};
        default:
            return state;
    }
};

export default editEmployeeReducer;
