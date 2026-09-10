const initialState = {
    isLoading: false,
    errorMessage: null,
    categoryLoader: false,
    categoryError: null,
    btnLoader: false
};

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'IS_FETCHING':
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
            };
        case 'CATEGORY_LOADER':
            return {
                ...state,
                categoryLoader: true,
                categoryError: null,
                errorMessage: null,
            };
        case 'IS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                btnLoader: false,
                categoryError: null,
                categoryLoader: false
            };
        case 'CATEGORY_SUCCESS':
            return {
                ...state,
                categoryLoader: false,
                errorMessage: null,
                categoryError: null,
            };
        case 'IS_ERROR':
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload || 'An error occurred.',
                btnLoader: false,
                categoryError: null,
                categoryLoader: false
            };
        case 'BUTTON_LOADER':
            return {
                ...state,
                btnLoader: true,
                errorMessage: null,
                categoryError: null
            };
        default:
            return state;
    }
};  