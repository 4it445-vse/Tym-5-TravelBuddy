import { SEARCH_PRODUCTS} from "../actions";


const initialProducts = {
    products: null
};


const searchReducer = (state = initialProducts, action) => {
    switch (action.type) {
        case SEARCH_PRODUCTS:
            return {
                ...state,
                products: null,
            };
        default:
                return state;

    }
};

export default searchReducer;