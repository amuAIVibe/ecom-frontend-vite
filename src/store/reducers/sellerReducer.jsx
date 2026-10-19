const initialState = {
  sellers: null,
  pagination: {}
};

const sellerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_SELLERS':
            return {
                ...state,
                sellers: action.payload,
                pagination: {
                    ...state.pagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage
                }
            };
        default:
            return state;
    }
}

export default sellerReducer;